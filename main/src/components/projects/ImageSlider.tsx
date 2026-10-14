'use client'

import { useEffect, useRef, useState } from 'react'

interface ImageSliderProps {
  images: string[]
  autoPlay?: boolean
  autoPlayInterval?: number
  aspect?: string
}

const DRAG_THRESHOLD = 50

export function ImageSlider({ images, autoPlay = false, autoPlayInterval = 3000, aspect = 'aspect-[416/221]' }: ImageSliderProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  useEffect(() => {
    if (!autoPlay || paused || isPressing || images.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), autoPlayInterval)
    return () => clearInterval(timer)
  }, [autoPlay, paused, isPressing, autoPlayInterval, images.length])

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length)

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    isDragging.current = true
    dragStartX.current = event.clientX
    setIsPressing(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging.current) return
    const deltaX = event.clientX - dragStartX.current
    if (Math.abs(deltaX) < DRAG_THRESHOLD) return

    go(deltaX < 0 ? 1 : -1)
    dragStartX.current = event.clientX
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    isDragging.current = false
    setIsPressing(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div className='w-full' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className={`relative w-full cursor-ew-resize select-none overflow-hidden bg-white [touch-action:pan-y] ${aspect}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={`absolute inset-0 transition-transform duration-200 ease-out ${
            isPressing ? 'scale-[0.96]' : 'scale-100'
          }`}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=''
              loading='lazy'
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
      <div className='mt-[8px] flex items-center justify-between text-label text-neutral-500'>
        <div className='flex gap-[6px]'>
          {images.map((_, i) => (
            <button
              key={i}
              type='button'
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-[6px] w-[6px] rounded-full ${i === index ? 'bg-black' : 'bg-neutral-300'}`}
            />
          ))}
        </div>
        <span>
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  )
}
