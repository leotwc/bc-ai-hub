/**
 * Prerender: runs after `vite build` and writes a per-route index.html into
 * dist/ so that search engines see page-specific <title> and <meta> tags in
 * the static HTML, without needing JavaScript to execute first.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const SITE_URL = 'https://bcforge-ai.netlify.app';
const SITE_NAME = 'BCDevAI';

const { articles } = await import('../src/content.js');

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderPage(html, { title, description, url }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const u = escapeAttr(url);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${d}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${t}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${d}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${u}" />`
    );
}

const pages = [
  {
    path: '/about',
    title: `About | ${SITE_NAME}`,
    description:
      'Learn about BCDevAI — a practical reference for Business Central AL developers exploring AI coding agents, tools, and workflows for Dynamics 365 extension development.',
    url: `${SITE_URL}/about`,
  },
  {
    path: '/privacy-policy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'Privacy policy for BCDevAI. Understand how visitor data is handled on the Business Central AI coding agents reference site.',
    url: `${SITE_URL}/privacy-policy`,
  },
  ...articles.map((a) => ({
    path: a.slug,
    title: `${a.title} | ${SITE_NAME}`,
    description: a.description,
    url: `${SITE_URL}${a.slug}`,
  })),
];

let count = 0;
for (const page of pages) {
  const dir = join(DIST, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderPage(template, page));
  count++;
  console.log(`  ${page.path}`);
}

console.log(`\n✓ Prerendered ${count} pages with page-specific meta tags.`);
