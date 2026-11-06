export type BlogCategoryId =
  | 'tldr'
  | 'research'
  | 'engineering'
  | 'photography'
  | 'coffee'
  | 'cocktail'
  | 'essay';

export interface BlogCategoryDef {
  id: BlogCategoryId;
  label: { ko: string; en: string };
  shortLabel: { ko: string; en: string };
  desc: { ko: string; en: string };
  frontmatterValue: string;
}

export const BLOG_CATEGORIES: BlogCategoryDef[] = [
  {
    id: 'tldr',
    label: { ko: 'TL;DR · 핵심 요약', en: 'TL;DR · Quick Notes' },
    shortLabel: { ko: 'TL;DR', en: 'TL;DR' },
    desc: {
      ko: '논문·기술·일상의 핵심만 짧고 빠르게 기록하는 요약 노트',
      en: 'Bite-sized takeaways and quick technical/daily summaries',
    },
    frontmatterValue: 'TL;DR',
  },
  {
    id: 'research',
    label: { ko: '연구 · 시스템 (Research)', en: 'Research & Systems' },
    shortLabel: { ko: '연구', en: 'Research' },
    desc: {
      ko: 'OS 커널 I/O(io_uring), 플래시 스토리지(NAND/NVMe), 컴퓨터 아키텍처 및 논문 분석',
      en: 'Linux kernel I/O, flash storage (NAND/NVMe), architecture, and paper deep dives',
    },
    frontmatterValue: 'Research',
  },
  {
    id: 'engineering',
    label: { ko: '개발 · 오픈소스 (Dev)', en: 'Engineering & OSS' },
    shortLabel: { ko: '개발', en: 'Engineering' },
    desc: {
      ko: '백엔드 설계, 프로토콜(gRPC/MCP), 오픈소스 개발 및 트러블슈팅 기록',
      en: 'Software architecture, backend systems, MCP/gRPC, and open-source engineering',
    },
    frontmatterValue: 'Engineering',
  },
  {
    id: 'photography',
    label: { ko: '사진 · 카메라 (Photo)', en: 'Photography' },
    shortLabel: { ko: '사진', en: 'Photo' },
    desc: {
      ko: '출사 기록, EXIF·RAW 보정 워크플로우 및 시선이 머문 순간들',
      en: 'Field shoots, EXIF/RAW editing workflows, and visual stories',
    },
    frontmatterValue: 'Photography',
  },
  {
    id: 'coffee',
    label: { ko: '커피 · 브루잉 (Coffee)', en: 'Coffee & Brewing' },
    shortLabel: { ko: '커피', en: 'Coffee' },
    desc: {
      ko: '원두 테이스팅 노트, 핸드드립·에스프레소 추출 레시피와 카페 기록',
      en: 'Single-origin tasting notes, pour-over/espresso recipes, and roasteries',
    },
    frontmatterValue: 'Coffee',
  },
  {
    id: 'cocktail',
    label: { ko: '칵테일 · 바텐딩 (Cocktail)', en: 'Cocktails & Spirits' },
    shortLabel: { ko: '칵테일', en: 'Cocktail' },
    desc: {
      ko: '클래식·시그니처 칵테일 레시피, 기주 테이스팅과 홈바 실험 노트',
      en: 'Classic & signature cocktail recipes, spirit tasting notes, and mixology',
    },
    frontmatterValue: 'Cocktail',
  },
  {
    id: 'essay',
    label: { ko: '단상 · 회고 (Essay)', en: 'Essays & Reflections' },
    shortLabel: { ko: '단상', en: 'Essay' },
    desc: {
      ko: '연구자·개발자로서의 회고와 일상 속 생각 정리',
      en: 'Personal reflections, retrospectives, and essays',
    },
    frontmatterValue: 'Essay',
  },
];

export interface BlogPostMeta {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  category: string;
  categoryId: BlogCategoryId;
  tags: string[];
  summary: string;
  summaryEn?: string;
  featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const rawPosts = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  attributes: Record<string, string | string[] | boolean>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { attributes: {}, body: raw };
  }

  const yamlBlock = match[1];
  const body = match[2].trim();
  const attributes: Record<string, string | string[] | boolean> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      const items = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      attributes[key] = items;
    } else if (val === 'true' || val === 'false') {
      attributes[key] = val === 'true';
    } else {
      val = val.replace(/^['"]|['"]$/g, '');
      attributes[key] = val;
    }
  }

  return { attributes, body };
}

function resolveCategoryId(raw: string): BlogCategoryId {
  const normalized = raw.trim().toLowerCase();
  if (normalized === 'tl;dr' || normalized === 'tldr' || normalized.includes('요약')) {
    return 'tldr';
  }
  if (
    normalized.includes('research') ||
    normalized.includes('storage') ||
    normalized.includes('system') ||
    normalized.includes('architecture') ||
    normalized.includes('연구')
  ) {
    return 'research';
  }
  if (
    normalized.includes('engineering') ||
    normalized.includes('open source') ||
    normalized.includes('dev') ||
    normalized.includes('개발')
  ) {
    return 'engineering';
  }
  if (normalized.includes('photo') || normalized.includes('사진') || normalized.includes('camera')) {
    return 'photography';
  }
  if (normalized.includes('coffee') || normalized.includes('커피') || normalized.includes('brew')) {
    return 'coffee';
  }
  if (
    normalized.includes('cocktail') ||
    normalized.includes('칵테일') ||
    normalized.includes('bar') ||
    normalized.includes('spirit')
  ) {
    return 'cocktail';
  }
  if (normalized.includes('essay') || normalized.includes('단상') || normalized.includes('회고')) {
    return 'essay';
  }
  return 'research';
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(rawPosts).map(([filepath, rawContent]) => {
    const filename = filepath.split('/').pop() || 'post.md';
    const slug = filename.replace(/\.md$/, '');
    const { attributes, body } = parseFrontmatter(rawContent);

    const category = String(attributes.category || 'Research');
    const categoryId = resolveCategoryId(category);

    return {
      slug,
      title: String(attributes.title || slug),
      titleEn: attributes.titleEn ? String(attributes.titleEn) : undefined,
      date: String(attributes.date || '2026-11-01'),
      category,
      categoryId,
      tags: Array.isArray(attributes.tags) ? attributes.tags : [],
      summary: String(attributes.summary || ''),
      summaryEn: attributes.summaryEn ? String(attributes.summaryEn) : undefined,
      featured: Boolean(attributes.featured),
      content: body,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}
