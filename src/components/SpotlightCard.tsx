import React, { useRef, useState } from 'react';
import {
  spotlightCard,
  spotlightContent,
  spotlightOverlay,
} from '../styles/components.css';
import { vars } from '../styles/theme.css';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  onClick,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Normalized -0.5 to 0.5 for subtle elastic 3D tilt
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    const maxTiltDeg = onClick ? 2.4 : 1.3;
    setTilt({
      rotateX: -ny * maxTiltDeg,
      rotateY: nx * maxTiltDeg,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const computeTransform = () => {
    if (isPressed) {
      return `perspective(1100px) translateY(1.5px) scale(${
        onClick ? 0.976 : 0.988
      }) rotateX(${tilt.rotateX * 0.5}deg) rotateY(${tilt.rotateY * 0.5}deg)`;
    }
    if (isHovered) {
      return `perspective(1100px) translateY(${
        onClick ? '-4.5px' : '-2.5px'
      }) scale(${onClick ? 1.012 : 1.005}) rotateX(${tilt.rotateX.toFixed(
        2
      )}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`;
    }
    return 'perspective(1100px) translateY(0px) scale(1) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`${spotlightCard} ${className}`}
      style={{
        cursor: onClick ? 'pointer' : undefined,
        transform: computeTransform(),
        transition: isPressed
          ? 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, box-shadow 0.2s ease'
          : isHovered
          ? 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.22s ease, box-shadow 0.25s ease'
          : 'transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
    >
      <div
        className={spotlightOverlay}
        style={{
          opacity: isHovered ? (isPressed ? 1.25 : 1) : 0,
          background: `radial-gradient(${
            isPressed ? '380px' : '500px'
          } circle at ${position.x}px ${position.y}px, ${
            vars.color.spotlightGlow
          }, transparent 48%)`,
        }}
      />
      <div className={spotlightContent}>{children}</div>
    </div>
  );
};
