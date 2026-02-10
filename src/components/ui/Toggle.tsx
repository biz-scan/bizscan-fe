import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';

import { cn } from '@/lib/utils';

function Toggle({ className, ...props }: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        // 기본 스타일
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 cursor-pointer',
        'bg-blue-light text-blue-normal',
        // hover
        'hover:bg-blue-light-hover',
        // 켜졌을 때
        'data-[state=on]:bg-blue-normal data-[state=on]:text-grey-light',
        // disabled
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Toggle };
