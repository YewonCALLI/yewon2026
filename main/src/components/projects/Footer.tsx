//components/projects/Footer.tsx

'use client'

import Image from 'next/image'

export interface FooterSlide {
  id: string
  title: string
  src: string
}

interface FooterProps {
  slides: FooterSlide[]
  activeIndex: number
  onSelect: (index: number) => void
  accentColor?: string
}

const ITEM_WIDTH = 80
const ITEM_GAP = 8

export function Footer({ slides, activeIndex, onSelect, accentColor = '#FF2D8C' }: FooterProps) {
  const offset = activeIndex * (ITEM_WIDTH + ITEM_GAP)

  return (
    <div className='fixed bottom-0 left-0 z-40 w-full overflow-hidden py-[clamp(12px,3dvh,20px)]'>
      <div
        className='flex items-center gap-2 transition-transform duration-500 ease-out'
        style={{
          transform: `translateX(calc(50% - ${ITEM_WIDTH / 2}px - ${offset}px))`,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={slide.id}
              type='button'
              onClick={() => onSelect(index)}
              aria-label={slide.title}
              aria-current={isActive}
              style={{ borderColor: isActive ? accentColor : 'transparent' }}
              className={`relative h-[56px] w-[80px] shrink-0 overflow-hidden border-4 transition-all ${
                isActive ? 'grayscale-0' : 'grayscale'
              }`}
            >
              <Image src={slide.src} alt={slide.title} fill sizes='80px' className='object-cover' />
            </button>
          )
        })}
      </div>
    </div>
  )
}
