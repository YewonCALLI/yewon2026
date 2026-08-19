'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer, Header } from '@/components/projects'

// projectSlug should match a `slug` in src/app/works/projectlist.ts — clicking the
// centered title (md and up) sends you to that project on the Works page.
// color drives the Identity 01-04 text in the header and the active footer thumbnail border.
const slides = [
  { id: 'intro-1', title: 'TypoFold', src: '/images/intro/intro2.jpg', projectSlug: 'typofold', color: '#FF2D8C' },
  {
    id: 'intro-8',
    title: '2026 Samsung Design Membership',
    src: '/images/intro/intro8.jpg',
    projectSlug: 'franklin',
    color: '#FF7A2D',
    vimeoUrl:
      'https://player.vimeo.com/video/1216876134?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-4',
    title: 'Weaving Letters',
    src: '/images/intro/intro4.jpg',
    projectSlug: 'new-formative',
    color: '#B02DFF',
  },
  { id: 'intro-5', title: 'TypoFold', src: '/images/intro/intro5.jpg', projectSlug: 'silver-bell', color: '#B02DFF' },
  {
    id: 'intro-6',
    title: 'TypoFold',
    src: '/images/intro/intro6.jpg',
    projectSlug: 'word-wide-web',
    color: '#FFD62D',
  },
  { id: 'intro-7', title: 'Daily Folding Practice', src: '/images/intro/intro7.jpg', projectSlug: 'ganpan', color: '#2DFFA0' },
  {
    id: 'intro-9',
    title: '2025 Samsung Design Membership',
    src: '/images/intro/intro9.jpg',
    projectSlug: 'ganpan',
    color: '#2DFFA0',
    vimeoUrl:
      'https://player.vimeo.com/video/1151368571?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-10',
    title: 'Ganpan',
    src: '/images/intro/intro10.jpg',
    projectSlug: 'ganpan',
    color: '#2DFFA0',
  },
]

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isTransitioning = useRef(false)

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

  return (
    <>
      <Header title={activeSlide.title} accentColor={activeSlide.color} />
      <main className='relative h-dvh w-full overflow-hidden'>
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
              className={`object-cover transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ),
        )}

        <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[100px] md:flex'>
          <Link
            href={`/works#${activeSlide.projectSlug}`}
            style={{ backgroundColor: activeSlide.color }}
            className='pointer-events-auto text-[18px] font-semibold transition-opacity duration-300 hover:opacity-70 px-2'
          >
            {activeSlide.title}
          </Link>
        </div>
      </main>
      <Footer slides={slides} activeIndex={activeIndex} onSelect={setActiveIndex} accentColor={activeSlide.color} />
    </>
  )
}
