import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';

import CheckBlueIcon from '@/assets/icons/Check/checkblue.svg?react';
import CheckBlueLightIcon from '@/assets/icons/Check/checkbluelight.svg?react';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'shrink-0 rounded  disabled:cursor-not-allowed disabled:opacity-50 bg-grey-light',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-blue-normal ',
        white: 'data-[state=checked]:bg-blue-light ',
      },
      size: {
        default: 'size-8', // 32px
        sm: 'size-4.5', // 18px
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

function Checkbox({ className, variant = 'default', size = 'default', ...props }: CheckboxProps) {
  const iconSize = size === 'sm' ? 'size-3' : 'size-5';

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        {variant === 'white' ? (
          <CheckBlueIcon className={iconSize} />
        ) : (
          <CheckBlueLightIcon className={iconSize} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
