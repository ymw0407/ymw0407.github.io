export function normalizeEntryUrl(href: string): string {
  const url = new URL(href);
  // Bookmarks from the previous 404 page store the route in the query string.
  if (url.pathname === '/' && url.search.startsWith('?/')) {
    const [path, ...query] = url.search.slice(1).split('&');
    url.pathname = path.replace(/~and~/g, '&');
    url.search = query.join('&').replace(/~and~/g, '&');
  }
  // The same page is published as a flat HTML file and a directory index.
  url.pathname = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return url.href;
}
