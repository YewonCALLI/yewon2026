'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/sef-2023/'

const sectionIds = ['overview', 'ux writing', 'webflow', 'deployment', 'staff'] as const

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

export default function Sef2023Page() {
  const project = projects.find((p) => p.slug === 'sef-2023')
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
                <p className='text-ink'>
                  05.2023 - 09.2023 / Web Planning, UX Writing / NAVER Connect Foundation / Product Manager
                </p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-video w-full overflow-hidden'>
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
                <Chapter kicker='Overview' title='Website PM for a software education festival'>
                  <p>
                    SEF (Software Education Festival) is a software education conference hosted by NAVER Connect
                    Foundation since 2017. I worked as the website PM for SEF2023, managing the planning, design, and
                    development processes.
                  </p>
                  <p>
                    It is a festival where anyone interested in software education (teachers, students, parents,
                    companies, and more) can participate. There, they can share experiences and concerns, learn about
                    software education, and explore various sessions on topics like learning methods, know-how, and case
                    studies. The goal is to lower the barriers for entry into the world of software and distribute
                    valuable information. The offline event was held at NAVER 1784.
                  </p>
                  <div className='relative aspect-video w-full overflow-hidden'>
                    <iframe
                      src='https://player.vimeo.com/video/1235992406?autoplay=1&loop=1&muted=1&autopause=0&portrait=0&byline=0&title=0&background=1'
                      title='SEF2023 website, desktop'
                      allow='autoplay; fullscreen; picture-in-picture'
                      allowFullScreen
                      className='pointer-events-none absolute left-0 top-0 h-full w-full'
                    />
                  </div>
                  <div className='flex flex-col gap-[24px]'>
                    <CreditRow label='Role'>
                      <p>Product Manager (Website), Full-time Staff</p>
                    </CreditRow>
                    <CreditRow label='Period'>
                      <p>05/2023 - 09/2023 (Full-time Staff, internship at NAVER Connect Foundation)</p>
                    </CreditRow>
                    <CreditRow label='Skills / tools'>
                      <p>Figma, Zeplin, HTML, CSS</p>
                    </CreditRow>
                    <CreditRow label='Website'>
                      <a
                        href='https://sef.connect.or.kr/2023'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-[#FF6B00]'
                      >
                        sef.connect.or.kr/2023 ↗
                      </a>
                    </CreditRow>
                  </div>
                </Chapter>
              </section>

              {/* UX WRITING */}
              <section id='ux writing' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 1' title="UX Writing: finding SEF's voice">
                  <p>
                    As the first step in creating guidelines for SEF&apos;s content and services, we dedicated time to
                    establish SEF&apos;s unique voice. By defining SEF&apos;s persona and tone of voice, content can be
                    written consistently across various platforms following these guidelines. Additionally, by
                    discussing standardized formats for potentially confusing elements like dates, locations, hashtags,
                    and titles, we aim to facilitate more accurate and efficient work processes.
                  </p>
                  <div className='flex flex-col gap-[16px]'>
                    <p className='text-label font-medium text-black'>SEF2023 Core Value</p>
                    <div className='grid grid-cols-1 gap-[16px] md:grid-cols-3'>
                      <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                        <img
                          src={imagePath + 'char-grow.png'}
                          alt='Grow character'
                          className='h-[88px] w-auto self-start'
                        />
                        <p className='text-heading font-medium text-black'>Grow</p>
                        <p>
                          There are so many others who share the same concerns, we share experiences, and we stand
                          together.
                        </p>
                      </div>
                      <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                        <img
                          src={imagePath + 'char-change.png'}
                          alt='Change character'
                          className='h-[88px] w-auto self-start'
                        />
                        <p className='text-heading font-medium text-black'>Change</p>
                        <p>As the world changes, we must change too.</p>
                      </div>
                      <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                        <img
                          src={imagePath + 'char-learn.png'}
                          alt='Learn character'
                          className='h-[88px] w-auto self-start'
                        />
                        <p className='text-heading font-medium text-black'>Learn</p>
                        <p>Anyone can start, and anyone can learn.</p>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-x-[24px] gap-y-[32px] md:grid-cols-[1fr_1.1fr_1.3fr] md:pt-[40px]'>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-1'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#3FB4E8' }}>
                        Learn
                      </p>
                      <p className='mt-[12px] font-medium text-black'>Like a Teacher</p>
                      <p>Building confidence that you too can start and achieve</p>
                    </div>
                    <div className='relative flex items-center md:col-start-2 md:row-start-1'>
                      <span className="absolute -right-[56px] top-1/2 hidden h-px w-[56px] bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <span className='absolute -right-[12px] hidden border-l border-black md:block top-1/2 -bottom-[32px]' />
                      <p className='absolute -top-[40px] left-1/2 hidden -translate-x-1/2 text-body text-black md:block'>
                        Voice
                      </p>
                      <span className='absolute bottom-1/2 left-1/2 hidden border-l border-dashed border-black md:block -top-[14px]' />
                      <span className='absolute -bottom-[32px] left-1/2 top-1/2 hidden border-l border-dashed border-black md:block' />
                      <span className="relative hidden h-px flex-1 bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <p className='relative z-10 shrink-0 bg-white px-[8px] text-heading text-black md:text-center'>
                        Easy
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-2'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#8FDB4F' }}>
                        Grow
                      </p>
                      <p className='mt-[12px] font-medium text-black'>Like a Peer or Senior</p>
                      <p>Running alongside you, actively providing support</p>
                    </div>
                    <div className='relative flex items-center md:col-start-2 md:row-start-2'>
                      <span className='absolute -right-[12px] top-1/2 hidden h-px w-[12px] bg-black md:block' />
                      <span className='absolute -right-[12px] hidden border-l border-black md:block top-0 -bottom-[32px]' />
                      <span className='absolute bottom-1/2 left-1/2 hidden border-l border-dashed border-black md:block top-0' />
                      <span className='absolute -bottom-[32px] left-1/2 top-1/2 hidden border-l border-dashed border-black md:block' />
                      <span className="relative hidden h-px flex-1 bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <p className='relative z-10 shrink-0 bg-white px-[8px] text-heading text-black md:text-center'>
                        Clear, Distinct
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-3'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#8E7CF0' }}>
                        Change
                      </p>
                      <p className='mt-[12px] font-medium text-black'>WE</p>
                      <p>A virtuous cycle where we help others as much as we&apos;ve grown and received help</p>
                    </div>
                    <div className='relative flex items-center md:col-start-2 md:row-start-3'>
                      <span className='absolute -right-[12px] top-1/2 hidden h-px w-[12px] bg-black md:block' />
                      <span className='absolute -right-[12px] hidden border-l border-black md:block top-0 bottom-1/2' />
                      <span className='absolute bottom-1/2 left-1/2 hidden border-l border-dashed border-black md:block top-0' />
                      <span className="relative hidden h-px flex-1 bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <p className='relative z-10 shrink-0 bg-white px-[8px] text-heading text-black md:text-center'>
                        Empathetic, Warm
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[16px] md:col-start-3 md:row-span-3 md:row-start-1 md:pl-[40px] md:pt-[19px]'>
                      <p className='text-heading text-black'>SEF2023 Voice Persona</p>
                      <p className='text-[48px] font-medium leading-none text-black'>Pace Maker</p>
                      <p className='text-label italic text-neutral-600'>
                        A supporter who adjusts their pace in athletics like track or swimming to help other athletes
                        achieve better records. Common in marathon, speed skating, and other racing events, especially
                        in long-distance competitions.
                      </p>
                      <div className='flex flex-col gap-[20px]'>
                        <p>
                          → For those who want to know if coding is right for them or which field suits them, but
                          don&apos;t know where to start, we guide them step by step
                        </p>
                        <p>
                          → Running alongside those who have just started their development journey until they reach
                          expanded horizons
                        </p>
                        <p>→ A coding pace maker who brings positive influence to the software scene.</p>
                      </div>
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* WEBFLOW */}
              <section id='webflow' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 2' title='Webflow'>
                  <p>
                    I presented my website plan to NAVER&apos;s design and development teams, and over a span of two
                    months, I collaborated on the design, markup, backend development, QA, and deployment processes.
                    SEF2023 involved four website launches and updates, each roughly a week apart.
                  </p>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>1st launch</p>
                      <p>
                        The initial launch of the SEF2023 website, with the primary goal of maximizing pre-event
                        registrations. Working closely with the SEF2023 online and offline event planning team, I
                        ensured that the overall event planning was accurately reflected on the website. About 12,000
                        people registered for the online programs (up about 33% from 9,011 in 2022) and about 2,300 for
                        the offline event.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>2nd update</p>
                      <p>
                        A custom mouse cursor to emphasize SEF&apos;s character more prominently, plus sections to
                        showcase the confirmed speakers for the online and offline programs, an FAQ and a list of
                        sponsors.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>3rd update</p>
                      <p>
                        Went live during the actual event, positioning the live stream of online sessions prominently at
                        the top, along with a section where visitors could try out coding education programs.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>4th update</p>
                      <p>Archiving all the event information after the festival concluded.</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                    <div className='flex flex-col gap-[8px]'>
                      <div className='relative aspect-[4/3] w-full overflow-hidden'>
                        <iframe
                          src='https://player.vimeo.com/video/1002265479?autoplay=1&loop=1&muted=1&autopause=0&portrait=0&byline=0&title=0&background=1'
                          title='SEF2023 1st launch, mobile and tablet'
                          allow='autoplay; fullscreen; picture-in-picture'
                          allowFullScreen
                          className='pointer-events-none absolute left-0 top-0 h-full w-full'
                        />
                      </div>
                      <Caption>1st launch, mobile and tablet</Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <div className='relative aspect-[4/3] w-full overflow-hidden'>
                        <img
                          src={imagePath + '01.gif'}
                          alt='SEF2023 custom mouse cursor'
                          className='absolute left-0 top-0 h-full w-full object-cover object-top'
                        />
                      </div>
                      <Caption>2nd update, custom mouse cursor</Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + 'live.png'} alt='SEF2023 live stream' />
                      <Caption>3rd update, live stream of online sessions</Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <div className='relative aspect-video w-full overflow-hidden'>
                        <iframe
                          src='https://player.vimeo.com/video/1002249919?autoplay=1&loop=1&muted=1&autopause=0&portrait=0&byline=0&title=0&background=1'
                          title='SEF2023 4th update, desktop'
                          allow='autoplay; fullscreen; picture-in-picture'
                          allowFullScreen
                          className='pointer-events-none absolute left-0 top-0 h-full w-full'
                        />
                      </div>
                      <Caption>4th update, desktop</Caption>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                    <div className='flex flex-col '>
                      <Figure src={imagePath + '04.png'} />
                      <Caption>The red box indicates an external link area.</Caption>
                    </div>
                    <Figure src={imagePath + '03.png'} />
                  </div>
                </Chapter>
              </section>

              {/* DEPLOYMENT */}
              <section id='deployment' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 3' title='Development &amp; Deployment'>
                  <p>
                    Following a four-phase deployment plan, we integrated real-time streaming capabilities and partnered
                    with global coding education organizations. The platform was monitored through Google Analytics,
                    which tracked 205,301 visitors (up about 69% from 2022) and 317,131 page views, with a peak of
                    24,885 visitors in a single day (2.7x the 2022 peak of 9,255). Note that SEF2022 was held online
                    only, while SEF2023 added an offline event at NAVER 1784.
                  </p>
                  <p>
                    I also coordinated directly with nonprofit organizations dedicated to coding education worldwide
                    through emails and online meetings to create a section where visitors could try out their programs.
                    More specifically, I contacted the p5.js Foundation for the hands-on booth program and created a
                    section that introduces p5.js in Korean. p5.js also promoted this event on their official Instagram.
                  </p>
                  <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2 md:items-center'>
                    <Figure src={imagePath + '02.png'} />
                    <div className='flex flex-col gap-[8px]'>
                      <div className='relative w-full overflow-hidden pb-[120%]'>
                        <iframe
                          src='https://www.instagram.com/p/Cw2w4dMxETC/embed'
                          title='Instagram of p5.js and SEF2023 collaboration'
                          scrolling='no'
                          className='absolute left-0 top-0 h-full w-full border-0'
                        />
                      </div>
                      <Caption>Instagram of p5.js and SEF2023 collaboration</Caption>
                    </div>
                  </div>
                  <p>
                    Although SEF has been held annually since 2017, it wasn&apos;t widely promoted. To convey that SEF
                    is not a one-time event but an ongoing, trusted program, I planned a section that details the
                    history of SEF. By exploring SEF&apos;s history, visitors can also gain insight into how development
                    trends in Korea have evolved over time.
                  </p>
                  <Figure src={imagePath + '05.gif'} />
                  <Caption>The section that provides an overview of SEF2023&apos;s history</Caption>
                  <p>
                    In 2023, we introduced an SEF character and designed the website around it. Users could create their
                    own characters and share them on Instagram, which led to viral engagement, with over 200
                    participants.
                  </p>
                  <div className='grid grid-cols-3 items-start gap-[8px] md:gap-[16px]'>
                    <Figure src={imagePath + 'mobile-main.jpg'} alt='SEF2023 mobile main' />
                    <Figure src={imagePath + 'mobile-booth.jpg'} alt='SEF2023 mobile hands-on booth' />
                    <Figure src={imagePath + 'mobile-character.jpg'} alt='SEF2023 mobile character event' />
                  </div>
                </Chapter>
              </section>

              {/* STAFF */}
              <section id='staff' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Staff' title='On site at the festival'>
                  <p className='lg:w-[70%]'>
                    Beyond the website, I also joined the offline event at NAVER 1784 as a staff member, facilitating
                    coding meetups and talk busking sessions.
                  </p>
                  <div className='relative aspect-video w-full overflow-hidden'>
                    <iframe
                      src='https://www.youtube-nocookie.com/embed/EG4EocHJbdk'
                      title='SEF2023 video'
                      allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen'
                      allowFullScreen
                      className='absolute left-0 top-0 h-full w-full'
                    />
                  </div>
                  <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                    <Figure src={imagePath + '06.jpg'} />
                    <Figure src={imagePath + '09.jpg'} />
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
