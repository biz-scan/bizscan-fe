import * as React from 'react';
import { useState } from 'react';

import PasswordClosed from '@/assets/icons/Password/state=closed.svg?react';
import PasswordOpen from '@/assets/icons/Password/state=open.svg?react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputElement = (
    <input
      type={isPassword && showPassword ? 'text' : type}
      data-slot="input"
      className={cn(
        // 기본 스타일
        'h-15 w-full rounded-lg border border-transparent bg-grey-light-hover px-7 py-4',
        // password일 때 오른쪽 패딩 추가 (아이콘 공간)
        isPassword && 'pr-14',
        // placeholder
        'placeholder:text-grey-normal',
        // focus 스타일
        'focus:border-blue-light-active focus:outline-none',
        // disabled 스타일
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        // 에러 스타일
        'aria-invalid:border-error',
        className
      )}
      {...props}
    />
  );

  if (isPassword) {
    return (
      <div className="relative w-full">
        {inputElement}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <PasswordOpen /> : <PasswordClosed />}
        </button>
      </div>
    );
  }

  return inputElement;
}

export { Input };
