/**
 * Dynamically generates a valid sitemap.xml string based on the given base URL.
 * Ensures all main sections, bilingual pages, and food categories are indexed by search engines.
 */

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  alternates?: { lang: string; href: string }[];
}

export function generateSitemapXml(rawBaseUrl?: string): string {
  // Normalize base URL without trailing slash
  let baseUrl = (rawBaseUrl || '').trim();
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }
  if (!baseUrl) {
    baseUrl = 'https://ais-pre-nofix7be63aog2qyhaahpo-728128489142.asia-east1.run.app';
  }

  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapUrlEntry[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
      alternates: [
        { lang: 'bn', href: `${baseUrl}/?lang=bn` },
        { lang: 'en', href: `${baseUrl}/?lang=en` },
      ],
    },
    {
      loc: `${baseUrl}/#menu`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
      alternates: [
        { lang: 'bn', href: `${baseUrl}/?lang=bn#menu` },
        { lang: 'en', href: `${baseUrl}/?lang=en#menu` },
      ],
    },
    {
      loc: `${baseUrl}/#menu?category=fuchka`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/#menu?category=doi`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.85',
    },
    {
      loc: `${baseUrl}/#menu?category=spicy`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.85',
    },
    {
      loc: `${baseUrl}/#menu?category=chotpoti`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/#menu?category=drinks`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/#hygiene`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/#about`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/#contact`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/#privacy`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.5',
    },
    {
      loc: `${baseUrl}/#terms`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.5',
    },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    if (entry.alternates && entry.alternates.length > 0) {
      for (const alt of entry.alternates) {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}" />\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
