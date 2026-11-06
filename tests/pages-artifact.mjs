import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const dist = new URL('../dist/', import.meta.url);

test('the published 404 loads the home layout even from nested paths', () => {
  const home = readFileSync(new URL('index.html', dist), 'utf8');
  const missing = readFileSync(new URL('404.html', dist), 'utf8');
  const appAssets = html => [...html.matchAll(/(?:src|href)="([^"]*assets\/[^"]+\.(?:js|css))"/g)]
    .map(match => match[1]).sort();

  const assets = appAssets(missing);
  assert.ok(assets.some(asset => asset.endsWith('.js')));
  assert.ok(assets.some(asset => asset.endsWith('.css')));
  assert.deepEqual(assets, appAssets(home));
  for (const asset of assets) {
    assert.ok(asset.startsWith('/assets/'), asset);
    assert.ok(existsSync(new URL(asset.slice(1), dist)), asset);
  }
  assert.match(missing, /<meta name="robots" content="noindex"/);
  assert.match(missing, /<a [^>]*href="\/"/);
  assert.match(missing, /<a [^>]*href="\/blog"/);
});

test('every shareable page publishes its own social metadata and 1200×630 PNG', () => {
  const posts = readdirSync(new URL('../src/content/posts/', import.meta.url))
    .filter(file => file.endsWith('.md')).map(file => '/posts/' + file.slice(0, -3));
  const origin = 'https://blog.sinav.cloud';
  const images = new Set();
  const titles = new Set();
  for (const route of ['/', '/blog', '/portfolio', '/research', '/publications', '/projects', '/archive', '/404.html', ...posts]) {
    const encodedRoute = route.split('/').map(encodeURIComponent).join('/');
    const filename = route === '/' ? 'index.html' : route === '/404.html' ? '404.html' : encodedRoute.slice(1) + '/index.html';
    const html = readFileSync(new URL(filename, dist), 'utf8');
    const head = html.split('</head>')[0];
    const tags = Object.fromEntries([...head.matchAll(/<meta\s+(?:property|name)="((?:og|twitter):[^"]+)"\s+content="([^"]*)"/g)].map(match => [match[1], match[2]]));
    assert.equal(head.match(/property="og:title"/g)?.length, 1, route);
    assert.ok(tags['og:title'] && tags['og:description'], route);
    assert.equal(tags['og:url'], origin + encodedRoute);
    assert.equal(tags['og:type'], posts.includes(route) ? 'article' : 'website');
    for (const key of ['title','description','image','image:alt']) {
      assert.equal(tags['twitter:' + key], tags['og:' + key]);
    }
    const image = new URL(tags['og:image']);
    assert.equal(image.origin, origin);
    assert.equal(tags['og:image:type'], 'image/png');
    const png = readFileSync(new URL(image.pathname.slice(1), dist));
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    assert.ok(!images.has(image.href) && !titles.has(tags['og:title']), route);
    images.add(image.href);
    titles.add(tags['og:title']);
    if (route !== '/' && route !== '/404.html') {
      assert.equal(readFileSync(new URL(encodedRoute.slice(1) + '.html', dist), 'utf8'), html);
    }
  }
});

test('sitemap and RSS publish HTTPS links on the custom domain', () => {
  const origin = 'https://blog.sinav.cloud';
  const sitemap = readFileSync(new URL('sitemap.xml', dist), 'utf8');
  const feed = readFileSync(new URL('rss.xml', dist), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  const links = [...feed.matchAll(/<link>([^<]+)<\/link>/g)].map(match => match[1]);
  for (const url of [...locations, ...links]) assert.equal(new URL(url).origin, origin);
  assert.ok(locations.includes(origin + '/system_io_uring_study/'));
  assert.ok(locations.includes(origin + '/LetterBox-Generator/'));
  assert.ok(links.includes(origin + '/'));
});
