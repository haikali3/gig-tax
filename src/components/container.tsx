import React from 'react'
import clsx from 'clsx'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
