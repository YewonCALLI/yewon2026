'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import { ProjectSidebar } from '../../ProjectSidebar'
import { Figure } from '../../../../components/projects/Figure'
import { ImageSlider } from '../../../../components/projects/ImageSlider'

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

export default function XRScienceMuseumKoPage() {
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
                <p className='text-[#0B5FFF]'>
                  2022 개정 교육과정 기반 미래엔 초등 5~6학년 과학 디지털 교과서에 수록된 14개의 WebXR 콘텐츠(웹사이트).
                </p>
                <p className='text-black'>
                  2025 - 2026 / WebXR, Computer Graphics, Tool Development / 미래엔 / UX/UI Designer, Frontend Developer
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
                  <p className='mt-[4px]'>인터랙티브 3D 시뮬레이션은 디지털 과학 교과서에서 수업 운영의 부담을 어떻게 줄일 수 있을까?</p>
                </div>
              </section>

              {/* RESEARCH */}
              <section id='research' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Background' title='AI 디지털 교과서 도입을 둘러싼 목소리'>
                  <p>
                    2025년 AI 디지털 교과서가 도입된 이후 디지털 인프라는 확충되었지만, 교육 콘텐츠의 질은 이를 따라가지
                    못하고 있습니다. 특히 디지털 환경의 강점을 살린 상호작용적이고 몰입도 높은 콘텐츠가 부족합니다.
                  </p>
                  <SubHeading>01 | 온라인 설문 및 교사 인터뷰</SubHeading>
                  <p>AI 디지털 교과서가 기대만큼 효과적이지 않은 가장 중요한 이유는 무엇이라고 생각하십니까? (복수 응답 가능)</p>
                  <div className='md:w-1/2'>
                    <Figure src={imagePath + '01.webp'} />
                  </div>
                  <div className='md:w-[55%]'>
                    <Figure src={imagePath + '02.webp'} />
                  </div>
                  <Statement>디지털 기기 ≠ 디지털 학습</Statement>
                  <p>디지털 기기는 갖춰졌지만, 교육 콘텐츠의 질은 여전히 부족합니다.</p>
                </Chapter>

                <Chapter kicker='Teacher Journey' title='교사가 겪는 실제 문제를 찾아냈습니다'>
                  <p>
                    종이 교과서 수업과 디지털 교과서 수업에서 학생과 교사가 겪는 경험을 비교 분석했습니다. 디지털 교과서는
                    상호작용 경험을 제공하지만, 오히려 학생의 능동적인 탐구를 줄이고 교사의 수업 준비 부담을 늘리고 있었습니다.
                  </p>
                  <Statement>
                    현재 쓰이는 디지털 교과서는 친구들과 토론하는 경험을 줄이고, 그 자리를 퀴즈형 콘텐츠로 대체하고 있습니다.
                  </Statement>
                  <Caption>종이 교과서</Caption>
                  <Figure src={imagePath + '03.webp'} />
                  <Caption>디지털 교과서</Caption>
                  <Figure src={imagePath + '04.webp'} />
                </Chapter>

                <Chapter kicker='Student Journey' title='학생이 겪는 실제 문제를 찾아냈습니다'>
                  <p>
                    디지털 교과서는 학생에게 상호작용 경험을 제공하지만, 교사에게는 기기 관리 부담을 더하기도 합니다.
                  </p>
                  <Caption>종이 교과서</Caption>
                  <Figure src={imagePath + '05.webp'} />
                  <Caption>디지털 교과서</Caption>
                  <Figure src={imagePath + '06.webp'} />
                </Chapter>

                <Chapter kicker='Problem Framing' title='디지털 교과서에서 줄어드는 것들'>
                  <p>
                    과학 수업에서 디지털 교과서가 보편화되면서 효율은 높아졌지만, 그 대가도 따릅니다. 또래와의 상호작용이
                    줄고, 탐구 시간이 제한되며, 학습의 중심이 탐색에서 정답 확인으로 옮겨 갑니다.
                  </p>
                  <SubHeading>01 | 문제 정의</SubHeading>
                  <div className='max-w-[800px]'>
                    <Figure src={imagePath + '07.webp'} />
                  </div>
                  <SubHeading>02 | 연구 질문</SubHeading>
                  <Statement>
                    &quot;교사와 학생의 부담을 줄이고, 수동적인 학습을 능동적인 탐구 경험으로 바꾸려면 디지털 교과서
                    콘텐츠를 어떻게 설계해야 할까?&quot;
                  </Statement>
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='MVP List' title='우리가 만들려는 것'>
                  <p>
                    교실 환경의 핵심 제약과 학생 학습의 공백을 파악한 뒤, 기능의 중요도에 따라 우선순위를 매긴 MVP를
                    만들었습니다. 탐구 기반 과학 학습을 직접 지원하면서도 일상적인 수업에서 실용적으로 쓸 수 있는 기능에
                    집중했습니다.
                  </p>
                  <Figure src={imagePath + '08.webp'} />
                </Chapter>

                <Chapter kicker='Design Direction' title='XR 과학관의 세 가지 디자인 방향'>
                  <p>
                    교사와 학생이 겪는 문제를 MVP 목록에 맞춰 세 가지 디자인 방향으로 정리했습니다. 동시에 14개의 실험을
                    네 가지 실험 유형으로 나누고, 각 프로토타입에 재사용할 수 있는 XR 템플릿을 만들었습니다.
                  </p>
                  <div className='hidden md:block'>
                    <Figure src={imagePath + 'design-directions.webp'} />
                  </div>
                  <Direction
                    title='Inquiry'
                    statement='디지털 과학 수업을 설명을 보는 수업에서 직접 조작하는 실험 수업으로 바꿉니다.'
                    points={['360º 보기, 확대, 일시정지/되감기', '눈에 보이지 않는 현상의 시각화', '게임 요소 적용']}
                    image='09.webp'
                  />
                  <Direction
                    title='Accessibility'
                    statement='다양한 문해력과 기기 환경에서도 밀도 높은 과학 콘텐츠를 사용할 수 있게 합니다.'
                    points={['고대비 디자인', '20pt 이상의 타이포그래피', '투명하지 않은 명확한 버튼', '중단 상황을 고려한 음성 내레이션']}
                    image='10.webp'
                  />
                  <Direction
                    title='Guidance'
                    statement='수업 흐름을 인터페이스에 담아 교사의 준비 부담을 줄입니다.'
                    points={[
                      '자동화가 사용자를 대신해 결과를 완성하지 않습니다.',
                      '대신 사용자가 직접 다룰 수 있는 구조와 형태를 만들어 줍니다.',
                    ]}
                    image='11.webp'
                  />
                </Chapter>

                <Chapter kicker='To-Be Scenario' title='XR 과학관과 함께하는 수업'>
                  <p>
                    앞선 리서치에서 얻은 인사이트와 정의한 디자인 방향을 바탕으로, 디지털 교과서가 도입되면 수업 준비,
                    진행, 평가가 어떻게 달라지는지 이상적인 교사 저니로 그렸습니다.
                  </p>
                  <SubHeading>Teacher Flow</SubHeading>
                  <p>
                    교사는 기기 문제를 해결하는 역할에서 벗어나, 단계별 가이드와 내장된 측정 도구로 탐구를 이끄는 역할로
                    바뀝니다.
                  </p>
                  <Grid cols={4}>
                    <Images files={range(12, 15)} />
                  </Grid>
                </Chapter>

                <Chapter kicker='To-Be Scenario' title='XR로 달라지는 학습의 모습'>
                  <p>
                    같은 디자인 방향을 바탕으로, 기존 교실 수업과 디지털 교과서 기반 학습에서 학습 활동, 상호작용,
                    피드백이 어떻게 다른지 이상적인 학생 저니로 그렸습니다.
                  </p>
                  <SubHeading>Student Flow</SubHeading>
                  <p>학생은 읽고 클릭하는 데서 나아가 변수를 조작하고, 변화를 관찰하고, 가설을 검증하게 됩니다.</p>
                  <Grid cols={4}>
                    <Images files={range(16, 19)} />
                  </Grid>
                </Chapter>

                <Chapter kicker='Technical Implementation' title='교과서 실험에서 웹 시뮬레이션으로'>
                  <p>
                    종이 교과서에 실린 실험을 웹 기반 인터랙티브 시뮬레이션으로 구현하기 위해, 실험의 작동 원리를 모델링하고
                    시뮬레이션한 뒤 3D/그래픽 기술로 실시간 렌더링했습니다.
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
                    <Images files={range(22, 24)} />
                  </Grid>
                  <SubHeading>Computer Graphics</SubHeading>
                  <div className='md:w-2/3'>
                    <Figure src={imagePath + '25.webp'} />
                  </div>
                  <p>고기와 생선을 굽는 장면을 열화상 카메라로 촬영해 영상 데이터를 만들었습니다.</p>
                  <Figure src={imagePath + '26.webp'} />
                  <p>이 영상 데이터를 바탕으로 GLSL 셰이더를 사용해 열화상 카메라 모드 시뮬레이션을 개발했습니다.</p>
                </Chapter>

                <Chapter kicker='Feedbacks from Stakeholders' title='피드백에서 개선까지'>
                  <p>
                    미래엔 편집팀과 제품팀의 피드백을 바탕으로, 교실에서 태블릿을 쓰는 초등학생을 위해 가독성, 명확성,
                    사용성 중심의 UI 개선을 진행했습니다.
                  </p>
                  <Cols
                    items={[
                      {
                        title: 'Issue 1',
                        body: '5~6학년 학생에게 텍스트가 너무 작습니다.',
                        note: '편집팀',
                      },
                      {
                        title: 'Issue 2',
                        body: '투명한 버튼은 클릭할 수 있는 요소로 인식되지 않고 터치 정확도도 낮아, 어린이의 태블릿 사용에 적합하지 않습니다.',
                        note: '프로젝트 매니저',
                      },
                      {
                        title: 'Issue 3',
                        body: '버튼 애니메이션과 시각 효과가 초등학생에게 불필요한 시각적 소음이 됩니다.',
                        note: '편집팀',
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
                      { title: 'Revision 1', body: '모든 텍스트 크기를 40% 키웠습니다.' },
                      { title: 'Revision 2', body: '투명 버튼을 색이 있는 버튼으로 바꿨습니다.' },
                      { title: 'Revision 3', body: '버튼의 모든 전환 효과를 없앴습니다.' },
                    ]}
                  />
                </Chapter>

                <Chapter kicker='Interaction Design for Inquiry' title='탐구를 인터랙티브하게 만드는 방법'>
                  <p>
                    교실 워크플로와 디지털 교과서에서 탐구가 끊기는 지점을 분석한 결과를 바탕으로, 과학 단원 전반에서
                    반복되는 탐구 구조인 시간에 따른 변화, 상태 비교, 공간 관찰을 중심으로 인터랙션 패턴을 설계했습니다.
                  </p>

                  <SubHeading>Group 1 | 시간 변화 시뮬레이션</SubHeading>
                  <Caption>슬라이더 → 장면/그래프 변화 → 값 읽기</Caption>
                  <Grid cols={3}>
                    <Images files={range(29, 33)} />
                  </Grid>
                  <p>
                    학습자는 슬라이더를 가로나 세로로 탭하거나 드래그해 시간을 조절하고, 재생과 일시정지로 원하는 순간을
                    세밀하게 맞춥니다. 확대해서 각도 값을 읽고, 일정한 간격마다 태양 고도, 그림자 길이, 온도를 기록합니다.
                  </p>

                  <SubHeading>Group 2 | 상태 변화 시뮬레이션</SubHeading>
                  <Caption>3D 오브젝트 탭 → 상태 변화 → 결과 읽기</Caption>
                  <Grid cols={3}>
                    <Images files={range(34, 38)} />
                  </Grid>
                  <p>
                    학습자는 3D 구성 요소를 탭해 비교 가능한 실험군을 만들고, 변인을 통제한 채 같은 실험을 여러 조건에서
                    실행하면서 결과를 비교하고 통제 변인에 대해 추론합니다.
                  </p>

                  <SubHeading>Group 3 | 비교 및 분류</SubHeading>
                  <Caption>오브젝트 드래그 → 차이 관찰 → 결과 확인</Caption>
                  <Grid cols={3}>
                    <Images files={range(39, 45)} />
                  </Grid>
                  <p>
                    학습자는 비교 집단을 만들고, 오브젝트를 조건 사이로 옮기며 행동의 차이를 관찰하고, 관찰이 끝날 때마다
                    결과를 확인합니다.
                  </p>

                  <SubHeading>Group 4 | 3D 구조 및 관찰</SubHeading>
                  <Caption>회전 및 확대 → 핫스팟 표시 → 설명 읽기</Caption>
                  <Grid cols={3}>
                    <Images files={range(46, 49)} />
                  </Grid>
                  <p>
                    학습자는 3D 장면을 회전하고 확대해 여러 각도에서 구조를 살펴보고, 숨겨진 요소를 켜고 끄며, 모델 안에
                    담긴 맥락 설명을 확인합니다.
                  </p>
                </Chapter>

                <Chapter kicker='Wireframes & Layout' title='실험 유형별 인터랙션 및 UI 디자인 가이드를 만들었습니다.'>
                  <p>교육과정을 네 가지 실험 유형으로 묶고, 유형별 인터랙션 및 UI 디자인 가이드를 만들었습니다.</p>
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
                  <Chapter kicker='Final Design' title='실험 준비와 목표'>
                    <p>
                      XR 과학관은 모든 활동을 실험 소개로 시작합니다. 직접 해 보는 탐구에 들어가기 전에 실험의 목표와 전체
                      흐름을 먼저 알려 줍니다.
                    </p>
                    <p>
                      실험마다 활동 가이드를 만들었습니다. 활동 가이드는 인트로 화면의 &apos;Activity Guide&apos; 버튼으로
                      볼 수 있습니다.
                    </p>
                    <Slider files={[...range(56, 64).map((n) => `${n}.webp`)]} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='실험 진행'>
                    <p>
                      교육과정 기반 실험을 진행하는 동안 시스템이 변화를 실시간으로 보여 주고 지속적으로 피드백을 제공해,
                      학생이 진행 상황을 파악하고, 결과를 해석하고, 한 번의 시도가 끝났음을 알 수 있게 돕습니다.
                    </p>
                    <Figure src={imagePath + '65.webp'} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 1. 시간 기반 시뮬레이션'>
                    <p>
                      시간 기반 시뮬레이션은 정지된 장면에 의존하지 않고 시간에 따라 변수가 어떻게 변하는지 관찰하게 하여
                      탐구를 지원합니다. 학생은 시간을 직접 조절하며 멈추고, 되감고, 여러 순간을 비교할 수 있습니다. 반복적인
                      관찰과 측정으로 변화를 추론하게 됩니다.
                    </p>
                    <Slider files={solutionGuides(1, 7)} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 2. 상태 변화 시뮬레이션'>
                    <p>
                      상태 변화 유형의 시뮬레이션에서는 학생이 구성 요소를 직접 조작해 서로 다른 조건을 나란히 비교합니다.
                      스위치, 건전지, 전구 같은 요소를 켜고 끄면서 시스템 상태 사이의 인과 관계를 바로 확인할 수 있습니다.
                    </p>
                    <Slider files={solutionGuides(8, 12, [11])} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 3. 비교 및 분류'>
                    <p>
                      비교 및 분류 시뮬레이션에서는 학생이 오브젝트를 직접 조작해 조건에 따라 어떻게 행동하는지 시험합니다.
                      물건을 용기 사이로 끌어 옮기고, 빼고, 다시 시도하면서 결과를 비교하고 패턴을 찾으며, 반복 실험으로
                      자기만의 분류 순서를 만들어 갑니다.
                    </p>
                    <Slider files={solutionGuides(13, 20)} />
                  </Chapter>

                  <Chapter kicker='Final Design' title='Solution 4. 3D 구조 및 관찰 시뮬레이션'>
                    <p>
                      3D 구조 및 관찰 시뮬레이션에서는 학생이 여러 관점에서 현상을 보며 공간 관계를 탐구합니다. 장면을
                      회전하고 광원을 조절하면서 위치에 따라 가시성과 정렬이 어떻게 달라지는지 관찰하고, 공간 구조와 상대적인
                      움직임을 추론합니다.
                    </p>
                    <Slider files={solutionGuides(21, 27)} />
                  </Chapter>
                </div>

                <Figure src={imagePath + 'finaldesign2.webp'} />

                <div className='lg:w-[60%]'>
                  <Chapter kicker='Final Design' title='Curriculum'>
                    <p>
                      교육과정 기반 실험 전반에서 반복되는 패턴을 분석해, 다양한 과학 콘텐츠를 재사용 가능한 네 가지 XR
                      인터랙션 템플릿으로 정리했습니다. 이를 통해 학년을 넘나들며 탐구, 비교, 관찰을 지원하는 확장 가능한
                      시스템을 만들었습니다.
                    </p>
                    <div className='flex flex-col gap-[16px] md:flex-row'>
                      <div className='md:max-w-[60%]'>
                        <Figure src={imagePath + '74.webp'} />
                      </div>
                      <Grid cols={2}>
                        <Images files={range(75, 78)} />
                      </Grid>
                    </div>
                    <p>각 카테고리는 일관된 XR 레이아웃과 시뮬레이션 로직의 기준이 되었습니다.</p>
                  </Chapter>
                </div>
              </section> 

              {/* REFLECTION */}
              <section id='reflection' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[60%]'>
                <Chapter kicker='Reflection' title='Future Steps'>
                  <p>
                    XR 과학관은 2026년 3월에 출시되어 여러 교실에 도입될 예정입니다. 이번 도입으로 프로토타입을 넘어 실제
                    수업 환경에서 학습 효과, 교실 사용성, 시스템 안정성을 검증할 수 있습니다. 출시 이후에는 사용 데이터,
                    교사 피드백, 학생 결과물을 분석해 아래 질문들을 확인할 계획입니다.
                  </p>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>XR 인터랙션은 흥미뿐 아니라 개념 이해도 높여 주는가?</SubHeading>
                    <p>
                      • 학생이 관찰한 결과를 바탕으로 현상을 자기 말로 설명하고, 예측하고, 비교할 수 있나요?
                      <br />• XR 인터랙션이 교과서 중심 수업에서 흔한 오개념을 줄이는 데 도움이 되나요?
                    </p>
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>시스템이 교사의 수업 운영 부담을 줄여 주는가?</SubHeading>
                    <p>
                      • 기존 자료와 비교해 준비, 설명, 전환, 초기화에 드는 시간이 얼마나 줄어드나요?
                      <br />• 어떤 워크플로나 기능이 교실에서 우선적으로 개선해야 하나요?
                    </p>
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                    <SubHeading>실제 교실의 제약 속에서도 시스템이 안정적인가?</SubHeading>
                    <p>
                      • 기기와 네트워크가 달라져도 로딩 시간, 프레임 속도, 인터랙션 반응성이 안정적으로 유지되나요?
                      <br />• 성능 문제가 이탈, 재시도, 과제 포기 같은 학습 행동에 어떤 영향을 주나요?
                    </p>
                  </div>
                  <Figure src={imagePath + '79.webp'} />
                  <Caption>2026 미래엔 과학 교과서 소개 영상 중에서</Caption>
                  <p>
                    이 평가들을 통해 XR이 실험적인 새로움에서 벗어나 일상적인 교실에서 믿고 쓸 수 있는 학습 도구가 되는
                    방법을 찾아갈 계획입니다.
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
