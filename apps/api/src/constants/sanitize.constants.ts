import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1',
  'h2',
  'img',
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
];

export const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  // allowedAttributes: {
  //   a: ['href'],
  //   img: [
  //     'src',
  //     {
  //       name: 'target',
  //       values: ['_blank'],
  //     },
  //   ],
  // },
  allowedSchemes: ['http', 'https'],
};
