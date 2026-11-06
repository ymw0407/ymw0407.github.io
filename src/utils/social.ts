import catalog from '../data/socialPages.json' with { type: 'json' };

export const SITE_ORIGIN = catalog.origin;
export const socialPages = catalog.pages;
export type PagePath = keyof typeof socialPages;

export function pageMetadata(path: PagePath, lang: 'ko' | 'en') {
  const page = socialPages[path];
  return {
    title: `${page[lang]} | ${lang === 'ko' ? '윤민우' : 'Minwoo Yun'} · sinav`,
    description: lang === 'ko' ? page.description : page.descriptionEn,
  };
}

export function shareImagePath(path: string) {
  const name = path === '/' ? '/home' : path === '/404.html' ? '/404' : path;
  return `/og${name}.png`;
}

export function absoluteSiteUrl(path: string) {
  return SITE_ORIGIN + path.split('/').map(encodeURIComponent).join('/');
}

interface ShareOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  lang?: 'ko' | 'en';
}

export function socialTags({ title, description, canonicalPath = '/', type = 'website', lang = 'ko' }: ShareOptions) {
  if (Object.prototype.hasOwnProperty.call(socialPages, canonicalPath)) {
    ({ title, description } = pageMetadata(canonicalPath as PagePath, lang));
  }
  const image = absoluteSiteUrl(shareImagePath(canonicalPath));
  return {
    'og:site_name': '윤민우 · sinav',
    'og:type': type,
    'og:url': absoluteSiteUrl(canonicalPath),
    'og:locale': lang === 'ko' ? 'ko_KR' : 'en_US',
    'og:locale:alternate': lang === 'ko' ? 'en_US' : 'ko_KR',
    'og:title': title, 'og:description': description,
    'og:image': image, 'og:image:type': 'image/png',
    'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': title,
    'twitter:card': 'summary_large_image', 'twitter:title': title,
    'twitter:description': description, 'twitter:image': image, 'twitter:image:alt': title,
  };
}
