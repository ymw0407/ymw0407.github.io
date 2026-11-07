import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { RiErrorWarningLine, RiImageLine } from 'react-icons/ri';
import type { Language } from '../data/careerData';
import { imageFrame, imagePlaceholder, imageShimmer } from '../styles/image.css';

type LoadingImageProps = ImgHTMLAttributes<HTMLImageElement> & { lang: Language };
type ImageStatus = 'loading' | 'loaded' | 'error';

export function LoadingImage({ src, srcSet, style, lang, ...props }: LoadingImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [result, setResult] = useState({ src, srcSet, status: 'loading' as ImageStatus });
  const status = result.src === src && result.srcSet === srcSet ? result.status : 'loading';

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    let active = true;
    const finish = (status: ImageStatus) => {
      if (active) setResult({ src, srcSet, status });
    };
    const fail = () => finish('error');
    const reveal = async () => {
      if (!image.naturalWidth) return fail();
      try {
        await image.decode();
        finish('loaded');
      } catch {
        fail();
      }
    };
    image.addEventListener('load', reveal);
    image.addEventListener('error', fail);
    // Cached images can finish before the load listener is attached.
    if (image.complete) void reveal();
    return () => {
      active = false;
      image.removeEventListener('load', reveal);
      image.removeEventListener('error', fail);
    };
  }, [src, srcSet]);

  return (
    <span className={imageFrame} data-image-state={status} aria-busy={status === 'loading'}>
      <img
        {...props}
        ref={imageRef}
        src={src}
        srcSet={srcSet}
        decoding={props.decoding ?? 'async'}
        style={{ display: 'block', maxWidth: '100%', ...style, opacity: status === 'loaded' ? 1 : 0 }}
      />
      <span
        className={`${imagePlaceholder} ${status === 'loading' ? imageShimmer : ''}`}
        aria-hidden={status !== 'error'}
        role={status === 'error' ? 'status' : undefined}
      >
        {status === 'error' ? <RiErrorWarningLine size={28} aria-hidden="true" /> : <RiImageLine size={28} aria-hidden="true" />}
        {status === 'error' && <span>{lang === 'ko' ? '이미지를 불러오지 못했습니다.' : 'Unable to load this image.'}</span>}
      </span>
    </span>
  );
}
