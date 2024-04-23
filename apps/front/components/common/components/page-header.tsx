import { Separator } from './separator';

type Props = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <small className="text-gray-900">{description}</small>
      </div>
      <Separator />
    </div>
  );
};
