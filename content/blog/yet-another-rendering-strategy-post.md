Title: Yet a Another Front-end Rendering Strategies Article: Beginners Guide to SSR, CSR, SSG, & ISR
Date: 2026-05-25
Slug: yet-another-front-end-rendering-strategies-article
Category: Frontend Engineering
Tags: SSR, CSR, SSG, ISR, React, Next.js, SEO, Core Web Vitals, Rendering
Summary: A practical beginner-friendly guide that demystifies modern front-end rendering strategies including SSR, CSR, SSG, ISR, and Partial Prerendering (PPR). The article explores how each rendering approach works, their real-world use cases, performance and SEO trade-offs, and why modern web applications increasingly rely on hybrid rendering architectures. Written from the perspective of a Python-focused engineer revisiting the React and Next.js ecosystem.
cover_image: /images/rendering_strategies.png

## Why Am I Writing Yet Another Article On This Topic?

**If you don't care about my personal context.** Skip to [Let's Demystify SSR, CSR, SSG & ISR](#lets-demystify-ssr-csr-ssg-isr) <!-- markdownlint-disable-line MD051 -->

I decided to write this article on SSR, CSR, SSG, and ISR because I recently found myself in a room with one of the senior directors of a very prominent tech company.

One of the reasons my personal website actually got fully built, deployed across multiple platforms at one point, and eventually took off was because of him, or more specifically, the inspiration, advice, and perspective I gained from speaking with him and researching his work online.

We had a genuinely great conversation, although the details will stay private. You can probably tell from my website homepage and my first blog post [I am Sanjeev: How I Went From Picking Up Shrapnels to Picking Up Coding]({filename}/blog/hello-world.md) that I have some experience within the JavaScript and React ecosystem, but I am by no means a front-end expert.

At work, I’ve mainly been learning from our front-end engineer while also delegating a lot of the heavier front-end work to our front-end engineer from Torchbox (TBX) 🙃.

During the conversation, we ended up discussing SSR, CSR, SSG, and ISR. I had studied these rendering strategies before, but they are not concepts I actively think about day-to-day because my primary specialisation is in the Python ecosystem, particularly with Flask, Django, and Wagtail.

I do have experience with JavaScript, TypeScript, and React from personal projects and from a short period of working on React-based projects at the ONS. But somehow, every time I end up near a JS/TS + React codebase, the natural laws of the universe seem to pull me straight back into Python 🥲.

At one point during the discussion, both of us realised that my knowledge of SSR, CSR, SSG, and ISR was not exactly sitting in RAM anymore, it was stored away on an old HDD somewhere. The concepts were still there, but it took me a little while to spin the disk back up and bring them back to life.

So I decided to properly refresh my understanding and share what I learned along the way. This article is partly for anyone trying to understand modern front-end rendering strategies, but also partly a refresher for my future self.

## Who Will Benefit From This Article?

* You are a front-end engineer looking for a refresher, or just want to criticise me. Unfortunately for you, I do not have a comments section yet...
* You come from a different ecosystem, such as the Python stack, and work in web development but are not too familiar with modern front-end rendering strategies.
* You are trying to break into the JS/TS + React/Next.js ecosystem.
* You could not care less about front-end rendering strategies because your area of software engineering has absolutely no concern for these topics, but you are naturally curious like I am.

## Let's Demystify SSR, CSR, SSG & ISR

### Why should we care about front-end rendering strategies in the first place?

If you are trying to build a highly performant web application where page load speed matters, then understanding front-end rendering strategies becomes extremely important.

**Metrics** such as:

* First Contentful Paint (FCP)
* Largest Contentful Paint (LCP)
* Interaction to Next Paint (INP)
* First Input Delay (FID)
* Time to First Byte (TTFB)
* Time to Interactive (TTI)
* Total Blocking Time (TBT)
* Cumulative Layout Shift (CLS)

Along with overall Core Web Vitals and SEO performance, are all heavily influenced by how your application is rendered and delivered to the browser.

Failing to properly understand rendering strategies can absolutely cost you in terms of:

* web performance
* user experience
* SEO rankings
* scalability
* and even infrastructure costs in some cases

If you want to go deeper into Core Web Vitals and metrics such as FCP, LCP, INP, FID, TTFB, TTI, TBT, and CLS, **I have included references further below**.

And ultimately, poor performance costs users.

Which then turns into lost engagement, lost conversions, lost revenue, unhappy clients, angry stakeholders, and engineers getting pulled into “why is the site slow?” meetings nobody wants to attend.

So let’s avoid that and continue with the article.

There is also a reason we are going through these rendering strategies in this specific order. It will make much more sense by the time we reach the end of the article.

### Let's start with Server-side Rendering (SSR)

Server-side Rendering (SSR) works by rendering the page on the server before it is sent to the browser.

When a user requests a page, the server fetches the necessary data, generates the HTML content on the server itself, and then sends a fully rendered page back to the client for the user to view.

Frameworks such as Django and Next.js provide built-in server-side rendering capabilities out of the box.

With traditional Django applications, SSR is effectively the default behaviour through Django Templates. In the React ecosystem, frameworks such as Next.js introduced SSR to solve many of the SEO and performance limitations associated with purely client-rendered applications.

**Use cases for SSR**

SSR is commonly used in applications where content needs to be fresh, dynamic, and easily discoverable by search engines.

Examples include:

* Real-time dashboards and analytics platforms
* Financial trading platforms showing live market data
* Social media feeds and activity timelines
* E-commerce product pages with live pricing and stock availability
* Personalised user dashboards
* News platforms with constantly updating content
* SaaS platforms with authenticated, user-specific data

**Where SSR shines**

* SSR serves fresh and up-to-date content on every request
* Search engines receive fully rendered HTML immediately, which is excellent for SEO
* Better SEO compared to purely client-side rendered applications
* Faster initial content visibility for users compared to CSR
* Works well for dynamic and personalised experiences
* Improves social media link previews and metadata rendering

**Things to keep in mind with SSR**

SSR is powerful, but it does come with trade-offs.

* Every request requires server-side rendering and often data fetching, which increases server load
* Under high traffic, SSR applications can become expensive to scale without caching layers
* Time to First Byte (TTFB) can sometimes suffer because the server must finish rendering before responding
* Pages may visually appear quickly, but JavaScript still needs to hydrate on the client before the page becomes fully interactive
* Rendering complex pages repeatedly on the server can increase infrastructure costs
* Poorly optimised SSR applications can still end up shipping large JavaScript bundles to the browser

One important thing to understand is that SSR improves the initial render experience, but it does not magically remove the cost of JavaScript running in the browser afterwards. The client still needs to hydrate the application and attach interactivity to the rendered HTML.

### Let's navigate to Client-side Rendering (CSR)

Client-side Rendering (CSR) relies heavily on JavaScript to render content directly within the browser on the user's device. It enables highly interactive and responsive user experiences, but it comes with trade-offs around initial load performance and SEO.

In modern applications, CSR is often layered on top of SSR, SSG, or ISR to add interactivity and dynamic client-side behaviour.

The way CSR works is relatively straightforward:

* A lightweight HTML shell is initially sent to the browser
* JavaScript bundles are then downloaded and executed
* The application fetches data from APIs
* The browser renders and updates the UI dynamically on the client side without requiring full page reloads

In this model, the browser effectively becomes responsible for controlling much of the application's rendering and state management.

**Use cases for CSR**

CSR works particularly well for highly interactive applications where responsiveness matters more than initial page load speed or SEO.

Examples include:

* Interactive admin dashboards
* Real-time analytics platforms
* Project management tools
* Chat and messaging applications
* Collaborative applications such as online editors
* Internal enterprise tools
* Highly interactive SaaS products
* Applications with frequent UI updates and client-side state changes

A common example is when users interact with filters, charts, forms, or live-updating components where waiting for a full server roundtrip would feel slow and clunky.

**Where CSR shines**

* JavaScript powers rich interactivity and smooth, app-like experiences
* Reduces repeated rendering work on the server
* Seamless transitions between pages and application states
* Excellent for highly dynamic interfaces
* Works very well for real-time interactions and live-updating data
* Enables sophisticated client-side state management and UI behaviour
* After the initial load, navigation can feel extremely fast

**Things to keep in mind with CSR**

CSR also comes with several important trade-offs.

* The initial page load can be slower because JavaScript bundles must download, parse, and execute before meaningful content appears
* Optimising Core Web Vitals can become more challenging
* Large JavaScript bundles can significantly impact performance on slower devices
* SEO can become problematic because content is rendered dynamically in the browser
* Search engines have improved at rendering JavaScript, but SSR and SSG are still generally more SEO-friendly
* Applications often require more complex client-side state management
* Users on poor network connections may experience blank screens while waiting for JavaScript to load

One of the biggest criticisms of poorly optimised CSR applications is the infamous “loading spinner experience”, where users stare at a blank page while the browser downloads and executes a massive JavaScript bundle before anything useful becomes visible.

### Let's now make a pit stop at Static Site Generation (SSG)

Static Site Generation (SSG): SSG prerenders pages at build time, resulting in static HTML files that can be cached at the edge and served quickly and efficiently.

With SSG, HTML is generated build time, not at request time. This way, the server doesn't do the rendering; it simply serves the pre-built files.

The way SSG works is HTML for all pages is generated in advance and usually stored on a Content Delivery Network (CDN).

When users request a page, it's delivered instantly from the nearest CDN.

**Use cases for SSG**

* Any page with content that changes very infrequently
* Site layouts
* Performance-critical marketing pages
* Documentation or other sites that quickly rebuild

**Where SSG shines**

* Ultra fast load times since the content is pre-rendered, it lads nearly instantly.
* SEO friendly as search engines like the fully rendered pages served directly from a CDN.
* Low server costs with no on the fly rendering, server handles less load.
* Fastest possible page loads
* Excellent SEO performance
* Reduced server load
* Lowest infrastructure costs

**Things to keep in mind with SSG**

* Increased build times for sites with a large number of pages
* Content updates require a new build and deployment
* Can be combined with client-side data fetching for dynamic elements, but this is slower than server-side fetching since each data request initiates a new roundtrip to the server
* Content is static, so it doesn't change until the next build.
* Slow builds for large sites, as the number of pages grows, builds can become time-consuming

### Fancy Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) allows you to update specific pages after your site has already been built, meaning you do not need to rebuild the entire application every time content changes.

**In many ways, ISR combines the speed of Static Site Generation (SSG) with some of the flexibility of SSR.**

The core idea behind ISR is simple:

* Pages are generated statically at build time
* Those pages are cached and served extremely quickly
* After a configured revalidation period, the next incoming request triggers a background regeneration of the page
* Users continue receiving the previously cached version while the new version is generated
* Once regeneration completes, the cache is updated with the fresh page

This approach allows applications to scale to extremely large numbers of pages without suffering from painfully long full-site rebuilds.

Frameworks such as **Next.js popularised ISR** by introducing built-in revalidation capabilities directly into the framework.

**How ISR works**

A simple way to think about ISR is:

"*Generate pages statically, cache them aggressively, and refresh them in the background only when needed.*"

**Compared to traditional SSG:**

* build times are significantly faster for large applications
* not every page needs to regenerate during deployment
* content can update automatically without requiring a full rebuild

**ISR can also support:**

* timed revalidation
* on-demand revalidation
* webhook-triggered regeneration
* CMS-driven cache invalidation

Which becomes incredibly useful for modern content-heavy platforms.

**Use cases for ISR**

ISR is particularly useful when:

* you want SSG-level performance
* but your content changes too frequently for full static builds to remain practical

Common examples include:

* E-commerce product pages
* News and publishing websites
* Documentation platforms
* Marketing sites with CMS-managed content
* Large-scale blogs
* Marketplace platforms
* Applications with thousands or even millions of pages

ISR becomes especially valuable when traditional SSG build times start becoming unmanageable.

**Where ISR shines**

* You get performance that is very close to SSG
* Pages remain SEO-friendly because static HTML is still served to search engines
* Content can update automatically without requiring a full rebuild
* Maintains extremely fast page loads through caching
* Scales efficiently to very large numbers of pages
* Reduces deployment bottlenecks caused by massive static builds
* Can be more infrastructure-efficient than SSR in some scenarios
* Supports modern CMS-driven workflows very well

One of the reasons ISR became so popular is because it helps solve the classic trade-off between:

* fast static websites
* and frequently changing dynamic content

**Things to keep in mind with ISR**

* You have to be mindful of cache invalidation strategies/ approaches
* Understand how ISR differs from cache control headers
* There can be still a lag between data updates and page regeneration
* ISR introduces additional complexity especially for large-scale applications

## When to Use SSR, CSR, SSG or ISR?

By this point, you have probably realised something important:

**There is no single “best” rendering strategy.**

Each approach exists because different applications have different requirements around:

* performance
* SEO
* scalability
* infrastructure cost
* freshness of data
* and user experience

Choosing the wrong rendering strategy can lead to unnecessary complexity, poor performance, expensive infrastructure bills, or terrible SEO.

The real engineering skill is understanding the trade-offs.

Here are some general rules of thumb.

**Use SSR when...**

Use SSR when content needs to be:

* dynamic
* personalised
* frequently updated
* or request-specific

Good examples include:

* Social media feeds
* Financial dashboards
* SaaS applications
* User-specific dashboards
* E-commerce checkout flows
* Live sports scoreboards
* Real-time analytics platforms
* Applications with authentication-heavy workflows

SSR is often the right choice when freshness matters more than absolute rendering speed.

**Use CSR when...**

Use CSR when your application behaves more like a desktop application running in the browser.

Good examples include:

* Admin dashboards
* Internal enterprise tools
* Chat applications
* Kanban/project management platforms
* Real-time collaborative editors
* Interactive visualisation tools
* Applications with heavy client-side interactions

CSR works best when:

* SEO is less important
* interactivity is extremely important
* and users spend long periods interacting with the application after the * initial load

A lot of modern SaaS products lean heavily into CSR.

**Use SSG when...**

Use SSG when content:

* changes rarely
* is mostly static
* and benefits heavily from speed and SEO

Good examples include:

* Blogs
* Documentation websites
* Marketing websites
* Portfolio websites
* Landing pages
* Company information pages
* Developer documentation platforms

SSG is fantastic for performance because pages are pre-built ahead of time and can be served directly from a CDN extremely quickly.

This is why many modern documentation platforms feel almost instant.

**Use ISR when...**

Use ISR when you want the speed of static generation, but your content changes too often for full rebuilds to remain practical.

Good examples include:

* Large e-commerce platforms
* News websites
* CMS-driven content platforms
* Marketplace listings
* Large-scale blogs
* Documentation platforms with frequent updates
* Sites with thousands or millions of pages

ISR is effectively the middle ground between SSG and SSR.

You still get static performance characteristics, but with the ability to refresh content incrementally over time.

## Hybrid Strategies

Here is the important part:

Modern applications **rarely use just one rendering strategy**.

**Most real-world applications are hybrids**.

A single application might use:

* SSR for authenticated dashboards
* SSG for marketing pages
* ISR for blog content
* and CSR for interactive components on the page

This is actually how many large-scale modern applications are architected today.

For example, an e-commerce platform could use:

* Homepage - SSG
* Product pages - ISR
* User dashboard - SSR
* Shopping cart interactions - CSR
* Live stock indicators - CSR
* Checkout flow - SSR

The modern **React ecosystem**, particularly frameworks such as **Next.js**, has heavily embraced this hybrid rendering model.

Even traditional server-rendered frameworks such as **Django** often use hybrid approaches:

* Django Templates for SSR
* HTMX or Alpine.js for partial interactivity
* React components for highly dynamic sections
* CDN caching for static assets
* API-driven front-end enhancements where needed

**The important thing is not blindly choosing a trendy rendering strategy**.

The important thing is understanding:

* what problem you are solving
* where performance matters
* where SEO matters
* where interactivity matters
* and where complexity starts becoming unnecessary

Because at the end of the day, engineering is all about trade-offs.

## Bonus: Partial Prerendering (PPR)

**If you made it this far into the article, good news, I have some bonus content for you.**

**One of the newer concepts emerging in the modern React and Next.js ecosystem is Partial Prerendering (PPR).**

PPR is essentially an enhancement layered on top of existing rendering strategies rather than being a completely separate rendering model on its own.

**The goal of PPR is to combine:**

* the instant loading experience of SSG
* the dynamic flexibility of SSR
* and the streaming capabilities introduced through modern React Server Components and Suspense boundaries

In simple terms:

* Serve a fast static shell immediately, then progressively stream dynamic content into the page as it becomes ready.

This helps eliminate the traditional trade-off between:

* static performance
* and dynamic server-rendered experiences

**Why PPR is interesting**

Historically, developers often had to choose between:

* fast static pages
* or fully dynamic pages

PPR attempts to blur that line.

**With PPR:**

* the static parts of the page can be prerendered and cached at the edge
while dynamic sections stream in separately without blocking the initial render

This means users can start seeing meaningful content almost instantly while slower dynamic sections continue loading in the background.

**Potential benefits of PPR**

* Instant initial page loads similar to SSG
* Dynamic content can stream progressively into the page
* Better perceived performance for users
* Reduced blocking during rendering
* More efficient use of server rendering
* Potentially improved Core Web Vitals
* Less need to fully choose between “static” and “dynamic” architectures

In many ways, PPR represents where modern rendering architectures seem to be heading.

**Current considerations**

**PPR is still evolving and should still be considered relatively experimental.**

**Things to keep in mind:**

* Some applications may require architectural refactoring to adopt it properly
* Proper Suspense boundary design becomes extremely important
* Separating static and dynamic content cleanly takes planning
* Debugging streaming behaviour can introduce additional complexity
* The ecosystem around PPR is still maturing

## Closing Thoughts

If you made it all the way to the end of this article, congratulations, you now probably understand front-end rendering strategies better than I did when I walked into that conversation with the senior director 😅.

Hopefully this article helped demystify SSR, CSR, SSG, ISR, and even some of the newer ideas such as Partial Prerendering (PPR), without making them feel overly academic or unnecessarily complicated.

One of the biggest things I realised while revisiting these concepts is that modern web engineering is increasingly becoming about choosing the right rendering strategy for the right problem rather than blindly committing to a single approach.

The reality is:

* modern applications are hybrid
* trade-offs are everywhere
* performance matters
* SEO matters
* user experience matters
* and JavaScript bundles somehow still end up being 4MB regardless 🙃

As someone whose background primarily lives within the Python ecosystem, particularly Flask, Django, and Wagtail, revisiting these concepts was genuinely refreshing. It also reminded me how much modern front-end engineering has evolved over the last few years.

We have gone from:

* “everything server-rendered”
* to “everything client-rendered”

And now towards intelligent hybrid architectures combining:

* SSR
* SSG
* ISR
* streaming
* edge rendering
* Suspense boundaries
* and selective hydration

...all within the same application.

Which is both incredibly exciting and overwhelming at the same time.

Anyway, thank you for reading my “Yet Another Front-end Rendering Strategies Article”.

Now go optimise your Core Web Vitals, reduce your JavaScript bundle sizes, and try not to accidentally turn your homepage into a distributed systems research paper.

Good luck!

## References

* [Vercel: How to Choose the Best Rendering Strategy for Your App](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app){target="_blank" rel="noopener noreferrer"}
* [Vercel: How Core Web Vitals Affect SEO](https://vercel.com/blog/how-core-web-vitals-affect-seo){target="_blank" rel="noopener noreferrer"}
* [Vercel: How Vercel Improves Your Website's Search Engine Ranking](https://vercel.com/resources/how-vercel-improves-your-websites-search-engine-ranking#network-response-time-to-first-byte-(ttfb)){target="_blank" rel="noopener noreferrer"}
* [Vercel: The User Experience of the Frontend Cloud](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud){target="_blank" rel="noopener noreferrer"}
* [Vercel: Next.js SEO Playbook](https://vercel.com/blog/nextjs-seo-playbook){target="_blank" rel="noopener noreferrer"}
* [Optimise LCP](https://web.dev/articles/optimize-lcp){target="_blank" rel="noopener noreferrer"}
* [Optimise CLS](https://web.dev/articles/optimize-cls){target="_blank" rel="noopener noreferrer"}
* [Optimise INP](https://web.dev/articles/optimize-inp){target="_blank" rel="noopener noreferrer"}
