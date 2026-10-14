'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import { ProjectSidebar } from '../../ProjectSidebar'
import { Figure } from '../../../../components/projects/Figure'

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

export default function WordWideWebKoPage() {
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
                <p className='text-[#FF6B00]'>유의어의 연결로 시를 만드는 단어 짜기 플랫폼.</p>
                <p className='text-ink'>
                  2024 / Tool Development, Media Art / 그래픽 디자이너, AI 엔지니어, 프론트엔드 개발자 / SFPC Summer
                  2024
                </p>
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
                <Chapter kicker='Overview' title='연결된 단어로 짜는 시'>
                  <p>
                    Word Wide Web은 유의어의 연결을 통해 시를 만드는 단어 짜기 플랫폼입니다. 한국 동요 &lsquo;원숭이 엉덩이는 빨개&rsquo;에서 영감을 받아, 단어 사이의 의미적 관계를 이어가며 연쇄적인 시를 쓸 수 있도록 돕습니다.
                  </p>
                  <Figure src={imagePath + '01.gif'} />
                  <Caption>연쇄시를 짜는 인터페이스</Caption>
                </Chapter>

                <Chapter kicker='Background' title='SFPC: 사람 크기의 자연어 처리'>
                  <p>
                    SFPC의 Human-Scale Natural Language Processing 수업에서, 우리 반은 텍스트를 16개의 품사와 6개의 기준 쌍(개-고양이, 구체-추상, 실용-낭만 등)으로 분해하는 체계를 사용해 함께 단어에 라벨을 붙였습니다. 이 경험에서 영감을 받아, 이러한 의미 척도를 바탕으로 비슷한 단어를 찾도록 돕는 플랫폼을 만들었습니다.
                  </p>
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='How it works' title='단어를 이어 쓰기'>
                  <ol className='flex list-decimal flex-col gap-[4px] pl-[20px]'>
                    <li>시작 단어를 입력합니다.</li>
                    <li>Word Wide Web이 제안하는 연관 단어를 둘러봅니다.</li>
                    <li>
                      원하는 단어가 없다면 직접 추가할 수 있습니다 (일부 단어는 데이터베이스에 없을 수 있습니다).
                    </li>
                    <li>단어를 계속 이어 시를 완성합니다.</li>
                  </ol>
                  <Figure src={imagePath + '02.gif'} />
                  <Caption>단어 제안 및 추가 과정</Caption>
                  <Figure src={imagePath + '03.gif'} />
                  <Caption>단어를 시로 엮는 과정</Caption>
                  <a
                    href='https://solarword.vercel.app/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline underline-offset-2 hover:text-[#FF6B00]'
                  >
                    Word Wide Web 웹사이트 방문 ↗
                  </a>
                </Chapter>
              </section>

              {/* FINAL DESIGN */}
              <section id='final design' className='flex scroll-mt-[110px] flex-col gap-[56px]'>
                <Chapter kicker='Final Design' title='예상치 못한 연결'>
                  <p className='max-w-[640px] lg:w-[70%]'>
                    이 과정에서 예상치 못한 언어적 연결을 발견하고, 언어 사이의 관계에 대한 우리의 인식에 도전하는 시적 표현을 만들어 보세요.
                  </p>
                  <Figure src={imagePath + '04.gif'} className='md:max-w-[50%]' />
                  <Caption>예상치 못한 단어 연결의 예시</Caption>
                  <Figure src={imagePath + '05.png'} />
                  <Caption>포스터: 단어의 거미줄과 Verbal Vortex</Caption>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Credits' title='데이터 기여와 사용 기술'>
                  <Figure src={imagePath + '06.gif'} />
                  <Caption>기여된 데이터셋으로 연쇄시를 짜는 모습</Caption>
                  <div className='flex flex-col gap-[24px]'>
                    <CreditRow label='웹사이트'>
                      <a
                        href='https://solarword.vercel.app/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-[#FF6B00]'
                      >
                        Word Wide Web ↗
                      </a>
                    </CreditRow>
                    <CreditRow label='텍스트 데이터, 단어 스코어링'>
                      <p>
                        Ilona Brand, Lillian Hua, Jean Kim, Maya Williams, kathy wu, Joses Ho, Maya Detwiller, Jireh
                        Deng, Ellen Fritz, Alice Yuan Zhang, Yewon Jang, Charis Poon, Kimberly Lyle, Hannah Jenkins,
                        Cecilia Knaub, Gabriella Chronis, Juliana Gomezr
                      </p>
                      <p className='mt-[8px] text-neutral-500'>
                        데이터와 단어 스코어링은 참가자들이 함께 만들었고, 각자 이 공유 데이터셋을 바탕으로 개별 프로젝트를 진행했습니다.
                      </p>
                    </CreditRow>
                    <CreditRow label='기술'>
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
