interface SeoMetaOptions {
  title: string;
  description: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
  canonicalPath?: string;
  lang?: 'ko' | 'en';
}

const SITE_ORIGIN = 'https://ymw0407.github.io';

function setOrCreateMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function updateDocumentSeo({
  title,
  description,
  type = 'website',
  publishedTime,
  tags = [],
  canonicalPath = '/',
  lang = 'ko',
}: SeoMetaOptions) {
  if (typeof document === 'undefined') return;

  document.title = title;
  document.documentElement.lang = lang;

  setOrCreateMeta('name', 'description', description);
  setOrCreateMeta('name', 'author', 'Minwoo Yun (윤민우)');
  setOrCreateMeta('property', 'og:title', title);
  setOrCreateMeta('property', 'og:description', description);
  setOrCreateMeta('property', 'og:type', type);
  setOrCreateMeta('property', 'og:locale', lang === 'ko' ? 'ko_KR' : 'en_US');
  setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
  setOrCreateMeta('name', 'twitter:title', title);
  setOrCreateMeta('name', 'twitter:description', description);

  if (tags.length > 0) {
    setOrCreateMeta('name', 'keywords', tags.join(', '));
  }

  const fullUrl = `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath}`;
  setOrCreateMeta('property', 'og:url', fullUrl);

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // Inject JSON-LD structured data for SEO & Academic Indexing
  let ldScript = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.id = 'seo-json-ld';
    ldScript.type = 'application/ld+json';
    document.head.appendChild(ldScript);
  }

  const personEntity = {
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/#person`,
    name: 'Minwoo Yun',
    alternateName: ['윤민우', 'sinav', '시나브'],
    jobTitle: 'Systems & Computer Architecture Researcher',
    url: `${SITE_ORIGIN}/`,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Kookmin University (Memory & Storage Laboratory)',
    },
    sameAs: [
      'https://github.com/ymw0407',
      'https://www.linkedin.com/in/ymw0407/',
      'https://www.instagram.com/ymw0407/',
    ],
  };

  const jsonLd =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `${fullUrl}#article`,
              headline: title,
              description,
              datePublished: publishedTime,
              dateModified: publishedTime,
              keywords: tags.join(', '),
              inLanguage: lang === 'ko' ? 'ko-KR' : 'en-US',
              author: personEntity,
              publisher: personEntity,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl,
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Blog Home',
                  item: `${SITE_ORIGIN}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title,
                  item: fullUrl,
                },
              ],
            },
          ],
        }
      : {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              '@id': fullUrl,
              name: title,
              description,
              url: fullUrl,
              mainEntity: personEntity,
            },
            {
              '@type': 'ScholarlyArticle',
              headline:
                'Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open Source Operations',
              alternateName:
                '오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 서비스',
              author: [
                { '@type': 'Person', name: 'Minwoo Yun' },
                { '@type': 'Person', name: 'Minsuk Lee' },
              ],
              datePublished: '2024-10',
              isPartOf: {
                '@type': 'Periodical',
                name: 'KIISE Transactions on Computing Practices',
                volumeNumber: '30',
                issueNumber: '10',
              },
              pageStart: '499',
              pageEnd: '505',
              sameAs: 'https://doi.org/10.5626/KTCP.2024.30.10.499',
            },
          ],
        };

  ldScript.textContent = JSON.stringify(jsonLd);
}
