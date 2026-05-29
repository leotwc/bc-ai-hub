import { useEffect } from 'react';
import {
  articles,
  categories,
  faqs,
  getArticleBySlug,
  getRelatedArticles,
  keywords,
  resources,
  snippets
} from './content';

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-3xl font-bold leading-tight text-gray-950">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-gray-500">
        <span>{article.read}</span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{article.category}</span>
      </div>
      <h3 className="mb-4 text-2xl font-semibold leading-snug text-gray-950">{article.title}</h3>
      <p className="mb-6 leading-relaxed text-gray-600">{article.description}</p>
      <a className="font-semibold text-gray-950 hover:underline" href={article.slug}>
        Read Article -&gt;
      </a>
    </article>
  );
}

function HomePage() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-block rounded-full bg-black px-4 py-2 text-sm text-white">
            Microsoft Dynamics 365 Business Central + AI
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-950">
            Microsoft Dynamics 365 Business Central Development with AI
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Learn AL development, integrations, automation, AI prompts, and Business Central
            best practices with practical developer examples.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-lg bg-black px-6 py-3 font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              href="#articles"
            >
              Explore Tutorials
            </a>
            <a
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium transition hover:bg-gray-100"
              href="#snippets"
            >
              View AL Snippets
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-950">Trending AI Prompt</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">GPT + AL</span>
          </div>
          <div className="overflow-auto rounded-lg bg-gray-950 p-5 text-sm text-green-300">
            <pre className="whitespace-pre-wrap font-mono">{`Generate AL code for Business Central that:

- validates expiration date
- blocks expired inventory posting
- supports item tracking
- displays custom error messages
- includes best practices and comments`}</pre>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16" id="categories">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse by focus"
            title="Business Central Learning Blocks"
            description="Jump into the topics ERP teams ask for most: AL development, warehouse control, integrations, and AI workflows."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 text-sm font-semibold text-gray-500">{category.count} guides</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-950">{category.name}</h3>
                <p className="leading-relaxed text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" id="snippets">
        <SectionHeader
          eyebrow="Reusable patterns"
          title="Latest AL Snippets"
          description="Focused Business Central development examples for real ERP projects."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {snippets.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {item.category}
              </div>
              <h3 className="mb-4 text-2xl font-semibold leading-snug text-gray-950">{item.title}</h3>
              <p className="mb-6 leading-relaxed text-gray-600">{item.desc}</p>
              <a className="font-semibold text-gray-950 hover:underline" href={item.slug}>
                Read More -&gt;
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-black p-10 text-white shadow-xl">
            <h2 className="mb-6 text-3xl font-bold">High Value ERP Keywords</h2>
            <div className="space-y-4 text-gray-300">
              {keywords.map((keyword) => (
                <div key={keyword}>- {keyword}</div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-10 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold text-gray-950">Practical Resource Blocks</h2>
            <div className="space-y-4 text-gray-700">
              {resources.map((resource) => (
                <div key={resource} className="rounded-lg bg-white p-4 shadow-sm">
                  {resource}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Featured tutorials"
          title="Start with these Business Central guides"
          description="Use these as the first implementation blocks for validation, integration, and warehouse control."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-gray-950 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Get the next BC AI block</h2>
            <p className="leading-relaxed text-gray-300">
              A lightweight newsletter block for future article drops, snippet packs, and practical
              Business Central AI ideas.
            </p>
          </div>
          <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              className="min-h-12 rounded-lg border border-white/20 bg-white px-4 text-gray-950 outline-none focus:border-white"
              id="email"
              placeholder="developer@example.com"
              type="email"
            />
            <button className="min-h-12 rounded-lg bg-white px-6 font-semibold text-gray-950 transition hover:bg-gray-200">
              Join List
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="articles">
        <SectionHeader
          eyebrow="All articles"
          title="Latest SEO Articles"
          description="Business Central tutorials designed for Google search traffic and day-to-day ERP development."
          action={
            <a
              className="rounded-lg bg-black px-5 py-3 font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              href="#articles"
            >
              View All Articles
            </a>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Business Central AI Development Questions"
            description="Short answers for teams planning extension-safe automation and ERP AI workflows."
          />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <summary className="cursor-pointer text-lg font-semibold text-gray-950">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ArticlePage({ article }) {
  const relatedArticles = getRelatedArticles(article.slug, article.category);

  useEffect(() => {
    document.title = `${article.title} | BCDevAI`;
  }, [article.title]);

  return (
    <main>
      <section className="border-b border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <a className="mb-8 inline-block font-semibold text-gray-700 hover:underline" href="/">
            &lt;- Back to all guides
          </a>
          <div className="mb-5 flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="rounded-full bg-gray-100 px-3 py-1">{article.category}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">{article.read}</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-950 md:text-5xl">
            {article.title}
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">{article.description}</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-10 text-lg leading-8 text-gray-700">{article.intro}</p>
        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 text-2xl font-bold text-gray-950">{section.heading}</h2>
              <p className="leading-8 text-gray-700">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-950">Key Takeaways</h2>
          <ul className="space-y-3 text-gray-700">
            {article.takeaways.map((takeaway) => (
              <li key={takeaway}>- {takeaway}</li>
            ))}
          </ul>
        </div>
      </article>

      <section className="border-t border-gray-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Related Business Central Guides"
            description="Continue with nearby implementation topics from the same area."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-20">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">404</div>
      <h1 className="mb-5 text-4xl font-bold text-gray-950">This Business Central block is not ready yet.</h1>
      <p className="mb-8 text-lg leading-relaxed text-gray-600">
        The guide you opened does not match one of the published article routes. Head back to the
        homepage to browse the available tutorials.
      </p>
      <a className="w-fit rounded-lg bg-black px-6 py-3 font-semibold text-white" href="/">
        Back to Homepage
      </a>
    </main>
  );
}

export default function BCAIHub() {
  const pathname = window.location.pathname;
  const article = getArticleBySlug(pathname);
  const isHome = pathname === '/' || pathname === '/index.html';

  useEffect(() => {
    if (isHome) {
      document.title = 'BCDevAI | Business Central Development with AI';
    }
  }, [isHome]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {isHome ? <HomePage /> : article ? <ArticlePage article={article} /> : <NotFoundPage />}
      <footer className="border-t border-gray-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h3 className="text-lg font-bold text-gray-950">BCDevAI</h3>
            <p className="text-sm text-gray-500">Business Central Development with AI</p>
          </div>
          <div className="text-sm text-gray-500">Copyright 2026 BCDevAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
