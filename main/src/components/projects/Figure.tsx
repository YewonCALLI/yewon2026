export function Figure({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  const hasWidthOverride = /\bw-\S/.test(className)
  return (
    <img src={src} alt={alt} loading='lazy' className={`h-auto ${hasWidthOverride ? '' : 'w-full'} ${className}`} />
  )
}
