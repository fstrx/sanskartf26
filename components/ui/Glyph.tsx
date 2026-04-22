import type { GlyphName } from '@/lib/glyphs'

interface GlyphProps {
  name: GlyphName
  className?: string
  title?: string
}

function glyphPath(name: GlyphName) {
  switch (name) {
    case 'harmony':
      return (
        <>
          <circle cx="12" cy="12" r="8.25" />
          <path d="M3.75 12h16.5" />
          <path d="M12 3.75c2.15 2.25 3.25 5 3.25 8.25S14.15 18 12 20.25C9.85 18 8.75 15.25 8.75 12S9.85 6 12 3.75Z" />
          <path d="M6.5 7.75c1.6 1.1 3.45 1.65 5.5 1.65s3.9-.55 5.5-1.65" />
          <path d="M6.5 16.25c1.6-1.1 3.45-1.65 5.5-1.65s3.9.55 5.5 1.65" />
        </>
      )
    case 'standard':
      return (
        <>
          <path d="M6.5 19V5.5" />
          <path d="M6.5 6h8.25c1.8 0 2.75.95 2.75 2.25S16.55 10.5 14.75 10.5H6.5" />
          <path d="M6.5 10.5h6.75c1.55 0 2.5.85 2.5 2.15s-.95 2.35-2.5 2.35H6.5" />
        </>
      )
    case 'resource':
      return (
        <>
          <path d="M12 4.25c-2.7 3.15-4.75 5.85-4.75 8.75A4.75 4.75 0 0 0 12 17.75 4.75 4.75 0 0 0 16.75 13c0-2.9-2.05-5.6-4.75-8.75Z" />
          <path d="M9.25 14.25c.85.8 1.75 1.2 2.75 1.2 1.05 0 2-.4 2.85-1.2" />
        </>
      )
    case 'justice':
      return (
        <>
          <path d="M12 5v14" />
          <path d="M8 7.25h8" />
          <path d="M6.25 8.25 4.5 12h3.5l-1.75-3.75Z" />
          <path d="M17.75 8.25 16 12h3.5l-1.75-3.75Z" />
          <path d="M8.5 19h7" />
        </>
      )
    case 'signal':
      return (
        <>
          <circle cx="12" cy="12" r="1.25" />
          <path d="M12 10.75V4.75" />
          <path d="M8.25 8.25a5.25 5.25 0 0 0 0 7.5" />
          <path d="M15.75 8.25a5.25 5.25 0 0 1 0 7.5" />
          <path d="M5.75 5.75a8.75 8.75 0 0 0 0 12.5" />
          <path d="M18.25 5.75a8.75 8.75 0 0 1 0 12.5" />
        </>
      )
    case 'inequality':
      return (
        <>
          <path d="M5.5 18.5V12" />
          <path d="M10 18.5V8.5" />
          <path d="M14.5 18.5v-4.25" />
          <path d="M19 18.5V5.5" />
          <path d="M4 18.5h16" />
        </>
      )
    case 'arms':
      return (
        <>
          <path d="M6 9.25h8.25c1.7 0 3 1.3 3 3v1.25" />
          <path d="M9 12.75 6 15.75" />
          <path d="M15.5 8.5 18 6" />
          <path d="M16.5 15.5v2.5" />
          <path d="M6 18h4.5" />
        </>
      )
    case 'africa':
      return (
        <>
          <path d="M12 4.5c2.1 1.05 3.5 2.75 4.1 5.1-.25 3.8-1.85 6.7-4.85 8.9-2.2-1.75-3.45-4.1-3.8-7.1.4-2.7 1.9-5.05 4.55-6.9Z" />
          <path d="M12.25 11.75c-.95 1.15-1.35 2.45-1.2 3.9" />
        </>
      )
    case 'asia':
      return (
        <>
          <path d="M5.5 11.5c1.55-3.55 4.55-5.6 9-6.1 2.25.85 3.75 2.15 4.5 3.9-1 1.85-2.75 3.1-5.25 3.75-1.65-.35-3.1-.1-4.35.75-1 .7-2.3.95-3.9.75Z" />
          <path d="M14.75 13.1c1.15.65 1.9 1.65 2.25 3" />
        </>
      )
    case 'europe':
      return (
        <>
          <path d="M12 4.25 13.35 8.4l4.4.02-3.58 2.6 1.34 4.23L12 12.68l-3.51 2.57 1.34-4.23-3.58-2.6 4.4-.02L12 4.25Z" />
        </>
      )
    case 'americas':
      return (
        <>
          <path d="M9.5 4.75c-1.6 1.1-2.5 2.5-2.75 4.25.8 1.1 1.2 2.15 1.2 3.15 0 1.35.6 2.6 1.8 3.75l1.3 3.1" />
          <path d="M14.75 10c1.5.75 2.35 1.95 2.55 3.6-.45 1.45-1.35 2.9-2.7 4.35" />
        </>
      )
    case 'mideast':
      return (
        <>
          <path d="M12 5.5c1.1 1.55 1.65 2.9 1.65 4.05 0 1.25-.55 2.7-1.65 4.35-1.1-1.65-1.65-3.1-1.65-4.35 0-1.15.55-2.5 1.65-4.05Z" />
          <path d="M12 14.1c-2.35.1-4.45.9-6.3 2.4 1.75 1.45 3.85 2.15 6.3 2.15s4.55-.7 6.3-2.15c-1.85-1.5-3.95-2.3-6.3-2.4Z" />
        </>
      )
  }
}

export default function Glyph({ name, className = 'h-5 w-5', title }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {glyphPath(name)}
    </svg>
  )
}
