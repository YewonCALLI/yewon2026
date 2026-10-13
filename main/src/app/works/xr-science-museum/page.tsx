'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import { Figure } from '../../../components/projects/Figure'
import { ImageSlider } from '../../../components/projects/ImageSlider'

const accentColor = '#0B5FFF'

const imagePath = '/images/projects/xr-science-museum/'

const sectionIds = ['research', 'development', 'output', 'reflection'] as const

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
const num = (n: number) => String(n).padStart(2, '0')

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-[13px] font-medium text-[#0B5FFF]'>{children}</p>
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

function Caption({ children }: { children: React.ReactNode }) {
  return <p className='text-[13px] text-neutral-400'>{children}</p>
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

function Grid({ cols, children }: { cols: 2 | 3 | 4; children: React.ReactNode }) {
  const cls = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[cols]
  return <div className={`grid gap-[16px] [&>*]:min-w-0 ${cls}`}>{children}</div>
}

function Images({ files, ext = 'webp' }: { files: number[]; ext?: string }) {
  return (
    <>
      {files.map((n) => (
        <Figure key={n} src={`${imagePath}${num(n)}.${ext}`} />
      ))}
    </>
  )
}

function Cols({ items }: { items: { title: string; body: string; note?: string }[] }) {
  return (
    <div className='grid grid-cols-1 gap-[24px] md:grid-cols-3'>
      {items.map((item) => (
        <div key={item.title} className='flex flex-col gap-[8px]'>
          <SubHeading>{item.title}</SubHeading>
          <p>{item.body}</p>
          {item.note && <p className='text-[13px] text-neutral-400'>{item.note}</p>}
        </div>
      ))}
    </div>
  )
}

function Direction({
  title,
  statement,
  points,
  image,
}: {
  title: string
  statement: string
  points: string[]
  image: string
}) {
  return (
    <div className='grid grid-cols-[2fr_1fr] items-center gap-[16px] md:hidden'>
      <div className='flex flex-col gap-[8px]'>
        <span className='w-fit border border-black px-[8px] py-[2px] text-[13px] font-semibold'>{title}</span>
        <SubHeading>{statement}</SubHeading>
        <ul className='flex flex-col gap-[2px]'>
          {points.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
      </div>
      <Figure src={imagePath + image} />
    </div>
  )
}

function Slider({ files }: { files: string[] }) {
  return <ImageSlider images={files.map((f) => imagePath + f)} autoPlay autoPlayInterval={3000} />
}

const solutionGuides = (from: number, to: number, skip: number[] = []) =>
  range(from, to)
    .filter((n) => !skip.includes(n))
    .map((n) => `solution_guides/${n}.webp`)

export default function XRScienceMuseumPage() {
  const project = projects.find((p) => p.slug === 'xr-science-museum')
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
      <main className='min-h-dvh w-full pt-[60px] text-black'>
        <div className='flex w-full flex-col md:flex-row md:items-start'>
          {/* Left: full project list */}
          <ProjectSidebar activeSlug={project.slug} />

          {/* Right: project content */}
          <div className='min-w-0 flex-1 px-[22px] py-[24px] md:px-[40px] md:py-[40px]'>
            <div className='flex flex-col justify-between gap-[16px] md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] lg:w-[60%]'>
                <p className='text-[#0B5FFF]'>{project.description}</p>
                <p className='text-black'>
                  04.2025 - 12.2025 / WebXR, Computer Graphics, EdTech / {project.client} / {project.part}
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
              <section className='flex flex-col gap-[16px] lg:w-[60%]'>
                <div>
                  <p className='text-[13px] font-medium text-[#0B5FFF]'>Research Question</p>
                  <p className='mt-[4px]'>{project.researchQuestion}</p>
                </div>
              </section>

              {/* RESEARCH */}
              <section id='research' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Background' title='Voices surrounding the implementation of AI digital textbooks in South Korea'>
                  <p>
                    Since the implementation of AI digital textbooks in 2025, digital infrastructure has been expanded,
                    but the quality of educational content has not kept pace. In particular, there is a lack of
                    interactive and highly immersive content that leverages the strengths of the digital environment.
                  </p>
                  <SubHeading>01 | Online Survey and Teachers Interview</SubHeading>
                  <p>
                    What do you think is the most important reason why AI digital textbooks are not as effective as
                    expected? (Multiple responses allowed)
                  </p>
                  <div className='md:w-1/2'>
                    <Figure src={imagePath + '01.webp'} />
                  </div>
                  <div className='md:w-[55%]'>
                    <Figure src={imagePath + '02.webp'} />
                  </div>
                  <Statement>Digital Devices ≠ Digital Learning</Statement>
                  <p>Digital devices are prepared, but the quality of educational content is insufficient.</p>
                </Chapter>

                <Chapter kicker='Teacher Journey' title='We identified the real problems that teachers face'>
                  <p>
                    I conducted a comparative analysis of student and teacher experiences in traditional textbook
                    classes versus digital textbook classes. While digital textbooks provide interactive experiences,
                    they actually reduce students&apos; active inquiry and increase teachers&apos; lesson preparation
                    burden.
                  </p>
                  <Statement>
                    Currently used digital textbooks are reducing discussion experiences with peers and replacing them
                    with quiz content.
                  </Statement>
                  <Caption>Traditional Textbooks</Caption>
                  <Figure src={imagePath + '03.webp'} />
                  <Caption>Digital Textbooks</Caption>
                  <Figure src={imagePath + '04.webp'} />
                </Chapter>

                <Chapter kicker='Student Journey' title='We identified the real problems that students face'>
                  <p>
                    Digital textbooks provide students with interactive experiences, but they also increase the burden
                    of device management for teachers.
                  </p>
                  <Caption>Traditional Textbooks</Caption>
                  <Figure src={imagePath + '05.webp'} />
                  <Caption>Digital Textbooks</Caption>
                  <Figure src={imagePath + '06.webp'} />
                </Chapter>

                <Chapter kicker='Problem Framing' title='What Gets Reduced in Digital Textbooks'>
                  <p>
                    As digital textbooks become more common in science classrooms, efficiency gains often come with
                    tradeoffs. They reduce peer interaction, limit inquiry time, and shift learning toward
                    answer-checking rather than exploration.
                  </p>
                  <SubHeading>01 | Problem Definition</SubHeading>
                  <div className='max-w-[800px]'>
                    <Figure src={imagePath + '07.webp'} />
                  </div>
                  <SubHeading>02 | Research Question</SubHeading>
                  <Statement>
                    &quot;How can we design digital textbook content to reduce the burden on teachers and students and
                    transform passive learning into active inquiry experiences?&quot;
                  </Statement>
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='MVP List' title="What We're Building">
                  <p>
                    After identifying the key constraints in the classroom setting and the gaps in student learning, I
                    created an MVP to rank and prioritize features based on their importance. The main focus was on
                    features that directly support inquiry-based science learning while still being practical for
                    everyday classroom use.
                  </p>
                  <Figure src={imagePath + '08.webp'} />
                </Chapter>

                <Chapter kicker='Design Direction' title='Three Design Directions for the XR Museum'>
                  <p>
                    I organized the problems that teachers and students face into three design directions aligned with
                    the MVP list. At the same time, I divided 14 experiments into four experiment types and created
                    reusable XR templates for each prototype.
                  </p>
                  <div className='hidden md:block'>
                    <Figure src={imagePath + 'design-directions.webp'} />
                  </div>
                  <Direction
                    title='Inquiry'
                    statement='Shifts digital science classes from watching explanations to running manipulable experiments.'
                    points={[
                      '360º viewing, zoom, pause/rewind',
                      'Visualization of otherwise invisible phenomena',
                      'Incorporates gamification elements',
                    ]}
                    image='09.webp'
                  />
                  <Direction
                    title='Accessibility'
                    statement='Makes dense science content usable for diverse literacy levels and device conditions.'
                    points={[
                      'High-contrast design',
                      '20pt+ typography',
                      'Clear non-transparent buttons',
                      'Audio narration with interruption handling',
                    ]}
                    image='10.webp'
                  />
                  <Direction
                    title='Guidance'
                    statement='Reduces teacher setup burden by building the class flow into the interface.'
                    points={[
                      'Automation does not complete the outcome on behalf of the user.',
                      'Instead, it generates structures and forms that users can actively work with.',
                    ]}
                    image='11.webp'
                  />
                </Chapter>

                <Chapter kicker='To-Be Scenario' title='Teaching with the XR Science Museum'>
                  <p>
                    Reflecting on insights from earlier research and the defined design directions, I mapped an ideal
                    teacher journey to show how lesson preparation, delivery, and assessment change with the
                    introduction of digital textbooks.
                  </p>
                  <SubHeading>Teacher Flow</SubHeading>
                  <p>
                    Teachers shift from troubleshooting devices to facilitating inquiry by using step-by-step guides
                    and built-in measurement tools.
                  </p>
                  <Grid cols={4}>
                    <Images files={range(12, 15)} />
                  </Grid>
                </Chapter>

                <Chapter kicker='To-Be Scenario' title='What Learning Looks Like with XR'>
                  <p>
                    Building on the proposal from same design directions, I mapped an ideal student journey to
                    illustrate how learning activities, interaction, and feedback differ between traditional classrooms
                    and digital textbook-based learning.
                  </p>
                  <SubHeading>Student Flow</SubHeading>
                  <p>
                    Students move from reading and clicking to manipulating parameters, observing change, and testing
                    hypotheses.
                  </p>
                  <Grid cols={4}>
                    <Images files={range(16, 19)} />
                  </Grid>
                </Chapter>

                <Chapter kicker='Technical Implementation' title='From textbook experiments to web simulations'>
                  <p>
                    To implement experiments from paper-based textbooks as web-based interactive simulations, I modeled
                    and simulated how the experiments work and rendered them in real-time using 3D/graphics technology.
                  </p>
                  <SubHeading>Sketching</SubHeading>
                  <div className='flex flex-col items-start gap-[16px] md:flex-row'>
                    <div className='w-full min-w-0 md:flex-1'>
                      <Figure src={imagePath + '20.webp'} />
                    </div>
                    <div className='w-full min-w-0 md:flex-1'>
                      <Figure src={imagePath + '21.webp'} />
                    </div>
                  </div>
                  <SubHeading>3D Modeling</SubHeading>
                  <Grid cols={2}>
                    <Images files={range(22, 24)}  />
                  </Grid>
                  <SubHeading>Computer Graphics</SubHeading>
                  <div className='md:w-2/3'>
                    <Figure src={imagePath + '25.webp'} />
                  </div>
                  <p>I created video data by filming scenes of grilling meat and fish with a thermal camera.</p>
                  <Figure src={imagePath + '26.webp'} />
                  <p>Based on the video data, I developed a thermal camera mode simulation using GLSL shaders.</p>
                </Chapter>

                <Chapter kicker='Feedbacks from Stakeholders' title='From Feedback to Fixes'>
                  <p>
                    Stakeholder feedback from MiraeN&apos;s editorial and product teams informed targeted UI
                    refinements, with a focus on readability, clarity, and usability for elementary students using
                    tablets in classrooms.
                  </p>
                  <Cols
                    items={[
                      {
                        title: 'Issue 1',
                        body: 'Text is too small for 5th-6th grade students.',
                        note: 'Editorial Team',
                      },
                      {
                        title: 'Issue 2',
                        body: "Transparent buttons are not recognized as clickable elements and have poor touch accuracy, making them unsuitable for children's tablet use.",
                        note: 'Project Managers',
                      },
                      {
                        title: 'Issue 3',
                        body: 'Button animations and visual effects create unnecessary visual noise for elementary students.',
                        note: 'Editorial Team',
                      },
                    ]}
                  />
                  <Grid cols={2}>
                    <div className='flex flex-col gap-[8px]'>
                      <SubHeading>Before</SubHeading>
                      <Figure src={imagePath + '27.webp'} />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <SubHeading>After</SubHeading>
                      <Figure src={imagePath + '28.webp'} />
                    </div>
                  </Grid>
                  <Cols
                    items={[
                      { title: 'Revision 1', body: 'Increased all text sizes by 40%' },
                      { title: 'Revision 2', body: 'Changed transparent buttons to colored buttons' },
                      { title: 'Revision 3', body: 'Removed all transition effects on buttons' },
                    ]}
                  />
                </Chapter>

                <Chapter kicker='Interaction Design for Inquiry' title='How Inquiry Is Made Interactive'>
                  <p>
                    Based on earlier analysis of classroom workflows and inquiry breakdowns in digital textbooks, I
                    designed interaction patterns around recurring inquiry structures found across science units,
                    including time-based change, state comparison, and spatial observation.
                  </p>

                  <SubHeading>Group 1 | Time Change Simulations</SubHeading>
                  <Caption>Slider → Scene/Graph changes → Read Values</Caption>
                  <Grid cols={3}>
                    <Images files={range(29, 33)} />
                  </Grid>
                  <p>
                    Learners adjust time by tapping or dragging the slider horizontally or vertically, use play and
                    pause to fine-tune moments, zoom to read angular values, and record sun altitude, shadow length, and
                    temperature at fixed intervals.
                  </p>

                  <SubHeading>Group 2 | State Change Simulations</SubHeading>
                  <Caption>Tap 3D Objects → State Changes → Read Outcomes</Caption>
                  <Grid cols={3}>
                    <Images files={range(34, 38)} />
                  </Grid>
                  <p>
                    Learners tap 3D components to set up comparable experimental groups, keep variables constant, and
                    run the same experiment across conditions to compare outcomes and reason about controlled
                    variables.
                  </p>

                  <SubHeading>Group 3 | Comparison &amp; Classification</SubHeading>
                  <Caption>Drag Objects → Observe Differences → Review Results</Caption>
                  <Grid cols={3}>
                    <Images files={range(39, 45)} />
                  </Grid>
                  <p>
                    Learners create comparison groups, move objects between conditions, observe behavioral differences,
                    and review results after each observation cycle.
                  </p>

                  <SubHeading>Group 4 | 3D Structure &amp; Observation</SubHeading>
                  <Caption>Rotate &amp; Zoom → Reveal Hotspots → Read Explanations</Caption>
                  <Grid cols={3}>
                    <Images files={range(46, 49)} />
                  </Grid>
                  <p>
                    Learners rotate and zoom the 3D scene to inspect structures from multiple angles, toggle hidden
                    elements, and access contextual explanations embedded within the model.
                  </p>
                </Chapter>

                <Chapter
                  kicker='Wireframes & Layout'
                  title='I created interaction and UI design guides based on experiment types.'
                >
                  <p>I grouped the curriculum into four experiment types and created interaction and UI design guides.</p>
                  {/* The section is 60% wide on lg, so 100%/0.6 breaks out to the full content width */}
                  <div className='lg:w-[calc(100%/0.6)]'>
                    <Grid cols={2}>
                      <Images files={range(50, 53)} />
                    </Grid>
                  </div>
                </Chapter>
              </section>

              {/* OUTPUT */}
              <section id='output' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Figure src={imagePath + 'finaldesign1.jpg'} />

                <div className='flex flex-col gap-[56px] lg:w-[60%]'>
                  <Chapter kicker='Final Design' title='Experiment Setup & Objectives'>
                    <p>
                      XR Science Museum begins each activity by orienting learners to the experiment, clarifying its
                      goal and overall flow before hands-on exploration starts.
                    </p>
                    <p>
                      I created an activity guide for each experiment. This activity guide can be accessed by the
                      &apos;Activity Guide&apos; button on the intro screen.
                    </p>
                    <Slider files={[...range(56, 64).map((n) => `${n}.webp`)]} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Conducting the Experiment'>
                    <p>
                      During curriculum-based experiments, the system visualizes changes in real time and provides
                      continuous feedback that helps students track progress, interpret results, and recognize when a
                      trial is complete.
                    </p>
                    <Figure src={imagePath + '65.webp'} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 1. Time-Based Simulations'>
                    <p>
                      Time-based simulation supports inquiry by allowing students to observe how variables change over
                      time rather than relying on static snapshots. By controlling time directly, students can pause,
                      rewind, and compare moments to reason about change through repeated observation and measurement.
                    </p>
                    <Slider files={solutionGuides(1, 7)} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 2. State Change Simulations'>
                    <p>
                      State-change type of simulations let students directly manipulate components to compare discrete
                      conditions side by side. By toggling elements such as switches, batteries, or bulbs, students can
                      observe immediate cause-and-effect relationships between system states.
                    </p>
                    <Slider files={solutionGuides(8, 12, [11])} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 3. Comparison & Classification'>
                    <p>
                      Comparison and classification simulations allow students to directly manipulate objects to test
                      how they behave under different conditions. By dragging items between containers, removing them,
                      and trying again, students can compare outcomes, identify patterns, and build their own sequences
                      of classification through repeated testing.
                    </p>
                    <Slider files={solutionGuides(13, 20)} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 4. 3D structure and observation simulations'>
                    <p>
                      3D structure and observation simulations allow students to explore spatial relationships by
                      viewing phenomena from multiple perspectives. By rotating the scene and adjusting light sources,
                      students can observe how visibility and alignment change across positions, helping them reason
                      about spatial structure and relative motion.
                    </p>
                    <Slider files={solutionGuides(21, 27)} />
                  </Chapter>
                </div>

                <Figure src={imagePath + 'finaldesign2.webp'} />

                <div className='lg:w-[60%]'>
                  <Chapter kicker='Final Design' title='Curriculum'>
                    <p>
                      By analyzing recurring patterns across curriculum-based experiments, I translated diverse science
                      content into four reusable XR interaction templates. This creates a scalable system that supports
                      inquiry, comparison, and observation across grade levels.
                    </p>
                    <div className='flex flex-col gap-[16px] md:flex-row'>
                      <div className='md:max-w-[60%]'>
                        <Figure src={imagePath + '74.webp'} />
                      </div>
                      <Grid cols={2}>
                        <Images files={range(75, 78)} />
                      </Grid>
                    </div>
                    <p>Each category informed a consistent XR layout and simulation logic.</p>
                  </Chapter>
                </div>
              </section>

              {/* REFLECTION */}
              <section id='reflection' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Reflection' title='Future Steps'>
                  <p>
                    XR Science Museum will launch in March 2026 and be deployed across multiple classrooms. This
                    rollout enables validation beyond prototyping. It allows us to evaluate learning impact, classroom
                    usability, and system reliability in real instructional contexts. Post-launch, we will analyze usage
                    data, teacher feedback, and student work to assess the following questions.
                  </p>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>Does XR interaction support conceptual understanding, and not just engagement?</SubHeading>
                    <p>
                      • Can students describe, predict, and compare phenomena in their own words based on what they
                      observe?
                      <br />• Do XR interactions help reduce common misconceptions found in textbook-based
                      instruction?
                    </p>
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>Does the system reduce instructional friction for teachers?</SubHeading>
                    <p>
                      • How much does the system reduce time spent on setup, explanation, transitions, and resets
                      compared to existing materials?
                      <br />• Which workflows or features become classroom bottlenecks and should be prioritized for
                      iteration?
                    </p>
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>Is the system reliable under real classroom constraints?</SubHeading>
                    <p>
                      • Do loading time, frame rate, and interaction responsiveness remain stable across devices
                      and networks?
                      <br />• How do performance issues affect learning behaviors such as drop-off, retries, and task
                      abandonment?
                    </p>
                  </div>
                  <Figure src={imagePath + '79.webp'} />
                  <Caption>2026 MiraeN Science Textbook Overview Video</Caption>
                  <p>
                    Together, these evaluations will inform how XR can move from experimental novelty to a dependable
                    learning tool in everyday classrooms.
                  </p>
                </Chapter>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
