import { useEffect } from 'react';

export default function BCAIHub() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-4451848283183398';
    document.head.appendChild(meta);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4451848283183398';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(script);
    };
  }, []);

  const articles = [
    {
      title: 'How to Handle Empty Expiration Date in Business Central',
      slug: '/blog/patch-empty-expiration-date',
      read: '6 min read',
      category: 'Inventory',
      description: 'Learn how to automatically patch empty expiration dates using AL development and warehouse validation logic.'
    },
    {
      title: 'Business Central Item Tracking Best Practices',
      slug: '/blog/item-tracking-best-practices',
      read: '8 min read',
      category: 'Warehouse',
      description: 'Best practices for lot tracking, serial numbers, warehouse posting, and inventory management.'
    },
    {
      title: 'AL Code to Validate Lot Expiry',
      slug: '/blog/validate-lot-expiry',
      read: '5 min read',
      category: 'AL Development',
      description: 'Implement lot expiry validation logic in Business Central using AL language.'
    },
    {
      title: 'Business Central API Integration Guide',
      slug: '/blog/business-central-api-guide',
      read: '9 min read',
      category: 'Integration',
      description: 'Step-by-step guide to integrating external APIs using HttpClient and JSON in AL.'
    },
    {
      title: 'Send Email from Business Central using AL',
      slug: '/blog/send-email-al',
      read: '4 min read',
      category: 'Automation',
      description: 'Use AL code to automate email sending with custom templates and attachments.'
    },
    {
      title: 'Business Central Posting Date Validation',
      slug: '/blog/posting-date-validation',
      read: '7 min read',
      category: 'Finance',
      description: 'Prevent invalid posting dates and improve accounting control with AL validation.'
    },
    {
      title: 'How to Build AI Automation in Business Central',
      slug: '/blog/ai-automation-business-central',
      read: '10 min read',
      category: 'AI',
      description: 'Discover practical ways to integrate AI workflows into ERP business processes.'
    },
    {
      title: 'Top ChatGPT Prompts for AL Developers',
      slug: '/blog/chatgpt-prompts-al',
      read: '6 min read',
      category: 'AI Prompt',
      description: 'Boost AL development productivity using reusable AI prompts for Business Central.'
    },
    {
      title: 'Create Table Extensions in AL',
      slug: '/blog/table-extension-al',
      read: '5 min read',
      category: 'AL Development',
      description: 'Learn how to extend Business Central tables with custom fields and validations.'
    },
    {
      title: 'How to Consume REST API in AL',
      slug: '/blog/rest-api-al',
      read: '9 min read',
      category: 'API',
      description: 'Use HttpClient and JsonObject in AL to consume external REST APIs securely.'
    },
    {
      title: 'Business Central Warehouse Automation',
      slug: '/blog/warehouse-automation',
      read: '8 min read',
      category: 'Warehouse',
      description: 'Automate warehouse posting, inventory movement, and scanning processes.'
    },
    {
      title: 'AI Copilot Ideas for Business Central',
      slug: '/blog/copilot-ideas',
      read: '11 min read',
      category: 'AI',
      description: 'Explore real-world Copilot use cases and AI assistants for ERP operations.'
    }
  ];

  const snippets = [
    {
      title: 'Patch Empty Expiration Date',
      category: 'Inventory',
      desc: 'Automatically populate expiration date during warehouse posting.'
    },
    {
      title: 'Validate Posting Date',
      category: 'Finance',
      desc: 'Prevent users from posting outside allowed posting ranges.'
    },
    {
      title: 'JSON API Authentication',
      category: 'Integration',
      desc: 'Authenticate external REST APIs using AL HttpClient.'
    }
  ];

  const keywords = [
    'Business Central AI Automation',
    'AL Development Tutorial',
    'Dynamics 365 API Integration',
    'Business Central Copilot',
    'AI for ERP Systems'
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-black text-white text-sm mb-6">
              Microsoft Dynamics 365 Business Central + AI
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Microsoft Dynamics 365 Business Central Development with AI
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Learn AL development, integrations, automation, AI prompts, and
              Business Central best practices with real-world developer examples.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-2xl bg-black text-white font-medium shadow-lg hover:scale-105 transition-transform">
                Explore Tutorials
              </button>

              <button className="px-6 py-3 rounded-2xl border border-gray-300 bg-white hover:bg-gray-100 transition">
                View AL Snippets
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Trending AI Prompt</h2>

              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                GPT + AL
              </span>
            </div>

            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 text-sm overflow-auto">
              <pre className="whitespace-pre-wrap font-mono">
{`Generate AL code for Business Central that:

- validates expiration date
- blocks expired inventory posting
- supports item tracking
- displays custom error messages
- includes best practices and comments`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SNIPPETS SECTION */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Latest AL Snippets
          </h2>

          <p className="text-gray-600 text-lg">
            Reusable Business Central development examples for real ERP projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {snippets.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:-translate-y-1 transition-transform"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm mb-4">
                {item.category}
              </div>

              <h3 className="text-2xl font-semibold mb-4 leading-snug">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.desc}
              </p>

              <button className="font-medium hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SEO KEYWORDS SECTION */}
      <section className="px-6 py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="bg-black text-white rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">
              High Value ERP Keywords
            </h2>

            <div className="space-y-4 text-gray-300">
              {keywords.map((keyword, index) => (
                <div key={index}>• {keyword}</div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">
              Why This Site Matters
            </h2>

            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>
                Business Central developers are searching daily for practical AL examples,
                integrations, AI automation, and troubleshooting solutions.
              </p>

              <p>
                This platform focuses on real-world ERP development scenarios instead of generic tutorials.
              </p>

              <p>
                Combining AI with Business Central development creates a strong long-term SEO opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Latest SEO Articles
            </h2>

            <p className="text-gray-600 text-lg">
              Business Central tutorials designed for Google search traffic.
            </p>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-black text-white shadow-lg hover:scale-105 transition-transform">
            View All Articles
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:-translate-y-1 transition-transform"
            >
              <div className="text-sm text-gray-500 mb-4">
                {article.read}
              </div>

              <h3 className="text-2xl font-semibold mb-5 leading-snug">
                {article.title}
              </h3>

              <a
                href={article.slug}
                className="font-medium hover:underline"
              >
                Read Article →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">BCDevAI</h3>

            <p className="text-sm text-gray-500">
              Business Central Development with AI
            </p>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 BCDevAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
