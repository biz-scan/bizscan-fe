import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg typo-p2-semibold transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer',
  {
    variants: {
      variant: {
        // 파란 버튼
        default:
          'bg-blue-normal text-white hover:bg-blue-normal-hover active:bg-blue-normal-active disabled:bg-blue-light-hover disabled:text-blue-light-active',
        // 흰색 버튼
        white: 'bg-grey-light text-grey-darker hover:text-grey-dark active:text-grey-normal-active',
        // 테두리만 버튼
        outline:
          'border border-grey-normal text-grey-normal active:text-blue-light-active active:border-blue-light-active',
        // 텍스트버튼
        blueLight:
          'bg-blue-light-active text-grey-ligth hover:bg-blue-light-hover active:bg-blue-light',
      },
      size: {
        default: 'h-12 px-4.5 py-4.5',
        lg: 'h-16 px-8 py-4.5 typo-p1-bold',
        sm: 'h-10.5 px-5 py-2.5 typo-p2-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',

  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
