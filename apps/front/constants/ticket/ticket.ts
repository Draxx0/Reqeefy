export const getTicketStatusState = (
  status: string
): {
  label: string;
  tooltipLabel: string;
  variant: 'open_ticket' | 'pending_ticket' | 'archived_ticket';
} => {
  switch (status) {
    case 'open':
      return {
        label: 'Ouvert',
        tooltipLabel: 'La discussion est en attente de la réponse du client.',
        variant: 'open_ticket',
      };
    case 'pending':
      return {
        label: 'En attente',
        tooltipLabel: "La discussion est en attente de la réponse d'un agent.",
        variant: 'pending_ticket',
      };
    default:
      return {
        label: 'Archivé',
        tooltipLabel: 'La discussion a était archivé.',
        variant: 'archived_ticket',
      };
  }
};
