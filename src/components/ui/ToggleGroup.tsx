import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '@/lib/utils';

function ToggleGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex items-center gap-3', className)} // 12px gap
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-item"
      className={cn(
        // 기본 스타일
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2',
        'bg-blue-light text-blue-normal typo-p2-semibold',
        // hover
        'hover:bg-blue-light-hover',
        // 켜졌을 때
        'data-[state=on]:bg-blue-normal data-[state=on]:text-grey-light',
        // disabled
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
