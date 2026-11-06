import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
