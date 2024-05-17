import { cn } from '@/lib';
import { Separator } from './separator';

type Props = {
  title: string;
  description?: string;
  size?: 'large' | 'small';
  hasSeparator?: boolean;
};

export const PageHeader = ({
  title,
  description,
  size = 'large',
  hasSeparator = false,
}: Props) => {
  const classes = cn(
    {
      'md:text-3xl': size === 'large',
      'md:text-2xl': size === 'small',
    },
    'font-bold'
  );
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className={classes}>{title}</h1>
        <small className="text-xs md:text-sm text-gray-900">
          {description}
        </small>
      </div>
      {hasSeparator && <Separator />}
    </div>
  );
};
