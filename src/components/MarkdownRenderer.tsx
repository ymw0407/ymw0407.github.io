import React, { useMemo, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import 'katex/dist/katex.min.css';
import {
  RiAlertLine,
  RiCheckLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiFireLine,
  RiInformationLine,
  RiLightbulbFlashLine,
  RiZoomInLine,
} from 'react-icons/ri';
import { Language } from '../data/careerData';
import { HighlightedCodeBlock } from '../utils/syntaxHighlighter';
import { LoadingImage } from './LoadingImage';
import {
  markdownBody,
  mdCalloutBox,
  mdCalloutHeader,
  mdCodeBlockDots,
  mdCodeBlockHeader,
  mdCodeBlockWrap,
  mdCodeCopyBtn,
  mdFigcaption,
  mdFigure,
  mdFigureAlignCenter,
  mdFigureAlignLeft,
  mdFigureAlignRight,
  mdFigureFloatLeft,
  mdFigureFloatRight,
  mdImageBorderless,
  mdImageElement,
  mdImageFrame,
  mdTableWrap,
} from '../styles/blog.css';
import { modalBackdrop, modalCard } from '../styles/components.css';
import { iconControlBtn } from '../styles/layout.css';
import { vars } from '../styles/theme.css';

export type ImagePlacement =
  | 'center'
  | 'left'
  | 'right'
  | 'float-left'
  | 'float-right';

export interface ParsedImageSpec {
  cleanSrc: string;
  caption: string;
  width: string;
  maxHeight?: string;
  placement: ImagePlacement;
  borderless: boolean;
}

const SIZE_PRESETS: Record<string, string> = {
  xs: '30%',
  sm: '45%',
   small: '45%',
  md: '68%',
  medium: '68%',
  lg: '85%',
  large: '85%',
  xl: '95%',
  full: '100%',
};

/**
 * Parses flexible Markdown image directives from:
 * 1) Alt pipe syntax: ![캡션 문구 | 65% | center](/path/img.jpg)
 *    - Size tokens: 60%, 420px, 28rem, xs, sm, md, lg, full, h=320px
 *    - Position tokens: left, center, right, float-left (or wrap-left), float-right (or wrap-right)
 *    - Style tokens: noborder, borderless, clean
 * 2) URL hash/query params: /path/img.jpg#w=60%&align=left or ?w=400px&pos=float-right
 * 3) HTML width / align attributes
 */
export function parseMarkdownImageSpec(
  rawSrc = '',
  rawAlt = '',
  rawTitle?: string,
  htmlWidth?: string | number,
  htmlAlign?: string
): ParsedImageSpec {
  let cleanSrc = rawSrc;
  let width = htmlWidth
    ? typeof htmlWidth === 'number' || /^\d+$/.test(String(htmlWidth))
      ? `${htmlWidth}px`
      : String(htmlWidth)
    : '100%';
  let maxHeight: string | undefined;
  let placement: ImagePlacement = 'center';
  let borderless = false;

  if (htmlAlign) {
    const a = htmlAlign.toLowerCase();
    if (a === 'left') placement = 'left';
    else if (a === 'right') placement = 'right';
    else if (a === 'float-left') placement = 'float-left';
    else if (a === 'float-right') placement = 'float-right';
  }

  // 1. Parse URL hash or query directives if present (e.g. #w=60%&align=left)
  const hashIdx = rawSrc.indexOf('#');
  if (hashIdx !== -1) {
    const hashStr = rawSrc.slice(hashIdx + 1);
    if (
      hashStr.includes('=') ||
      /^(xs|sm|md|lg|full|left|right|center|float-left|float-right)$/i.test(hashStr)
    ) {
      cleanSrc = rawSrc.slice(0, hashIdx);
      const params = new URLSearchParams(hashStr.replace(/;/g, '&'));
      const wParam = params.get('w') || params.get('width') || params.get('size');
      if (wParam) {
        const lowerW = wParam.toLowerCase();
        width = SIZE_PRESETS[lowerW] || (/^\d+$/.test(wParam) ? `${wParam}px` : wParam);
      }
      const hParam = params.get('h') || params.get('height') || params.get('maxHeight');
      if (hParam) {
        maxHeight = /^\d+$/.test(hParam) ? `${hParam}px` : hParam;
      }
      const posParam = (
        params.get('align') ||
        params.get('pos') ||
        params.get('position') ||
        ''
      ).toLowerCase();
      if (
        posParam === 'left' ||
        posParam === 'center' ||
        posParam === 'right' ||
        posParam === 'float-left' ||
        posParam === 'float-right'
      ) {
        placement = posParam;
      }
      if (params.get('border') === 'none' || params.has('noborder')) {
        borderless = true;
      }
    }
  }

  // 2. Parse pipe-separated tokens inside alt text: ![Caption | 65% | left | noborder]
  const segments = rawAlt.split('|').map((s) => s.trim());
  const captionParts: string[] = [];

  segments.forEach((seg, index) => {
    if (index === 0 && segments.length > 1) {
      // First segment is always the caption (can be empty if user wrote ![| 60%])
      if (seg) captionParts.push(seg);
      return;
    }

    if (segments.length === 1) {
      captionParts.push(seg);
      return;
    }

    const lower = seg.toLowerCase();

    // Check size preset
    if (SIZE_PRESETS[lower]) {
      width = SIZE_PRESETS[lower];
      return;
    }

    // Check explicit width (e.g. 65%, 420px, 28rem, 50vw, or w=65%)
    const wMatch = lower.match(/^(?:w=|width=)?(\d+(?:\.\d+)?(?:%|px|rem|em|vw)?)$/);
    if (wMatch) {
      const val = wMatch[1];
      width = /^\d+(\.\d+)?$/.test(val) ? `${val}px` : val;
      return;
    }

    // Check explicit max-height (e.g. h=320px or height=300px)
    const hMatch = lower.match(/^(?:h=|height=|max-height=)(\d+(?:\.\d+)?(?:px|rem|vh)?)$/);
    if (hMatch) {
      const val = hMatch[1];
      maxHeight = /^\d+(\.\d+)?$/.test(val) ? `${val}px` : val;
      return;
    }

    // Check alignment / float tokens
    if (lower === 'left' || lower === 'align-left') {
      placement = 'left';
      return;
    }
    if (lower === 'center' || lower === 'align-center' || lower === 'middle') {
      placement = 'center';
      return;
    }
    if (lower === 'right' || lower === 'align-right') {
      placement = 'right';
      return;
    }
    if (lower === 'float-left' || lower === 'wrap-left' || lower === 'pull-left') {
      placement = 'float-left';
      if (width === '100%') width = '45%';
      return;
    }
    if (lower === 'float-right' || lower === 'wrap-right' || lower === 'pull-right') {
      placement = 'float-right';
      if (width === '100%') width = '45%';
      return;
    }

    // Check borderless token
    if (lower === 'noborder' || lower === 'borderless' || lower === 'clean') {
      borderless = true;
      return;
    }

    captionParts.push(seg);
  });

  const finalCaption = rawTitle || captionParts.join(' · ').trim();

  return {
    cleanSrc,
    caption: finalCaption,
    width,
    maxHeight,
    placement,
    borderless,
  };
}

interface CodeBlockProps {
  language: string;
  codeText: string;
  lang: Language;
}

const CodeBlockWithHeader: React.FC<CodeBlockProps> = ({
  language,
  codeText,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText.replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={mdCodeBlockWrap}>
      <div className={mdCodeBlockHeader}>
        <div className={mdCodeBlockDots}>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '999px',
              backgroundColor: '#f87171',
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '999px',
              backgroundColor: '#fbbf24',
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '999px',
              backgroundColor: '#34d399',
              opacity: 0.85,
            }}
          />
          <span
            style={{
              marginLeft: '0.45rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#cbd5e1',
            }}
          >
            {language || 'code'}
          </span>
        </div>

        <button type="button" onClick={handleCopy} className={mdCodeCopyBtn}>
          {copied ? <RiCheckLine size={13} color="#34d399" /> : <RiFileCopyLine size={13} />}
          {copied
            ? lang === 'ko'
              ? '복사됨'
              : 'Copied'
            : lang === 'ko'
            ? '코드 복사'
            : 'Copy'}
        </button>
      </div>
      <pre>
        <HighlightedCodeBlock code={codeText} language={language} />
      </pre>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
  lang?: Language;
}

