import React, { useEffect, useRef } from 'react';
import { backgroundCanvas, backgroundCanvasWrap } from '../styles/layout.css';

interface InteractiveBackgroundProps {
  theme: 'dark' | 'light';
  intensity?: 'normal' | 'subtle';
}

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  phase: number;
  layer: number;
}

interface PulsePacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  theme,
  intensity = 'normal',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      targetX: width * 0.65,
      targetY: height * 0.3,
      x: width * 0.65,
      y: height * 0.3,
      vx: 0,
      vy: 0,
      active: false,
      clickRipple: 0,
      clickX: 0,
      clickY: 0,
    };

    const count =
      intensity === 'subtle'
        ? Math.min(34, Math.floor((width * height) / 36000))
        : Math.min(72, Math.floor((width * height) / 19500));

    const nodes: NodeParticle[] = Array.from({ length: count }, (_, i) => {
      const layer = i % 3;
      const speedScale = layer === 0 ? 0.18 : layer === 1 ? 0.3 : 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale,
        baseRadius: layer === 0 ? 1.3 : layer === 1 ? 1.85 : 2.4,
        phase: Math.random() * Math.PI * 2,
        layer,
      };
    });

    const pulses: PulsePacket[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.clickX = e.clientX;
      mouse.clickY = e.clientY;
      mouse.clickRipple = 1;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.012;

      const prevX = mouse.x;
      const prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.09;
      mouse.y += (mouse.targetY - mouse.y) * 0.09;
      mouse.vx = mouse.x - prevX;
      mouse.vy = mouse.y - prevY;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';

      // 1. Soft pastel interactive aura following the cursor on white background
      const spotlightRadius = Math.max(width, height) * 0.46;
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        spotlightRadius
      );

      if (isDark) {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.11)');
        gradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.05)');
        gradient.addColorStop(1, 'rgba(9, 13, 22, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.09)');
        gradient.addColorStop(0.38, 'rgba(99, 102, 241, 0.045)');
        gradient.addColorStop(0.7, 'rgba(14, 165, 233, 0.02)');
        gradient.addColorStop(1, 'rgba(251, 252, 253, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Counter-drifting soft indigo/sky ambient orb
      const counterX = width * 0.5 + (width * 0.5 - mouse.x) * 0.35;
      const counterY = height * 0.5 + (height * 0.5 - mouse.y) * 0.35;
      const secondaryGradient = ctx.createRadialGradient(
        counterX,
        counterY,
        20,
        counterX,
        counterY,
        spotlightRadius * 0.8
      );
      if (isDark) {
        secondaryGradient.addColorStop(0, 'rgba(139, 92, 246, 0.055)');
        secondaryGradient.addColorStop(1, 'rgba(9, 13, 22, 0)');
      } else {
        secondaryGradient.addColorStop(0, 'rgba(99, 102, 241, 0.055)');
        secondaryGradient.addColorStop(1, 'rgba(251, 252, 253, 0)');
      }
      ctx.fillStyle = secondaryGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Crisp architectural dot-grid illuminated around cursor
      const gridSpacing = 40;
      const parallaxOffsetX = ((mouse.x - width / 2) * -0.025) % gridSpacing;
      const parallaxOffsetY = ((mouse.y - height / 2) * -0.025) % gridSpacing;

      const gridRadius = 340;
      const startCol = Math.max(0, Math.floor((mouse.x - gridRadius) / gridSpacing));
      const endCol = Math.min(
        Math.ceil(width / gridSpacing),
        Math.ceil((mouse.x + gridRadius) / gridSpacing)
      );
      const startRow = Math.max(0, Math.floor((mouse.y - gridRadius) / gridSpacing));
      const endRow = Math.min(
        Math.ceil(height / gridSpacing),
        Math.ceil((mouse.y + gridRadius) / gridSpacing)
      );

      for (let c = startCol; c <= endCol; c++) {
        for (let r = startRow; r <= endRow; r++) {
          const gx = c * gridSpacing + parallaxOffsetX;
          const gy = r * gridSpacing + parallaxOffsetY;
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < gridRadius) {
            const alpha = (1 - dist / gridRadius) * (isDark ? 0.24 : 0.22);
            ctx.fillStyle = isDark
              ? `rgba(148, 163, 184, ${alpha.toFixed(3)})`
              : `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
            ctx.fillRect(gx - 0.8, gy - 0.8, 1.6, 1.6);
          }
        }
      }

      // 3. Update & render interactive system topology nodes
      const parallaxCenterX = (mouse.x - width * 0.5) * 0.045;
      const parallaxCenterY = (mouse.y - height * 0.5) * 0.045;

      const renderedPositions: { x: number; y: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;

        const layerFactor = (node.layer + 1) * 0.58;
        let rx = node.x - parallaxCenterX * layerFactor;
        let ry = node.y - parallaxCenterY * layerFactor;

        const dx = rx - mouse.x;
        const dy = ry - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactRadius = 230;

        if (dist < interactRadius && dist > 1) {
          const force = (1 - dist / interactRadius) * 16 * (node.layer === 2 ? 1.25 : 0.85);
          rx += (dx / dist) * force;
          ry += (dy / dist) * force;
        }

        renderedPositions.push({ x: rx, y: ry });
      }

      // 4. Connect nearby nodes & spawn occasional data pulses
      const maxLinkDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        const p1 = renderedPositions[i];

        const cdx = p1.x - mouse.x;
        const cdy = p1.y - mouse.y;
        const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cDist < 195) {
          const cAlpha = (1 - cDist / 195) * (isDark ? 0.34 : 0.28);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(59, 130, 246, ${cAlpha.toFixed(3)})`
            : `rgba(37, 99, 235, ${cAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = renderedPositions[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxLinkDist * maxLinkDist) {
            const dist = Math.sqrt(distSq);
            const midX = (p1.x + p2.x) * 0.5;
            const midY = (p1.y + p2.y) * 0.5;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const cursorBoost = mouseDist < 260 ? (1 - mouseDist / 260) * 0.22 : 0;

            const alpha =
              (1 - dist / maxLinkDist) * (isDark ? 0.14 : 0.13) + cursorBoost;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${alpha.toFixed(3)})`
              : `rgba(100, 116, 139, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            if (pulses.length < 7 && Math.random() < 0.0004 && dist > 60) {
              pulses.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
              });
            }
          }
        }
      }

      // 5. Render active packet pulses along edges
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }
        const p1 = renderedPositions[pulse.fromIdx];
        const p2 = renderedPositions[pulse.toIdx];
        if (!p1 || !p2) continue;

        const px = p1.x + (p2.x - p1.x) * pulse.progress;
        const py = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? 'rgba(59, 130, 246, 0.8)'
          : 'rgba(37, 99, 235, 0.75)';
        ctx.fill();
      }

      // 6. Render nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pos = renderedPositions[i];
        const mouseDist = Math.hypot(pos.x - mouse.x, pos.y - mouse.y);
        const highlight = mouseDist < 210 ? 1 - mouseDist / 210 : 0;
        const pulseScale = 1 + Math.sin(time * 2 + node.phase) * 0.15;
        const radius = node.baseRadius * pulseScale + highlight * 1.3;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);

        if (highlight > 0.2) {
          ctx.fillStyle = isDark
            ? `rgba(59, 130, 246, ${(0.5 + highlight * 0.45).toFixed(3)})`
            : `rgba(37, 99, 235, ${(0.45 + highlight * 0.45).toFixed(3)})`;
        } else {
          ctx.fillStyle = isDark
            ? 'rgba(148, 163, 184, 0.35)'
            : 'rgba(148, 163, 184, 0.42)';
        }
        ctx.fill();
      }

      // 7. Click ripple effect
      if (mouse.clickRipple > 0.01) {
        const rippleRadius = (1 - mouse.clickRipple) * 220;
        ctx.beginPath();
        ctx.arc(mouse.clickX, mouse.clickY, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(59, 130, 246, ${(mouse.clickRipple * 0.35).toFixed(3)})`
          : `rgba(37, 99, 235, ${(mouse.clickRipple * 0.32).toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
        mouse.clickRipple *= 0.92;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, intensity]);

  return (
    <div className={backgroundCanvasWrap}>
      <canvas ref={canvasRef} className={backgroundCanvas} />
    </div>
  );
};
