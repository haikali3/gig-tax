import React from 'react'
import type { JSX } from 'react'
import clsx from 'clsx'

// Strictly define allowed variants
const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'lead',
  'large',
  'small',
  'muted',
  'blockquote',
  'inlineCode',
  'list',
] as const

type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number]

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  if (!variant) {
    throw new Error("Typography component requires a 'variant' prop")
  }

  if (!TYPOGRAPHY_VARIANTS.includes(variant)) {
    throw new Error(
      `Invalid variant '${variant}'. Must be one of: ${TYPOGRAPHY_VARIANTS.join(', ')}`,
    )
  }

  const baseClass = 'font-satoshi text-gray-800'

  const variantClasses: Record<TypographyVariant, string> = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-semibold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-medium',
    p: 'text-base',
    lead: 'text-xl text-gray-700',
    large: 'text-lg font-semibold',
    small: 'text-xs text-gray-600',
    muted: 'text-sm text-gray-500',
    blockquote: 'border-l-4 pl-4 italic text-gray-600',
    inlineCode:
      'font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm text-purple-700',
    list: 'list-disc list-inside text-base text-gray-800',
  }

  const variantToTag: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    lead: 'p',
    large: 'p',
    small: 'p',
    muted: 'p',
    blockquote: 'blockquote',
    inlineCode: 'code',
    list: 'ul',
  }

  const TagComponent = variantToTag[variant] as React.ElementType

  return (
    <TagComponent
      className={clsx(baseClass, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </TagComponent>
  )
}
