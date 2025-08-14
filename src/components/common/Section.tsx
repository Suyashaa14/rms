import type { ReactNode } from 'react';
import { cn } from '../../lib/cn'

export default function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('py-14 md:py-20', className)}>
      {children}
    </section>
  )
}