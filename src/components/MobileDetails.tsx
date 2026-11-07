import { useEffect, useId, useState, type ReactNode } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { mobileDetails, mobileDetailsButton, mobileDetailsContent } from '../styles/mobile.css';

export function MobileDetails({ label, children, anchor, enabled = true }: {
  label: string;
  children: ReactNode;
  anchor?: string;
  enabled?: boolean;
}) {
  const contentId = useId();
  const [expanded, setExpanded] = useState(() => Boolean(anchor && window.location.hash === `#${anchor}`));

  useEffect(() => {
    if (!anchor || !enabled) return;
    let frame = 0;
    const revealAnchor = () => {
      cancelAnimationFrame(frame);
      if (window.location.hash !== `#${anchor}`) return;
      setExpanded(true);
      if (window.matchMedia('(max-width: 640px)').matches) {
        frame = requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: 'start' }));
      }
    };
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', revealAnchor);
    };
  }, [anchor, enabled]);

  if (!enabled) return <>{children}</>;
  return (
    <div className={mobileDetails} data-expanded={expanded}>
      <button className={mobileDetailsButton} type="button" aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(value => !value)}>
        {label}<RiArrowDownSLine size={20} aria-hidden="true" />
      </button>
      <div id={contentId} className={mobileDetailsContent}>{children}</div>
    </div>
  );
}
