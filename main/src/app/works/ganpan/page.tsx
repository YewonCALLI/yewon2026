'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/ganpan/'

const sectionIds = ['overview', 'process', 'gallery'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-label font-medium text-[#FF6B00]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mt-[4px] max-w-[640px] text-title font-medium leading-snug text-black md:text-title'>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className='text-heading font-medium text-black'>{children}</h3>
}

function Statement({ children }: { children: React.ReactNode }) {
  return <p className='max-w-[640px] text-body font-medium leading-snug text-black'>{children}</p>
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

export default function GanpanPage() {
  const project = projects.find((p) => p.slug === 'ganpan')
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
              <ProjectMedia project={project} />
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
                <Chapter kicker='Overview' title='Turning your sentences into city signboards'>
                  <p>
                    At the core of the project is a digital database made by photographing and labeling individual
                    letters on city signs. On the website built on top of it, users enter their own sentences, which are
                    automatically assembled and displayed as images of letters extracted from the signs.
                  </p>
                  <p>
                    Ganpan not only stores the sentence images users create in digital form, but also turns them into
                    analog publications in the form of zines. This brings the artistic process from the digital back
                    into physical form, in people&apos;s hands, and explores how contemporary digital media can work
                    complementarily with analog.
                  </p>
                  <p>
                    Through the visual reconstruction of text, users are invited to take a fresh look at the spatial
                    landscape of Korea, while the project presents the possibilities of digital art (website) and print
                    media.
                  </p>
                  <Figure src={imagePath + '01.jpg'} />
                </Chapter>
              </section>

              {/* PROCESS */}
              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process' title='Reversing the methodology of AI'>
                  <p>
                    Ganpan operates in the opposite direction of AI image generation. While AI learns from countless
                    sources to create images with untraceable origins, Ganpan collects individual letters from Korean
                    city signboards and clearly preserves their sources. User-inputted text is transformed into actual
                    signboard letters, and clicking each letter reveals its original signboard context.
                  </p>
                  <Figure src={imagePath + 'ai-vs-ganpan.png'} />
                  <Caption>Figure 1. Diagram comparing an AI image generation model and Ganpan</Caption>
                </Chapter>

                <Chapter kicker='Pipeline' title='From signboard photos to letter database'>
                  <p>
                    Ganpan stores original signboard images and their extracted individual characters (e.g.
                    &apos;은&apos;, &apos;마&apos;, &apos;종&apos;, &apos;합&apos;, &apos;상&apos;, &apos;가&apos;) in a
                    relational structure within a Supabase database. When a user enters text, the system queries the
                    database to retrieve matching letter images and displays them on screen. Each letter image is linked
                    to its source signboard image through a parent key, so clicking any character shows the original
                    signboard context.
                  </p>
                  <Figure src={imagePath + 'pipeline.png'} />
                  <Caption>Figure 2. Ganpan website&apos;s pipeline</Caption>
                </Chapter>

                <Chapter kicker='3D Plaza' title='A plaza built from user-made signboards'>
                  <p>
                    More than 300 user-generated signboard images were collected in the dataset. I used three.js to
                    create a plaza of these images, where you can see them combine to form a tall building.
                  </p>
                  <Figure src={imagePath + 'plaza.jpg'} />
                </Chapter>
              </section>

              {/* GALLERY */}
              <section id='gallery' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Gallery' title='Ganpan in use'>
                  <div className='flex flex-col md:flex-row md:items-stretch bg-black'>
                    <div className='w-full min-w-0 md:flex-[1.45_1_0%]'>
                      <Figure src={imagePath + '01.jpg'} />
                    </div>
                    <div className='flex w-full min-w-0 flex-col md:flex-1'>
                      <Figure src={imagePath + '02.jpg'} className='md:h-0 md:flex-1 md:object-cover' />
                      <Figure src={imagePath + '03.jpg'} className='md:h-0 md:flex-1 md:object-cover' />
                      <Figure src={imagePath + '04.jpg'} className='md:h-0 md:flex-1 md:object-cover' />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row md:items-stretch'>
                    <div className='w-full min-w-0 md:relative md:flex-[1.6_1_0%]'>
                      <Figure src={imagePath + '08.jpg'} className='md:absolute md:inset-0 md:h-full md:object-cover' />
                    </div>
                    <div className='flex w-full min-w-0 flex-col md:flex-1'>
                      <Figure src={imagePath + '09.jpg'} />
                      <Figure src={imagePath + '10.jpg'} />
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
