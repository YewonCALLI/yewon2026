'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import CroppedFigure from '../../../components/projects/CroppedFigure'
import { Figure } from '../../../components/projects/Figure'

const imagePath = '/images/projects/typofold/'

const sectionIds = ['research', 'design', 'development', 'final design', 'workshop'] as const

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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className='text-[15px] font-semibold text-black'>{children}</h3>
}

function Statement({ children }: { children: React.ReactNode }) {
  return <p className='max-w-[640px] text-[16px] font-semibold leading-snug text-black'>{children}</p>
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className='inline-flex w-fit items-center rounded-full border border-black px-[10px] py-[3px] text-[11px] font-medium text-black'>
      {children}
    </span>
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

export default function TypofoldPage() {
  const project = projects.find((p) => p.slug === 'typofold')
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

  const metaRows = [
    project.part && { label: 'Role', value: project.part },
    project.award && { label: 'Award', value: project.award },
    project.exhibition && { label: 'Exhibition', value: project.exhibition },
    project.funded && project.funded.length > 0 && { label: 'Funded by', value: project.funded.join(', ') },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <>
      <Header title={project.name} accentColor='#FF2D8C' light mobileLight={isNavStuck} />
      <main className='min-h-dvh w-full pt-[60px] text-black'>
        <div className='flex w-full flex-col md:flex-row md:items-start'>
          {/* Left: full project list */}
          <aside className='hidden md:block w-full shrink-0 border-b border-black px-[30px] py-[24px] md:sticky md:top-[60px] md:h-[calc(100dvh-60px)] md:w-[240px] md:overflow-y-auto md:border-b-0 md:border-r md:px-[40px] md:py-[40px]'>
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
            <div className='flex flex-col justify-between gap-[16px] md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>A design tool that converts 3D models into paper crafts</p>
                <p className='text-black'>
                  08.2024 - Present / Computational Origami, Tool Development / Creative Awards, HCI Korea 2025 /
                  Advisor. Prof Yongsoon Choi
                </p>
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
                  className={`shrink-0 text-[14px] capitalize transition-colors ${
                    activeSection === id ? 'font-bold text-black' : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  {id}
                </a>
              ))}
            </nav>

            <div className='mt-[32px] flex flex-col gap-[64px] text-[15px] leading-relaxed'>
              {/* Research Question / Key Findings from project data */}
              <section className='flex flex-col gap-[16px] lg:w-[60%]'>
                <div>
                  <p className='text-[#FF2D8C] text-[13px] font-medium'>Research Question</p>
                  <p className='mt-[4px]'>{project.researchQuestion}</p>
                </div>
              </section>

              {/* RESEARCH */}
              <section id='research' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Background' title="Why don't digital creations feel like my own?">
                  <p>
                    As digital creation tools become faster and more automated, creative efficiency increases, but we
                    lose authorship consciousness and sense of ownership. According to prior research, automation tends
                    to hide visible effort and weaken psychological ownership without improving idea quality.
                  </p>

                  <SubHeading>Seoul-based creative coding club, TypeLab</SubHeading>
                  <Figure src={imagePath + '01.jpg'} alt='TypeLab discussion' />
                  <div className='grid grid-cols-1 gap-[12px] md:grid-cols-3'>
                    <div className='flex flex-col gap-[8px] rounded-[6px] border border-black bg-neutral-50 px-[14px] py-[12px]'>
                      <p className='text-[13px] leading-relaxed text-neutral-600'>
                        Graphics made with digital tools feel like code files floating on a screen. They&apos;re just
                        temporarily rendered images, and they don&apos;t really feel like mine.
                      </p>
                      <span className='text-[12px] font-medium text-black'>Member Jang</span>
                    </div>
                    <div className='flex flex-col gap-[8px] rounded-[6px] border border-black bg-neutral-50 px-[14px] py-[12px]'>
                      <p className='text-[13px] leading-relaxed text-neutral-600'>
                        More like a code file floating on a screen, a momentary rendering that I don&apos;t truly hold
                        or own.
                      </p>
                      <span className='text-[12px] font-medium text-black'>Member Lee</span>
                    </div>
                    <div className='flex flex-col gap-[8px] rounded-[6px] border border-black bg-neutral-50 px-[14px] py-[12px]'>
                      <p className='text-[13px] leading-relaxed text-neutral-600'>
                        All I did was write a few prompts, so I wondered if I could even call this my work.
                      </p>
                      <span className='text-[12px] font-medium text-black'>Member Kim</span>
                    </div>
                  </div>
                  <p className='text-neutral-600'>
                    We shared a recurring feeling that code art can seem distant. We started asking what kind of
                    materiality code art can have, and what realistic ways there are to distribute it. I wanted to
                    unpack the questions we raised together that day.
                  </p>
                </Chapter>

                <Chapter kicker='Desk Research' title='How AI Automation Affects Creative Ownership and Idea Quality'>
                  <p className='text-neutral-600'>
                    To explore the problem space more deeply, I conducted desk research to gather actionable insights.
                    The research revealed that as digital creative tools become faster and more automated, creators
                    experience increased efficiency—but at the cost of authorship and ownership. Prior studies show that
                    automation often hides the visible effort behind creative work, weakening psychological ownership
                    without actually improving the quality of ideas.
                  </p>

                  <div className='flex flex-col gap-[40px]'>
                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[45%]'>
                        <SubHeading>1. Brainstorming feels more effective with conversational AI</SubHeading>
                        <p className='text-neutral-600'>
                          Participants were able to explore ideas more quickly through iterative conversations with AI
                          and responded that it was more helpful in the brainstorming process.
                        </p>
                      </div>
                      <Figure src={imagePath + '02.png'} className='md:w-[55%]' />
                    </div>

                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[45%]'>
                        <SubHeading>2. Idea quality did not significantly differ</SubHeading>
                        <p className='text-neutral-600'>
                          Creators reported that there was no significant difference in idea quality between conditions
                          with and without AI use.
                        </p>
                      </div>
                      <Figure src={imagePath + '03.png'} className='md:w-[55%]' />
                    </div>

                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[45%]'>
                        <SubHeading>3. Automation reduces authorship and ownership</SubHeading>
                        <p className='text-neutral-600'>
                          When measuring sense of ownership over creations on a 1-7 scale, as AI involvement increased,
                          the sense of ownership felt by creators dropped sharply.
                        </p>
                      </div>
                      <Figure src={imagePath + '04.png'} className='md:w-[55%]' />
                    </div>
                  </div>

                  <div className='flex flex-col gap-[8px] rounded-[8px] bg-neutral-50 p-[20px]'>
                    <Kicker>Key Insight</Kicker>
                    <Statement>
                      Automated tools increase efficiency and convenience, but they don&apos;t elevate the quality of
                      ideas. Rather, creators often lose their sense of ownership in this process. Therefore, when
                      designing automated tools, it&apos;s important to design interactions that allow creators to
                      actively engage and perceive their own effort.
                    </Statement>
                  </div>
                </Chapter>
              </section>

              {/* DESIGN */}
              <section id='design' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Design Motivation' title='Where does the sense of ownership over creations come from?'>
                  <Figure src={imagePath + '05.png'} className='bg-[#0058AB] p-4' />
                  <Figure src={imagePath + '06.png'} className='-mt-1 bg-[#0058AB] px-8' />
                  <p className='text-neutral-600'>
                    According to the IKEA effect, people assign higher value to outcomes they&apos;ve personally
                    invested effort in and feel a stronger sense of ownership. Noting that automation increases
                    efficiency but weakens ownership, I sought to apply the IKEA effect to creative coding tools.
                  </p>

                  <div className='flex flex-col gap-[6px]'>
                    <Kicker>What creates ownership?</Kicker>
                    <p className='text-neutral-600'>
                      <span className='font-medium text-black'>Effort and time | </span>
                      People value creations more when they&apos;ve invested significant effort and time into making
                      them.
                    </p>
                  </div>

                  <div className='flex flex-col gap-[8px] rounded-[8px] bg-neutral-50 p-[20px]'>
                    <Kicker>Design implication</Kicker>
                    <Statement>
                      Sense of ownership emerges when the process of effort, judgment, and revision is visible. This
                      suggests that automation should not replace the act of making, but rather assist in the process of
                      making.
                    </Statement>
                  </div>
                </Chapter>

                <Chapter kicker='Concept Framing' title='Transforming digital creation into a hands-on experience'>
                  <p className='text-neutral-600'>
                    Based on insights from desk research and direct observation of creative coding classes, I reframed
                    my approach to digital making. Instead of one-click automatic generation, I shifted toward a
                    construction-based approach where students put in effort and assemble things themselves.
                  </p>

                  <div className='flex flex-col gap-[8px] rounded-[8px] bg-neutral-50 p-[20px]'>
                    <Kicker>Key Question</Kicker>
                    <Statement>
                      &quot;How can we provide the convenience of automation while not losing the sense of having made
                      it yourself?&quot;
                    </Statement>
                  </div>

                  <div className='flex flex-col gap-[8px]'>
                    <Figure src={imagePath + '07.jpg'} alt='p5.js editor' />
                    <p className='text-[13px] text-neutral-500'>
                      One of the representative creative coding platforms, the p5.js editor
                    </p>
                  </div>

                  <div className='flex flex-col gap-[8px] rounded-[8px] bg-neutral-50 p-[20px]'>
                    <Kicker>Ideation Leap: From Generation to Assembly</Kicker>
                    <p className='text-neutral-600'>Shifting digital creation toward hands-on construction</p>
                    <Figure src={imagePath + '08.png'} className='bg-white p-4' />
                    <p className='text-neutral-600'>
                      Inspired by the IKEA effect, origami, and paper craft templates, I designed a tool that allows
                      users to create digital outputs through hands-on experience.
                    </p>
                  </div>
                </Chapter>

                <Chapter kicker='Design Direction' title='Designing for ownership in TypoFold'>
                  <p className='text-neutral-600'>
                    Based on the research, I established three design principles for TypoFold.
                  </p>

                  <div className='flex flex-col gap-[32px]'>
                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[65%]'>
                        <Tag>Make structure visible</Tag>
                        <SubHeading>
                          Provide paper craft templates that can be assembled by hand, instead of finished products.
                        </SubHeading>
                        <p className='text-neutral-600'>
                          Rather than hiding the generation process, I made it so users can directly see and manipulate
                          how forms are created.
                        </p>
                      </div>
                      <Figure src={imagePath + '09.jpg'} className='md:w-[35%]' />
                    </div>

                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[65%]'>
                        <Tag>Design for meaningful effort</Tag>
                        <SubHeading>
                          Sense of ownership comes not from the result, but from the process of making.
                        </SubHeading>
                        <p className='text-neutral-600'>
                          I designed an experience where users make things themselves through folding, assembling, and
                          choosing, rather than simply receiving the final product.
                        </p>
                      </div>
                      <Figure src={imagePath + '10.jpg'} className='md:w-[35%]' />
                    </div>

                    <div className='flex flex-col gap-[12px] md:flex-row md:items-start'>
                      <div className='flex flex-col gap-[6px] md:w-[65%]'>
                        <Tag>Supportive</Tag>
                        <SubHeading>
                          Automation doesn&apos;t mean making it for you; it means enabling you to make it yourself.
                        </SubHeading>
                        <p className='text-neutral-600'>
                          Automation is used to generate structures that users can transform, combine, and modify.
                        </p>
                      </div>
                      <Figure src={imagePath + '11.jpg'} className='md:w-[35%]' />
                    </div>
                  </div>
                </Chapter>

                <Chapter
                  kicker='User Scenario'
                  title='Creating a pipeline to generate paper craft templates from 3D models'
                >
                  <p className='text-neutral-600'>
                    I chose the alphabet as the first application case. Letters can form various words, and each one
                    functions as a module. Additionally, they can accommodate various languages and typefaces, offering
                    a wide range of variations. Based on this first case, I plan to expand to 3D models beyond the
                    alphabet in the future.
                  </p>
                  <Figure src={imagePath + '12.png'} />
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='System Pipeline' title='From Mesh to Net: The 3D to 2D Pipeline'>
                  <p className='text-neutral-600'>
                    To support the iterative making flow shown in the previous scenario, TypoFold translates
                    code-generated 3D forms into foldable paper nets through a structured 3D-to-2D pipeline.
                  </p>
                  <Figure src={imagePath + '13.png'} />
                </Chapter>

                <Chapter kicker='Technical Challenge' title='Perceptual Faces vs. Rendering Geometry'>
                  <p className='text-neutral-600'>
                    While triangulation is efficient for rendering, it became a critical obstacle when building
                    TypoFold—fragmenting perceived surfaces and preventing reliable generation of foldable nets for
                    physical assembly.
                  </p>

                  <div className='flex flex-col gap-[8px]'>
                    <Kicker>Problem</Kicker>
                    <SubHeading>Perceptual Surfaces Were Fragmented by Triangulation</SubHeading>
                    <p className='text-neutral-600'>
                      When TypoFold imports 3D letterforms, each surface is automatically triangulated for rendering.
                      While efficient computationally, this breaks a single perceived surface into many small
                      faces—making it difficult to generate paper nets that align with how users cut, fold, and assemble
                      physical forms.
                    </p>
                    <Figure src={imagePath + '14.jpg'} />
                  </div>

                  <div className='flex flex-col gap-[8px]'>
                    <Kicker>Solution</Kicker>
                    <p className='text-neutral-600'>
                      To address this, I grouped adjacent triangles that{' '}
                      <span className='font-semibold text-black'>(1) share edges and</span>{' '}
                      <span className='font-semibold text-black'>(2) have aligned surface normals</span>, allowing the
                      system to reconstruct perceptually meaningful faces.
                    </p>
                    <Figure src={imagePath + '15.png'} />
                    <p className='text-[13px] text-neutral-500'>
                      This enables the unfolding process to operate on surfaces as users perceive them—rather than on
                      low-level geometric primitives.
                    </p>
                  </div>
                </Chapter>

                <Chapter kicker='Technical Challenge' title='Unfolding breaks due to internal faces'>
                  <p className='text-neutral-600'>
                    After reconstructing the perceptual faces, another problem came up during net generation. When
                    unfolding them into 2D layouts, internal surfaces were still included, which caused overlaps and
                    made physical assembly impossible. This meant I needed a more selective approach to unfolding.
                  </p>

                  <div className='flex flex-col gap-[8px]'>
                    <Kicker>Problem</Kicker>
                    <SubHeading>Unfolding Internal Faces Breaks Physical Assembly</SubHeading>
                    <p className='text-neutral-600'>
                      When unfolding 3D letterforms into paper nets, including all faces caused internal surfaces to
                      overlap in the 2D layout. These internal faces do not contribute to physical assembly and instead
                      produce nets that cannot be cut, folded, or assembled correctly.
                    </p>
                    <Figure src={imagePath + '16.png'} />
                  </div>

                  <div className='flex flex-col gap-[8px]'>
                    <Kicker>Solution</Kicker>
                    <p className='text-neutral-600'>
                      To solve this, I sorted the faces by their orientation and used a DFS algorithm that skips
                      internal faces. This ensures the generated paper nets don&apos;t overlap and can actually be
                      assembled by hand.
                    </p>
                    <Figure src={imagePath + '17.png'} />
                  </div>
                </Chapter>

                <Chapter
                  kicker='Usability Testing'
                  title='Finding a paper craft template method suitable for actual assembly'
                >
                  <p className='text-neutral-600'>
                    After solving structural issues in template generation, I examined how the cutting and folding
                    process differs depending on the unfolding method. I conducted a user preference test to determine
                    which method is most suitable for assembly.
                  </p>

                  <div className='flex flex-col gap-[8px] rounded-[8px] bg-neutral-50 p-[20px]'>
                    <Kicker>Key Question</Kicker>
                    <Statement>&quot;Which unfolding method is easiest to cut, fold, and assemble?&quot;</Statement>
                    <p className='mt-[8px] text-neutral-600'>
                      Participants preferred the side-priority unfolding method and responded that it was easier to cut
                      and assemble. Based on these results, TypoFold adopted side-priority unfolding as the default
                      method.
                    </p>
                  </div>

                  <div className='flex flex-col gap-[8px]'>
                    <Kicker>User Test — User Preference Survey by Unfolding Method</Kicker>
                    <div className='flex flex-row items-start gap-[16px]'>
                      <Figure src={imagePath + '18.png'} className='w-2/3' />
                      <Figure src={imagePath + '19.jpg'} className='w-1/3' />
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* OUTPUT */}
              <section id='final design' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Final Design' title=''>
                  <a
                    href='https://typofold.vercel.app/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex w-fit items-center gap-[6px] text-[16px] font-medium text-black underline underline-offset-4 hover:text-neutral-500'
                  >
                    TypoFold Website →
                  </a>
                  <div className='grid grid-cols-2 gap-[16px]'>
                    <CroppedFigure src={imagePath + '29.jpg'} />
                    <CroppedFigure src={imagePath + '30.jpg'} />
                    <CroppedFigure src={imagePath + '31.jpg'} />
                    <CroppedFigure src={imagePath + '32.jpg'} />
                  </div>
                </Chapter>
              </section>

              {/* WORKSHOP */}
              <section id='workshop' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Workshop' title=''>
                  <p className='text-neutral-600'>
                    TypoFold met users through the HCI Korea 2025 workshop and Pado-Space Wave.
                  </p>
                  <div className='grid grid-cols-1 gap-[12px] md:grid-cols-3'>
                    <Figure src={imagePath + '25.jpg'} />
                    <Figure src={imagePath + '26.jpg'} />
                    <Figure src={imagePath + '27.jpg'} />
                  </div>
                </Chapter>

                <Chapter kicker='Workshop Evaluation' title='Ownership Emerges Through Making'>
                  <p className='text-neutral-600'>
                    Through a subsequent survey, I confirmed that the process of assembling by hand increased both
                    enjoyment and sense of ownership.
                  </p>
                  <p className='text-[13px] text-neutral-500'>*18 participants responded to the post-workshop survey</p>
                  <Figure src={imagePath + '28.png'} className='md:w-full' />

                  <div className='flex flex-col gap-[12px]'>
                    <p className='text-neutral-600'>
                      In the next phase, I extended TypoFold beyond letterforms to test how the unfolding pipeline
                      performs across more complex 3D geometries.
                    </p>
                    <p className='text-neutral-600'>
                      By applying the system to varied shapes with different topology and surface structures, I
                      evaluated whether the workflow could generalize beyond typography while maintaining physical
                      assemblability and visual coherence.
                    </p>
                    <p className='text-neutral-600'>
                      This shift turns TypoFold from a typography-focused prototype into a broader method for converting
                      digital 3D models into foldable physical structures. At the same time, it revealed new challenges
                      around face segmentation, overlap handling, and maintaining consistency at scale.
                    </p>
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
