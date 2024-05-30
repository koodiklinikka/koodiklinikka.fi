import { ReactNode } from 'react';

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-5">{children}</div>;
}
