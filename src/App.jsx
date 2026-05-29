export default function BCAIHub() {
  const snippets = [
    {
      title: 'Validate Expiration Date in Item Tracking',
      category: 'AL Snippet',
      desc: 'Simple AL validation logic for expiration date handling.'
    },
    {
      title: 'Generate JSON from Sales Order',
      category: 'Integration',
      desc: 'Convert Business Central data into API-ready JSON.'
    },
    {
      title: 'AI Prompt: Create Table Extension',
      category: 'AI Prompt',
      desc: 'Reusable ChatGPT prompt for faster AL development.'
    }
  ];

  const roadmap = [
    'Publish 30 AL snippets',
    'Create 10 AI prompt articles',
    'Upload 1 YouTube Short daily',
    'Apply for Google AdSense',
    'Launch free BC developer tools'
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-black text-white text-sm mb-6">
              Business Central + AI Developer Hub
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Learn Business Central Development Faster with AI
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              AL snippets, AI prompts, tutorials, integrations, and automation guides
              built for Microsoft Dynamics 365 Business Central developers.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-2xl bg-black text-white font-medium shadow-lg hover:scale-105 transition">
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
              <pre className="whitespace-pre-wrap">
{`Generate AL code for Business Central that:

- validates expiration date
- prevents posting expired items
- displays custom error message
- supports warehouse tracking

Include best practices and comments.`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT CARDS */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Content</h2>
            <p className="text-gray-600">
              SEO-focused Business Central developer resources.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {snippets.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 transition"
            >
              <div className="text-sm mb-4 inline-block px-3 py-1 rounded-full bg-gray-100">
                {item.category}
              </div>

              <h3 className="text-xl font-semibold mb-3 leading-snug">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-5">
                {item.desc}
              </p>

              <button className="font-medium hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section className="px-6 py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Monetization Roadmap
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {roadmap.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-5 text-center shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>

                <p className="text-sm font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-black text-white rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">
              High CPC Business Central Keywords
            </h2>

            <div className="space-y-4 text-gray-300">
              <div>• Business Central AI Automation</div>
              <div>• AL Development Tutorial</div>
              <div>• Dynamics 365 API Integration</div>
              <div>• Business Central Copilot</div>
              <div>• AI for ERP Systems</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-6">
              Next Execution Steps
            </h2>

            <ol className="space-y-5 text-gray-700">
              <li>
                <span className="font-semibold">1.</span> Deploy this site to Netlify
              </li>
              <li>
                <span className="font-semibold">2.</span> Add 5 AL snippet articles daily
              </li>
              <li>
                <span className="font-semibold">3.</span> Publish YouTube Shorts from snippets
              </li>
              <li>
                <span className="font-semibold">4.</span> Add Google AdSense after 20–30 posts
              </li>
              <li>
                <span className="font-semibold">5.</span> Launch free developer tools
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">BC AI Hub</h3>
            <p className="text-sm text-gray-500">
              Business Central Development with AI
            </p>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 BC AI Hub. Built for developers.
          </div>
        </div>
      </footer>
    </div>
  );
}
