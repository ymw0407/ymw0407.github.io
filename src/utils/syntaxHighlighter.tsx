import React from 'react';

export type TokenType =
  | 'plain'
  | 'comment'
  | 'string'
  | 'directive'
  | 'keyword'
  | 'type'
  | 'function'
  | 'number'
  | 'operator'
  | 'property';

export interface CodeToken {
  type: TokenType;
  value: string;
}

const CONTROL_KEYWORDS = new Set([
  'if',
  'else',
  'elif',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'default',
  'break',
  'continue',
  'return',
  'goto',
  'try',
  'catch',
  'finally',
  'throw',
  'raise',
  'yield',
  'async',
  'await',
  'import',
  'from',
  'export',
  'package',
  'module',
  'use',
  'mod',
  'pub',
  'impl',
  'trait',
  'where',
  'match',
  'in',
  'of',
  'as',
  'with',
  'pass',
  'lambda',
  'defer',
  'go',
  'select',
  'chan',
  'fallthrough',
  'new',
  'delete',
  'sizeof',
  'typeof',
  'instanceof',
  'SELECT',
  'FROM',
  'WHERE',
  'JOIN',
  'LEFT',
  'RIGHT',
  'INNER',
  'ON',
  'GROUP',
  'BY',
  'ORDER',
  'LIMIT',
  'INSERT',
  'INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE',
  'CREATE',
  'TABLE',
  'INDEX',
  'AND',
  'OR',
  'NOT',
  'NULL',
  'AS',
]);

const STORAGE_AND_TYPE_KEYWORDS = new Set([
  'struct',
  'enum',
  'union',
  'typedef',
  'class',
  'interface',
  'type',
  'fn',
  'func',
  'function',
  'def',
  'let',
  'const',
  'var',
  'val',
  'mut',
  'static',
  'extern',
  'inline',
  'volatile',
  'register',
  'auto',
  'signed',
  'unsigned',
  'short',
  'long',
  'int',
  'char',
  'float',
  'double',
  'void',
  'bool',
  'boolean',
  'string',
  'byte',
  'rune',
  'error',
  'any',
  'unknown',
  'never',
  'uint8_t',
  'uint16_t',
  'uint32_t',
  'uint64_t',
  'int8_t',
  'int16_t',
  'int32_t',
  'int64_t',
  'size_t',
  'ssize_t',
  'off_t',
  'u8',
  'u16',
  'u32',
  'u64',
  'usize',
  'i8',
  'i16',
  'i32',
  'i64',
  'isize',
  'f32',
  'f64',
  'public',
  'private',
  'protected',
  'final',
  'override',
  'virtual',
  'abstract',
  'readonly',
  'true',
  'false',
  'True',
  'False',
  'None',
  'null',
  'undefined',
  'nil',
  'self',
  'this',
  'super',
]);

const TOKEN_COLORS: Record<TokenType, React.CSSProperties> = {
  plain: { color: '#e2e8f0' },
  comment: { color: '#7c8ea6', fontStyle: 'italic' },
  string: { color: '#86efac' },
  directive: { color: '#f472b6', fontWeight: 600 },
  keyword: { color: '#c084fc', fontWeight: 600 },
  type: { color: '#38bdf8', fontWeight: 600 },
  function: { color: '#fde047' },
  number: { color: '#fb923c' },
  operator: { color: '#67e8f9' },
  property: { color: '#93c5fd' },
};

const MASTER_TOKEN_REGEX =
  /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#include\b[^\n]*|#define\b[^\n]*|#pragma\b[^\n]*|#ifndef\b[^\n]*|#ifdef\b[^\n]*|#endif\b[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b0x[0-9a-fA-F_]+\b|\b0b[01_]+\b|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?[uUlLfF]*\b|\b[A-Za-z_][A-Za-z0-9_]*\b|->|::|==|!=|<=|>=|&&|\|\||<<|>>|[+*&|^%~=<>!?:;,.()[\]{}-])/g;

