import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeEntryUrl } from '../src/utils/entryUrl.ts';

const site = 'https://blog.sinav.cloud';

test('published HTML aliases and legacy bookmarks retain queries and fragments', () => {
  for (const [input, expected] of [
    ['/index.html', '/'],
    ['/blog.html?category=research#notes', '/blog?category=research#notes'],
    ['/posts/example/index.html', '/posts/example/'],
    ['/posts/example.html', '/posts/example'],
    ['/?/blog&category=research~and~q=a%26b#notes', '/blog?category=research&q=a%26b#notes'],
    ['/?utm_source=github', '/?utm_source=github'],
    ['/typo', '/typo'],
  ]) {
    assert.equal(normalizeEntryUrl(site + input), site + expected, input);
  }
});

test('a malformed legacy bookmark stays on the site', () => {
  assert.equal(new URL(normalizeEntryUrl(site + '/?//example.org')).origin, site);
});
