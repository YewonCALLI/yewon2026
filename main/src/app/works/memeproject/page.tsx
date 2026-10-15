'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/memeproject/'

const sectionIds = ['overview', 'museum', 'tool', 'exhibition'] as const

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

export default function MemeprojectPage() {
  const project = projects.find((p) => p.slug === 'memeproject')
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
                <p className='text-[#FF6B00]'>
                  An interactive website that explores meme origins, impact, and replication, and helps users create
                  their own memes.
                </p>
                <p className='text-ink'>
                  2023 / Generative, Tool / Graphic Designer, Frontend Developer / PlanT House, Hongcheon Art Museum
                </p>
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
              <section id='overview' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Overview' title='MemeProject + Meme-Making'>
                  <p>
                    MemeProject is an interactive website that explores meme origins, impact, and replication, and helps
                    users create their own memes. The work consists of two modules: the main experience (MemeProject)
                    and a companion meme-making tool (Meme-Making).
                  </p>
                </Chapter>

                <Chapter kicker='Concept' title='Memes as cultural units'>
                  <p>
                    The MemeProject is a fictional company focused on collecting and preserving memes. Drawing on the
                    term &quot;meme&quot; as defined by Richard Dawkins in <i>The Selfish Gene</i>, this project views
                    memes as cultural units that, like genes, replicate and spread independently. While genes are passed
                    down biologically, memes circulate socially, often conveying humor or social critique with a playful
                    edge.
                  </p>
                  <p>
                    This project explores the self-replicating nature of memes and their potential reach, encouraging
                    visitors to reflect on the humorous yet impactful role memes play in shaping cultural narratives.
                  </p>
                </Chapter>
              </section>

              {/* MUSEUM */}
              <section id='museum' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Main Experience' title='A virtual museum with three floors'>
                  <p className='lg:w-[70%]'>
                    Accessible via QR code in the exhibition space, the website invites visitors to a virtual
                    &quot;museum&quot; with three themed floors.
                  </p>
                  <div className='flex flex-col gap-[8px]'>
                    <Figure src={imagePath + '01.jpg'} alt='MemeProject start' />
                    <Caption>MemeProject start</Caption>
                  </div>
                  <div className='grid grid-cols-1 gap-[24px] md:grid-cols-2'>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + '02.jpg'} alt='Floor 1' />
                      <p className='font-medium text-black'>Floor 1: origins</p>
                      <p className='text-neutral-600'>A kitchen-style space explaining meme origins.</p>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + '03.jpg'} alt='Floor 2' />
                      <p className='font-medium text-black'>Floor 2: latest memes and spread</p>
                      <p className='text-neutral-600'>
                        The latest memes alongside a globe sculpture symbolizing meme spread.
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[16px]'>
                    <div>
                      <p className='font-medium text-black'>Floor 3: create and save</p>
                      <p className='text-neutral-600'>Visitors create and save their own memes.</p>
                    </div>
                    <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                      <Figure src={imagePath + '04.jpg'} alt='Floor 3, scenario 1' />
                      <Figure src={imagePath + '05.jpg'} alt='Floor 3, scenario 2' />
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* TOOL */}
              <section id='tool' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Tool' title='Meme-Making'>
                  <p className='lg:w-[70%]'>
                    Meme-Making is a tool where visitors can create and save their own memes.
                  </p>
                  <Figure src={imagePath + '06.jpg'} alt='Meme-Making tool' className='w-full lg:w-[70%]' />
                </Chapter>
              </section>

              {/* EXHIBITION */}
              <section id='exhibition' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Exhibition' title='Access via QR code'>
                  <p className='lg:w-[70%]'>
                    The project&apos;s website is accessible via QR code in the exhibition space.
                  </p>
                  <Figure src={imagePath + '07.jpg'} alt='Exhibition space' />
                  <div className='relative aspect-video w-full overflow-hidden'>
                    <iframe
                      src='https://player.vimeo.com/video/1000663988?h=b0f97e3fee&badge=0&autopause=0&portrait=0&byline=0&title=0&dnt=1'
                      title='MemeProject summary video'
                      allow='autoplay; fullscreen; picture-in-picture'
                      allowFullScreen
                      className='absolute left-0 top-0 h-full w-full'
                    />
                  </div>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[24px] lg:w-[70%]'>
                <CreditRow label='Website'>
                  <div className='flex flex-col gap-[4px]'>
                    <a
                      href='https://memeproject.vercel.app/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline underline-offset-2 hover:text-[#FF6B00]'
                    >
                      memeproject.vercel.app ↗
                    </a>
                    <a
                      href='https://memeproject.vercel.app/world.html'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline underline-offset-2 hover:text-[#FF6B00]'
                    >
                      Meme-Making tool ↗
                    </a>
                  </div>
                </CreditRow>
                <CreditRow label='Performed in'>
                  <p>PlanT House, Hongcheon Art Museum, Hongcheon</p>
                </CreditRow>
                <CreditRow label='Caption'>
                  <p>Yewon Jang, Meme Project, 2023, interactive web, recorded video, cue code, dimensions variable</p>
                </CreditRow>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
