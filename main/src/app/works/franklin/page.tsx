'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'

const accentColor = '#FF6B00'

const imagePath = '/images/projects/franklin/'

const sectionIds = ['research', 'design', 'development'] as const

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

export default function FranklinPage() {
  const project = projects.find((p) => p.slug === 'franklin')
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
                <Chapter kicker='Overview' title='Why do fairy tales keep the same roles?'>
                  <p>
                    Why don&apos;t fairy tales show female protagonists slaying dragons while male protagonists wear
                    glass slippers and dance?
                  </p>
                  <p>
                    Franklin is a gender-neutral Korean fairy tale generator. We trained language models to
                    self-diagnose bias, creating &lsquo;Franklin,&rsquo; an AI storyteller that reinterprets fairy
                    tales through an equitable lens. Franklin collaborates with users to create stories while fostering
                    empathetic, horizontal relationships between AI and humans.
                  </p>
                </Chapter>

                <Chapter kicker='Motivation' title='Biased clichés persist across formats'>
                  <p>
                    While the formats through which children encounter fairy tales have diversified, Korean fairy tales
                    still contain biased clichés and prejudices.
                  </p>
                  <Figure src={imagePath + '01.png'} />
                </Chapter>
              </section>

              {/* DESIGN */}
              <section id='design' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Web Service Pipeline' title='Writing together, one sentence at a time'>
                  <Figure src={imagePath + '02.png'} />
                  <p>
                    Franklin collaborates with the user: from the title, protagonist, setting and keywords, the model
                    offers three candidates for the next sentences, and the user either picks one or writes their own.
                    The finished tale is published to the library page.
                  </p>
                </Chapter>

                <Chapter kicker='User Flow' title='Four steps, repeated eight times'>
                  <Figure src={imagePath + '05.png'} />
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Dataset' title='Refining 1,600 tales into 1,197'>
                  <Figure src={imagePath + '03.png'} />
                  <p>
                    We refined 1,600 copyright-free Korean fairy tales through the UnSmile Dataset and used a total of
                    1,197 Korean fairy tales as learning materials.
                  </p>
                </Chapter>

                <Chapter kicker='Debiasing' title='Adjusting embeddings along gender axes'>
                  <Figure src={imagePath + '04.png'} />
                  <p>
                    We applied a de-biased approach that adjusts word embeddings based on the female and male word
                    axes.
                  </p>
                </Chapter>

                <Chapter kicker='Prompt Engineering' title='Comparing three prompt structures'>
                  <Figure src={imagePath + '06.png'} />
                  <p>
                    To compare the performance differences in the sentences generated by the prompts, we designed three
                    different prompt structures. First, the essential elements of a fairy tale are characters, setting,
                    and events. The text generated by the model corresponds to the events. We allowed users to
                    customize the characters and background elements. Among them, we prepared &lsquo;keywords,&rsquo;
                    which are words that help the direction of the story, &lsquo;title,&rsquo; which has an implied
                    meaning for the story, and &lsquo;plot,&rsquo; which summarizes important events in the story.
                    Three datasets were built by combining the three elements appropriately. We fed the same inputs to
                    the model trained with the three datasets and extracted the text. Table 11, Table 12, and Table 13
                    show examples of each dataset&apos;s composition and output.
                  </p>
                  <p>
                    We generated 10 fairy tales for each of the three prompt styles, 10 for fantasy and 10 for everyday
                    life, for a total of 100 fairy tale texts for each model, and calculated the PPL values and
                    compared the arithmetic mean values. As a result, we found that method 1 had the lowest sentence
                    complexity evaluation, which was used to construct Web Flow.
                  </p>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Credits' title='Paper, team and support'>
                  <div className='flex flex-col gap-[24px]'>
                    <CreditRow label='Paper'>
                      <a
                        href='http://journal.dcs.or.kr/xml/37344/37344.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-[#FF6B00]'
                      >
                        Construction of Debiased Korean AI Fairytale Generator ↗
                      </a>
                    </CreditRow>
                    <CreditRow label='Team'>
                      <p>Jiin An, Saetbyeol Leeyouk, Advised by Dasaem Jeong</p>
                    </CreditRow>
                    <CreditRow label='Role'>
                      <p className='font-medium text-black'>AI engineer lead in Coherency</p>
                      <ul className='mt-[4px] flex list-disc flex-col gap-[4px] pl-[20px]'>
                        <li>Engineered AI coherency improving process using reinforce algorithm</li>
                        <li>
                          Developed sentiment analysis &amp; hate speech detection software for the data preprocessing
                          process
                        </li>
                        <li>Developed AI model serving pipeline using FastAPI for the website</li>
                      </ul>
                    </CreditRow>
                    <CreditRow label='Funded by'>
                      <p>Smilegate AI Membership</p>
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
