'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import { ProjectSidebar } from '../../ProjectSidebar'
import { Figure } from '../../../../components/projects/Figure'

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

export default function FranklinKoPage() {
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
                <p className='text-[#FF6B00]'>
                  아동 문학 속 사회적 편견을 다루는, AI 기반 성중립 한국 전래동화 생성기.
                </p>
                <p className='text-ink'>2022 / AI Writing, Tool / AI 엔지니어, 백엔드 개발자</p>
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
                <Chapter kicker='Overview' title='왜 동화 속 역할은 늘 똑같을까?'>
                  <p>
                    왜 동화에서는 여자 주인공이 용을 물리치지 않고, 남자 주인공이 유리구두를 신고 춤추지 않을까요?
                  </p>
                  <p>
                    프랭클린은 성중립적인 한국 전래동화 생성기입니다. 언어 모델이 스스로 편향을 진단하도록 학습시켜,
                    동화를 평등한 시선으로 다시 해석하는 AI 이야기꾼 &lsquo;프랭클린&rsquo;을 만들었습니다. 프랭클린은
                    사용자와 함께 이야기를 만들어가며 AI와 인간 사이의 공감적이고 수평적인 관계를 지향합니다.
                  </p>
                </Chapter>

                <Chapter kicker='Motivation' title='매체가 달라져도 편견은 남아 있다'>
                  <p>
                    아이들이 동화를 접하는 방식은 다양해졌지만, 한국 전래동화에는 여전히 편향된 클리셰와 편견이 남아
                    있습니다.
                  </p>
                  <Figure src={imagePath + '01.png'} />
                </Chapter>
              </section>

              {/* DESIGN */}
              <section id='design' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Web Service Pipeline' title='한 문장씩 함께 쓰는 동화'>
                  <Figure src={imagePath + '02.png'} />
                  <p>
                    프랭클린은 사용자와 함께 동화를 씁니다. 제목, 주인공, 배경, 키워드를 바탕으로 모델이 다음 문장
                    후보 세 개를 제안하고, 사용자는 그중 하나를 고르거나 직접 이어 씁니다. 완성된 동화는 라이브러리
                    페이지에 게시됩니다.
                  </p>
                </Chapter>

                <Chapter kicker='User Flow' title='네 단계를 여덟 번 반복'>
                  <Figure src={imagePath + '05.png'} />
                </Chapter>
              </section>

              {/* DEVELOPMENT */}
              <section id='development' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Dataset' title='1,600편의 동화를 1,197편으로 정제'>
                  <Figure src={imagePath + '03.png'} />
                  <p>
                    저작권이 없는 한국 전래동화 1,600편을 UnSmile 데이터셋으로 정제하여, 총 1,197편을 학습 자료로
                    사용했습니다.
                  </p>
                </Chapter>

                <Chapter kicker='Debiasing' title='성별 축을 따라 임베딩 조정'>
                  <Figure src={imagePath + '04.png'} />
                  <p>
                    여성 단어 축과 남성 단어 축을 기준으로 단어 임베딩을 조정하는 디바이어싱 방식을 적용했습니다.
                  </p>
                </Chapter>

                <Chapter kicker='Prompt Engineering' title='세 가지 프롬프트 구조 비교'>
                  <Figure src={imagePath + '06.png'} />
                  <p>
                    프롬프트에 따른 생성 문장의 성능 차이를 비교하기 위해 세 가지 프롬프트 구조를 설계했습니다. 동화의
                    필수 요소는 인물, 배경, 사건이며, 모델이 생성하는 텍스트는 사건에 해당합니다. 인물과 배경 요소는
                    사용자가 직접 정하도록 했고, 그 외에 이야기의 방향을 잡아주는 단어인 &lsquo;키워드&rsquo;, 이야기의
                    함축적 의미를 담은 &lsquo;제목&rsquo;, 주요 사건을 요약한 &lsquo;줄거리&rsquo;를 준비했습니다. 이 세
                    요소를 적절히 조합해 세 가지 데이터셋을 구축하고, 세 데이터셋으로 학습한 모델에 동일한 입력을 넣어
                    텍스트를 추출했습니다. 표 11, 표 12, 표 13은 각 데이터셋의 구성과 출력 예시입니다.
                  </p>
                  <p>
                    세 가지 프롬프트 방식마다 판타지 10편, 일상 10편씩 동화를 생성해 모델별로 총 100편의 동화 텍스트를
                    만들고, PPL 값을 계산해 산술평균을 비교했습니다. 그 결과 방식 1의 문장 복잡도 평가가 가장 낮았고,
                    이를 Web Flow 구성에 사용했습니다.
                  </p>
                </Chapter>
              </section>

              {/* CREDITS */}
              <section className='flex flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Credits' title='논문, 팀, 지원'>
                  <div className='flex flex-col gap-[24px]'>
                    <CreditRow label='논문'>
                      <a
                        href='http://journal.dcs.or.kr/xml/37344/37344.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-[#FF6B00]'
                      >
                        편향 완화 한국어 AI 동화 생성기 구축 ↗
                      </a>
                    </CreditRow>
                    <CreditRow label='팀'>
                      <p>안지인, 이육샛별 / 지도: 정다샘</p>
                    </CreditRow>
                    <CreditRow label='역할'>
                      <p className='font-medium text-black'>AI 엔지니어 (일관성 파트 리드)</p>
                      <ul className='mt-[4px] flex list-disc flex-col gap-[4px] pl-[20px]'>
                        <li>강화학습 알고리즘을 활용한 AI 문장 일관성 개선 과정 설계</li>
                        <li>
                          데이터 전처리 과정을 위한 감성 분석 및 혐오 표현 탐지 소프트웨어 개발
                        </li>
                        <li>FastAPI 기반 웹사이트용 AI 모델 서빙 파이프라인 개발</li>
                      </ul>
                    </CreditRow>
                    <CreditRow label='후원'>
                      <p>스마일게이트 AI 멤버십</p>
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
