'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import CroppedFigure from '../../../components/projects/CroppedFigure'
import { Figure } from '../../../components/projects/Figure'

const imagePath = '/images/projects/daily-folding-practice/'

const sectionIds = ['archive', 'process'] as const

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

export default function DailyFoldingPracticePage() {
  const project = projects.find((p) => p.slug === 'daily-folding-practice')
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
            <div className='flex flex-col justify-between  md:flex-row'>
              <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              <div className='flex flex-col gap-[4px] text-[16px] leading-relaxed lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>
                  Collaborated with type designer Namju Ok to further develop TypoFold through a deeper understanding of
                  type design.
                </p>
                <p className='text-black'>
                  04.2026 - 05.2026 / Workshop, Computational Design, Interactive Media / Space PADO
                </p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-[3/4] w-full overflow-hidden md:aspect-video md:overflow-hidden'>
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
              {/* OVERVIEW */}
              <section id='archive' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Archive' title='Installation views'>
                  <div className='flex flex-wrap gap-[12px]'>
                    <Figure src={imagePath + '01.jpg'} />
                    <div className='grid grid-cols-1 gap-[12px] md:grid-cols-2'>
                      <Figure src={imagePath + '02.jpg'} />
                      <Figure src={imagePath + '03.jpg'} />
                      <Figure src={imagePath + '04.jpg'} />
                      <Figure src={imagePath + '05.jpg'} />
                    </div>
                    <Figure src={imagePath + '06.jpg'} />
                    <div className='grid grid-cols-1 gap-[12px] overflow-hidden md:grid-cols-2'>
                      <Figure src={imagePath + '07.jpg'} />
                      <div className='grid grid-rows-2 h-full'>
                        <Figure src={imagePath + '08.jpg'} />
                        <Figure src={imagePath + '09.jpg'} />
                      </div>
                      <Figure src={imagePath + '10.jpg'} />
                      <Figure src={imagePath + '11.jpg'} />
                    </div>
                    <Figure src={imagePath + '12.jpg'} />

                    <div className='flex gap-[12px] w-full overflow-hidden'>
                      <Figure className='w-[35.65%]' src={imagePath + '13.jpg'} />
                      <Figure className='w-[64.35%]' src={imagePath + '14.jpg'} />
                    </div>
                    <Figure src={imagePath + '15.jpg'} />
                  </div>
                </Chapter>
              </section>

              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Process' title='About the Collaboration'>
                  <div className='flex flex-row gap-[12px]'>
                    <Figure className='w-[35.65%]' src={imagePath + '16.jpg'} />
                    <p>
                      공간 파도에서 진행되는 개인전을 준비하기에 앞서 작업했던 TypoFold 툴을 이용해 두달간 매일 접기 연습을 했습니다.
                      그전에는 유저 테스트를 진행할때도 인터넷의 무료 폰트를 사용했는데 대부분 단순한 형태의 폰트였습니다.
                      이번에는 실제 폰트 디자이너로 활동하시는 '옥남주' 디자이너님과 함께 그의 폰트 4가지를 빌려 TypoFold로 접어보았습니다.
                      실제 폰트를 적용하면서 다음과 같은 제약을 발견하고 디벨롭하게 되었습니다.
                    </p>
                  </div>
                </Chapter>

                <Chapter kicker='Fonts' title='Four Fonts by Namju Ok'>
                  <div className='flex flex-col gap-[24px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Stone</SubHeading>
                      <p className='text-neutral-600'>
                        Stone은 도트 폰트를 만들고자 Glyphs3 파일의 해상도를 낮추는 데서 출발했습니다. 커브와 핸들 없이 세리프를
                        표현하며, 본문용 서체의 골격을 선분과 앵커 포인트가 성기게 감쌉니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Arbor</SubHeading>
                      <p className='text-neutral-600'>
                        Arbor는 원목이나 철을 엮어 만든 아치형 구조물, 땅에 깊이 박혀 덩굴 식물의 생장을 돕는 지지대이자 정원
                        장식에서 이름을 가져왔습니다. 베이스라인에 면해 두툼하게 놓인 세리프와 아르누보풍으로 옆으로 늘어지는
                        자형이 이러한 특성에서 착안되었으며, 600개가 넘는 글리프로 판독성을 넘나드는 자유로운 형태를 그릴 수
                        있습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>limnlimn</SubHeading>
                      <p className='text-neutral-600'>
                        채소와 과일을 썰어 넣듯 알파벳 소문자 n을 조각내어 모듈을 파생한 폰트로, 둥근 아치형 곡선을 가진 글자들로
                        이루어져 있습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Koshmar</SubHeading>
                      <p className='text-neutral-600'>
                        프랑스어로 악몽을 뜻하는 Koshmar는 악몽 같은 디자이너의 손글씨를 어떻게든 보정해보고자 애쓰는 과정의
                        기록입니다. 본문용 세리프체와 이탤릭체 구성으로 기획해 한창 개발 중입니다.
                      </p>
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Development' title='TypoFold 디벨롭 과정'>
                  <div className='flex flex-col gap-[24px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>곡선이 많은 폰트를 위한 최적화</SubHeading>
                      <p className='text-neutral-600'>
                        네 폰트 모두 곡선이 많아, 이를 안정적으로 다루기 위해 기존 웹사이트도 함께 손봤습니다. Three.js와
                        p5.js처럼 무거운 라이브러리가 들어간 컴포넌트들을 next/dynamic으로 분리해 초기 로딩 부담을 줄이고,
                        폴딩과 언폴딩을 여러 번 반복해도 GPU 메모리가 쌓이지 않도록 씬이 전환되거나 언마운트될 때마다
                        geometry와 material을 해제하도록 했습니다. 또한 같은 폰트 파일을 반복해서 불러오지 않도록 캐싱하고,
                        면마다 반복적으로 계산되는 언폴드 변환 행렬도 한 번 계산한 값을 재사용하도록 했습니다. 여기에 React의
                        메모이제이션을 적극적으로 활용해 불필요한 리렌더링과 재계산을 줄였습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>접는 날개선 추가</SubHeading>
                      <p className='text-neutral-600'>
                        접을 때 어디를 눌러 접어야 하는지 더 명확하게 보이면 좋겠다는 생각에 날개선을 추가했습니다. 날개선은
                        사다리꼴 형태로 만들어, 접는 방향과 위치를 직관적으로 인지할 수 있도록 했습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>이어지는 옆면을 위한 UV 매핑 수정</SubHeading>
                      <p className='text-neutral-600'>
                        폰트를 입체로 접다 보니 옆면 텍스쳐링에서 문제가 발견되었습니다. 실제로는 하나로 이어져야 할 옆면들이
                        기존에는 면 하나하나에 개별적으로 텍스쳐가 입혀지고 있었습니다. 이를 해결하기 위해 이어지는 면들을
                        U축 또는 V축 기준으로 순서를 매기고, 그 비율만큼 텍스쳐를 할당해 옆면 전체가 하나로 이어지도록 UV
                        매핑을 다시 구성했습니다.
                      </p>
                    </div>
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
