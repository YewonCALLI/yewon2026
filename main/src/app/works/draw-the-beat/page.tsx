'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/draw-the-beat/'

const sectionIds = ['overview', 'process', 'examples'] as const

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

export default function DrawTheBeatPage() {
  const project = projects.find((p) => p.slug === 'draw-the-beat')
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
                <p className='text-[#FF6B00]'>A program that creates music by drawing.</p>
                <p className='text-ink'>2021 / Music, Tool / Creative Technologist</p>
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
                <Chapter kicker='Overview' title='Drawing beats to make music'>
                  <p>
                    Draw the Beat! is an interactive digital art project that blends music and visual design. Using a
                    custom algorithm developed in Wekinator and visual elements created with p5.js, the project allows
                    users to generate sheet music by drawing beats directly on the screen. The generated music visually
                    unfolds in real time, transforming user input into dynamic compositions.
                  </p>
                  <Figure src={imagePath + '00.png'} />
                </Chapter>

                <Chapter
                  kicker='Key Question'
                  title='Is there a way to make music composition more intuitive and visual?'
                >
                  <p>
                    Instead of starting from symbols, the project focuses on trying ideas through gestures and learning
                    through immediate feedback.
                  </p>
                </Chapter>
              </section>

              {/* PROCESS */}
              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 1' title='Creating beats with machine learning'>
                  <p>
                    Draw the Beat! was developed using Processing and Wekinator. Processing visualizes user input in
                    real time and generates musical elements, while Wekinator uses machine learning to recognize
                    user-drawn graphics and trigger sounds.
                  </p>
                  <Figure src={imagePath + '01.png'} />
                  <Caption>Figure 1. Images used in training</Caption>
                  <Figure src={imagePath + '02.png'} className='w-full md:w-1/2' />
                  <Caption>Figure 2. Connecting Processing and Wekinator in real-time via OSC control</Caption>
                </Chapter>

                <Chapter kicker='Process 2' title='Creating sounds'>
                  <Figure src={imagePath + '03.png'} />
                  <Caption>Figure 3. Creating sounds by growing flower&apos;s height</Caption>
                </Chapter>
              </section>

              {/* EXAMPLES */}
              <section id='examples' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Examples' title='An example of a created song: School Bell'>
                  <Figure src={imagePath + '04.png'} className='w-full md:w-1/2' />
                  <Caption>Figure 4. An example of a created song: School Bell</Caption>
                </Chapter>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
