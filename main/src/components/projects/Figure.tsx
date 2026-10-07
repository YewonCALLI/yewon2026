export function Figure({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  const hasWidthOverride = /\bw-\S/.test(className)
  const hasHeightOverride = /\bh-\S/.test(className)
  return (
    <img
      src={src}
      alt={alt}
      loading='lazy'
      className={`${hasHeightOverride ? '' : 'h-auto'} ${hasWidthOverride ? '' : 'w-full'} ${className}`}
    />
  )
}
