import * as React from 'react';

export default function HashTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[4px] bg-blue-light px-[10px] py-[4px] typo-p2-medium text-blue-dark">
      {children}
    </span>
  );
}
