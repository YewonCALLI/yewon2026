'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/singlet-multiplet/'

const sectionIds = ['overview'] as const

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

export default function SingletMultipletPage() {
  const project = projects.find((p) => p.slug === 'singlet-multiplet')
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
              <ProjectMedia project={project} sizes='(min-width: 768px) 80vw, 100vw' />
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
              <section id='overview' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Overview' title='Layered identities, like quantum states'>
                  <p className='lg:w-[70%]'>
                    Inspired by superposition and entanglement, Singlet &amp; Multiplet shows the many selves within one
                    person through p5.js video art and live performance.
                  </p>
                  <div className='relative aspect-video w-full overflow-hidden bg-neutral-100'>
                    <iframe
                      src='https://www.youtube-nocookie.com/embed/pBTghj77Zhg'
                      title='Singlet & Multiplet video'
                      allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen'
                      allowFullScreen
                      className='absolute left-0 top-0 h-full w-full'
                    />
                  </div>
                </Chapter>
              </section>

              {/* STILLS */}
              <section className='flex flex-col gap-[16px]'>
                <Figure src={imagePath + '01.jpg'} />
                <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                  <Figure src={imagePath + '02.jpg'} />
                  <Figure src={imagePath + '03.jpg'} />
                </div>
                <Figure src={imagePath + '04.jpg'} />
                <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                  <Figure src={imagePath + '06.jpg'} />
                  <Figure src={imagePath + '07.jpg'} />
                </div>
                <Figure src={imagePath + '05.png'} className='md:max-w-[50%]' />
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[24px] lg:w-[70%]'>
                <CreditRow label='Video'>
                  <a
                    href='https://youtu.be/pBTghj77Zhg'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline underline-offset-2 hover:text-[#FF6B00]'
                  >
                    Singlet &amp; Multiplet ↗
                  </a>
                </CreditRow>
                <CreditRow label='Performed in'>
                  <p>8th International New Media Art Exhibition, CICA Museum</p>
                  <p>Beyond the Lens : Nano Bio Nature, Seoul Institute of the Arts, IBS</p>
                </CreditRow>
                <CreditRow label='Published in'>
                  <p>New Media Art 2023 (CICA Museum)</p>
                </CreditRow>
                <CreditRow label='Awarded at'>
                  <p>Spin Art Contest 2021, Center for Quantum Nanoscience (QNS), IBS</p>
                </CreditRow>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
