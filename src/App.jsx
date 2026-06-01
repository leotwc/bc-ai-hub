import { useState, useRef, useEffect } from 'react';
import {
  articles,
  categories,
  codexBenefits,
  codexModelComparison,
  faqs,
  getArticleBySlug,
  getRelatedArticles,
  releaseChangelog,
} from './content';

const SITE_URL = 'https://bcforge-ai.netlify.app';
const SITE_NAME = 'BCDevAI';

const NEW_SLUGS = new Set([
  '/blog/claude-code-business-central-al',
  '/blog/build-bc-copilot-extension',
  '/blog/al-build-pipeline-ai-code-review',
  '/blog/prompt-engineering-business-central-al',
]);

// ── Head helpers ──────────────────────────────────────────────────────────────

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

// ── Shared components ─────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a className="flex items-center gap-2.5 hover:opacity-90 transition-opacity" href="/">
          <img src="/favicon.svg" alt="BCDevAI" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold tracking-tight">
            <span className="text-cyan-600">BC</span><span className="text-slate-800">DevAI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <a className="hover:text-cyan-700" href="/#articles">Articles</a>
          <a className="hover:text-cyan-700" href="/#categories">Agent Types</a>
          <a className="hover:text-cyan-700" href="/about">About</a>
        </nav>

        <button
          aria-label="Toggle navigation"
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 bg-slate-700 transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-slate-700 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-slate-700 transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            <a className="hover:text-cyan-700" href="/#articles" onClick={() => setMenuOpen(false)}>Articles</a>
            <a className="hover:text-cyan-700" href="/#categories" onClick={() => setMenuOpen(false)}>Agent Types</a>
            <a className="hover:text-cyan-700" href="/about" onClick={() => setMenuOpen(false)}>About</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionHeader({ eyebrow, title, description, action, tone = 'light' }) {
  const isDark = tone === 'dark';
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className={`mb-3 text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
            {eyebrow}
          </div>
        )}
        <h2 className={`text-3xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
        {description && (
          <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function ArticleCard({ article, isNew = false }) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-900/10">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span>{article.read}</span>
          {isNew && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              New
            </span>
          )}
        </div>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-800">{article.category}</span>
      </div>
      <h3 className="mb-3 text-xl font-semibold leading-snug text-slate-950">{article.title}</h3>
      <p className="mb-6 grow leading-relaxed text-slate-600">{article.description}</p>
      <a className="mt-auto font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href={article.slug}>
        Read Article →
      </a>
    </article>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mt-5">
      <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-5 pr-20 text-sm leading-6 text-cyan-100 shadow-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-white/20 hover:text-white"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function ReleaseChangelogSection() {
  const toneClasses = {
    cyan:  { card: 'border-cyan-200 bg-cyan-50/60',   badge: 'border-cyan-200 bg-cyan-100 text-cyan-900',   accent: 'bg-cyan-500' },
    blue:  { card: 'border-blue-200 bg-blue-50/60',   badge: 'border-blue-200 bg-blue-100 text-blue-900',   accent: 'bg-blue-500' },
    rose:  { card: 'border-rose-200 bg-rose-50/60',   badge: 'border-rose-200 bg-rose-100 text-rose-900',   accent: 'bg-rose-500' },
    amber: { card: 'border-amber-200 bg-amber-50/70', badge: 'border-amber-200 bg-amber-100 text-amber-950', accent: 'bg-amber-500' },
  };

  return (
    <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-6 text-white md:px-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">
              {releaseChangelog.eyebrow}
            </div>
            <h2 className="text-3xl font-bold leading-tight">{releaseChangelog.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-300">{releaseChangelog.description}</p>
          </div>

          <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current release</div>
              <p className="mt-1 text-lg font-semibold text-slate-950">{releaseChangelog.currentRelease}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              {releaseChangelog.groups.map((group) => (
                <div key={group.label} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <div className="text-2xl font-bold text-slate-950">{group.items.length}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{group.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
            {releaseChangelog.groups.map((group) => (
              <article key={group.label} className={`relative overflow-hidden rounded-lg border p-6 shadow-sm ${toneClasses[group.tone].card}`}>
                <div className={`absolute left-0 top-0 h-full w-1.5 ${toneClasses[group.tone].accent}`} />
                <div className={`mb-4 inline-block rounded-full border px-3 py-1 text-sm font-semibold ${toneClasses[group.tone].badge}`}>
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

// ── Home page ─────────────────────────────────────────────────────────────────

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const articlesRef = useRef(null);

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const handleCategoryClick = (name) => {
    const next = name === selectedCategory ? null : name;
    setSelectedCategory(next);
    setTimeout(() => articlesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const newArticles = articles.filter((a) => NEW_SLUGS.has(a.slug));

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
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, description: desc },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ]);
  }, []);

  return (
    <main>
      {/* Hero */}
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
              agents for Dynamics 365 Business Central AL extension development.
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
                href="#categories"
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

      {/* What's new bar */}
      {newArticles.length > 0 && (
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">What&apos;s new:</span>
            {newArticles.map((a) => (
              <a
                key={a.slug}
                href={a.slug}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
              >
                {a.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Agent Types */}
      <section className="bg-white px-6 py-16" id="categories">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse by focus"
            title="Coding Agent Types"
            description="Click a category to filter the article list below."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const active = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`rounded-lg border p-6 text-left transition hover:shadow-md hover:shadow-cyan-900/10 ${
                    active
                      ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-900/10'
                      : 'border-slate-200 bg-slate-50 hover:border-cyan-300 hover:bg-white'
                  }`}
                >
                  <div className="mb-4 text-sm font-semibold text-cyan-700">{category.count} guides</div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-950">{category.name}</h3>
                  <p className="leading-relaxed text-slate-600">{category.description}</p>
                  <div className="mt-4 text-sm font-semibold text-cyan-700">
                    {active ? 'Clear filter ×' : 'Filter articles →'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Codex Benefits */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Codex for AL teams"
            title="What Codex does in Business Central development"
            description="Practical guidance on what Codex is useful for, when to use stronger reasoning, and how the model family helps AL projects."
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
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800">{item.model}</span>
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

      {/* Release Changelog */}
      <ReleaseChangelogSection />

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-20" id="articles" ref={articlesRef}>
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
              {selectedCategory ? 'Filtered by category' : 'All articles'}
            </div>
            <h2 className="text-3xl font-bold leading-tight text-slate-950">
              {selectedCategory || 'AI Coding Agents for Business Central'}
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
              {selectedCategory
                ? `Showing ${filteredArticles.length} of ${articles.length} articles.`
                : 'Every article covers an AI assistant or agent workflow for Business Central AL development.'}
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-fit rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Clear filter ×
            </button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} isNew={NEW_SLUGS.has(article.slug)} />
          ))}
        </div>
      </section>

      {/* Decision Guide */}
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
              ['Need team standards enforced?', 'Use a custom ERP agent with your id ranges, naming rules, and release checklist.', '/blog/custom-business-central-coding-agent'],
            ].map(([question, answer, href]) => (
              <a
                key={question}
                className="rounded-lg border border-cyan-300/20 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/10"
                href={href}
              >
                <h3 className="mb-3 text-lg font-semibold">{question}</h3>
                <p className="mb-4 leading-relaxed text-slate-300">{answer}</p>
                <span className="text-sm font-semibold text-cyan-300">Read Guide →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Business Central Coding-Agent Questions"
            description="Short answers for teams deciding how to use AI agents safely in AL extension development."
          />
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-slate-200 bg-slate-50 transition open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-slate-950">
                  {faq.question}
                  <span className="shrink-0 text-slate-400 transition group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Article page ──────────────────────────────────────────────────────────────

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
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      articleSection: article.category,
    });
  }, [article]);

  return (
    <main>
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#e9f7fb_100%)] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
            ← Back to all guides
          </a>
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-800">{article.category}</span>
            <span className="rounded-full bg-white px-3 py-1 text-slate-700 shadow-sm">{article.read}</span>
            {NEW_SLUGS.has(article.slug) && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">New</span>
            )}
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">{article.title}</h1>
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
              {section.bullets && (
                <ul className="mt-4 space-y-3 text-slate-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-7">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.code && <CodeBlock code={section.code} />}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold text-slate-950">Key Takeaways</h2>
          <ul className="space-y-3 text-slate-700">
            {article.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-3 leading-7">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
                <span>{takeaway}</span>
              </li>
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
              <ArticleCard key={related.slug} article={related} isNew={NEW_SLUGS.has(related.slug)} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ── About page ────────────────────────────────────────────────────────────────

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
    setJsonLd({ '@context': 'https://schema.org', '@type': 'AboutPage', name: `About ${SITE_NAME}`, url: `${SITE_URL}/about` });
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
        ← Back to home
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
            custom ERP agents — explaining where each one fits in a real Business Central development workflow.
          </p>
          <ul className="space-y-3 text-slate-700">
            {[
              'What each AI tool does well for Business Central AL work',
              'Which developer and consultant skills still matter alongside AI',
              'Practical prompts and step-by-step workflows to start safely',
              'Release changelogs for Business Central 2026 Wave 1 and beyond',
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
            upgrade safety, and business process integrity.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Contact</h2>
          <p className="leading-relaxed text-slate-700">
            For questions, corrections, or feedback:{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="mailto:leotwc@hotmail.my">
              leotwc@hotmail.my
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

// ── Privacy Policy page ───────────────────────────────────────────────────────

function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = `Privacy Policy | ${SITE_NAME}`;
    const desc = 'Privacy policy for BCDevAI — information about advertising, cookies, and data use on this Business Central AI coding-agent resource site.';
    setMeta('description', desc);
    setMeta('og:title', `Privacy Policy | ${SITE_NAME}`, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', `${SITE_URL}/privacy-policy`, true);
    setCanonical('/privacy-policy');
    setJsonLd({ '@context': 'https://schema.org', '@type': 'WebPage', name: `Privacy Policy | ${SITE_NAME}`, url: `${SITE_URL}/privacy-policy` });
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a className="mb-8 inline-block font-semibold text-cyan-800 hover:text-cyan-950 hover:underline" href="/">
        ← Back to home
      </a>
      <h1 className="mb-3 text-4xl font-bold leading-tight text-slate-950">Privacy Policy</h1>
      <p className="mb-10 text-sm text-slate-500">Effective date: June 1, 2026</p>
      <div className="space-y-10 text-slate-700">
        {[
          ['About this site', 'BCDevAI (bcforge-ai.netlify.app) is an informational website about AI coding agents for Microsoft Dynamics 365 Business Central. This site does not operate user accounts, process form submissions, or store personal data on its own servers.'],
          ['Analytics', 'This site does not use Google Analytics or other user-tracking analytics tools.'],
          ['Third-party links', 'Articles on this site link to Microsoft Learn documentation and other external resources. BCDevAI is not responsible for the privacy practices of those external sites.'],
          ["Children's privacy", 'This site is intended for professional software developers and IT consultants. It does not knowingly collect information from children under the age of 13.'],
          ['Changes to this policy', 'If this privacy policy changes, the updated version will be posted on this page with a revised effective date.'],
        ].map(([heading, body]) => (
          <section key={heading}>
            <h2 className="mb-4 text-2xl font-bold text-slate-950">{heading}</h2>
            <p className="leading-relaxed">{body}</p>
          </section>
        ))}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Advertising</h2>
          <p className="mb-4 leading-relaxed">
            This site displays advertisements served by <strong className="text-slate-900">Google AdSense</strong> (publisher ID: ca-pub-4451848283183398). Google uses cookies — including the DoubleClick cookie — to serve ads based on your prior visits to this and other websites.
          </p>
          <p className="leading-relaxed">
            You can opt out of personalized advertising by visiting{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="https://www.google.com/settings/ads" rel="noreferrer" target="_blank">Google Ads Settings</a>
            {' '}or{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="https://www.aboutads.info/choices/" rel="noreferrer" target="_blank">aboutads.info</a>.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Cookies</h2>
          <p className="leading-relaxed">
            BCDevAI itself does not set cookies. Google AdSense and its partners may set cookies in your browser. See the{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">Google Privacy Policy</a> for details.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Contact</h2>
          <p className="leading-relaxed">
            For privacy questions:{' '}
            <a className="font-medium text-cyan-800 hover:underline" href="mailto:leotwc@hotmail.my">leotwc@hotmail.my</a>
          </p>
        </section>
      </div>
    </main>
  );
}

// ── 404 page ──────────────────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-20">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-cyan-700">404</div>
      <h1 className="mb-5 text-4xl font-bold text-slate-950">This Business Central agent guide is not ready yet.</h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        The guide you opened does not match one of the published article routes. Head back to the homepage to browse the available tutorials.
      </p>
      <a className="w-fit rounded-lg bg-cyan-700 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-900/20 hover:bg-cyan-800" href="/">
        Back to Homepage
      </a>
    </main>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────

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
              <p className="text-lg font-bold text-slate-950">BCDevAI</p>
              <p className="text-sm text-slate-500">Business Central AI coding-agent guides</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              <a className="hover:text-cyan-700" href="/">Home</a>
              <a className="hover:text-cyan-700" href="/#articles">Articles</a>
              <a className="hover:text-cyan-700" href="/about">About</a>
              <a className="hover:text-cyan-700" href="/privacy-policy">Privacy Policy</a>
            </nav>
            <p className="text-sm text-slate-500">Copyright 2026 BCDevAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
