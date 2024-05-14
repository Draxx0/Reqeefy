import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'a',
  'p',
  'ul',
  'ol',
  'li',
  'pre',
  'strong',
  'em',
  'div',
  'span',
  'br',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel', 'class'],
  div: ['class'],
  span: ['class'],
  p: ['class'],
  ul: ['class'],
  ol: ['class'],
  li: ['class'],
};

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ['https', 'mailto', 'tel'],
  selfClosing: ['img', 'br'],
};