const placementClassMap: Record<ImagePlacement, string> = {
  center: mdFigureAlignCenter,
  left: mdFigureAlignLeft,
  right: mdFigureAlignRight,
  'float-left': mdFigureFloatLeft,
  'float-right': mdFigureFloatRight,
};

export const MarkdownRenderer = React.memo(function MarkdownRenderer({
  content,
  lang = 'ko',
}: MarkdownRendererProps) {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  // Stable renderer types preserve image loading state across parent and lightbox updates.
  const components = useMemo<Components>(() => ({
    // Unwrap <p> when it contains images/figures so <figure> is never nested inside <p>,
    // and automatically create a side-by-side row if multiple images are placed on one line!
    p: ({ children }) => {
      const childArray = React.Children.toArray(children);
      const nonWhitespace = childArray.filter(
        (c) => !(typeof c === 'string' && c.trim() === '')
      );

      const hasImageElement = nonWhitespace.some(
        (c) =>
          React.isValidElement(c) &&
          ((c.type as { displayName?: string })?.displayName === 'MdImageFigure' ||
            c.type === 'img' ||
            c.type === 'figure')
      );

      if (hasImageElement) {
        const allImages = nonWhitespace.every(
          (c) =>
            React.isValidElement(c) &&
            ((c.type as { displayName?: string })?.displayName === 'MdImageFigure' ||
              c.type === 'img' ||
              c.type === 'figure')
        );

        // If user put 2+ images in the same paragraph, lay them out side by side!
        if (allImages && nonWhitespace.length > 1) {
          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(
                  nonWhitespace.length,
                  3
                )}, minmax(0, 1fr))`,
                gap: '1rem',
                margin: '1.5rem 0',
                alignItems: 'start',
                clear: 'both',
              }}
            >
              {nonWhitespace}
            </div>
          );
        }

        return <>{children}</>;
      }

      return <p>{children}</p>;
    },

    img: ({ src, alt, title, width, ...rest }) => {
      const alignAttr = (rest as { align?: string }).align;
      const spec = parseMarkdownImageSpec(
        src || '',
        alt || '',
        title,
        width,
        alignAttr
      );

      return (
        <figure
          className={`${mdFigure} ${placementClassMap[spec.placement]}`}
          style={{ width: spec.width }}
        >
          <div
            className={`${mdImageFrame} ${spec.borderless ? mdImageBorderless : ''}`}
            onClick={() =>
              setLightboxImage({
                src: spec.cleanSrc,
                caption: spec.caption,
              })
            }
            title={
              lang === 'ko'
                ? '클릭하여 원본 크기로 확대 보기'
                : 'Click to zoom image'
            }
          >
            <LoadingImage
              lang={lang}
              src={spec.cleanSrc}
              alt={spec.caption || 'Blog Image'}
              loading="lazy"
              className={mdImageElement}
              style={
                spec.maxHeight
                  ? { maxHeight: spec.maxHeight, objectFit: 'contain' }
                  : undefined
              }
            />
            <span
              style={{
                position: 'absolute',
                right: '0.65rem',
                bottom: '0.65rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(15, 23, 42, 0.68)',
                color: '#f8fafc',
                fontSize: '0.7rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backdropFilter: 'blur(6px)',
                pointerEvents: 'none',
              }}
            >
              <RiZoomInLine size={12} />
              Zoom
            </span>
          </div>
          {spec.caption && (
            <figcaption className={mdFigcaption}>{spec.caption}</figcaption>
          )}
        </figure>
      );
    },

    pre: ({ children }) => {
      const child = React.Children.toArray(children)[0];
      if (React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
        const className = child.props.className || '';
        const match = /language-([\w-]+)/.exec(className);
        const language = match ? match[1] : 'text';
        const codeText = String(child.props.children || '');
        return (
          <CodeBlockWithHeader
            language={language}
            codeText={codeText}
            lang={lang}
          />
        );
      }
      return <pre>{children}</pre>;
    },

    blockquote: ({ children }) => {
      // Detect GitHub-style Callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
      const childArray = React.Children.toArray(children);
      const firstElem = childArray.find((c) => React.isValidElement(c)) as
        | React.ReactElement<{ children?: React.ReactNode }>
        | undefined;

      if (firstElem && firstElem.props && firstElem.props.children) {
        const innerNodes = React.Children.toArray(firstElem.props.children);
        const firstText = typeof innerNodes[0] === 'string' ? innerNodes[0] : '';
        const calloutMatch = firstText.match(
          /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/i
        );

        if (calloutMatch) {
          const kind = calloutMatch[1].toUpperCase();
          const remainderFirstLine = calloutMatch[2];

          const calloutMeta: Record<
            string,
            { label: string; color: string; icon: React.ReactNode }
          > = {
            NOTE: {
              label: 'Note',
              color: '#2563eb',
              icon: <RiInformationLine size={17} />,
            },
            TIP: {
              label: 'Tip',
              color: '#059669',
              icon: <RiLightbulbFlashLine size={17} />,
            },
            IMPORTANT: {
              label: 'Important',
              color: '#7c3aed',
              icon: <RiFireLine size={17} />,
            },
            WARNING: {
              label: 'Warning',
              color: '#d97706',
              icon: <RiAlertLine size={17} />,
            },
            CAUTION: {
              label: 'Caution',
              color: '#dc2626',
              icon: <RiErrorWarningLine size={17} />,
            },
          };

          const meta = calloutMeta[kind] || calloutMeta.NOTE;
          const updatedFirstParagraph = React.cloneElement(firstElem, {
            children: [remainderFirstLine, ...innerNodes.slice(1)],
          });

          const restChildren = childArray.map((c) =>
            c === firstElem ? updatedFirstParagraph : c
          );

          return (
            <div
              className={mdCalloutBox}
              style={{ borderLeftColor: meta.color }}
            >
              <div className={mdCalloutHeader} style={{ color: meta.color }}>
                {meta.icon}
                <span>{meta.label}</span>
              </div>
              <div>{restChildren}</div>
            </div>
          );
        }
      }

      return <blockquote>{children}</blockquote>;
    },

    table: ({ children }) => (
      <div className={mdTableWrap}>
        <table>{children}</table>
      </div>
    ),
  }), [lang]);

  // Tag custom img renderer so `p` can detect it cleanly
  if (components.img && typeof components.img === 'function') {
    (components.img as { displayName?: string }).displayName = 'MdImageFigure';
  }

  return (
    <>
      <div className={markdownBody}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Lightbox Modal when user clicks an image in Markdown */}
      {lightboxImage && (
        <div
          className={modalBackdrop}
          onClick={() => setLightboxImage(null)}
        >
          <div
            className={modalCard}
            style={{
              maxWidth: '960px',
              padding: '1.1rem',
              backgroundColor: vars.color.bgElevated,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: vars.color.textPrimary,
                }}
              >
                {lightboxImage.caption ||
                  (lang === 'ko' ? '이미지 원본 보기' : 'Image Preview')}
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className={iconControlBtn}
              >
                <RiCloseLine size={16} />
              </button>
            </div>
            <div
              style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: '78vh',
              }}
            >
              <LoadingImage
                lang={lang}
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});
