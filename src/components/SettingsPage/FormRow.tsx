import React from 'react';

interface FormRowProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

export default function FormRow({ label, children }: FormRowProps) {
  return (
    <div
      className="
        py-3
        grid
        gap-y-3
        gap-x-4
        xl:gap-x-[44px]
        grid-cols-1
        xl:grid-cols-[minmax(0,372px)_1fr]
      "
    >
      <div>{label}</div>
      <div className="w-full xl:max-w-[722px]">{children}</div>
    </div>
  );
}