export function tokenizeCode(code: string, language = 'text'): CodeToken[] {
  const lang = language.toLowerCase();
  const usesHashComment =
    lang === 'python' ||
    lang === 'py' ||
    lang === 'bash' ||
    lang === 'sh' ||
    lang === 'zsh' ||
    lang === 'shell' ||
    lang === 'yaml' ||
    lang === 'yml' ||
    lang === 'toml' ||
    lang === 'dockerfile' ||
    lang === 'makefile';

  if (usesHashComment) {
    // Handle line-by-line # comments while still highlighting strings/keywords
    return tokenizeWithHashComments(code);
  }

  const tokens: CodeToken[] = [];
  let lastIndex = 0;
  let prevSignificantToken = '';

  const matches = Array.from(code.matchAll(MASTER_TOKEN_REGEX));

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const matchIndex = match.index ?? 0;
    const raw = match[0];

    if (matchIndex > lastIndex) {
      tokens.push({
        type: 'plain',
        value: code.slice(lastIndex, matchIndex),
      });
    }

    const nextRest = code.slice(matchIndex + raw.length);
    let tokenType: TokenType = 'plain';

    if (raw.startsWith('/*') || raw.startsWith('//')) {
      tokenType = 'comment';
    } else if (raw.startsWith('#')) {
      tokenType = 'directive';
    } else if (raw.startsWith('"') || raw.startsWith("'") || raw.startsWith('`')) {
      tokenType = 'string';
    } else if (/^(?:0x|0b|\d)/.test(raw)) {
      tokenType = 'number';
    } else if (/^[A-Za-z_]/.test(raw)) {
      if (
        prevSignificantToken === 'struct' ||
        prevSignificantToken === 'enum' ||
        prevSignificantToken === 'union' ||
        prevSignificantToken === 'class' ||
        prevSignificantToken === 'interface' ||
        prevSignificantToken === 'type'
      ) {
        tokenType = 'type';
      } else if (prevSignificantToken === '->' || prevSignificantToken === '.') {
        tokenType = /^\s*\(/.test(nextRest) ? 'function' : 'property';
      } else if (CONTROL_KEYWORDS.has(raw)) {
        tokenType = 'keyword';
      } else if (
        STORAGE_AND_TYPE_KEYWORDS.has(raw) ||
        /^[A-Z][A-Za-z0-9_]*$/.test(raw) ||
        raw.endsWith('_t') ||
        raw.endsWith('_sqe') ||
        raw.endsWith('_cqe')
      ) {
        tokenType = 'type';
      } else if (/^\s*\(/.test(nextRest)) {
        tokenType = 'function';
      } else {
        tokenType = 'plain';
      }
    } else if (
      raw === '->' ||
      raw === '::' ||
      raw === '&' ||
      raw === '*' ||
      raw === '|' ||
      raw === '=' ||
      raw === '==' ||
      raw === '!=' ||
      raw === '+' ||
      raw === '-'
    ) {
      tokenType = 'operator';
    }

    tokens.push({ type: tokenType, value: raw });
    if (raw.trim() !== '') {
      prevSignificantToken = raw;
    }
    lastIndex = matchIndex + raw.length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) });
  }

  return tokens;
}

function tokenizeWithHashComments(code: string): CodeToken[] {
  const lines = code.split('\n');
  const allTokens: CodeToken[] = [];

  lines.forEach((line, lineIdx) => {
    // Find unquoted #
    let inSingle = false;
    let inDouble = false;
    let commentStart = -1;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble && line[i - 1] !== '\\') inSingle = !inSingle;
      else if (ch === '"' && !inSingle && line[i - 1] !== '\\') inDouble = !inDouble;
      else if (ch === '#' && !inSingle && !inDouble) {
        commentStart = i;
        break;
      }
    }

    if (commentStart !== -1) {
      const codePart = line.slice(0, commentStart);
      const commentPart = line.slice(commentStart);
      if (codePart) {
        allTokens.push(...tokenizeCode(codePart, 'c'));
      }
      allTokens.push({ type: 'comment', value: commentPart });
    } else {
      allTokens.push(...tokenizeCode(line, 'c'));
    }

    if (lineIdx < lines.length - 1) {
      allTokens.push({ type: 'plain', value: '\n' });
    }
  });

  return allTokens;
}

export const HighlightedCodeBlock: React.FC<{
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}> = ({ code, language = 'text', showLineNumbers = true }) => {
  const cleanCode = code.replace(/\n$/, '');
  const fullTokens = tokenizeCode(cleanCode, language);

  // Split tokens into lines so multi-line comments /* ... */ stay highlighted across lines
  const lines: CodeToken[][] = [[]];
  for (const tok of fullTokens) {
    const parts = tok.value.split('\n');
    parts.forEach((part, idx) => {
      if (idx > 0) {
        lines.push([]);
      }
      if (part.length > 0) {
        lines[lines.length - 1].push({
          type: tok.type,
          value: part,
        });
      }
    });
  }

  return (
    <code
      style={{
        display: 'table',
        width: '100%',
        fontFamily: 'inherit',
        fontSize: '0.84rem',
        lineHeight: 1.72,
      }}
    >
      {lines.map((lineTokens, idx) => (
        <div
          key={idx}
          style={{
            display: 'table-row',
          }}
        >
          {showLineNumbers && (
            <span
              style={{
                display: 'table-cell',
                userSelect: 'none',
                paddingRight: '1.15rem',
                textAlign: 'right',
                color: 'rgba(148, 163, 184, 0.36)',
                fontSize: '0.75rem',
                width: '1.8rem',
              }}
            >
              {idx + 1}
            </span>
          )}
          <span style={{ display: 'table-cell', whiteSpace: 'pre' }}>
            {lineTokens.length > 0 ? (
              lineTokens.map((tok, tIdx) => (
                <span key={tIdx} style={TOKEN_COLORS[tok.type]}>
                  {tok.value}
                </span>
              ))
            ) : (
              ' '
            )}
          </span>
        </div>
      ))}
    </code>
  );
};
