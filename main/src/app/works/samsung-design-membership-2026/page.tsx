'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header, LinkPreviewCard } from '@/components/projects'
import { projects } from '../projectlist'
import { Figure } from '@/components/projects/Figure'

const sectionIds = ['overview', 'process'] as const

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

export default function SamsungDesignMembership2026Page() {
  const project = projects.find((p) => p.slug === 'samsung-design-membership-2026')
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
            <div className='flex flex-col justify-between  md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] text-[16px] leading-relaxed lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>The online website for 2026 Samsung Design Membership</p>
                <p className='text-black'>
                  06.2026 - 08.2026 / Design Engineering, Frontend Development / Samsung Electronics
                </p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-[3/4] w-full overflow-hidden md:aspect-video md:overflow-hidden'>
              <iframe
                src='https://player.vimeo.com/video/1216876134?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1'
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
                <Chapter kicker='Overview' title='2026 MEP Online Exibition <everyelse>'>
                  <LinkPreviewCard href='https://everyelse.com/' />

                  <div className='flex flex-col gap-[16px]'>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216810683?h=aac914147c&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216810683`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216810688?h=0679d4b714&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216810688`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216818987?h=d2e53d34d0&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216818987`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216819796?h=fbc7a00835&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216819796`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216810711?h=662d2e6c85&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216810711`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216810714?h=3bb086dd9d&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216810714`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                    <div className='relative aspect-video w-full overflow-hidden'>
                      <iframe
                        src='https://player.vimeo.com/video/1216858640?h=88cf382a78&title=0&byline=0&portrait=0&dnt=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=1'
                        title={`${project.name} overview video 1216858640`}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        className='absolute left-0 top-0 h-full w-full'
                      />
                    </div>
                  </div>
                </Chapter>
              </section>

              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Process' title='How I worked with designers'>
                  <p>
                    2026 is a year in which the barrier to entry for AI keeps getting lower, bringing significant shifts
                    to the boundaries between designers' and developers' work. While building the MEP exhibition
                    website, I tried breaking away from the traditional design/development collaboration model and
                    instead experimented with a way of working where designer and developer crossed into each other's
                    territory. Below, I've documented specific moments from that process.
                  </p>
                  <p>
                    The 2026 SDM website includes a participatory section called Our Gaze. In line with the design
                    concept, the designers wanted a motion that conveyed the sensation of being drawn into space, and we
                    decided to implement it with three.js. However, because the exhibition preparation schedule was
                    tight and the design team was short-staffed, I ended up having to build it myself from 2D sketches
                    alone, without any 3D models to work from.
                  </p>
                  <Figure className='w-full py-[16px]' src={'/images/projects/sdm-2026/04.jpg'} />
                  <p>
                    What I first received was a webpage the designers had put together through vibe coding. The zoom
                    in/out range was very narrow, so the sense of being pulled in was only realised at a preview level.
                    I needed to raise the overall polish by adding zoom in/out, hover motion, and click-triggered
                    interactions, while the designers, at the same time, wanted to push that "pulled-in" sensation even
                    further. The number of spheres visible on screen at different zoom levels was another condition that
                    mattered.
                  </p>
                  <div className='grid grid-cols-1 gap-[16px] py-[16px] md:grid-cols-2'>
                    <Figure className='w-full' src={'/images/projects/sdm-2026/01.jpg'} />
                    <Figure className='w-full' src={'/images/projects/sdm-2026/02.jpg'} />
                  </div>
                  <p>
                    The problem was that it was hard to judge, from the vibe-coded webpage alone, how the particles
                    should actually be arranged in 3D space. So I asked the designers to sketch out the direction they
                    had in mind, and they produced several candidate shapes for the pulled-in effect. I worked through
                    each candidate in turn, revising continuously, and eventually proposed an elongated cuboid. In this
                    structure, the spheres stayed evenly distributed across the screen during zoom in/out, and the sense
                    of being drawn inward was still preserved.
                  </p>
                  <Figure className='w-full py-[16px]' src={'/images/projects/sdm-2026/05.png'} />

                  <p>
                    Once the shape was finalised, the next step was defining a set of adjustable parameters (the depth
                    and range of the particle space, the degree of pull toward the centre, the minimum and maximum zoom
                    distance, etc.), then adding further variables the designers requested on top of these. I
                    established minimum and maximum bounds that would not strain performance on web and mobile before
                    handing the panel over, and the designers finalised the actual parameter values themselves from
                    there. In this way, we arrived at a result that satisfied several constraints at once: the pulled-in
                    sensation, uniform density, and performance.
                  </p>
                  <div className='grid grid-cols-1 gap-[16px] py-[16px] md:grid-cols-2'>
                    <Figure className='w-full' src={'/images/projects/sdm-2026/06.webp'} />
                    <Figure className='w-full' src={'/images/projects/sdm-2026/07.webp'} />
                  </div>
                  <div className='grid grid-cols-1 gap-[16px] py-[16px] md:grid-cols-2'>
                    <Figure className='w-full' src={'/images/projects/sdm-2026/08.webp'} />
                    <Figure className='w-full' src={'/images/projects/sdm-2026/09.webp'} />
                  </div>
                  <div className='grid grid-cols-1 gap-[32px] md:grid-cols-2'>
                    <p>
                      We also applied this same collaborative process when building the invitation page and the coming
                      soon page. I found this meaningful, since it let us achieve a highly polished design while
                      reducing the workload for both designers and developers. It also gave me a chance to establish my
                      own approach to communicating with designers when implementing 3D on the web with three.js. Below
                      is a diagram summarising this collaborative process. It reflects our thinking on how designers and
                      developers, while crossing into each other's territory, could communicate efficiently.
                    </p>
                    <Figure className='w-full' src={'/images/projects/sdm-2026/03.jpg'} />
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
