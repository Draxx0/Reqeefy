import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1',
  'h2',
  'a',
  'p',
  'ul',
  'ol',
  'li',
  'blockquote',
  'code',
  'pre',
  'strong',
  'em',
  'u',
  'b',
  'i',
  'div',
  'span',
  'img',
  'br',
  'sub',
  'sup',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  div: ['class'],
  span: ['class'],
  p: ['class'],
  ul: ['class'],
  ol: ['class'],
  li: ['class'],
  h1: ['class'],
};

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ['https', 'mailto', 'tel'],
  selfClosing: ['img', 'br'],
  // allowProtocolRelative: true,
};
