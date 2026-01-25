import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-grey-light hover:text-grey-normal disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-blue-normal data-[state=on]:text-white [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all aria-invalid:ring-destructive/20 aria-invalid:border-destructive whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-grey-light bg-transparent shadow-xs hover:bg-grey-light hover:text-grey-normal data-[state=on]:bg-blue-normal data-[state=on]:text-white data-[state=on]:border-blue-normal',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
