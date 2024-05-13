import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString);
    return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
