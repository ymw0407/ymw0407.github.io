<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
      <head>
        <title>XML Sitemap | 윤민우 (Minwoo Yun · sinav)</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Pretendard Variable", "Segoe UI", Roboto, sans-serif;
            background: #fbfcfd;
            color: #0f172a;
            margin: 0;
            padding: 2.5rem 1.25rem;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 1.5rem;
            padding-bottom: 1.1rem;
            border-bottom: 1px solid #e2e8f0;
          }
          .badge {
            display: inline-block;
            padding: 0.22rem 0.65rem;
            border-radius: 999px;
            background: rgba(37, 99, 235, 0.1);
            color: #2563eb;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          h1 {
            margin: 0 0 0.35rem 0;
            font-size: 1.45rem;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          p {
            margin: 0;
            color: #475569;
            font-size: 0.9rem;
            line-height: 1.6;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          }
          th {
            text-align: left;
            padding: 0.75rem 1rem;
            background: #f8fafc;
            color: #334155;
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            border-bottom: 1px solid #e2e8f0;
          }
          td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.86rem;
            color: #334155;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: #f8fafc;
          }
          .mono {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.8rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">STANDARD SITEMAP.XML · GOOGLE SEARCH CONSOLE READY</span>
            <h1>윤민우 (Minwoo Yun · sinav) XML Sitemap</h1>
            <p>
              총 <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>개의 색인 URL이 포함되어 있습니다.
              검색엔진 크롤러(Googlebot 등)는 원본 XML 트리를 직접 수집합니다. · <a href="/">홈으로 돌아가기</a>
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL (Location)</th>
                <th>Priority</th>
                <th>Change Freq</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="mono"><xsl:value-of select="sitemap:priority"/></td>
                  <td class="mono"><xsl:value-of select="sitemap:changefreq"/></td>
                  <td class="mono"><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
