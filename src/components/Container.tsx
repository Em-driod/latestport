import { ReactNode } from 'react'

export default function Container({ children, as: Tag = 'section', className = '' }: { children: ReactNode, as?: any, className?: string }) {
  return (
    <Tag className={`py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        {children}
      </div>
    </Tag>
  )
}
