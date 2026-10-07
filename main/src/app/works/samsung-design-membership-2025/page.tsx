'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header, LinkPreviewCard } from '@/components/projects'
import { projects } from '../projectlist'

const sectionIds = ['overview'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-[13px] font-medium text-[#FF2D8C]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className='mt-[4px] text-[20px] font-semibold leading-snug text-black md:text-[22px]'>{children}</h2>
}

function Chapter({
  id,
  kicker,
  title,
  children,
}: {
  id?: string
  kicker: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div
      id={id}
      className='flex scroll-mt-[110px] flex-col gap-[20px] border-t border-black pt-[40px] first:border-t-0 first:pt-0'
    >
      <div>
        <Kicker>{kicker}</Kicker>
        <SectionTitle>{title}</SectionTitle>
      </div>
      {children}
    </div>
  )
}

function VimeoEmbed({ id, title, aspectClassName = 'aspect-video' }: { id: string; title: string; aspectClassName?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1`}
        title={title}
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
        className='absolute left-0 top-0 h-full w-full'
      />
    </div>
  )
}

export default function SamsungDesignMembership2025Page() {
  const project = projects.find((p) => p.slug === 'samsung-design-membership-2025')
  if (!project) notFound()

  const [activeSection, setActiveSection] = useState<string>(sectionIds[0])
  const [isNavStuck, setIsNavStuck] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel')
    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => setIsNavStuck(entry.boundingClientRect.top < 61), {
      root: null,
      rootMargin: '-61px 0px 0px 0px',
      threshold: 0,
    })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header title={project.name} accentColor='#FF2D8C' light mobileLight={isNavStuck} />
      <main className='min-h-dvh w-full pt-[60px] text-black'>
        <div className='flex w-full flex-col md:flex-row md:items-start'>
          {/* Left: full project list */}
          <aside className='hidden md:block w-full shrink-0 border-b border-black px-[30px] py-[24px] md:sticky md:top-[60px] md:h-[calc(100dvh-60px)] md:w-[240px] md:overflow-y-auto md:border-b-0 md:border-r md:px-[30px] md:py-[20px]'>
            <p className='text-[11px] text-neutral-400'>All Works</p>
            <nav className='mt-[16px] flex flex-col gap-[10px]'>
              {projects.map((p) => {
                const isActive = p.slug === project.slug
                return (
                  <Link
                    key={p.slug}
                    href={`/works/${p.slug}`}
                    className={`text-[13px] leading-snug transition-colors ${
                      isActive ? 'font-bold text-black' : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {p.name}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Right: project content */}
          <div className='min-w-0 flex-1 px-[22px] py-[24px] md:px-[40px] md:py-[40px]'>
            <div className='flex flex-col justify-between md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] text-[16px] leading-relaxed lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>The online website for 2025 Samsung Design Membership</p>
                <p className='text-black'>06.2025 - 08.2025 / Frontend Development / Samsung Design Membership</p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-[3/4] w-full overflow-hidden md:aspect-video md:overflow-hidden'>
              <iframe
                src='https://player.vimeo.com/video/1151368571?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1'
                title={`${project.name} video`}
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
                className='pointer-events-none absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2'
              />
            </div>

            {/* In-page section nav */}
            <div id='nav-sentinel' className='h-0' />
            <nav className='sticky top-[60px] z-10 -mx-[22px] mt-[24px] flex gap-x-[16px] overflow-x-auto border-b border-black bg-white px-[22px] py-[10px] no-scroll-bar md:-mx-[40px] md:px-[40px]'>
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`shrink-0 text-[14px] capitalize transition-colors ${
                    activeSection === id ? 'font-bold text-black' : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  {id}
                </a>
              ))}
            </nav>

            <div className='mt-[32px] flex flex-col gap-[64px] text-[15px] leading-relaxed'>
              <section id='overview' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Overview' title='Samsung Design Membership 2025 Online Exhibition <New Formative>'>
                  <LinkPreviewCard href='https://www.newformative.com/' />

                  <div className='flex flex-col'>
                    <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                      <VimeoEmbed
                        id='1156550188'
                        title={`${project.name} video 1156550188`}
                        aspectClassName='aspect-[2160/2700]'
                      />
                      <VimeoEmbed
                        id='1156550324'
                        title={`${project.name} video 1156550324`}
                        aspectClassName='aspect-[2160/2700]'
                      />
                    </div>
                    <VimeoEmbed id='1156601059' title={`${project.name} video 1156601059`} />
                    <VimeoEmbed id='1156605487' title={`${project.name} video 1156605487`} />
                    <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                      <VimeoEmbed
                        id='1156550794'
                        title={`${project.name} video 1156550794`}
                        aspectClassName='aspect-[2160/2700]'
                      />
                      <VimeoEmbed
                        id='1156550589'
                        title={`${project.name} video 1156550589`}
                        aspectClassName='aspect-[2160/2700]'
                      />
                    </div>
                  </div>
                </Chapter>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
