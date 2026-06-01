import { useEffect } from 'react';
import {
  articles,
  categories,
  codexBenefits,
  codexModelComparison,
  faqs,
  getArticleBySlug,
  getRelatedArticles,
  releaseChangelog,
  snippets
} from './content';

const SITE_URL = 'https://bcforge-ai.netlify.app';
const SITE_NAME = 'BCDevAI';

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = `${SITE_URL}${path}`;
}

function setJsonLd(data) {
  let el = document.getElementById('page-json-ld');
  if (!el) {
    el = document.createElement('script');
    el.id = 'page-json-ld';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <a className="text-lg font-bold text-slate-950 hover:text-cyan-700" href="/">
          {SITE_NAME}
        </a>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <a className="hover:text-cyan-700" href="/#articles">Articles</a>
          <a className="hover:text-cyan-700" href="/#categories">Agent Types</a>
          <a className="hover:text-cyan-700" href="/about">About</a>
        </nav>
      </div>
    </header>
  );
}

function SectionHeader({ eyebrow, title, description, action, tone = 'light' }) {
  const isDark = tone === 'dark';

  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className={`mb-3 text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
            {eyebrow}
          </div>
        ) : null}
        <h2 className={`text-3xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
        {description ? (
          <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-900/10">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-slate-500">
        <span>{article.read}</span>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-800">{article.category}</span>
      </div>
      <h3 className="mb-4 text-2xl font-semibold leading-snug text-slate-950">{article.title}</h3>
      <p className="mb-6 leading-relaxed text-slate-600">{article.description}</p>
      <a className="font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href={article.slug}>
        Read Article -&gt;
      </a>
    </article>
  );
}

function ReleaseChangelogSection() {
  const toneClasses = {
    cyan: {
      card: 'border-cyan-200 bg-cyan-50/60',
      badge: 'border-cyan-200 bg-cyan-100 text-cyan-900',
      accent: 'bg-cyan-500'
    },
    blue: {
      card: 'border-blue-200 bg-blue-50/60',
      badge: 'border-blue-200 bg-blue-100 text-blue-900',
      accent: 'bg-blue-500'
    },
    rose: {
      card: 'border-rose-200 bg-rose-50/60',
      badge: 'border-rose-200 bg-rose-100 text-rose-900',
      accent: 'bg-rose-500'
    },
    amber: {
      card: 'border-amber-200 bg-amber-50/70',
      badge: 'border-amber-200 bg-amber-100 text-amber-950',
      accent: 'bg-amber-500'
    }
  };

  return (
    <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-6 text-white md:px-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">
              {releaseChangelog.eyebrow}
            </div>
            <div>
              <div>
                <h2 className="text-3xl font-bold leading-tight">{releaseChangelog.title}</h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-slate-300">
                  {releaseChangelog.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Current release
              </div>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                {releaseChangelog.currentRelease}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              {releaseChangelog.groups.map((group) => (
                <div key={group.label} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <div className="text-2xl font-bold text-slate-950">{group.items.length}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {group.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
            {releaseChangelog.groups.map((group) => (
              <article
                key={group.label}
                className={`relative overflow-hidden rounded-lg border p-6 shadow-sm ${toneClasses[group.tone].card}`}
              >
                <div className={`absolute left-0 top-0 h-full w-1.5 ${toneClasses[group.tone].accent}`} />
                <div
                  className={`mb-4 inline-block rounded-full border px-3 py-1 text-sm font-semibold ${toneClasses[group.tone].badge}`}
                >
                  {group.label}
                </div>
                <ul className="space-y-3 text-slate-700">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white px-6 py-5 md:px-8">
            <div className="mb-3 font-semibold text-slate-950">Official Microsoft sources</div>
            <div className="flex flex-wrap gap-3">
              {releaseChangelog.sources.map((source) => (
                <a
                  key={source.href}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-950"
                  href={source.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const featuredArticles = articles.slice(0, 3);
  const desc = 'Compare AI coding agents for Business Central AL development. Practical guides for Codex, GitHub Copilot, ChatGPT, Cursor, review agents, and custom ERP agents for Dynamics 365 extension work.';

  useEffect(() => {
    document.title = `${SITE_NAME} | Business Central AI Coding Agents`;
    setMeta('description', desc);
    setMeta('og:title', `${SITE_NAME} | Business Central AI Coding Agents`, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', SITE_URL, true);
    setMeta('og:type', 'website', true);
    setCanonical('/');
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: desc
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
      }
    ]);
  }, []);

  return (
    <main>
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,#dff8ff_0,#f8fbff_34%,#ffffff_68%)] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-block rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-semibold text-cyan-800 shadow-sm">
            Business Central AI Coding Agents
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-950">
            Choose the Right AI Coding Agent for Business Central
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            Compare Codex, Copilot, ChatGPT, codebase agents, review agents, and custom ERP
            agents for Dynamics 365 Business Central extension development.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-lg bg-cyan-700 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-800"
              href="#articles"
            >
              Explore Agents
            </a>
            <a
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
              href="#snippets"
            >
              View Agent Types
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white/90 p-8 shadow-xl shadow-cyan-900/10 backdrop-blur">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-950">Agent Starter Prompt</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">AI Agent + AL</span>
          </div>
          <div className="overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-5 text-sm text-cyan-200 shadow-inner">
            <pre className="whitespace-pre-wrap font-mono">{`Use an AI coding agent for this Business Central AL project:

- inspect app.json, dependencies, and id ranges
- compare existing object patterns
- draft extension-safe AL changes
- explain compiler errors and test gaps
- prepare a review checklist before release`}</pre>
          </div>
        </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16" id="categories">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse by focus"
            title="Coding Agent Types"
            description="Compare the agent styles that can help Business Central developers design, build, review, and document AL extensions."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name} className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-300 hover:bg-white hover:shadow-md hover:shadow-cyan-900/10">
                <div className="mb-4 text-sm font-semibold text-cyan-700">{category.count} guides</div>
                <h3 className="mb-3 text-xl font-semibold text-slate-950">{category.name}</h3>
                <p className="leading-relaxed text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" id="snippets">
        <SectionHeader
          eyebrow="Agent paths"
          title="Start with an Agent Workflow"
          description="Focused routes for choosing the right AI development assistant for Business Central work."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {snippets.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <div className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                {item.category}
              </div>
              <h3 className="mb-4 text-2xl font-semibold leading-snug text-slate-950">{item.title}</h3>
              <p className="mb-6 leading-relaxed text-slate-600">{item.desc}</p>
              <a className="font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href={item.slug}>
                Read More -&gt;
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Codex for AL teams"
            title="What Codex does in Business Central development"
            description="This section replaces keyword filler with practical guidance: what Codex is useful for, when to use stronger reasoning, and how the Codex model family helps AL projects."
          />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg bg-slate-950 p-8 text-white shadow-xl shadow-slate-900/20">
              <h3 className="mb-5 text-2xl font-bold">Core Benefits</h3>
              <div className="space-y-5">
                {codexBenefits.map((benefit) => (
                  <div key={benefit.title} className="border-l-2 border-cyan-300 pl-4">
                    <h4 className="mb-1 font-semibold text-cyan-100">{benefit.title}</h4>
                    <p className="leading-relaxed text-slate-300">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/70">
              <h3 className="mb-5 text-2xl font-bold text-slate-950">Codex Model and Effort Guide</h3>
              <div className="space-y-4">
                {codexModelComparison.map((item) => (
                  <div key={item.model} className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800">
                        {item.model}
                      </span>
                      <span className="text-sm font-medium text-slate-500">{item.bestFor}</span>
                    </div>
                    <p className="leading-relaxed text-slate-700">{item.businessCentralUse}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReleaseChangelogSection />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Featured tutorials"
          title="Start with these AI coding-agent guides"
          description="Use these guides to choose how Codex, Copilot, ChatGPT, and custom agents fit into Business Central AL development."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Decision guide"
            title="Which agent should you use?"
            description="Match the Business Central development task to the AI assistant that fits the work."
            tone="dark"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Need multi-file AL changes?', 'Use Codex for repository-aware edits, build checks, and review summaries.', '/blog/create-extension-with-codex'],
              ['Writing inside VS Code?', 'Use Copilot for inline AL completions, small refactors, and quick explanations.', '/blog/github-copilot-business-central-al'],
              ['Still shaping the request?', 'Use ChatGPT to turn business goals into requirements, risks, and test cases.', '/blog/chatgpt-business-central-solution-design'],
              ['Need team standards enforced?', 'Use a custom ERP agent with your id ranges, naming rules, and release checklist.', '/blog/custom-business-central-coding-agent']
            ].map(([question, answer, href]) => (
              <a
                key={question}
                className="rounded-lg border border-cyan-300/20 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/10"
                href={href}
              >
                <h3 className="mb-3 text-lg font-semibold">{question}</h3>
                <p className="leading-relaxed text-slate-300">{answer}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" id="articles">
        <SectionHeader
          eyebrow="All articles"
          title="AI Coding Agents for Business Central"
          description="Every article focuses on an AI assistant or agent workflow that can help develop Business Central extensions."
          action={
            <a
              className="rounded-lg bg-cyan-700 px-5 py-3 font-medium text-white shadow-lg shadow-cyan-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-800"
              href="#articles"
            >
              View All Agents
            </a>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Business Central Coding-Agent Questions"
            description="Short answers for teams deciding how to use AI agents safely in AL extension development."
          />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition open:bg-white open:shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold text-slate-950">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticlePage({ article }) {
  const relatedArticles = getRelatedArticles(article.slug, article.category);

  useEffect(() => {
    document.title = `${article.title} | ${SITE_NAME}`;
    setMeta('description', article.description);
    setMeta('og:title', `${article.title} | ${SITE_NAME}`, true);
    setMeta('og:description', article.description, true);
    setMeta('og:url', `${SITE_URL}${article.slug}`, true);
    setMeta('og:type', 'article', true);
    setCanonical(article.slug);
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      url: `${SITE_URL}${article.slug}`,
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL
      },
      articleSection: article.category
    });
  }, [article]);

  return (
    <main>
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#e9f7fb_100%)] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
            &lt;- Back to all guides
          </a>
          <div className="mb-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-800">{article.category}</span>
            <span className="rounded-full bg-white px-3 py-1 text-slate-700 shadow-sm">{article.read}</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
            {article.title}
          </h1>
          <p className="text-xl leading-relaxed text-slate-600">{article.description}</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-14">
        <p className="mb-10 text-lg leading-8 text-slate-700">{article.intro}</p>
        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950">{section.heading}</h2>
              <p className="leading-8 text-slate-700">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-4 space-y-2 text-slate-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-7">
                      - {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.code ? (
                <pre className="mt-5 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-cyan-100 shadow-sm">
                  <code>{section.code}</code>
                </pre>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Key Takeaways</h2>
          <ul className="space-y-3 text-slate-700">
            {article.takeaways.map((takeaway) => (
              <li key={takeaway}>- {takeaway}</li>
            ))}
          </ul>
        </div>
      </article>

      <section className="border-t border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Related Agent Guides"
            description="Continue with nearby AI development workflows for Business Central teams."
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

function AboutPage() {
  useEffect(() => {
    document.title = `About ${SITE_NAME} | Business Central AI Coding Agents`;
    const desc = 'BCDevAI is a practical resource for Microsoft Dynamics 365 Business Central developers who want to understand how AI coding agents fit into AL extension development.';
    setMeta('description', desc);
    setMeta('og:title', `About ${SITE_NAME}`, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', `${SITE_URL}/about`, true);
    setMeta('og:type', 'website', true);
    setCanonical('/about');
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${SITE_NAME}`,
      url: `${SITE_URL}/about`,
      description: 'BCDevAI is a practical resource for Business Central developers and consultants who want to use AI coding agents safely for AL extension work.'
    });
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
        &lt;- Back to home
      </a>

      <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950">About BCDevAI</h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        BCDevAI is a practical resource for Microsoft Dynamics 365 Business Central developers and
        consultants who want to understand how AI coding agents can fit into AL extension development.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">What we cover</h2>
          <p className="mb-4 leading-relaxed text-slate-700">
            The site compares different AI tools and agents — including OpenAI Codex, GitHub Copilot,
            ChatGPT, codebase navigation editors such as Cursor and Windsurf, AI review tools, and
            custom ERP agents — explaining where each one fits in a real Business Central development
            workflow.
          </p>
          <ul className="space-y-3 text-slate-700">
            {[
              'What each AI tool does well for Business Central AL work',
              'Which developer and consultant skills still matter alongside AI',
              'Practical prompts and step-by-step workflows to start safely',
              'Release changelogs for Business Central 2026 Wave 1 and beyond'
            ].map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Who this is for</h2>
          <p className="leading-relaxed text-slate-700">
            BCDevAI is written for Business Central developers, AL extension authors, and Dynamics 365
            consultants who want to accelerate their work with AI tools while maintaining code quality,
            upgrade safety, and business process integrity. If you need to choose between Codex and
            Copilot, or want to know when to trust AI-generated AL code, this site aims to answer those
            questions with practical guidance.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Contact</h2>
          <p className="leading-relaxed text-slate-700">
            For questions, corrections, or feedback about any article or guide on this site, reach out
            by email:{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="mailto:wctan@dynamicbiz.com.my">
              wctan@dynamicbiz.com.my
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = `Privacy Policy | ${SITE_NAME}`;
    const desc = 'Privacy policy for BCDevAI — information about advertising, cookies, and data use on this Business Central AI coding-agent resource site.';
    setMeta('description', desc);
    setMeta('og:title', `Privacy Policy | ${SITE_NAME}`, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', `${SITE_URL}/privacy-policy`, true);
    setCanonical('/privacy-policy');
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Privacy Policy | ${SITE_NAME}`,
      url: `${SITE_URL}/privacy-policy`
    });
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
        &lt;- Back to home
      </a>

      <h1 className="mb-3 text-4xl font-bold leading-tight text-slate-950">Privacy Policy</h1>
      <p className="mb-10 text-sm text-slate-500">Effective date: June 1, 2026</p>

      <div className="space-y-10 text-slate-700">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">About this site</h2>
          <p className="leading-relaxed">
            BCDevAI (<span className="font-medium text-slate-900">bcforge-ai.netlify.app</span>) is an
            informational website about AI coding agents for Microsoft Dynamics 365 Business Central.
            This site does not operate user accounts, process form submissions, or store personal data
            on its own servers.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Advertising</h2>
          <p className="mb-4 leading-relaxed">
            This site displays advertisements served by{' '}
            <strong className="text-slate-900">Google AdSense</strong> (publisher ID:
            ca-pub-4451848283183398). Google uses cookies — including the DoubleClick cookie — to
            serve ads based on your prior visits to this and other websites across the internet.
          </p>
          <p className="leading-relaxed">
            You can opt out of personalized advertising by visiting{' '}
            <a
              className="font-medium text-cyan-800 hover:underline"
              href="https://www.google.com/settings/ads"
              rel="noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendor cookies for personalized advertising
            by visiting{' '}
            <a
              className="font-medium text-cyan-800 hover:underline"
              href="https://www.aboutads.info/choices/"
              rel="noreferrer"
              target="_blank"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Cookies</h2>
          <p className="leading-relaxed">
            BCDevAI itself does not set cookies. Google AdSense and its advertising partners may set
            cookies in your browser to track browsing activity and deliver relevant advertisements. For
            more information on how Google uses your data, see the{' '}
            <a
              className="font-medium text-cyan-800 hover:underline"
              href="https://policies.google.com/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Google Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Analytics</h2>
          <p className="leading-relaxed">
            This site does not use Google Analytics or other user-tracking analytics tools.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Third-party links</h2>
          <p className="leading-relaxed">
            Articles on this site link to Microsoft Learn documentation and other external resources.
            BCDevAI is not responsible for the privacy practices of those external sites.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">{"Children's privacy"}</h2>
          <p className="leading-relaxed">
            This site is intended for professional software developers and IT consultants. It does not
            knowingly collect information from children under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Changes to this policy</h2>
          <p className="leading-relaxed">
            If this privacy policy changes, the updated version will be posted on this page with a
            revised effective date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Contact</h2>
          <p className="leading-relaxed">
            For privacy-related questions, contact:{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="mailto:wctan@dynamicbiz.com.my">
              wctan@dynamicbiz.com.my
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-20">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-cyan-700">404</div>
      <h1 className="mb-5 text-4xl font-bold text-slate-950">This Business Central agent guide is not ready yet.</h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        The guide you opened does not match one of the published article routes. Head back to the
        homepage to browse the available tutorials.
      </p>
      <a className="w-fit rounded-lg bg-cyan-700 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-900/20 hover:bg-cyan-800" href="/">
        Back to Homepage
      </a>
    </main>
  );
}

export default function BCAIHub() {
  const pathname = window.location.pathname;
  const article = getArticleBySlug(pathname);
  const isHome = pathname === '/' || pathname === '/index.html';
  const isAbout = pathname === '/about';
  const isPrivacy = pathname === '/privacy-policy';

  let page;
  if (isHome) page = <HomePage />;
  else if (article) page = <ArticlePage article={article} />;
  else if (isAbout) page = <AboutPage />;
  else if (isPrivacy) page = <PrivacyPolicyPage />;
  else page = <NotFoundPage />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      {page}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-lg font-bold text-slate-950">BCDevAI</h3>
              <p className="text-sm text-slate-500">Business Central AI coding-agent guides</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              <a className="hover:text-cyan-700" href="/">Home</a>
              <a className="hover:text-cyan-700" href="/#articles">Articles</a>
              <a className="hover:text-cyan-700" href="/about">About</a>
              <a className="hover:text-cyan-700" href="/privacy-policy">Privacy Policy</a>
            </nav>
            <div className="text-sm text-slate-500">Copyright 2026 BCDevAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
