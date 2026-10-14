'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Figure({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  const [open, setOpen] = useState(false)
  const hasWidthOverride = /\bw-\S/.test(className)
  const hasHeightOverride = /\bh-\S/.test(className)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        onClick={() => setOpen(true)}
        className={`cursor-zoom-in ${hasHeightOverride ? '' : 'h-auto'} ${hasWidthOverride ? '' : 'w-full'} ${className}`}
      />
      {open &&
        createPortal(
          <div
            role='dialog'
            aria-modal='true'
            onClick={() => setOpen(false)}
            className='fixed inset-0 z-[1000] flex cursor-zoom-out items-center justify-center bg-white/95 p-[16px] md:p-[40px]'
          >
            <img src={src} alt={alt} className='max-h-full max-w-full object-contain' />
          </div>,
          document.body,
        )}
    </>
  )
}
