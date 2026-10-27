'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/simulating-1-2-3/'

const sectionIds = ['overview', 'system', 'videos'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-label font-medium text-[#FF6B00]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mt-[4px] max-w-[640px] text-title font-medium leading-snug text-black md:text-title'>{children}</h2>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className='text-label text-neutral-500'>{children}</p>
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
      className='flex scroll-mt-[110px] flex-col gap-[36px] border-t border-black pt-[40px] first:border-t-0 first:pt-0'
    >
      <div>
        <Kicker>{kicker}</Kicker>
        <SectionTitle>{title}</SectionTitle>
      </div>
      {children}
    </div>
  )
}

function CreditRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-[4px] md:flex-row md:gap-[40px]'>
      <p className='shrink-0 font-medium text-black md:w-[140px]'>{label}</p>
      <div className='min-w-0 flex-1'>{children}</div>
    </div>
  )
}

export default function SimulatingPage() {
  const project = projects.find((p) => p.slug === 'simulating-1-2-3')
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
      <Header title={project.name} accentColor={accentColor} light mobileLight={isNavStuck} />
      <main className='min-h-dvh w-full pt-[60px] text-ink'>
        <div className='flex w-full flex-col md:flex-row md:items-start'>
          {/* Left: full project list */}
          <ProjectSidebar activeSlug={project.slug} />

          {/* Right: project content */}
          <div className='min-w-0 flex-1 px-[22px] py-[24px] md:px-[40px] md:py-[40px]'>
            <div className='flex flex-col justify-between gap-[16px] md:flex-row'>
              <h1 className='text-title font-medium'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] lg:w-[70%]'>
                <p className='text-[#FF6B00]'>{project.description}</p>
                <p className='text-ink'>{project.meta}</p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-video w-full overflow-hidden bg-neutral-100'>
              <ProjectMedia project={project} sizes='(min-width: 768px) 80vw, 100vw' nativeControls />
            </div>

            {/* In-page section nav */}
            <div id='nav-sentinel' className='h-0' />
            <nav className='sticky top-[60px] z-10 -mx-[22px] mt-[24px] flex gap-x-[16px] overflow-x-auto border-b border-black bg-white px-[22px] py-[10px] no-scroll-bar md:-mx-[40px] md:px-[40px]'>
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`shrink-0 text-body capitalize transition-colors ${
                    activeSection === id ? 'font-medium text-black' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {id}
                </a>
              ))}
            </nav>

            <div className='mt-[32px] flex flex-col gap-[64px] text-body leading-relaxed'>
              {/* OVERVIEW */}
              <section id='overview' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Overview' title='Uncertainty, simulated'>
                  <p>
                    Simulating #1,2,3 is a digital simulation exploring the gravitational interactions between entities
                    through physical computations. Within the simulation, the artist observes beings in a
                    two-dimensional world, where each run produces different outcomes as the entities exhibit varied
                    behaviors.
                  </p>
                  <p>
                    This unpredictability mirrors the uncertainty of real life, prompting reflection on how we navigate
                    a world full of probabilistic events, continually adjusting to and predicting the unknown.
                  </p>
                </Chapter>
              </section>

              {/* SYSTEM */}
              <section id='system' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='System' title='Gravity in Unreal Engine Blueprint'>
                  <p>
                    The simulation was developed using Unreal Engine&apos;s Blueprint system, where I designed a
                    gravitational algorithm based on the universal law of gravitation. By adjusting parameters such as
                    gravitational acceleration and mass, I controlled the movement of the entities, allowing for dynamic
                    and unique interactions each time the simulation runs.
                  </p>
                  <p>
                    This work invites viewers to reconsider the role of uncertainty in both virtual and real worlds,
                    emphasizing the continuous efforts we make to predict and adapt to the unpredictable.
                  </p>
                </Chapter>
              </section>

              {/* VIDEOS */}
              <section id='videos' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Videos' title='Simulating #1,2,3'>
                  <div className='grid grid-cols-1 gap-[16px] lg:grid-cols-2'>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1000799277?badge=0&autopause=0&portrait=0&byline=0&title=0'
                        title='Simulating #1,2,3'
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1000697197?badge=0&autopause=0&portrait=0&byline=0&title=0'
                        title='Simulating #1,2,3'
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[24px] lg:w-[70%]'>
                <CreditRow label='Video'>
                  <a
                    href='https://vimeo.com/1000799277'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline underline-offset-2 hover:text-[#FF6B00]'
                  >
                    Simulating #1,2,3 ↗
                  </a>
                </CreditRow>
                <CreditRow label='Performed in'>
                  <p>ACC Media Cube, Gwangju</p>
                </CreditRow>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
