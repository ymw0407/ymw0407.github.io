import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  RiArticleLine, RiBookOpenLine, RiBriefcaseLine, RiCameraLensLine, RiCodeSSlashLine,
  RiCompass3Line, RiCpuLine, RiFilePaper2Line, RiMapPinLine,
} from 'react-icons/ri';

const fontfile = fileURLToPath(new URL('./fonts/GothicA1-Bold.ttf', import.meta.url));
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const icons = {
  '/': RiCompass3Line, '/blog': RiBookOpenLine, '/portfolio': RiBriefcaseLine,
  '/research': RiCpuLine, '/publications': RiFilePaper2Line, '/projects': RiCodeSSlashLine,
  '/archive': RiCameraLensLine, '/404.html': RiMapPinLine,
};

async function lettering(value, size, color, width, height) {
  const escaped = String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const text = { text: `<span foreground="${color}">${escaped}</span>`,
    fontfile, font: `Gothic A1 Bold ${size}`, width, dpi: 72, rgba: true, wrap: 'word-char' };
  const image = sharp({ text });
  if ((await image.metadata()).height <= height) return image.png().toBuffer();
  return sharp({ text: { ...text, dpi: undefined, height } }).png().toBuffer();
}

export async function writeSocialCard(file, { route, title, label, footer, origin }) {
  const icon = renderToStaticMarkup(createElement(icons[route] || RiArticleLine, {
    size: 140, color: '#2563eb',
  })).replaceAll('currentColor', '#2563eb');
  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1.6" fill="#c3d1e8"/></pattern></defs>
    <rect width="1200" height="630" fill="#f8faff"/><rect width="1200" height="9" fill="#2563eb"/>
    <path d="M840 9H1200V532H840Z" fill="url(#grid)"/>
    <circle cx="1000" cy="285" r="145" fill="#edf3ff" stroke="#ccdafa"/>
    <circle cx="1000" cy="285" r="110" fill="#fff" stroke="#dbe5f9"/>
    <g transform="translate(930 215)">${icon}</g>
    <path d="M62 526H1138" stroke="#cbd6e6" stroke-width="2"/>
  </svg>`);
  const logo = await sharp(path.join(publicDir, 'favicon.svg')).resize(58, 58).png().toBuffer();
  const layers = [
    { input: logo, left: 59, top: 46 },
    { input: await lettering('윤민우 · sinav', 28, '#16233a', 480, 44), left: 136, top: 61 },
    { input: await lettering(label, 28, '#2354bd', 745, 56), left: 65, top: 160 },
    { input: await lettering(title, 70, '#101b30', 755, 255), left: 61, top: 233 },
    { input: await lettering(footer, 24, '#3c506d', 800, 48), left: 65, top: 558 },
    { input: await lettering(new URL(origin).hostname, 23, '#3c506d', 230, 42), left: 926, top: 559 },
  ];
  if (route === '/archive') {
    const photo = await sharp(path.join(publicDir, 'photography/2026-weather-aurora-curtain.jpg'))
      .resize(272, 272, { fit: 'cover' })
      .composite([{ input: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="272" height="272"><circle cx="136" cy="136" r="136" fill="white"/></svg>'), blend: 'dest-in' }])
      .png().toBuffer();
    layers.push({ input: photo, left: 864, top: 149 });
  }
  await sharp(background).composite(layers).png().toFile(file);
}
