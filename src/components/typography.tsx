import React from 'react'
import type { JSX } from 'react'
import clsx from 'clsx'

// Define allowed tags and fonts
const TAGS = [
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
const FONTS = ['satoshi', 'instrument-serif'] as const

type Tag = (typeof TAGS)[number]
type Font = (typeof FONTS)[number]

type TypographyVariant = Tag | `${Tag}-${Font}`

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: Tag // Only the tag, e.g. 'h1', 'lead', etc.
  fontClass?: 'satoshi' | 'instrument-serif'
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  fontClass = 'satoshi',
  children,
  className,
  ...props
}) => {
  if (!TAGS.includes(variant as Tag)) {
    throw new Error(
      `Invalid tag '${variant}'. Must be one of: ${TAGS.join(', ')}`,
    )
  }

  const fontClassName =
    fontClass === 'instrument-serif' ? 'font-instrument-serif' : 'font-satoshi'

  const baseClass = 'text-gray-800'

  const tagClasses: Record<Tag, string> = {
    h1: 'text-4xl md:text-5xl tracking-tight',
    h2: 'text-3xl md:text-4xl tracking-tight',
    h3: 'text-2xl md:text-3xl tracking-tight',
    h4: 'text-xl md:text-2xl tracking-tight',
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

  const tagToElement: Record<Tag, keyof JSX.IntrinsicElements> = {
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

  const TagComponent = tagToElement[variant as Tag] as React.ElementType

  return (
    <TagComponent
      className={clsx(
        baseClass,
        fontClassName,
        tagClasses[variant as Tag],
        className,
      )}
      {...props}
    >
      {children}
    </TagComponent>
  )
}
