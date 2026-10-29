'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer, Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'

// projectSlug should match a `slug` in src/app/works/projectlist.ts — clicking the
// centered title (md and up) sends you to that project's dedicated page at /works/[slug].
// color drives the Identity 01-04 text in the header and the active footer thumbnail border.
type Slide = {
  id: string
  title: string
  src: string
  projectSlug: string
  color: string
  vimeoUrl?: string
  // shrink the video inside the viewport (1 = full-bleed) and fill the margin with videoBg
  videoScale?: number
  videoBg?: string
}

const slides: Slide[] = [
  {
    id: 'intro-1',
    title: 'TypoFold',
    src: '/images/intro/intro22.jpg',
    projectSlug: 'typofold',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1220276808?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-2',
    title: 'Daily Folding Practice',
    src: '/images/intro/intro7.jpg',
    projectSlug: 'daily-folding-practice',
    color: '#2DFFA0',
  },
  {
    id: 'intro-3',
    title: 'Weaving Letters',
    src: '/images/intro/intro4.jpg',
    projectSlug: 'weaving-letters',
    color: '#B02DFF',
  },
  {
    id: 'intro-4',
    title: '2026 Samsung Design Membership',
    src: '/images/intro/intro8.jpg',
    projectSlug: 'samsung-design-membership-2026',
    color: '#FF7A2D',
    vimeoUrl:
      'https://player.vimeo.com/video/1216876134?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-5',
    title: 'XR Science Museum',
    src: '/images/intro/intro11.jpg',
    projectSlug: 'xr-science-museum',
    color: '#FF2D8C',
  },
  {
    id: 'intro-6',
    title: '2025 Samsung Design Membership',
    src: '/images/intro/intro9.jpg',
    projectSlug: 'samsung-design-membership-2025',
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
    projectSlug: 'franklin',
    color: '#FF7A2D',
  },
  {
    id: 'intro-9',
    title: 'Naver Software Education Festival 2023',
    src: '/images/intro/intro17.jpg',
    projectSlug: 'sef-2023',
    color: '#FF2D8C',
  },
  {
    id: 'intro-10',
    title: 'Word Wide Web',
    src: '/images/intro/intro13.jpg',
    projectSlug: 'word-wide-web',
    color: '#2DFFA0',
  },
  {
    id: 'intro-14',
    title: 'Memeproject',
    src: '/images/intro/intro19.jpg',
    projectSlug: 'memeproject',
    color: '#2DFFA0',
  },
  {
    id: 'intro-15',
    title: 'Simulating #1,2,3',
    src: '/images/intro/intro20.jpg',
    projectSlug: 'simulating-1-2-3',
    color: '#FF2D8C',
  },
  {
    id: 'intro-11',
    title: 'Singlet & Multiplet',
    src: '/images/intro/intro14.jpg',
    projectSlug: 'singlet-multiplet',
    color: '#B02DFF',
  },
  {
    id: 'intro-12',
    title: 'Silver Bell',
    src: '/images/intro/intro15.jpg',
    projectSlug: 'silver-bell',
    color: '#5220B7',
    videoScale: 0.8,
    videoBg: '#FFFFFF',
    vimeoUrl:
      'https://player.vimeo.com/video/1165424772?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-13',
    title: 'delta-individualism',
    src: '/images/intro/intro16.jpg',
    projectSlug: 'delta-individualism',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1151380515?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-16',
    title: 'Draw the Beat!',
    src: '/images/intro/intro21.jpg',
    projectSlug: 'draw-the-beat',
    color: '#B02DFF',
  },
]

const DRAG_THRESHOLD = 80
const VIMEO_ORIGIN = 'https://player.vimeo.com'

// Shows slide.src as a poster until the Vimeo player reports actual playback,
// so the slide isn't blank while the iframe buffers.
function VimeoSlide({ slide, isActive, priority }: { slide: Slide; isActive: boolean; priority: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const subscribe = () => {
    iframeRef.current?.contentWindow?.postMessage({ method: 'addEventListener', value: 'timeupdate' }, VIMEO_ORIGIN)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN || event.source !== iframeRef.current?.contentWindow) return
      let data = event.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }
      if (data?.event === 'ready') subscribe()
      else if (data?.event === 'timeupdate' && data.data?.seconds > 0) setIsPlaying(true)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={slide.videoBg ? { backgroundColor: slide.videoBg } : undefined}
    >
      <div
        className='absolute inset-0'
        style={slide.videoScale ? { transform: `scale(${slide.videoScale})` } : undefined}
      >
        <iframe
          ref={iframeRef}
          src={slide.vimeoUrl}
          title={slide.title}
          allow='autoplay; fullscreen'
          onLoad={subscribe}
          className='absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0'
        />
        <Image
          src={slide.src}
          alt={slide.title}
          fill
          priority={priority}
          sizes='100vw'
          className={`object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
    </div>
  )
}

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
  const activeExternalUrl = projects.find((p) => p.slug === activeSlide.projectSlug)?.externalUrl

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
              <VimeoSlide key={slide.id} slide={slide} isActive={index === activeIndex} priority={index === 0} />
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
            href={activeExternalUrl ?? `/works/${activeSlide.projectSlug}`}
            {...(activeExternalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{ backgroundColor: activeSlide.color }}
            className='pointer-events-auto text-title font-medium transition-opacity duration-300 hover:opacity-70 px-2'
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
