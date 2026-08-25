'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer, Header } from '@/components/projects'

// projectSlug should match a `slug` in src/app/works/projectlist.ts — clicking the
// centered title (md and up) sends you to that project's dedicated page at /works/[slug].
// color drives the Identity 01-04 text in the header and the active footer thumbnail border.
const slides = [
  {
    id: 'intro-1',
    title: 'TypoFold',
    src: '/images/intro/intro18.jpg',
    projectSlug: 'typofold',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1220276808?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-2',
    title: 'Daily Folding Practice',
    src: '/images/intro/intro7.jpg',
    projectSlug: 'ganpan',
    color: '#2DFFA0',
  },
  {
    id: 'intro-3',
    title: 'Weaving Letters',
    src: '/images/intro/intro4.jpg',
    projectSlug: 'new-formative',
    color: '#B02DFF',
  },
  {
    id: 'intro-4',
    title: '2026 Samsung Design Membership',
    src: '/images/intro/intro8.jpg',
    projectSlug: 'franklin',
    color: '#FF7A2D',
    vimeoUrl:
      'https://player.vimeo.com/video/1216876134?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-5',
    title: 'XR Science Museum',
    src: '/images/intro/intro11.jpg',
    projectSlug: 'franklin',
    color: '#FF2D8C',
  },
  {
    id: 'intro-6',
    title: '2025 Samsung Design Membership',
    src: '/images/intro/intro9.jpg',
    projectSlug: 'ganpan',
    color: '#2DFFA0',
    vimeoUrl:
      'https://player.vimeo.com/video/1151368571?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-7',
    title: 'Ganpan (간판)',
    src: '/images/intro/intro10.jpg',
    projectSlug: 'ganpan',
    color: '#B02DFF',
  },
  {
    id: 'intro-8',
    title: 'Franklin',
    src: '/images/intro/intro12.jpg',
    projectSlug: 'ganpan',
    color: '#FF7A2D',
  },
  {
    id: 'intro-9',
    title: 'Naver Software Education Festival 2023',
    src: '/images/intro/intro17.jpg',
    projectSlug: 'ganpan',
    color: '#FF2D8C',
  },
  {
    id: 'intro-10',
    title: 'Word Wide Web',
    src: '/images/intro/intro13.jpg',
    projectSlug: 'ganpan',
    color: '#2DFFA0',
  },
  {
    id: 'intro-11',
    title: 'Singlet & Multiplet',
    src: '/images/intro/intro14.jpg',
    projectSlug: 'ganpan',
    color: '#B02DFF',
  },
  {
    id: 'intro-12',
    title: 'The Silver Bell Challenge',
    src: '/images/intro/intro15.jpg',
    projectSlug: 'ganpan',
    color: '#FF7A2D',
    vimeoUrl:
      'https://player.vimeo.com/video/1219658843?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-13',
    title: 'delta-individualism',
    src: '/images/intro/intro16.jpg',
    projectSlug: 'ganpan',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1151380515?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
]

const DRAG_THRESHOLD = 80

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPressing, setIsPressing] = useState(false)
  const isTransitioning = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current + 1) % slides.length)
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (isTransitioning.current) return

      isTransitioning.current = true
      if (event.deltaY > 0) {
        setActiveIndex((current) => (current + 1) % slides.length)
      } else if (event.deltaY < 0) {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
      }

      window.setTimeout(() => {
        isTransitioning.current = false
      }, 100)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const activeSlide = slides[activeIndex]

  const goToSlide = (direction: 1 | -1) => {
    isTransitioning.current = true
    setActiveIndex((current) => (current + direction + slides.length) % slides.length)
    window.setTimeout(() => {
      isTransitioning.current = false
    }, 300)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    isDragging.current = true
    dragStartX.current = event.clientX
    setIsPressing(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDragging.current || isTransitioning.current) return
    const deltaX = event.clientX - dragStartX.current
    if (Math.abs(deltaX) < DRAG_THRESHOLD) return

    goToSlide(deltaX < 0 ? 1 : -1)
    dragStartX.current = event.clientX
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    isDragging.current = false
    setIsPressing(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <>
      <Header title={activeSlide.title} accentColor={activeSlide.color} />
      <main
        className='relative h-dvh w-full overflow-hidden cursor-ew-resize touch-none'
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
          {slides.map((slide, index) =>
            slide.vimeoUrl ? (
              <div
                key={slide.id}
                className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <iframe
                  src={slide.vimeoUrl}
                  title={slide.title}
                  allow='autoplay; fullscreen'
                  className='absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0'
                />
              </div>
            ) : (
              <Image
                key={slide.id}
                src={slide.src}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes='100vw'
                className={`pointer-events-none object-cover transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ),
          )}
        </div>

        <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[100px] md:flex text-center'>
          <Link
            href={`/works/${activeSlide.projectSlug}`}
            style={{ backgroundColor: activeSlide.color }}
            className='pointer-events-auto text-[18px] font-semibold transition-opacity duration-300 hover:opacity-70 px-2'
            onPointerDown={(event) => event.stopPropagation()}
          >
            {activeSlide.title}
          </Link>
        </div>
      </main>
      <Footer slides={slides} activeIndex={activeIndex} onSelect={setActiveIndex} accentColor={activeSlide.color} />
    </>
  )
}
