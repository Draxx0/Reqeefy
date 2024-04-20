'use client';import {
  AttachmentArea,
  AttachmentButton,
  Button,
} from '@/components/common/client';
export const Navigation = () => {
  return (
    <header>
      <Button onClick={() => {}}>Click me</Button>
      <AttachmentButton variant={'circle'} onClick={() => {}} />
      <AttachmentArea onClick={() => {}} />
    </header>
  );
};
