import { forwardRef } from 'react';
import { clsx } from 'clsx';

type HomeInputProps = React.ComponentPropsWithoutRef<'input'>;

const HomeInput = forwardRef<HTMLInputElement, HomeInputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={clsx('w-full', className)} {...props} />;
  }
);

HomeInput.displayName = 'HomeInput';

export default HomeInput;
