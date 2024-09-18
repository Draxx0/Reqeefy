import * as sanitizeHtml from 'sanitize-html';
import { SANITIZE_OPTIONS } from '../constants/sanitize.constants';

export const sanitize = (content: string): string => {
  return sanitizeHtml(content, SANITIZE_OPTIONS);
};
