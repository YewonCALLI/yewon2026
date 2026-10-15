'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#5220B7'

const imagePath = '/images/projects/silver-bell/'

const sectionIds = ['research', 'development', 'final design', 'reflection'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-label font-medium text-[#5220B7]'>{children}</p>
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

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <p className='border-l-2 border-[#5220B7] pl-[16px] text-heading font-medium leading-snug text-black lg:w-[70%]'>
      {children}
    </p>
  )
}

function StatCard({ label, stats }: { label: string; stats: { value: string; note: string }[] }) {
  return (
    <div className='flex flex-col gap-[12px] border-t border-black pt-[12px]'>
      <p className='text-[11px] font-medium leading-tight text-[#5220B7] md:text-label'>{label}</p>
      {stats.map((s) => (
        <div key={s.note}>
          <p className='text-heading font-medium leading-none text-black md:text-title'>{s.value}</p>
          <p className='mt-[4px] text-[11px] leading-tight text-neutral-500 md:text-label'>{s.note}</p>
        </div>
      ))}
    </div>
  )
}

function FindingNumber({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className='flex gap-[12px]'>
      <span className='flex h-[24px] w-[24px] shrink-0 items-center justify-center border border-[#5220B7] text-label text-[#5220B7]'>
        {n}
      </span>
      <p className='font-medium text-black'>{children}</p>
    </div>
  )
}

function QA({ who, q, a }: { who: string; q: string; a: string }) {
  return (
    <div className='ml-[36px] flex flex-col gap-[4px] border-t border-neutral-300 pt-[8px]'>
      <p className='text-label text-neutral-500'>{who}</p>
      <p className='text-black'>Q. {q}</p>
      <p className='text-neutral-600'>A. {a}</p>
    </div>
  )
}

function BarrierCard({
  title,
  evidence,
  quotes,
  insight,
}: {
  title: string
  evidence?: string
  quotes: { text: string; by: string }[]
  insight: string
}) {
  return (
    <div className='flex flex-col gap-[16px] border-t border-black pt-[12px]'>
      <p className='text-heading font-medium leading-snug text-black'>{title}</p>
      {evidence && <p className='text-neutral-600'>{evidence}</p>}
      {quotes.map((q) => (
        <figure key={q.by + q.text.slice(0, 12)} className='flex flex-col gap-[4px]'>
          <blockquote className='text-black'>“{q.text}”</blockquote>
          <figcaption className='text-label text-neutral-500'>— {q.by}</figcaption>
        </figure>
      ))}
      <p className='mt-auto border-l-2 border-[#5220B7] pl-[12px] font-medium text-black'>{insight}</p>
    </div>
  )
}

function PrincipleCard({
  step,
  title,
  icon,
  text,
  direction,
}: {
  step: string
  title: string
  icon: string
  text: string
  direction: string
}) {
  return (
    <div className='flex flex-col gap-[8px] border-t border-black pt-[10px]'>
      <div className='flex items-center justify-between'>
        <p className='text-label font-medium text-[#5220B7]'>{step}</p>
        <img src={imagePath + icon} alt='' className='h-[40px] w-auto mix-blend-multiply' />
      </div>
      <p className='font-medium leading-snug text-black'>{title}</p>
      <p className='text-label leading-snug text-neutral-600'>{text}</p>
      <p className='mt-[4px] border-l-2 border-[#5220B7] pl-[8px] text-label font-medium uppercase leading-tight text-black'>
        {direction}
      </p>
    </div>
  )
}

function SolutionPart({ src, label, text, plus }: { src: string; label: string; text: string; plus?: boolean }) {
  return (
    <div className='flex flex-col items-center gap-[12px] text-center'>
      <div className='relative w-full'>
        <img src={imagePath + src} alt={label} className='aspect-square w-full rounded-full object-cover' />
        {plus && (
          <span className='absolute left-[calc(100%+20px)] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-title leading-none md:left-[calc(100%+60px)] md:block'>
            +
          </span>
        )}
      </div>
      <p className='text-label font-medium text-black md:text-body'>{label}</p>
      <p className='text-[11px] leading-snug text-neutral-600 md:text-body'>{text}</p>
    </div>
  )
}

