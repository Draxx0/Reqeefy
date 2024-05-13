import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
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
  div: ['style'],
  span: ['style'],
  p: ['style'],
  ul: ['style'],
  ol: ['style'],
  li: ['style'],
};

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ['https', 'mailto', 'tel'],
  selfClosing: ['img', 'br'],
  // allowProtocolRelative: true,
};
