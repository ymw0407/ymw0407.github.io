import React from 'react';
import { vars } from '../styles/theme.css';

/**
 * Generates a true circular (zero-distortion) calligraphic arc SVG path
 * that starts with a rounded fountain-pen nib head and tapers smoothly to a hairline tip.
 */
function createTaperedCalligraphicArc(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
  startThickness: number,
  endThickness: number
): string {
  const steps = 48;
  const outerPts: [number, number][] = [];
  const innerPts: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const deg = startAngleDeg + (endAngleDeg - startAngleDeg) * t;
    const rad = (deg * Math.PI) / 180;

    // Smooth fountain-pen pressure taper along a true circle (no radial distortion)
    const taper = Math.pow(1 - t, 1.15);
    const halfW = (endThickness + (startThickness - endThickness) * taper) / 2;

    const ox = cx + (radius + halfW) * Math.cos(rad);
    const oy = cy + (radius + halfW) * Math.sin(rad);
    const ix = cx + (radius - halfW) * Math.cos(rad);
    const iy = cy + (radius - halfW) * Math.sin(rad);

    outerPts.push([Number(ox.toFixed(2)), Number(oy.toFixed(2))]);
    innerPts.push([Number(ix.toFixed(2)), Number(iy.toFixed(2))]);
  }

  const startCapSteps = 12;
  const dirSign = endAngleDeg < startAngleDeg ? -1 : 1;
  const startRad = (startAngleDeg * Math.PI) / 180;
  const startCenterX = cx + radius * Math.cos(startRad);
  const startCenterY = cy + radius * Math.sin(startRad);
  const startHalfW = startThickness / 2;

  const ux = Math.cos(startRad);
  const uy = Math.sin(startRad);
  const tx = dirSign * Math.sin(startRad);
  const ty = -dirSign * Math.cos(startRad);

  let d = `M ${innerPts[0][0]} ${innerPts[0][1]} `;

  // True semicircular nib cap at startAngleDeg
  for (let c = 1; c <= startCapSteps; c++) {
    const phi = -Math.PI / 2 + (Math.PI * c) / startCapSteps;
    const px =
      startCenterX + startHalfW * (Math.sin(phi) * ux + Math.cos(phi) * tx);
    const py =
      startCenterY + startHalfW * (Math.sin(phi) * uy + Math.cos(phi) * ty);
    d += `L ${px.toFixed(2)} ${py.toFixed(2)} `;
  }

  for (let i = 1; i < outerPts.length; i++) {
    d += `L ${outerPts[i][0]} ${outerPts[i][1]} `;
  }

  for (let i = innerPts.length - 1; i >= 0; i--) {
    d += `L ${innerPts[i][0]} ${innerPts[i][1]} `;
  }

  d += 'Z';
  return d;
}

// Exact symmetric reference geometry:
// Center = (20, 20), Circle Radius = 14.8
// Needle major axis = -50 deg (NE tip at 30.73, 7.21) & +130 deg (SW tip at 9.27, 32.79)
// Needle minor axis = -140 deg (NW shoulder at 16.40, 16.98) & +40 deg (SE shoulder at 23.60, 23.02)
const NEEDLE_POLYGON = 'M 30.73 7.21 L 16.40 16.98 L 9.27 32.79 L 23.60 23.02 Z';

// Upper-Left calligraphic arc: starts thick at -63 deg, sweeps CCW along true circle to fine tail at -212 deg
const UPPER_LEFT_ARC = createTaperedCalligraphicArc(
  20,
  20,
  14.8,
  -63,
  -212,
  2.65,
  0.22
);

// Lower-Right calligraphic arc: exact 180-deg rotational symmetry partner (+117 deg to -32 deg)
const LOWER_RIGHT_ARC = createTaperedCalligraphicArc(
  20,
  20,
  14.8,
  117,
  -32,
  2.65,
  0.22
);

interface SinavLogoProps {
  size?: number;
}

/**
 * Signature Open Compass Logo ("Find My Way. Leave a Trace.")
 * Fountain-pen croquis double-line open compass (Variant #4 without dot).
 */
export const SinavLogo: React.FC<SinavLogoProps> = ({ size = 34 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        display: 'block',
        flexShrink: 0,
        color: vars.color.textPrimary,
      }}
    >
      {/* Two Open Calligraphic Arcs (thick fountain-pen nib start -> fine hairline tail) */}
      <path d={UPPER_LEFT_ARC} fill="currentColor" />
      <path d={LOWER_RIGHT_ARC} fill="currentColor" />

      {/* Concentric fine fountain-pen croquis echo arcs */}
      <path
        d="M 24.5 4.4 A 16.2 16.2 0 0 0 4.3 23.8"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M 15.5 35.6 A 16.2 16.2 0 0 0 35.7 16.2"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Pioneering Compass Needle breaking through the open circle */}
      <path
        d={NEEDLE_POLYGON}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Compass Pivot Ring */}
      <circle
        cx="20"
        cy="20"
        r="2.75"
        stroke="currentColor"
        strokeWidth="2.1"
      />
    </svg>
  );
};
