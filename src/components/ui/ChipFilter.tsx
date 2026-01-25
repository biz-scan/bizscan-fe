import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chipFilterVariants = cva(
  'inline-flex items-center justify-center rounded-full px-4 py-1.5 typo-p2-semibold font-medium transition-colors cursor-pointer select-none border',
  {
    variants: {
      active: {
        true: 'bg-blue-normal text-grey-light ',
        false:
          'bg-transparent text-blue-normal border-blue-light-active hover:text-blue-light-active',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface ChipFilterProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipFilterVariants> {}

function ChipFilter({ className, active, ...props }: ChipFilterProps) {
  return <div className={cn(chipFilterVariants({ active }), className)} {...props} />;
}

export { ChipFilter, chipFilterVariants };
