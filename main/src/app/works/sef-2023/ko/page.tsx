'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import { ProjectSidebar } from '../../ProjectSidebar'
import { Figure } from '../../../../components/projects/Figure'

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

export default function Sef2023KoPage() {
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
                <p className='text-[#FF6B00]'>
                  네이버 커넥트재단 소프트웨어 교육 페스티벌 SEF2023의 웹사이트 기획, UX 라이팅, 배포.
                </p>
                <p className='text-ink'>
                  05.2023 - 09.2023 / Web Planning, UX Writing / 네이버 커넥트재단 / 프로덕트 매니저
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
                <Chapter kicker='Overview' title='소프트웨어 교육 페스티벌의 웹사이트 PM'>
                  <p>
                    SEF(Software Education Festival)는 2017년부터 네이버 커넥트재단이 주최해 온 소프트웨어 교육
                    컨퍼런스입니다. 저는 SEF2023의 웹사이트 PM으로 기획, 디자인, 개발 전 과정을 관리했습니다.
                  </p>
                  <p>
                    교사, 학생, 학부모, 기업 등 소프트웨어 교육에 관심 있는 누구나 참여할 수 있는 페스티벌로, 경험과
                    고민을 나누고 학습 방법, 노하우, 사례 등 다양한 세션을 통해 소프트웨어 교육을 배울 수 있습니다.
                    소프트웨어 세계의 진입장벽을 낮추고 유용한 정보를 널리 나누는 것이 목표입니다. 오프라인 행사는 NAVER
                    1784에서 열렸습니다.
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
                    <CreditRow label='역할'>
                      <p>프로덕트 매니저 (웹사이트), 풀타임 스태프</p>
                    </CreditRow>
                    <CreditRow label='기간'>
                      <p>2023.05 - 2023.09 (풀타임 스태프, 네이버 커넥트재단 인턴)</p>
                    </CreditRow>
                    <CreditRow label='기술 / 도구'>
                      <p>Figma, Zeplin, HTML, CSS</p>
                    </CreditRow>
                    <CreditRow label='웹사이트'>
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
                <Chapter kicker='Process 1' title='UX 라이팅: SEF의 목소리 찾기'>
                  <p>
                    SEF의 콘텐츠와 서비스에 적용될 가이드라인을 만드는 첫 과정으로 SEF만의 목소리를 만들어보는 시간을
                    가졌습니다. SEF의 페르소나와 보이스톤이 있다면, 보여지는 글이 작성될 다양한 플랫폼에서 해당
                    가이드라인을 바탕으로 통일성 있게 작성 가능합니다. 또한, 표기가 헷갈리는 날짜, 장소, 해쉬태그,
                    타이틀과 같은 표기명을 함께 논의해봄으로써 정확하고 빠른 업무 처리를 돕는다는 데에 의의가 있습니다.
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
                        <p>나와 같은 고민을 하는 사람들이 이렇게 많고, 경험을 나누고, 우리는 함께합니다.</p>
                      </div>
                      <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                        <img
                          src={imagePath + 'char-change.png'}
                          alt='Change character'
                          className='h-[88px] w-auto self-start'
                        />
                        <p className='text-heading font-medium text-black'>Change</p>
                        <p>세상이 변하면 우리도 변해야 하니까.</p>
                      </div>
                      <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                        <img
                          src={imagePath + 'char-learn.png'}
                          alt='Learn character'
                          className='h-[88px] w-auto self-start'
                        />
                        <p className='text-heading font-medium text-black'>Learn</p>
                        <p>누구나 시작할 수 있고, 누구나 배울 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-x-[24px] gap-y-[32px] md:grid-cols-[1fr_1.1fr_1.3fr] md:pt-[40px]'>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-1'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#3FB4E8' }}>
                        Learn
                      </p>
                      <p className='mt-[12px] font-medium text-black'>선생님 같은</p>
                      <p>너도 시작할 수 있고, 할 수 있다는 자신감 부여</p>
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
                        쉬운
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-2'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#8FDB4F' }}>
                        Grow
                      </p>
                      <p className='mt-[12px] font-medium text-black'>동료나 선배님 같은</p>
                      <p>옆에서 함께 뛰어주는, 적극적으로 도와주는</p>
                    </div>
                    <div className='relative flex items-center md:col-start-2 md:row-start-2'>
                      <span className='absolute -right-[12px] top-1/2 hidden h-px w-[12px] bg-black md:block' />
                      <span className='absolute -right-[12px] hidden border-l border-black md:block top-0 -bottom-[32px]' />
                      <span className='absolute bottom-1/2 left-1/2 hidden border-l border-dashed border-black md:block top-0' />
                      <span className='absolute -bottom-[32px] left-1/2 top-1/2 hidden border-l border-dashed border-black md:block' />
                      <span className="relative hidden h-px flex-1 bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <p className='relative z-10 shrink-0 bg-white px-[8px] text-heading text-black md:text-center'>
                        명확한, 뚜렷한
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[4px] md:col-start-1 md:row-start-3'>
                      <p className='text-[40px] font-medium leading-none md:text-[48px]' style={{ color: '#8E7CF0' }}>
                        Change
                      </p>
                      <p className='mt-[12px] font-medium text-black'>우리 WE</p>
                      <p>내가 성장하고 도움 받은 만큼 다른 이에게 도움을 주는, 선순환 구조</p>
                    </div>
                    <div className='relative flex items-center md:col-start-2 md:row-start-3'>
                      <span className='absolute -right-[12px] top-1/2 hidden h-px w-[12px] bg-black md:block' />
                      <span className='absolute -right-[12px] hidden border-l border-black md:block top-0 bottom-1/2' />
                      <span className='absolute bottom-1/2 left-1/2 hidden border-l border-dashed border-black md:block top-0' />
                      <span className="relative hidden h-px flex-1 bg-black md:block after:absolute after:right-0 after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-black after:content-['']" />
                      <p className='relative z-10 shrink-0 bg-white px-[8px] text-heading text-black md:text-center'>
                        공감하는, 따뜻한
                      </p>
                      <span className='relative hidden h-px flex-1 bg-black md:block' />
                    </div>
                    <div className='flex flex-col gap-[16px] md:col-start-3 md:row-span-3 md:row-start-1 md:pl-[40px] md:pt-[19px]'>
                      <p className='text-heading text-black'>SEF의 Voice Persona</p>
                      <p className='text-[48px] font-medium leading-none text-black'>페이스 메이커</p>
                      <p className='text-label italic text-neutral-600'>
                        육상이나 수영 등에서 다른 선수를 위해 속도를 조율하여 대회에서 좋은 기록을 낼 수 있도록 만드는
                        보조자. 마라톤, 스피드 스케이팅 등 경주 종목에서 많이 나타나며, 특히 장거리에서 많이 활용된다.
                      </p>
                      <div className='flex flex-col gap-[20px]'>
                        <p>
                          → 코딩이 나에게 맞는지, 혹은 어떤 분야인지 너무 알고 싶지만 어떻게 시작해야 할지 모르는
                          사람들에게 옆에서 차근차근 알려주고,
                        </p>
                        <p>→ 방금 막 개발에 입문한 사람들이 더 확장된 영역으로 갈 때까지 옆에서 같이 뛰어주며</p>
                        <p>→ 소프트웨어 씬에 선한 영향력을 불어넣어주는 코딩계의 페이스메이커</p>
                      </div>
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* WEBFLOW */}
              <section id='webflow' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 2' title='Webflow'>
                  <p>
                    웹사이트 기획안을 네이버 디자인팀과 개발팀에 발표하고, 약 두 달 동안 디자인, 마크업, 백엔드 개발,
                    QA, 배포 과정을 함께 진행했습니다. SEF2023 웹사이트는 약 일주일 간격으로 네 번 오픈 및
                    업데이트되었습니다.
                  </p>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>1차 오픈</p>
                      <p>
                        SEF2023 웹사이트의 첫 오픈으로, 사전 신청을 최대한 늘리는 것이 목표였습니다. 온라인·오프라인
                        행사 기획팀과 긴밀히 협업해 행사 기획이 웹사이트에 정확히 반영되도록 했습니다. 온라인 프로그램
                        신청은 약 12,000명으로 2022년(9,011명)보다 약 33% 늘었고, 오프라인 행사 신청은 약
                        2,300명이었습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>2차 업데이트</p>
                      <p>
                        SEF 캐릭터를 더 돋보이게 하는 커스텀 마우스 커서를 추가했고, 확정된 온라인·오프라인 프로그램
                        연사 소개, FAQ, 후원사 목록 섹션을 더했습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>3차 업데이트</p>
                      <p>
                        행사 당일에 오픈했습니다. 온라인 세션 라이브 스트림을 최상단에 배치하고, 코딩 교육 프로그램을
                        직접 체험해 볼 수 있는 섹션을 더했습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[4px] border-t border-black pt-[12px]'>
                      <p className='font-medium text-black'>4차 업데이트</p>
                      <p>페스티벌이 끝난 뒤 모든 행사 정보를 아카이빙했습니다.</p>
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
                      <Caption>1차 오픈, 모바일·태블릿</Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <div className='relative aspect-[4/3] w-full overflow-hidden'>
                        <img
                          src={imagePath + '01.gif'}
                          alt='SEF2023 custom mouse cursor'
                          className='absolute left-0 top-0 h-full w-full object-cover object-top'
                        />
                      </div>
                      <Caption>2차 업데이트, 커스텀 마우스 커서</Caption>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                      <Figure src={imagePath + 'live.png'} alt='SEF2023 live stream' />
                      <Caption>3차 업데이트, 온라인 세션 라이브 스트림</Caption>
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
                      <Caption>4차 업데이트, 데스크톱</Caption>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-[16px] md:grid-cols-2'>
                    <div className='flex flex-col '>
                      <Figure src={imagePath + '04.png'} />
                      <Caption>빨간 박스는 외부 링크 영역을 나타냅니다.</Caption>
                    </div>
                    <Figure src={imagePath + '03.png'} />
                  </div>
                </Chapter>
              </section>

              {/* DEPLOYMENT */}
              <section id='deployment' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process 3' title='개발 및 배포'>
                  <p>
                    4단계 배포 계획에 따라 실시간 스트리밍 기능을 연동하고, 해외 코딩 교육 단체들과 협업했습니다. Google
                    Analytics 기준 방문자는 205,301명으로 2022년보다 약 69% 늘었고, 페이지뷰는 317,131회, 하루 최다
                    방문자는 24,885명으로 2022년 최고치(9,255명)의 약 2.7배였습니다. 다만 SEF2022는 온라인으로만 열렸고,
                    SEF2023은 NAVER 1784에서 오프라인 행사가 더해졌습니다.
                  </p>
                  <p>
                    전 세계 코딩 교육 비영리 단체들과 이메일과 온라인 미팅으로 직접 협업해, 방문자가 프로그램을 체험해
                    볼 수 있는 섹션을 만들었습니다. 특히 실습 부스 프로그램을 위해 p5.js 재단에 직접 연락했고, p5.js를
                    한국어로 소개하는 섹션을 만들었습니다. p5.js도 공식 인스타그램에서 이 행사를 홍보해 주었습니다.
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
                      <Caption>p5.js와 SEF2023 협업 인스타그램</Caption>
                    </div>
                  </div>
                  <p>
                    SEF는 2017년부터 매년 열렸지만 널리 알려지지는 않았습니다. SEF가 일회성 행사가 아니라 꾸준히 이어 온
                    믿을 만한 프로그램임을 전하기 위해 SEF의 히스토리를 소개하는 섹션을 기획했습니다. 히스토리를
                    둘러보며 국내 개발 트렌드가 시간에 따라 어떻게 변해 왔는지도 살펴볼 수 있습니다.
                  </p>
                  <Figure src={imagePath + '05.gif'} />
                  <Caption>SEF 히스토리를 소개하는 섹션</Caption>
                  <p>
                    2023년에는 SEF 캐릭터를 도입하고 웹사이트를 캐릭터 중심으로 디자인했습니다. 사용자가 나만의 캐릭터를
                    만들어 인스타그램에 공유할 수 있게 했고, 200명이 넘는 참여자와 함께 자발적인 확산이 일어났습니다.
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
                <Chapter kicker='Staff' title='페스티벌 현장에서'>
                  <p className='lg:w-[70%]'>
                    웹사이트뿐 아니라 NAVER 1784에서 열린 오프라인 행사에도 스태프로 참여해 코딩 밋업과 토크버스킹을
                    진행했습니다.
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