function InterviewCard({
  src,
  who,
  meta,
  insights,
}: {
  src: string
  who: string
  meta: string[]
  insights: { title: string; note?: string }[]
}) {
  return (
    <div className='flex flex-col gap-[12px] md:grid md:grid-cols-[0.75fr_1.25fr] md:items-stretch'>
      <div className='relative aspect-[2/1] overflow-hidden rounded-[8px] md:aspect-auto'>
        <img src={imagePath + src} alt={who} className='h-full w-full object-cover' />
        <div className='pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-[12px] pb-[32px] text-white'>
          <p className='text-body font-medium leading-snug'>{who}</p>
          {meta.map((m) => (
            <p key={m} className='mt-[2px] text-label leading-snug'>
              {m}
            </p>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-[16px] rounded-[8px] bg-neutral-100 p-[16px]'>
        <p className='text-label font-medium text-[#5220B7]'>Insights</p>
        <ol className='flex flex-col gap-[16px]'>
          {insights.map((i, idx) => (
            <li key={i.title} className='flex gap-[10px]'>
              <span className='flex h-[22px] w-[22px] shrink-0 items-center justify-center border border-[#5220B7] text-label text-[#5220B7]'>
                {idx + 1}
              </span>
              <div>
                <p className='font-medium leading-snug text-black'>{i.title}</p>
                {i.note && <p className='mt-[2px] text-label text-neutral-500'>{i.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function RoutineRow({ time, moves }: { time: string; moves: { name: string; how: string }[] }) {
  return (
    <div className='grid grid-cols-2 gap-[8px] md:grid-cols-[0.8fr_1fr_1fr] md:gap-[16px]'>
      <p className='col-span-2 text-body text-black md:col-span-1'>{time}</p>
      {moves.map((m) => (
        <div key={m.name}>
          <p className='text-body text-black'>{m.name}</p>
          <p className='mt-[2px] flex gap-[6px] text-label text-neutral-600'>
            <span>▪</span>
            <span>{m.how}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

function TimeInsight({ n, title, note }: { n: number; title: string; note?: string }) {
  return (
    <div className='flex gap-[12px]'>
      <span className='flex h-[24px] w-[24px] shrink-0 items-center justify-center border border-[#5220B7] text-label text-[#5220B7]'>
        {n}
      </span>
      <div>
        <p className='font-medium text-black'>{title}</p>
        {note && <p className='text-label text-neutral-500'>{note}</p>}
      </div>
    </div>
  )
}

function Swatches({ colors }: { colors: { name: string; hex: string; dark?: boolean }[] }) {
  return (
    <div>
      <p className='mb-[8px] text-label text-neutral-500'>Used colors</p>
      <div className='flex overflow-hidden border border-neutral-300'>
        {colors.map((c) => (
          <div
            key={c.hex}
            className={`flex h-[72px] flex-1 flex-col justify-end p-[8px] text-[11px] leading-tight ${
              c.dark ? 'text-white' : 'text-black'
            }`}
            style={{ backgroundColor: c.hex }}
          >
            <span className='uppercase'>{c.name}</span>
            <span>{c.hex}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureItem({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className='flex gap-[12px]'>
      <span className='flex h-[24px] w-[24px] shrink-0 items-center justify-center border border-[#5220B7] text-label text-[#5220B7]'>
        {n}
      </span>
      <div>
        <p className='font-medium text-black'>{title}</p>
        <p className='text-neutral-600'>{text}</p>
      </div>
    </li>
  )
}

export default function SilverBellPage() {
  const project = projects.find((p) => p.slug === 'silver-bell')
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
                <p className='text-[#5220B7]'>
                  A research-based app that makes it easier for seniors with mobility challenges to start exercising.
                </p>
                <p className='text-ink'>
                  2024 / Design Research, Application Development / Hwawon: Hongyeongil Residency / Team project
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
              {/* RESEARCH */}
              <section id='research' className='flex scroll-mt-[110px] flex-col gap-[72px]'>
                <Chapter kicker='Background' title='Rapid aging in an emerging cultural hub'>
                  <p className='lg:w-[70%]'>
                    During the Hwayeon: Hongyeon-gil residency (Sep 2023 to Jan 2024), we observed rapid gentrification
                    and the growth of cultural infrastructure. However, older residents were largely absent from these
                    emerging cultural routes.
                  </p>
                  <div className='grid grid-cols-1 gap-[24px] md:grid-cols-[1.1fr_1fr] lg:w-[70%]'>
                    <div className='flex flex-col gap-[16px]'>
                      <div className='grid grid-cols-3 gap-[8px] md:grid-cols-1 md:gap-[16px]'>
                        <StatCard
                          label='Aging is concentrated'
                          stats={[
                            { value: '236.8%', note: 'Aging index, Hongyeon-gil (2021)' },
                            { value: '168.03%', note: 'Aging index, Seoul average' },
                          ]}
                        />
                        <StatCard
                          label='Becoming a cultural hub'
                          stats={[
                            { value: '13', note: 'Galleries' },
                            { value: '250', note: 'Artists (Yeonhui Art Fair, 2022)' },
                          ]}
                        />
                        <StatCard
                          label='The area is changing rapidly'
                          stats={[
                            { value: '49,745m²', note: 'Public redevelopment area' },
                            { value: '1,094', note: 'Planned housing units (Public Redevelopment Plan)' },
                          ]}
                        />
                      </div>
                      <Caption>
                        Seoul Open Data Plaza (Seoul Statistics), Dependency Ratio and Aging Index (by dong), 2021.
                      </Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + 'r-map.jpg'} alt='Map of the Hongyeon-gil redevelopment site' />
                      <Caption>Redevelopment site and surrounding cultural infrastructure</Caption>
                    </div>
                  </div>
                  <Insight>
                    Cultural growth is accelerating, but older residents remain largely excluded from participation.
                  </Insight>
                </Chapter>

                <Chapter kicker='Field Research 01' title='Online survey: how younger residents describe Hongyeon-gil'>
                  <p className='lg:w-[70%]'>
                    We mapped how younger residents describe Hongyeon-gil, and whether older adults appear in that
                    narrative. The survey ran through Instagram, in collaboration with the Hongyeon-gil influencer
                    @hongyeongil_seoul, and captured local knowledge and how younger residents perceive older adults.
                  </p>
                  <Figure
                    src={imagePath + 'r-survey-posts.jpg'}
                    alt='Survey poster and form'
                    className='w-full lg:w-[70%]'
                  />

                  <div className='flex flex-col gap-[24px] border-t border-black pt-[24px]'>
                    <div>
                      <p className='text-heading font-medium text-black'>Survey Results</p>
                      <p className='text-label text-neutral-500'>34 participants</p>
                    </div>
                    <div className='grid grid-cols-1 items-start gap-[24px] lg:grid-cols-3'>
                      <Figure src={imagePath + 'r-survey-results.jpg'} alt='Online survey participants' />
                      <div className='flex flex-col gap-[12px]'>
                        <FindingNumber n={1}>
                          Older adults were rarely mentioned in how people described Hongyeon-gil.
                        </FindingNumber>
                        <Figure
                          src={imagePath + 'r-wordcloud.jpg'}
                          alt='Word cloud of survey responses'
                          className='w-[70%] lg:w-full'
                        />
                      </div>
                      <div className='flex flex-col gap-[12px]'>
                        <FindingNumber n={2}>
                          Hongyeon-gil is remembered through commercial leisure venues.
                        </FindingNumber>
                        <Figure
                          src={imagePath + 'r-bar.jpg'}
                          alt='Venues that come to mind first'
                          className='w-[70%] lg:w-full'
                        />
                      </div>
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Field Research 02' title='Interviews: stories of older residents offline'>
                  <p className='lg:w-[70%]'>
                    We conducted in-person interviews with 42 participants to gather information about older adults who
                    are not visible in online surveys.
                  </p>
                  <div className='grid grid-cols-2 items-center gap-[24px]'>
                    <Figure src={imagePath + 'r-interview-donuts.jpg'} alt='Interview participants' />
                    <Figure src={imagePath + 'r-interview-photo.jpg'} alt='Interview session' />
                  </div>
                  <div className='grid grid-cols-1 gap-[24px] md:grid-cols-3'>
                    <div className='flex flex-col gap-[12px]'>
                      <FindingNumber n={1}>
                        Older adults&apos; daily routines are highly structured around health-related and community
                        spaces.
                      </FindingNumber>
                      <QA
                        who='Pharmacy interview'
                        q='Where do older residents go most often?'
                        a='They mostly go to the senior center. For health, they also visit Hongjecheon river and swimming pools.'
                      />
                      <QA
                        who='Senior center interview'
                        q='Have you ever been to art galleries in Hongyeon-gil?'
                        a='We have nothing to do with art.'
                      />
                    </div>
                    <div className='flex flex-col gap-[12px]'>
                      <FindingNumber n={2}>
                        Hongyeon-gil older residents use smartphones frequently, but passively.
                      </FindingNumber>
                      <QA
                        who='Senior center interview'
                        q='What do you use most on your phone?'
                        a='I only answer calls. I just open alarms when they pop up. Nothing else.'
                      />
                    </div>
                    <div className='flex flex-col gap-[12px]'>
                      <FindingNumber n={3}>
                        Many Hongyeon-gil older residents have mobility issues and chronic pain.
                      </FindingNumber>
                      <QA
                        who='Clinic interview'
                        q='What do older residents struggle with most?'
                        a="Back pain, difficulty walking ... some can't get out easily."
                      />
                      <QA
                        who='Senior center interview'
                        q='What is your biggest concern while operating Hongyeon Senior Center?'
                        a="Many elderly people have mobility issues and can't come to the senior center often."
                      />
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Field Research 03' title='Three barriers in everyday routines'>
                  <p className='lg:w-[70%]'>
                    By combining the online survey (how people describe Hongyeon-gil) and offline interviews (how older
                    adults live day-to-day), we identified three barriers that prevent older residents from
                    participating, even when cultural infrastructure grows.
                  </p>
                  <div className='grid grid-cols-1 gap-[24px] md:grid-cols-3'>
                    <BarrierCard
                      title='Older adults are absent from the mainstream narrative'
                      evidence='The first elderly-related term appeared at rank 38 (“older adults”), and it was mentioned 12 times.'
                      quotes={[
                        {
                          text: 'I’ve never been to any galleries in Hongyeon-gil since I moved here in 1985. We have nothing to do with art.',
                          by: 'Hongyeon senior center member A',
                        },
                      ]}
                      insight='Cultural infrastructure did not translate into perceived access for seniors.'
                    />
                    <BarrierCard
                      title='“Going out” is a high-cost action'
                      evidence='Hongyeon-gil is known for its cafés and galleries, but these aren’t places seniors usually visit.'
                      quotes={[
                        {
                          text: 'Many elderly residents in Hongyeon-dong have mobility issues. The area has a lot of steep hills. Some seniors can’t even make it here to Hongyeon Market where the hospital is located.',
                          by: 'Director of Saecheonnyeon Clinic at Hongyeon Market',
                        },
                      ]}
                      insight='Participation must be home-based, low-effort, and safe for limited mobility.'
                    />
                    <BarrierCard
                      title='The phone is reliable, but access is notification-led'
                      quotes={[
                        {
                          text: 'Many older adults spend time watching YouTube and short videos on their phones.',
                          by: 'A pharmacist who runs Hongyeon-Pharmacy',
                        },
                        {
                          text: 'I only use it for phone calls really, trying to learn bit by bit. I check messages, that’s about it.',
                          by: 'Hongyeon senior center member B',
                        },
                      ]}
                      insight='Design should be notification-first and delivered in familiar video-based cues.'
                    />
                  </div>
                </Chapter>

                <Chapter kicker='Problem Framing' title='Exercise initiation is the bottleneck'>
                  <p className='lg:w-[70%]'>
                    Interviews suggest barriers are less about motivation and more about effort, risk, and
                    decision-making at the moment of starting.
                  </p>
                  <div className='grid grid-cols-1 gap-[24px] lg:w-[70%] lg:grid-cols-[1.1fr_1fr]'>
                    <div className='grid grid-cols-2 gap-[16px]'>
                      <div className='flex flex-col gap-[8px]'>
                        <Figure
                          src={imagePath + 'r-photo-left.jpg'}
                          alt='An older resident explaining how he uses a smartphone'
                        />
                        <Caption>An older resident explaining how he uses a smartphone</Caption>
                      </div>
                      <div className='flex flex-col gap-[8px]'>
                        <Figure src={imagePath + 'r-photo-right.jpg'} alt='A steep uphill street in Hongyeon-gil' />
                        <Caption>A steep uphill street in Hongyeon-gil</Caption>
                      </div>
                    </div>
                    <div className='flex flex-col gap-[24px]'>
                      <div>
                        <p className='text-label font-medium text-[#5220B7]'>Key question</p>
                        <p className='mt-[4px] text-title font-medium leading-snug text-black'>
                          How can mobile interfaces reduce exercise initiation costs for older adults with limited
                          mobility in everyday life?
                        </p>
                      </div>
                      <div>
                        <p className='font-medium text-black'>What makes starting hard?</p>
                        <ol className='mt-[8px] flex list-decimal flex-col gap-[8px] pl-[20px]'>
                          <li>
                            In Hongyeon-gil, steep hills make it difficult for older adults to reach exercise programs
                            at senior centers or swimming pools.
                          </li>
                          <li>
                            Many older residents have limited mobility, which makes leaving home and moving around
                            physically demanding.
                          </li>
                          <li>Many older adults were unsure when to exercise or what kind of exercises to do.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[72px]'>
                <Chapter kicker='Design Directions' title='Three key principles for reframing participation'>
                  <p className='lg:w-[70%]'>
                    Based on field research, we reframed participation to reduce effort, risk, and decision-making.
                  </p>
                  <div className='grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[16px] lg:w-[70%]'>
                    <PrincipleCard
                      step='Step 1'
                      title='Reducing the threshold of participation'
                      icon='d-icon-home.jpg'
                      text='Participation can begin at the scale of the body, without leaving home.'
                      direction='Home-based participation'
                    />
                    <PrincipleCard
                      step='Step 2'
                      title='Finding the most safe and familiar movement of the body'
                      icon='d-icon-move.jpg'
                      text='Among bodily practices, repetitive, familiar movements minimize cognitive and physical load.'
                      direction='Familiar movements'
                    />
                    <PrincipleCard
                      step='Step 3'
                      title='Finding the medium where bodily practice begins'
                      icon='d-icon-phone.jpg'
                      text='For participation to occur, initiation must not rely on intention, but be triggered externally.'
                      direction='Send notifications'
                    />
                  </div>
                </Chapter>

                <Chapter kicker='Proposed Solution' title='Notification-first morning exercise at home'>
                  <p className='lg:w-[70%]'>
                    Interviews indicate that notifications are a primary entry point for older adults&apos; smartphone
                    use. We designed a morning exercise experience that starts the moment they tap a notification. By
                    combining familiar routines with instant video playback, we reduce browsing and decision-making
                    before exercise.
                  </p>
                  <div className='grid grid-cols-3 items-start gap-[12px] md:gap-[120px] lg:w-[70%]'>
                    <SolutionPart
                      plus
                      src='d-circle-exercise.jpg'
                      label='Morning exercise'
                      text='Familiar routine recommended by the pharmacist and doctor in Hongyeon-gil.'
                    />
                    <SolutionPart
                      plus
                      src='d-circle-alert.jpg'
                      label='Alerts'
                      text='Older adults tend to open notifications they receive, rather than browse for apps.'
                    />
                    <SolutionPart
                      src='d-circle-video.jpg'
                      label='Video content'
                      text='Video media that older adults of Hongyeon Senior Center watch frequently on a daily basis.'
                    />
                  </div>
                </Chapter>

                <Chapter kicker='Design Process 01' title='Exercise routine design'>
                  <p className='lg:w-[70%]'>
                    To inform the exercise design, we consulted the pharmacist and the physician in Hongyeon-gil again.
                  </p>
                  <div className='grid grid-cols-1 gap-[24px] lg:w-[70%] xl:grid-cols-2'>
                    <InterviewCard
                      src='d-clinic.jpg'
                      who='Director of Saecheonnyeon Clinic at Hongyeon Market'
                      meta={['Age: 53', 'No residence record in Hongyeon-gil']}
                      insights={[
                        { title: 'High proportion of elderly patients', note: '70% of patients are aged 60+.' },
                        {
                          title:
                            'Some exercise outdoors doing national calisthenics, and movements synchronized with familiar commands and rhythms work well.',
                        },
                        {
                          title:
                            'Large health variations among elderly individuals (significant individual differences).',
                        },
                      ]}
                    />
                    <InterviewCard
                      src='d-pharmacy.jpg'
                      who='Pharmacist at Hong Yeon Pharmacy'
                      meta={['Age: 55', 'Has lived here since 1985, for approximately 38 years']}
                      insights={[
                        { title: 'I see elderly patients regularly, mostly in the afternoon hours.' },
                        {
                          title: 'The most common complaints are musculoskeletal pain.',
                          note: 'Treated with analgesics and muscle relaxants',
                        },
                        {
                          title: 'National calisthenics* would be the best option if they were to exercise.',
                          note: '*A standardized exercise routine broadcast on Korean radio and TV',
                        },
                      ]}
                    />
                  </div>
                  <div className='rounded-[8px] bg-[#5220B7] px-[24px] py-[20px] text-center text-white lg:w-[70%]'>
                    <p className='text-label'>Key Insight</p>
                    <p className='mt-[4px] text-heading font-medium leading-snug'>
                      Design low-intensity exercises based on familiar routines like national calisthenics, accounting
                      for individual differences rather than introducing new movements.
                    </p>
                  </div>

                  <div className='flex flex-col gap-[16px] border-t border-black pt-[24px]'>
                    <p className='text-heading font-medium text-black'>Collaborated with a dance specialist</p>
                    <p className='lg:w-[70%]'>
                      Create a familiar, safe routine older adults can follow without learning new moves.
                    </p>
                  </div>
                  <div className='grid grid-cols-1 items-start gap-[24px] md:grid-cols-[0.8fr_1.2fr] lg:w-[70%]'>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + 'd-dancer.jpg'} alt='Routine movements by the dancer' />
                      <Caption>Collaborated with a dancer, Eunjeong Lim</Caption>
                    </div>
                    <div className='flex h-full flex-col justify-between gap-[24px] rounded-[8px] bg-neutral-100 p-[24px]'>
                      <RoutineRow
                        time='Morning exercise'
                        moves={[
                          {
                            name: 'Neck Rotations',
                            how: 'Turn your head to the left twice, then to the right twice, slowly and gently.',
                          },
                          { name: 'Tap Tap', how: 'Lightly tap across your chest from left to right.' },
                        ]}
                      />
                      <RoutineRow
                        time='Lunch exercise'
                        moves={[
                          {
                            name: 'Chest Thumps',
                            how: 'Alternate left and right, lightly tapping your chest, belly, and knees with a soft fist.',
                          },
                          { name: 'Wrist Bends', how: 'Bend your wrists, then release and straighten them.' },
                        ]}
                      />
                      <RoutineRow
                        time='Evening exercise'
                        moves={[
                          {
                            name: 'Arm Circles',
                            how: 'Circle your left arm twice, then your right arm twice, then both arms twice.',
                          },
                          {
                            name: 'Balance',
                            how: 'Keep both feet on the floor, slightly bend your knees, and find a stable balance.',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Design Process 02' title='Notification time planning'>
                  <p className='lg:w-[70%]'>
                    Send notifications at times when older adults are most likely to notice and act.
                  </p>
                  <div className='grid grid-cols-1 items-start gap-[24px] md:grid-cols-[0.5fr_0.9fr_1.6fr] lg:w-[70%]'>
                    <div className='relative overflow-hidden'>
                      <Figure src={imagePath + 'd-notif-photo.jpg'} alt='Interview at Hongyeon senior center' />
                      <div className='pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-[16px] pb-[40px] text-white'>
                        <p className='text-heading font-medium leading-snug'>Director of Hongyeon senior center</p>
                        <p className='mt-[4px] text-label'>Age 70</p>
                        <p className='text-label'>Has lived here for more than 50 years</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-[20px]'>
                      <p className='text-label font-medium text-[#5220B7]'>Insights</p>
                      <TimeInsight n={1} title='Morning exercise: 10:00 AM - 11:00 AM' />
                      <TimeInsight
                        n={2}
                        title='Lunch exercise: 2:00 PM'
                        note='Senior center lunch typically ends around 1:00 PM'
                      />
                      <TimeInsight
                        n={3}
                        title='Evening exercise: 8:00 PM'
                        note='Dinner is usually around 7:30 PM, and many go to bed soon after, so a reminder near the end of the evening routine works best'
                      />
                    </div>
                    <Figure src={imagePath + 'd-notif-chart.jpg'} alt='Daily schedule and exercise decision' />
                  </div>
                </Chapter>

                <Chapter kicker='Design Process 03' title='Familiar & readable UI for Hongyeon-gil seniors'>
                  <p className='lg:w-[70%]'>
                    Make the interface instantly recognizable and readable for Hongyeon-gil older adults.
                  </p>
                  <div className='flex flex-col gap-[8px]'>
                    <p className='font-medium text-black'>Interaction design: user flow</p>
                    <Figure src={imagePath + 'd-flow.jpg'} alt='User flow' />
                  </div>

                  <div className='flex flex-col gap-[24px] border-t border-black pt-[24px]'>
                    <p className='font-medium text-black'>Color of accessibility for seniors</p>
                    <div className='grid grid-cols-1 items-start gap-[24px] lg:grid-cols-2'>
                      <div className='flex flex-col gap-[16px]'>
                        <p className='text-label font-medium text-[#5220B7]'>First design</p>
                        <p>
                          Following the guidelines of the &lt;Color Universal Design Organization research&gt; by Okabe
                          Masataka and Ito Kei, we initially developed our color palette based on a color chart that
                          ensures people with color vision deficiency can clearly distinguish the colors.
                        </p>
                        <Figure src={imagePath + 'd-palette-table.jpg'} alt='Color Universal Design chart' />
                        <Swatches
                          colors={[
                            { name: 'Black', hex: '#000000', dark: true },
                            { name: 'Bluish green', hex: '#009E73', dark: true },
                            { name: 'Yellow', hex: '#F0E442' },
                            { name: 'Vermillion', hex: '#D55E00', dark: true },
                            { name: 'White', hex: '#FFFFFF' },
                          ]}
                        />
                      </div>
                      <Figure
                        src={imagePath + 'd-mockups-first.jpg'}
                        alt='First design under color blindness simulation'
                      />
                    </div>

                    <div className='grid grid-cols-1 items-start gap-[24px] lg:grid-cols-2'>
                      <div className='flex flex-col gap-[16px]'>
                        <p className='text-label font-medium text-[#5220B7]'>Design iteration</p>
                        <Figure src={imagePath + 'd-iter-photo.jpg'} alt='QA session with an older adult' />
                        <p>
                          After applying color-blind friendly colors and conducting QA sessions with actual elderly
                          users, we discovered that emphasizing the importance of buttons to be pressed was more
                          critical than color alone. As a result, we retained color only for the most frequently used
                          button and removed colors elsewhere, significantly improving readability.
                        </p>
                        <Swatches
                          colors={[
                            { name: 'Black', hex: '#000000', dark: true },
                            { name: 'Bluish green', hex: '#009E73', dark: true },
                            { name: 'Vermillion', hex: '#D55E00', dark: true },
                            { name: 'White', hex: '#FFFFFF' },
                          ]}
                        />
                      </div>
                      <Figure
                        src={imagePath + 'd-mockups-iter.jpg'}
                        alt='Iterated design under color blindness simulation'
                      />
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* FINAL DESIGN */}
              <section id='final design' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Final Design' title='Key features'>
                  <div className='grid grid-cols-1 items-start gap-[32px] md:grid-cols-[1.2fr_1fr]'>
                    <Figure src={imagePath + 'f-photo.jpg'} alt='Silver Bell at the showcase' />
                    <ol className='flex flex-col gap-[24px]'>
                      <FeatureItem
                        n={1}
                        title='Notification-first start'
                        text='Notifications are sent at scheduled times, and exercise begins immediately when the user taps the notification.'
                      />
                      <FeatureItem
                        n={2}
                        title='Time-based routine planning (3 sessions)'
                        text="Notifications scheduled at morning (10 AM), lunch (2 PM), and evening (8 PM) to match users' daily routines."
                      />
                      <FeatureItem
                        n={3}
                        title='Familiar, low-intensity exercise routines'
                        text='Composed of familiar, low-intensity movements to reduce the burden of learning new exercises.'
                      />
                      <FeatureItem
                        n={4}
                        title='Barrier-free UI'
                        text='Color palette adjusted for color blindness accessibility (red shifted to orange, green to teal).'
                      />
                    </ol>
                  </div>
                </Chapter>
              </section>

              {/* REFLECTION */}
              <section id='reflection' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Reflection' title='Field insights from QA sessions with older adults'>
                  <p className='lg:w-[70%]'>
                    After the launch of Silver Bell, we hosted a QA session to observe how older adults use mobile
                    interfaces in real-world settings.
                  </p>
                  <div className='grid grid-cols-1 items-start gap-[32px] md:grid-cols-[1.2fr_1fr]'>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + 'x-reflection.jpg'} alt='QA session and visitor notes' />
                      <Caption>The Silver Bell Challenge: Hongyeon-gil project showcase, tentothen, 2024</Caption>
                    </div>
                    <div className='flex flex-col gap-[32px]'>
                      <div className='flex flex-col gap-[8px]'>
                        <p className='text-label font-medium text-[#5220B7]'>Key insight 01</p>
                        <p className='text-heading font-medium leading-snug text-black'>
                          Interaction is notification-driven, not exploratory
                        </p>
                        <p>
                          Older adults primarily used their phones to respond to alerts and notifications rather than
                          browsing menus or exploring features. Interfaces felt most comfortable when important
                          information was immediately visible, supported by bold typography and high-contrast primary
                          actions. As a result, designs that surfaced critical actions upfront reduced hesitation and
                          the need for navigation or discovery.
                        </p>
                      </div>
                      <div className='flex flex-col gap-[8px]'>
                        <p className='text-label font-medium text-[#5220B7]'>Key insight 02</p>
                        <p className='text-heading font-medium leading-snug text-black'>
                          Setup and onboarding are the real barriers
                        </p>
                        <p>
                          Initial installation and setup, not feature complexity, emerged as the largest obstacle to
                          adoption. Many participants struggled to download and configure the app independently, even
                          before engaging with its core functionality. This showed that onboarding and access, more than
                          feature depth, determined whether the system could be used at all in real-world contexts.
                        </p>
                      </div>
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[24px] lg:w-[70%]'>
                <CreditRow label='Role'>
                  <p>Design Researcher, Application Developer (team project)</p>
                </CreditRow>
                <CreditRow label='Residency'>
                  <p>
                    Young Artist Support Platform &lsquo;Hwawon: Hongyeongil&rsquo; Residency, funded by Total Museum of
                    Contemporary Art
                  </p>
                </CreditRow>
                <CreditRow label='Exhibition'>
                  <p>The Silver Bell Challenge: Hongyeon-gil project showcase, tentothen, 2024</p>
                </CreditRow>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
