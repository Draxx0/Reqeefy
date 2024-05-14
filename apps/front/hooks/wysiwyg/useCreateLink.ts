'use client';

import { CreateLinkSchemaType, createLinkSchema } from '@/schemas';
import { renderErrorToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@tiptap/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  editor: Editor;
};

export const useCreateLink = ({ editor }: Props) => {
  const { view, state } = editor;
  const { from, to } = view.state.selection;
  const selectedText = state.doc.textBetween(from, to, '');

  console.log('selected text', state.doc.textBetween(from, to, ''));
  const form = useForm<CreateLinkSchemaType>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      text: selectedText || '',
      url: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateLinkSchemaType) => {
      return 'toto';
    },
    onError: (error) => {
      renderErrorToast(error.message);
    },
    onSuccess: (data, variables, context) => {
      const previousUrl = editor.getAttributes('link').href;
      console.log('previous url', previousUrl);
      const { url } = variables;

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();

      form.reset();

      toast.success('Le lien a été ajouté avec succès');
    },
  });

  const handleSubmit = form.handleSubmit((data: CreateLinkSchemaType) => {
    mutate(data);
  });

  return {
    form,
    handleSubmit,
    isPending,
  };
};
