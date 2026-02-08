import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import CheckIcon from '@/assets/icons/Icon/type=toast1.svg?react';
import NoteIcon from '@/assets/icons/Icon/type=toast2.svg?react';
import SpeakerIcon from '@/assets/icons/Icon/type=toast3.svg?react';
import { cn } from '@/lib/utils';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group', props.className)}
      icons={{
        success: <CheckIcon />,
        info: <NoteIcon />,
        error: <SpeakerIcon />,
      }}
      toastOptions={{
        classNames: {
          toast: '!rounded-lg !shadow-normal !px-2.5 !py-4 !gap-3 !items-center',
          title: '!ml-2.5 !text-base !font-[600] !leading-[1.4] !tracking-tight',
          success: '!bg-blue-light !border !border-blue-light-active !text-blue-darker',
          info: '!bg-blue-light !border !border-blue-light-active !text-blue-darker',
          error: '!bg-error-light !border !border-error-light2 !text-error',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
