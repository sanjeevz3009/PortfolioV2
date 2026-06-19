#!/usr/bin/env python3
"""
Image optimisation script for sanj.ninja
Run from project root: uv run --with Pillow python3 compress_images.py

Converts photo.jpg, mochi2.png, and rendering_strategies.png to WebP.
Targets: photo < 200KB, cover images < 300KB.
Originals are kept untouched.
"""

from pathlib import Path

from PIL import Image, ImageOps

IMAGES = [
    {
        "src": "content/images/photo.jpg",
        "out": "content/images/photo.webp",
        "max_width": 840,  # 420px displayed at 2x retina
        "quality": 82,
        "target_kb": 200,
    },
    {
        "src": "content/images/mochi2.png",
        "out": "content/images/mochi2.webp",
        "max_width": 1200,
        "quality": 80,
        "target_kb": 300,
    },
    {
        "src": "content/images/rendering_strategies.png",
        "out": "content/images/rendering_strategies.webp",
        "max_width": 1200,
        "quality": 80,
        "target_kb": 300,
    },
]


def compress(entry):
    src = Path(entry["src"])
    out = Path(entry["out"])

    if not src.exists():
        print(f"  SKIP - not found: {src}")
        return

    img = Image.open(src)

    # Apply EXIF orientation before anything else.
    # Phone photos store rotation in EXIF - without this the image
    # comes out sideways or upside down after conversion.
    img = ImageOps.exif_transpose(img)

    # Convert palette or RGBA to RGB for smaller WebP output
    if img.mode in ("RGBA", "P") or img.mode != "RGB":
        img = img.convert("RGB")

    # Resize if wider than max_width, preserving aspect ratio
    if img.width > entry["max_width"]:
        ratio = entry["max_width"] / img.width
        new_h = int(img.height * ratio)
        img = img.resize((entry["max_width"], new_h), Image.LANCZOS)
        print(f"  Resized to {img.width}x{img.height}")
    else:
        print(f"  Keeping original dimensions {img.width}x{img.height}")

    img.save(out, "WEBP", quality=entry["quality"], method=6)

    src_kb = src.stat().st_size / 1024
    out_kb = out.stat().st_size / 1024
    saving = (1 - out_kb / src_kb) * 100
    status = (
        "OK"
        if out_kb <= entry["target_kb"]
        else f"WARNING: above {entry['target_kb']}KB target"
    )

    print(f"  {src.name} -> {out.name}")
    print(f"  {src_kb:.0f}KB -> {out_kb:.0f}KB ({saving:.0f}% smaller) [{status}]")


if __name__ == "__main__":
    print("Compressing images...\n")
    for entry in IMAGES:
        print(f"Processing {entry['src']}...")
        compress(entry)
        print()
    print("Done.")
    print()
    print("Next steps:")
    print("1. Add to .gitattributes:")
    print("   *.webp filter=lfs diff=lfs merge=lfs -text")
    print("   *.pdf filter=lfs diff=lfs merge=lfs -text")
    print()
    print("2. Apply webp-template-patches.md to your templates")
