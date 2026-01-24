import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chipFilterVariants = cva(
  'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer select-none border',
  {
    variants: {
      active: {
        true: 'bg-blue-normal text-white border-blue-normal',
        false: 'bg-white text-grey-normal border-grey-light hover:bg-grey-light',
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
