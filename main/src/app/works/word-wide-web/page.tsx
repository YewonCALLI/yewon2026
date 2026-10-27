'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/word-wide-web/'

const sectionIds = ['research', 'development', 'final design'] as const

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

export default function WordWideWebPage() {
  const project = projects.find((p) => p.slug === 'word-wide-web')
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
              {/* RESEARCH */}
              <section id='research' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Overview' title='Weaving poems through connected words'>
                  <p>
                    Word Wide Web is a word-weaving platform that creates poems through connected synonyms. Inspired by the Korean nursery rhyme &lsquo;Red Like an Apple,&rsquo; it helps writers create chain poetry by connecting words through semantic relationships.
                  </p>
                  <Figure src={imagePath + '01.gif'} />
                  <Caption>Interface for weaving chain poetry</Caption>
                </Chapter>

                <Chapter kicker='Background' title='SFPC: Human-Scale Natural Language Processing'>
                  <p>
                    During SFPC&apos;s Human-Scale Natural Language Processing class, our class collaborated to label words using a system that breaks down text into 16 parts of speech and 6 criteria pairs (like dog-cat, concrete-intangible, utilitarian-romantic). Inspired by this experience, I created a platform that helps writers find similar words based on these semantic measurements.
                  </p>
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='How it works' title='Write by connecting words'>
                  <ol className='flex list-decimal flex-col gap-[4px] pl-[20px]'>
                    <li>Enter your starting word.</li>
                    <li>Browse through suggested related words provided by Word Wide Web.</li>
                    <li>
                      You can add your own words if you don&apos;t find what you&apos;re looking for (some words may not exist in our database).
                    </li>
                    <li>Continue connecting words to craft your poem.</li>
                  </ol>
                  <Figure src={imagePath + '02.gif'} />
                  <Caption>Word suggestion and addition process</Caption>
                  <Figure src={imagePath + '03.gif'} />
                  <Caption>Weaving words into poetry</Caption>
                  <a
                    href='https://solarword.vercel.app/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline underline-offset-2 hover:text-[#FF6B00]'
                  >
                    Visit the Word Wide Web website ↗
                  </a>
                </Chapter>
              </section>

              {/* FINAL DESIGN */}
              <section id='final design' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Final Design' title='Unexpected connections'>
                  <p className='max-w-[640px] lg:w-[70%]'>
                    Through this process, discover unexpected linguistic connections and create poetic expressions that challenge our perception of language relationships.
                  </p>
                  <Figure src={imagePath + '04.gif'} className='md:max-w-[50%]' />
                  <Caption>Example of unexpected word connections</Caption>
                  <Figure src={imagePath + '05.png'} />
                  <Caption>Posters: word webs and the Verbal Vortex</Caption>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Credits' title='Data contribution and tools'>
                  <Figure src={imagePath + '06.gif'} />
                  <Caption>Weaving chain poetry with the contributed dataset</Caption>
                  <div className='flex flex-col gap-[24px]'>
                    <CreditRow label='Website'>
                      <a
                        href='https://solarword.vercel.app/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-[#FF6B00]'
                      >
                        Word Wide Web ↗
                      </a>
                    </CreditRow>
                    <CreditRow label='Text data, word scoring'>
                      <p>
                        Ilona Brand, Lillian Hua, Jean Kim, Maya Williams, kathy wu, Joses Ho, Maya Detwiller, Jireh
                        Deng, Ellen Fritz, Alice Yuan Zhang, Yewon Jang, Charis Poon, Kimberly Lyle, Hannah Jenkins,
                        Cecilia Knaub, Gabriella Chronis, Juliana Gomezr
                      </p>
                      <p className='mt-[8px] text-neutral-500'>
                        The data and word scoring were collaboratively created by participants, each developing individual projects based on this shared dataset.
                      </p>
                    </CreditRow>
                    <CreditRow label='Skills'>
                      <p>Python, JavaScript, Label Studio</p>
                    </CreditRow>
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
