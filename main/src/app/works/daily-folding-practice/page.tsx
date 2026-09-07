'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import CroppedFigure from '../../../components/projects/CroppedFigure'
import { Figure } from '../../../components/projects/Figure'

const imagePath = '/images/projects/daily-folding-practice/'

const sectionIds = ['archive'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-[13px] font-medium text-[#FF2D8C]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mt-[4px] max-w-[640px] text-[20px] font-semibold leading-snug text-black md:text-[22px]'>
      {children}
    </h2>
  )
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

export default function DailyFoldingPracticePage() {
  const project = projects.find((p) => p.slug === 'daily-folding-practice')
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
          <aside className='hidden md:block w-full shrink-0 border-b border-black px-[30px] py-[24px] md:sticky md:top-[60px] md:h-[calc(100dvh-60px)] md:w-[240px] md:overflow-y-auto md:border-b-0 md:border-r md:px-[40px] md:py-[40px]'>
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
            <div className='flex flex-col justify-between  md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] text-[16px] leading-relaxed lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>
                  Collaborated with type designer Namju Ok to further develop TypoFold through a deeper understanding of
                  type design.
                </p>
                <p className='text-black'>
                  04.2026 - 05.2026 / Workshop, Computational Design, Interactive Media / Space PADO
                </p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-[3/4] w-full overflow-hidden md:aspect-video md:overflow-hidden'>
              <ProjectMedia project={project} />
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
              {/* OVERVIEW */}
              <section id='archive' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Archive' title='Installation views'>
                  <div className='flex flex-wrap gap-[16px]'>
                    <Figure src={imagePath + '01.jpg'} />
                    <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                      <Figure src={imagePath + '02.jpg'} />
                      <Figure src={imagePath + '03.jpg'} />
                      <Figure src={imagePath + '04.jpg'} />
                      <Figure src={imagePath + '05.jpg'} />
                    </div>
                    <Figure src={imagePath + '06.jpg'} />
                    <div className='grid grid-cols-1 gap-[16px] overflow-hidden md:grid-cols-2'>
                      <Figure src={imagePath + '07.jpg'} />
                      <div className='grid grid-rows-2 h-full'>
                        <Figure src={imagePath + '08.jpg'} />
                        <Figure src={imagePath + '09.jpg'} />
                      </div>
                      <Figure src={imagePath + '10.jpg'} />
                      <Figure src={imagePath + '11.jpg'} />
                    </div>
                    <Figure src={imagePath + '12.jpg'} />

                    <div className='flex gap-[16px] w-full overflow-hidden'>
                      <Figure className='w-[35.65%]' src={imagePath + '13.jpg'} />
                      <Figure className='w-[64.35%]' src={imagePath + '14.jpg'} />
                    </div>
                    <Figure src={imagePath + '15.jpg'} />
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
