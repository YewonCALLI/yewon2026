'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import CroppedFigure from '../../../../components/projects/CroppedFigure'
import { Figure } from '../../../../components/projects/Figure'
import Head from 'next/head'

const imagePath = '/images/projects/daily-folding-practice/'

const sectionIds = ['process', 'archive'] as const

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

function ImagePlaceholder({ id, file, desc }: { id: string; file: string; desc: string }) {
  return (
    <div className='my-[12px] flex aspect-video w-full flex-col items-center justify-center gap-[6px] border border-dashed border-neutral-400 bg-neutral-50 px-[16px] text-center'>
      <p className='text-[13px] font-semibold text-[#FF2D8C]'>{id}</p>
      <p className='text-[13px] text-neutral-600'>{desc}</p>
      <p className='font-mono text-[12px] text-neutral-400'>{file}</p>
    </div>
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
          <aside className='hidden md:block w-full shrink-0 border-b border-black px-[30px] py-[24px] md:sticky md:top-[60px] md:h-[calc(100dvh-60px)] md:w-[240px] md:overflow-y-auto md:border-b-0 md:border-r md:px-[30px] md:py-[20px]'>
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
              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Process' title='About the Collaboration'>
                  <div className='grid grid-cols-1 gap-[12px] md:grid-cols-3'>
                    <Figure className='w-full' src={imagePath + 'workshop_poster.png'} />
                    <Figure className='w-full' src={imagePath + 'workshop_poster2.png'} />

                    {/* <Figure className='w-[35.65%]' src={imagePath + '16.jpg'} /> */}
                    <p>
                      저는 타입 디자이너 옥남주님(@nevi_books)과 함께 콜라보레이션을 진행하며, 실제 디자이너들이
                      제작하고 사용하는 폰트들을 TypoFold에 적용하며 폰트 제작 과정과 폰트의 구조를 이해하고, 이를
                      바탕으로 TypoFold를 개선하는 작업을 진행했습니다. 저희는 약 2달간 협력했고 그에 대한 결과물로 공간
                      파도에서 디자이너 대상의 무료 워크샵을 진행했습니다.
                    </p>
                  </div>
                </Chapter>

                <Chapter kicker='Fonts' title='Four Font Families by Namju Ok'>
                  {/* TODO: Koshmar Italic을 썼다면 '7개 스타일'로, 아래 Koshmar를 'Regular, Italic'으로 */}
                  <p>이번 협업을 통해 감사하게도 남주님의 폰트 4종(6개 스타일)을 TypoFold에 적용할 수 있었습니다.</p>
                  <dl className='grid grid-cols-[max-content_1fr] gap-x-[24px] gap-y-[4px] text-[14px]'>
                    {[
                      ['limnlimn', 'Leaves, Fresh'],
                      ['Stone', 'Heavy, Classy'],
                      ['Arbor', 'Regular'],
                      ['Koshmar', 'Regular'],
                    ].map(([family, styles]) => (
                      <div key={family} className='contents'>
                        <dt className='font-semibold'>{family}</dt>
                        <dd className='text-neutral-600'>{styles}</dd>
                      </div>
                    ))}
                  </dl>
                  <Figure src={imagePath + 'fontlists.png'} />
                  <p>
                    네 가지 폰트는 생김새가 모두 달라서 폰트마다 서로 다른 형태의 전개도가 필요했습니다. 그래서 남주
                    디자이너님과 함께 폰트별로 알파벳과 특수기호의 글리프를 살펴보고, 각 글리프가 3D 형태로 변환되었을
                    때 나올 수 있는 다면체의 유형을 정리했습니다.
                  </p>
                </Chapter>

                <Chapter kicker='Terms' title='A Shared Vocabulary'>
                  <p>
                    다면체의 유형을 설명하기에 앞서, 이 글에서 사용하는 용어들을 먼저 소개하려고 합니다. TypoFold는 2D
                    글리프를 3D 입체로 변환한 뒤 다시 전개도로 펼치는 도구이기 때문에, 한 분야의 용어만으로는 전체
                    과정을 설명하기 어려웠습니다. 그래서 디자이너님의 도움을 받아 타이포그래피 디자인에서 쓰는 용어를
                    익혔고, 이 글에서는 글리프의 형태는 타이포그래피 용어로, 다면체의 구조는 GIS와 컴퓨터 그래픽스
                    용어로 설명합니다. [8]
                  </p>
                  <div className='flex flex-col'>
                    {[
                      {
                        term: 'Glyph',
                        body: (
                          <>
                            글리프는 폰트를 구성하는 개별 글자로, 하나의 글자가 2가지 이상의 글리프로 만들어질 수
                            있습니다. 또한 세로쓰기용 쉼표인 모점과 가로쓰기용 쉼표인 반점처럼 동일한 기능을 하더라도
                            모양이 다른 문장부호는 서로 다른 글리프로 봅니다. [1]
                          </>
                        ),
                      },
                      {
                        term: 'Counter',
                        image: 'counter.png',
                        body: (
                          <>
                            타입 디자인에서는 획에 둘러싸인 흰 공간을 Counter라고 부릅니다. Counter는 크게 두 가지로
                            나뉩니다. 획에 완전히 둘러싸여 바깥 여백과 연결되지 않은 공간은 Closed Counter(A, B, D, O,
                            P, Q, R), Aperture를 통해 바깥 여백과 이어진 공간은 Open Counter(C, S, c, s)입니다. [2]
                          </>
                        ),
                      },
                      {
                        term: 'Contour',
                        body: (
                          <>
                            Contour는 직선과 곡선 조각이 끊김 없이 이어진 선으로, 열려 있을 수도 닫혀 있을 수도
                            있습니다. [4] 폰트 파일에는 글리프를 이루는 contour 정보가 들어 있고, 저는 opentype.js로 이
                            정보를 SVG 문자열로 바꾸는 과정을 거쳤습니다.
                          </>
                        ),
                      },
                      {
                        term: 'Exterior / Interior ring',
                        image: 'ring.png',
                        body: (
                          <>
                            폰트 형식에 따라 contour를 저장하는 방식은 TrueType(ttf)과 PostScript/CFF(otf) 두
                            가지입니다. [3] 두 방식 모두 contour를 그린 순서대로 저장하고, 윤곽선의 방향(바깥 윤곽을
                            TrueType은 시계 방향, CFF는 반시계 방향으로 그림)으로 채울 영역을 구분할 뿐, 어느 선이 어느
                            선 안에 있는지는 저장하지 않습니다. 폰트 렌더러는 이 방향을 이용하는 nonzero 규칙으로 면을
                            칠하지만, 형식마다 방향이 반대이기 때문에 저는 방향 대신 위치 관계로 판정하기로 했습니다.
                            contour 위에서 고르게 뽑은 점들로 ray casting을 해서 다른 contour 안에 들어 있는지 확인하고,
                            각 contour가 몇 겹 안에 들어 있는지 셉니다. 짝수면 exterior, 홀수면 interior입니다. 이는
                            even-odd fill rule과 같은 원리입니다. [7] 다만 윤곽선끼리 겹치게 그려진 폰트에서는 두 규칙의
                            결과가 달라질 수 있습니다.
                          </>
                        ),
                      },
                      {
                        term: 'Polyhedron / Polyhedra',
                        body: (
                          <>
                            폰트 안에 글리프 정보를 SVG로 변환하고 높이값을 주어 extrude하면 3D 입체가 되는데 이 입체를
                            Polyhedron이라고 하려고 합니다. i처럼 서로 떨어진 입체 여러 개로 이뤄진 글리프는 복수형인
                            Polyhedra로 부르고, 하나의 글리프에서 나온 입체들은 한 묶음으로 다룹니다.
                          </>
                        ),
                      },
                    ].map(({ term, image, body }) => (
                      <div
                        key={term}
                        className='grid grid-cols-1 gap-[12px] border-t border-neutral-200 py-[24px] md:grid-cols-[1fr_2fr] md:gap-[40px]'
                      >
                        <div className='flex flex-col gap-[12px]'>
                          <SubHeading>{term}</SubHeading>
                          {image && <Figure className='w-[70%] md:w-full' src={imagePath + image} />}
                        </div>
                        <p className='text-neutral-600'>{body}</p>
                      </div>
                    ))}
                  </div>
                </Chapter>

                <Chapter kicker='Font Tree' title='Types of Polyhedra from a Glyph'>
                  <p>
                    위의 용어들을 바탕으로, 글리프 하나가 3D로 변환되며 어떤 다면체가 되는지를 트리로 정리했습니다.
                    트리는 두세 가지 질문을 차례로 던지며 내려가고, 마지막 가지에서 그 글리프가 하나의 Polyhedron인지
                    여러 개의 Polyhedra인지, 그리고 그 경계가 몇 개의 exterior ring과 interior ring으로 이루어지는지가
                    결정됩니다.
                  </p>
                  <Figure src={imagePath + 'Font Tree.png'} />
                  <div className='flex flex-col gap-[24px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>1. How many connected components?</SubHeading>
                      <p className='text-neutral-600'>
                        첫 번째 질문은 글리프가 서로 떨어진 몇 개의 component로 이루어져 있는지입니다. 'I'나 'O'처럼
                        component가 하나라면 결과물은 하나의 Polyhedron이 되고, 'i'처럼 몸통과 점이 떨어져 있다면 여러
                        개의 Polyhedra가 됩니다. 같은 문자 'i'라고 해도 폰트의 생김새에 따라 Polyhedron이 될 수도
                        polyhedra가 될 수도 있습니다. 한 글리프안에 여러개의 Polyhedra가 있는 경우에는 전개도는
                        Polyhedra의 개수만큼 나뉘어집니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>2. Any Closed Counters?</SubHeading>
                      <p className='text-neutral-600'>
                        두 번째 질문은 closed counter가 있는지입니다. closed counter가 없는 글리프는 exterior ring만으로
                        경계가 정의되고, closed counter가 있으면 그 개수만큼 interior ring이 생깁니다. 예를 들어 'O'는
                        exterior ring 1개와 interior ring 1개, 'B'는 exterior ring 1개와 interior ring 2개로 이루어진
                        Polyhedron입니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>3. Any Nested Exterior Rings?</SubHeading>
                      <p className='text-neutral-600'>
                        component가 여러 개이면서 closed counter가 있는 경우에는 구멍 안에 또 다른 component(depth 2의
                        exterior ring)가 들어 있는지 확인합니다. 겉으로는 하나의 형태처럼 보여도 바깥 component와 이어져
                        있지 않기 때문에 별도의 Polyhedron으로 떨어집니다. 예를 들어 Arbor의 '0'은 바깥 테두리, 가운데
                        점, 위쪽 막대로 이루어진 3개의 Polyhedra이고, 이 중 가운데 점이 nested exterior ring입니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Edge case: Pinch point</SubHeading>
                      <p className='text-neutral-600'>
                        글리프 중에는 윤곽선이 한 점에서 다른 윤곽선이나 자기 자신과 맞닿아 있는 것들이 있습니다.
                        처음에는 Stone Heavy와 Classy의 말 모양 딩벳에서 이런 접점을 발견했는데, 네 폰트의 글리프를 전부
                        조사해 보니 생각보다 흔했습니다. 세 가지의 맞닿는 방식이 있었습니다.
                      </p>
                      <ul className='flex flex-col gap-[2px] pl-[16px] text-neutral-600'>
                        <li>(a) 윤곽선 하나가 자기 자신과 닿는 경우: Stone 말</li>
                        <li>(b) 서로 다른 exterior ring 두 개가 닿는 경우: limnlimn i, l, y</li>
                        <li>(c) exterior ring이 interior ring과 닿는 경우: limnlimn k</li>
                      </ul>
                      <p className='text-neutral-600'>
                        2D 폴리곤에서 이런 접점을 허용하는지는 데이터 모델마다 다릅니다. OGC Simple Features는 서로 다른
                        링이 한 점에서 닿는 것은 허용하지만 링이 자기 자신과 닿는 것은 허용하지 않고 [5], Esri의 모델은
                        자기 자신과 닿는 링도 허용합니다. [6] 어느 쪽이든 이를 압출하면 그 점은 옆면 네 개가 공유하는
                        non-manifold edge가 됩니다. [9] 저는 이런 지점을 pinch point라고 부르고, 여기서 생긴 연결을
                        끊습니다. 연결을 끊는다고 해서 전개도가 항상 두 장으로 나뉘는 것은 아닙니다. Stone 말과 limnlimn
                        i는 접점을 사이에 두고 글자의 면이 둘로 나뉘어 있어서, 연결을 끊으면 2개의 Polyhedra가 됩니다.
                        반면 limnlimn k는 counter가 바깥 윤곽에 닿아 있을 뿐 글자의 면은 하나로 이어져 있어서 하나의
                        Polyhedron으로 처리합니다. 이때 연결을 끊는 것은 바깥 벽과 counter 벽이 섞이지 않게 하는 역할만
                        합니다.
                      </p>
                      {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기
                      <ImagePlaceholder
                        id='IMG-2'
                        file='pinch_types.png'
                        desc='(a) Stone 말 / (b) limnlimn i / (c) limnlimn k 2D 윤곽선, 접점에 분홍 원'
                      /> */}
                      <Figure src={imagePath + 'pinch_types.jpg'} />
                      {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                      {/* <ImagePlaceholder
                        id='IMG-3'
                        file='pinch_3d.png'
                        desc='Stone 말 3D, 접점 확대 — 옆면 네 개가 한 수직 모서리를 공유'
                      /> */}
                      <Figure src={imagePath + 'pinch_3d.jpg'} />
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Technical Challenge' title='Choosing a Spanning Tree for Unfolding'>
                  <p>
                    저는 앞서 글리프의 유형을 connected components의 개수와 exterior/interior ring의 개수로
                    나누었습니다. 이제 유형별로 어떻게 전개도를 디자인하였는지 설명하려고 합니다.
                  </p>
                  <div className='flex flex-col gap-[8px] border border-neutral-300 p-[16px] text-[14px]'>
                    <dl className='flex flex-col gap-[8px] text-neutral-600'>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://ko.wikipedia.org/wiki/듀얼_그래프'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            듀얼 그래프
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          평면 그래프 G의 각 면에 하나의 꼭짓점을 갖고, 한 변으로 맞닿은 인접한 면끼리 변으로 이은
                          그래프입니다. 여기서는 입체 표면의 면 하나가 점 하나가 되고, 모서리를 공유하는 면끼리 선으로
                          이어집니다.
                        </dd>
                      </div>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://ko.wikipedia.org/wiki/신장_부분_그래프'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            신장 트리(spanning tree)
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          모든 꼭짓점을 포함하는 부분 그래프를 신장 부분 그래프라 하고, 그중 트리인 것이 신장
                          트리입니다. 즉 모든 점을 빠짐없이 연결하면서 고리가 없는 부분 그래프입니다. 전개도에서는 남긴
                          변이 접는 선, 빠진 변이 자르는 선이 됩니다.
                        </dd>
                      </div>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://en.wikipedia.org/wiki/Chordal_graph'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            현(chord)
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          고리(사이클)에는 속하지 않으면서 고리 위의 두 꼭짓점을 잇는 변입니다.
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className='flex flex-col gap-[32px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Step 1. 옆면 펼치기: 자를 모서리를 고릅니다</SubHeading>
                      <p className='text-neutral-600'>
                        입체를 평면에 펴려면 어느 모서리를 자르고 어느 모서리를 접을지 정해야 합니다. 이를 계산으로
                        다루기 위해, 입체의 표면을 평면 면들로 나누고 듀얼 그래프 G = (V, E)를 만듭니다. V는 면, E는
                        모서리를 공유하는 면 쌍이고, 변의 가중치 w(e)는 공유하는 모서리의 길이입니다. 전개도를 만드는
                        방법은 여러 가지가 있지만(star unfolding, source unfolding, cut locus unfolding 등) 이 글에서는
                        모서리를 따라서만 자르는 모서리 전개(edge unfolding)를 다룹니다.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[20px]'>
                        <svg
                          viewBox='0 0 460 215'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='압출된 고리 모양 글리프의 옆면을 점으로, 이웃 관계를 선으로 바꾼 듀얼 그래프'
                        >
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <circle cx='110' cy='120' r='76' />
                            <circle cx='110' cy='120' r='40' />
                            <line x1='110.0' y1='80.0' x2='110.0' y2='44.0' />
                            <line x1='125.3' y1='83.0' x2='139.1' y2='49.8' />
                            <line x1='138.3' y1='91.7' x2='163.7' y2='66.3' />
                            <line x1='147.0' y1='104.7' x2='180.2' y2='90.9' />
                            <line x1='150.0' y1='120.0' x2='186.0' y2='120.0' />
                            <line x1='147.0' y1='135.3' x2='180.2' y2='149.1' />
                            <line x1='138.3' y1='148.3' x2='163.7' y2='173.7' />
                            <line x1='125.3' y1='157.0' x2='139.1' y2='190.2' />
                            <line x1='110.0' y1='160.0' x2='110.0' y2='196.0' />
                            <line x1='94.7' y1='157.0' x2='80.9' y2='190.2' />
                            <line x1='81.7' y1='148.3' x2='56.3' y2='173.7' />
                            <line x1='73.0' y1='135.3' x2='39.8' y2='149.1' />
                            <line x1='70.0' y1='120.0' x2='34.0' y2='120.0' />
                            <line x1='73.0' y1='104.7' x2='39.8' y2='90.9' />
                            <line x1='81.7' y1='91.7' x2='56.3' y2='66.3' />
                            <line x1='94.7' y1='83.0' x2='80.9' y2='49.8' />
                          </g>
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <line x1='350.0' y1='62.0' x2='372.2' y2='66.4' />
                            <line x1='372.2' y1='66.4' x2='391.0' y2='79.0' />
                            <line x1='391.0' y1='79.0' x2='403.6' y2='97.8' />
                            <line x1='403.6' y1='97.8' x2='408.0' y2='120.0' />
                            <line x1='408.0' y1='120.0' x2='403.6' y2='142.2' />
                            <line x1='403.6' y1='142.2' x2='391.0' y2='161.0' />
                            <line x1='391.0' y1='161.0' x2='372.2' y2='173.6' />
                            <line x1='372.2' y1='173.6' x2='350.0' y2='178.0' />
                            <line x1='350.0' y1='178.0' x2='327.8' y2='173.6' />
                            <line x1='327.8' y1='173.6' x2='309.0' y2='161.0' />
                            <line x1='309.0' y1='161.0' x2='296.4' y2='142.2' />
                            <line x1='296.4' y1='142.2' x2='292.0' y2='120.0' />
                            <line x1='292.0' y1='120.0' x2='296.4' y2='97.8' />
                            <line x1='296.4' y1='97.8' x2='309.0' y2='79.0' />
                            <line x1='309.0' y1='79.0' x2='327.8' y2='66.4' />
                            <line x1='327.8' y1='66.4' x2='350.0' y2='62.0' />
                          </g>
                          <g>
                            <circle cx='350.0' cy='62.0' r='4' fill='currentColor' />
                            <circle cx='372.2' cy='66.4' r='4' fill='currentColor' />
                            <circle cx='391.0' cy='79.0' r='4' fill='currentColor' />
                            <circle cx='403.6' cy='97.8' r='4' fill='currentColor' />
                            <circle cx='408.0' cy='120.0' r='4' fill='currentColor' />
                            <circle cx='403.6' cy='142.2' r='4' fill='currentColor' />
                            <circle cx='391.0' cy='161.0' r='4' fill='currentColor' />
                            <circle cx='372.2' cy='173.6' r='4' fill='currentColor' />
                            <circle cx='350.0' cy='178.0' r='4' fill='currentColor' />
                            <circle cx='327.8' cy='173.6' r='4' fill='currentColor' />
                            <circle cx='309.0' cy='161.0' r='4' fill='currentColor' />
                            <circle cx='296.4' cy='142.2' r='4' fill='currentColor' />
                            <circle cx='292.0' cy='120.0' r='4' fill='currentColor' />
                            <circle cx='296.4' cy='97.8' r='4' fill='currentColor' />
                            <circle cx='309.0' cy='79.0' r='4' fill='currentColor' />
                            <circle cx='327.8' cy='66.4' r='4' fill='currentColor' />
                          </g>
                          <g fill='currentColor' stroke='none' fontSize='11'>
                            <text x='110' y='208' textAnchor='middle'>
                              옆면
                            </text>
                            <text x='350' y='208' textAnchor='middle'>
                              듀얼 그래프
                            </text>
                            <text x='230' y='116' textAnchor='middle'>
                              ⟶
                            </text>
                            <text x='230' y='136' textAnchor='middle' fontSize='10'>
                              면 = 점
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          옆면 하나가 점 하나가 되고, 붙어 있는 면끼리 선으로 이어집니다.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        모서리 전개는 이 듀얼 그래프 G에서 신장 트리 T를 하나 고르는 것과 같습니다. 루트가 아닌 각 면은
                        T에서 자기 부모와 공유하는 모서리를 축으로 회전해 평면에 눕습니다. T가 달라지면 배치가 달라지고,
                        겹침 여부도 달라집니다. 즉 '어떻게 펼 것인가'는 '어떤 신장 트리를 고를 것인가'와 같은
                        질문입니다.
                      </p>
                      <p className='text-neutral-600'>
                        pinch point가 없는 글리프에서는 이 선택이 문제가 되지 않았습니다. 옆면은 앞뒤로 하나씩만
                        이웃하므로, 옆면으로만 제한한 그래프는 고리들의 모임이 됩니다. 만약 exterior ring이 하나,
                        interior ring이 하나라면 2개의 옆면 띠가 나옵니다. 고리의 신장 트리는 변 하나를 지운 것이고,
                        어느 것을 지우든 결과는 한 줄짜리 띠입니다. 자르는 위치만 다를 뿐 겹치지 않습니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>어디서 겹침이 발생했는가</SubHeading>
                      <p className='text-neutral-600'>
                        문제는 pinch point가 있는 글리프에서 발생했습니다. pinch point에서 옆면 네 개가 하나의 수직
                        모서리를 공유하면서, 원래는 윤곽선을 따라 한참 돌아가야 만나는 두 면이 갑자기 이웃이 됩니다.
                        그래프로 보면 고리를 가로지르는 현이 하나 생기고, 그 점에 모인 면들은 이웃이 하나씩 늘어 차수가
                        3이 됩니다.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <svg
                          viewBox='0 0 460 230'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='고리 모양 그래프를 가로지르는 현이 멀리 떨어진 두 면을 이웃으로 만드는 모습'
                        >
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <line x1='150.0' y1='40.0' x2='170.7' y2='42.7' />
                            <line x1='170.7' y1='42.7' x2='190.0' y2='50.7' />
                            <line x1='190.0' y1='50.7' x2='206.6' y2='63.4' />
                            <line x1='206.6' y1='63.4' x2='219.3' y2='80.0' />
                            <line x1='219.3' y1='80.0' x2='227.3' y2='99.3' />
                            <line x1='227.3' y1='99.3' x2='230.0' y2='120.0' />
                            <line x1='230.0' y1='120.0' x2='227.3' y2='140.7' />
                            <line x1='227.3' y1='140.7' x2='219.3' y2='160.0' />
                            <line x1='219.3' y1='160.0' x2='206.6' y2='176.6' />
                            <line x1='206.6' y1='176.6' x2='190.0' y2='189.3' />
                            <line x1='190.0' y1='189.3' x2='170.7' y2='197.3' />
                            <line x1='170.7' y1='197.3' x2='150.0' y2='200.0' />
                            <line x1='150.0' y1='200.0' x2='129.3' y2='197.3' />
                            <line x1='129.3' y1='197.3' x2='110.0' y2='189.3' />
                            <line x1='110.0' y1='189.3' x2='93.4' y2='176.6' />
                            <line x1='93.4' y1='176.6' x2='80.7' y2='160.0' />
                            <line x1='80.7' y1='160.0' x2='72.7' y2='140.7' />
                            <line x1='72.7' y1='140.7' x2='70.0' y2='120.0' />
                            <line x1='70.0' y1='120.0' x2='72.7' y2='99.3' />
                            <line x1='72.7' y1='99.3' x2='80.7' y2='80.0' />
                            <line x1='80.7' y1='80.0' x2='93.4' y2='63.4' />
                            <line x1='93.4' y1='63.4' x2='110.0' y2='50.7' />
                            <line x1='110.0' y1='50.7' x2='129.3' y2='42.7' />
                            <line x1='129.3' y1='42.7' x2='150.0' y2='40.0' />
                          </g>
                          <g>
                            <circle cx='150.0' cy='40.0' r='3.5' fill='currentColor' />
                            <circle cx='170.7' cy='42.7' r='3.5' fill='currentColor' />
                            <circle cx='190.0' cy='50.7' r='3.5' fill='currentColor' />
                            <circle cx='206.6' cy='63.4' r='3.5' fill='currentColor' />
                            <circle cx='219.3' cy='80.0' r='3.5' fill='currentColor' />
                            <circle cx='227.3' cy='99.3' r='3.5' fill='currentColor' />
                            <circle cx='230.0' cy='120.0' r='3.5' fill='currentColor' />
                            <circle cx='227.3' cy='140.7' r='3.5' fill='currentColor' />
                            <circle cx='219.3' cy='160.0' r='3.5' fill='currentColor' />
                            <circle cx='206.6' cy='176.6' r='3.5' fill='currentColor' />
                            <circle cx='190.0' cy='189.3' r='3.5' fill='currentColor' />
                            <circle cx='170.7' cy='197.3' r='3.5' fill='currentColor' />
                            <circle cx='150.0' cy='200.0' r='3.5' fill='currentColor' />
                            <circle cx='129.3' cy='197.3' r='3.5' fill='currentColor' />
                            <circle cx='110.0' cy='189.3' r='3.5' fill='currentColor' />
                            <circle cx='93.4' cy='176.6' r='3.5' fill='currentColor' />
                            <circle cx='80.7' cy='160.0' r='3.5' fill='currentColor' />
                            <circle cx='72.7' cy='140.7' r='3.5' fill='currentColor' />
                            <circle cx='70.0' cy='120.0' r='3.5' fill='currentColor' />
                            <circle cx='72.7' cy='99.3' r='3.5' fill='currentColor' />
                            <circle cx='80.7' cy='80.0' r='3.5' fill='currentColor' />
                            <circle cx='93.4' cy='63.4' r='3.5' fill='currentColor' />
                            <circle cx='110.0' cy='50.7' r='3.5' fill='currentColor' />
                            <circle cx='129.3' cy='42.7' r='3.5' fill='currentColor' />
                          </g>
                          <line x1='227.3' y1='99.3' x2='93.4' y2='176.6' stroke='#FF2D8C' strokeWidth='2' />
                          <circle cx='227.3' cy='99.3' r='5.5' fill='#FF2D8C' />
                          <circle cx='93.4' cy='176.6' r='5.5' fill='#FF2D8C' />
                          <g fill='currentColor' stroke='none' fontSize='11'>
                            <text x='150' y='28' textAnchor='middle'>
                              0번(시작)
                            </text>
                            <text x='239.3' y='103.3'>
                              5번 면
                            </text>
                            <text x='81.4' y='180.6' textAnchor='end'>
                              15번 면
                            </text>
                            <text x='150' y='222' textAnchor='middle'>
                              윤곽선을 따라 도는 고리 + pinch point가 만든 현
                            </text>
                          </g>
                          <g fill='#FF2D8C' stroke='none' fontSize='11'>
                            <text x='300' y='96'>
                              고리를 따라가면 10칸,
                            </text>
                            <text x='300' y='114'>
                              현을 쓰면 1칸.
                            </text>
                            <text x='300' y='132'>
                              BFS는 이 지름길을
                            </text>
                            <text x='300' y='150'>
                              반드시 고릅니다.
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          현은 윤곽선상 멀리 떨어진 두 면을 그래프 거리 1로 연결합니다. 실제 pinch point에서는 옆면 네
                          개가 서로 모두 이어지지만, 여기서는 현 하나로 단순화했습니다.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        여기서 중요한 점은, BFS가 이 지름길을 선호해서 고르는 게 아니라 고를 수밖에 없다는 것입니다.
                        TypoFold는 BFS(너비 우선 탐색)로 신장 트리를 만듭니다. 시작 면에서 가까운 면부터 차례로 붙여
                        나가기 때문에, 모든 면이 시작 면에서 최소한의 칸 수로 연결됩니다. 면이 24개, 시작이 0번, 현이
                        5번과 15번을 잇는 경우를 보겠습니다.
                      </p>
                      <table className='w-full max-w-[420px] text-[14px]'>
                        <tbody>
                          <tr className='border-b border-neutral-200'>
                            <td className='py-[6px] pr-[16px] text-neutral-600'>현이 없을 때 15번까지의 거리</td>
                            <td className='py-[6px]'>min(15, 24 − 15) = 9</td>
                          </tr>
                          <tr className='border-b border-neutral-200'>
                            <td className='py-[6px] pr-[16px] text-neutral-600'>현이 있을 때</td>
                            <td className='py-[6px]'>d(5) + 1 = 6</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className='text-neutral-600'>
                        6이 9보다 작으므로 현은 최단경로 위에 놓입니다. 최단경로 트리의 정의상 BFS는 현을 쓰지 않을 수
                        없습니다. 그리고 현을 접는 축으로 쓰는 순간 배치가 어긋납니다. 띠를 한 줄로 펼 때 면의 평면상
                        위치는 윤곽선을 따라 누적한 폭으로 정해지는데, 윤곽선상 5번 다음인 6번이 차지해야 할 자리에
                        15번이 놓이고 15번의 부분트리가 그 방향으로 계속 펼쳐집니다. 6번부터 이어지는 부분트리도 같은
                        자리를 요구하기 때문에 둘이 겹칩니다.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>해결: 현을 지우기</SubHeading>
                      <p className='text-neutral-600'>
                        변에 공유 모서리 길이를 가중치로 주는 방법도 생각했지만, 균일한 높이로 압출한 입체에서는
                        옆면끼리 공유하는 모서리가 모두 같은 두께라 소용이 없었습니다. 그래서 BFS는 그대로 두고,
                        탐색하기 전에 문제가 되는 연결을 그래프에서 끊기로 했습니다.
                      </p>
                      <p className='text-neutral-600'>
                        윤곽선이 한 점 p에서 맞닿으면, p에 모인 옆면 넷은 같은 수직 모서리를 공유해서 서로 전부 이웃으로
                        잡힙니다. 이 가짜 연결 때문에 원래는 따로 펼쳐져야 할 옆면 벽들이 하나로 묶여 버립니다.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <svg
                          viewBox='0 0 460 230'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='pinch point에서 어떻게 다시 잇느냐에 따라 고리가 하나로 남거나 둘로 갈라지는 비교 그림'
                        >
                          <g>
                            <circle cx='112' cy='66' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                            <circle cx='112' cy='142' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                          </g>
                          <g stroke='#FF2D8C' strokeWidth='2'>
                            <line x1='101' y1='93' x2='123' y2='115' />
                            <line x1='123' y1='93' x2='101' y2='115' />
                          </g>
                          <g>
                            <circle cx='336' cy='66' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                            <circle cx='336' cy='158' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                          </g>
                          <g fill='currentColor' stroke='none' fontSize='11' textAnchor='middle'>
                            <text x='112' y='205'>
                              윤곽선 순서대로 잇기
                            </text>
                            <text x='112' y='221'>
                              고리 하나 — 전개도 한 장
                            </text>
                            <text x='336' y='210'>
                              같은 component끼리 잇기
                            </text>
                            <text x='336' y='223'>
                              고리 둘 — 전개도 두 장
                            </text>
                          </g>
                          <g fill='#FF2D8C' stroke='none' fontSize='10' textAnchor='middle'>
                            <text x='112' y='134'>
                              pinch point에서 교차
                            </text>
                            <text x='336' y='115'>
                              연결을 끊음
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          pinch point에 모인 네 옆면을 어떻게 다시 잇느냐에 따라 결과가 갈립니다. 윤곽선 순서를 따르면
                          원래처럼 하나의 component가 되고, 같은 component에 붙은 옆면끼리 이어야 두 component로
                          나뉩니다.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        그렇다면 p에 모인 넷 중 어느 옆면끼리가 원래 이어져 있던 것일까요? 단서는 윗면과 아랫면에
                        있습니다. p에서 윗면끼리는 꼭짓점 하나만 맞닿는데, TypoFold는 두 면이 모서리를 공유해야(꼭짓점을
                        두 개 이상 공유해야) 이웃으로 보기 때문에 윗면은 p를 이음매로 쓰지 않습니다. 그래서 p에 모인
                        옆면 넷을 그래프에서 잠시 빼고 connected component를 구하면, 윗면을 기준으로 옆면들이 원래 어느
                        component에 속하는지가 드러납니다. 네 옆면이 각각 어느 component에 붙어 있는지 확인해, 같은
                        component에 붙은 것끼리만 다시 잇고 나머지 연결은 끊습니다.
                      </p>
                      <p className='text-neutral-600'>
                        처음에는 가까이 있는 옆면끼리 짝지어 보았지만, pinch 근처에서는 거리가 곧 소속을 뜻하지 않아
                        실패했습니다. 이미 올바르게 나뉘어 있는 윗면과 아랫면에 기대는 방법이 안정적이었습니다.
                      </p>
                      {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                      {/* <ImagePlaceholder
                        id='IMG-5'
                        file='pinch_cap_split.jpg'
                        desc='Stone 말을 위에서 본 모습, 윗면 두 조각을 다른 색으로 + p 표시'
                      /> */}
                      <Figure
                        className='h-[260px] my-4 w-auto object-contain'
                        src={imagePath + 'pinch_cap_split.jpg'}
                      />
                      <p className='text-neutral-600'>
                        결과는 윗면의 모양에 따라 두 가지로 나뉩니다. Stone 말이나 limnlimn i처럼 윗면이 p에서 두
                        조각으로 갈라지는 글리프는 그래프도 두 component로 나뉘어 전개도가 두 장이 되고, 두 장은 따로
                        접은 뒤 접착제로 이어 붙입니다. limnlimn k처럼 counter가 바깥 윤곽에 닿아 윗면이 한 조각으로
                        남는 글리프는 전개도가 한 장 그대로입니다. 대신 바깥 벽과 counter 벽이 서로 떨어지기 때문에,
                        counter 벽은 Step 3의 규칙대로 전개도에서 빠지고 'O'와 같은 방식으로 펼쳐집니다.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <div className='grid grid-cols-1 gap-[12px] sm:grid-cols-2'>
                          <div className='flex flex-col items-center gap-[6px] '>
                            {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                            {/* <ImagePlaceholder
                              id='IMG-4'
                              file='pinch_overlap_before.png'
                              desc='현을 끊기 전 Stone 말 전개도, 겹친 두 부분트리를 반투명 색으로 표시'
                            /> */}
                            <Figure
                              src={imagePath + 'pinch_overlap_before.jpg'}
                              className='h-[260px] w-auto object-contain'
                            />
                            <p className='text-center text-[13px] text-neutral-500'>
                              현을 끊기 전. 두 부분트리가 같은 자리를 요구해 겹칩니다.
                            </p>
                          </div>
                          <div className='flex flex-col items-center gap-[6px]'>
                            {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                            {/* <ImagePlaceholder
                              id='IMG-6'
                              file='pinch_overlap_after.png'
                              desc='IMG-4와 같은 글리프의 분리된 전개도 두 장'
                            /> */}
                            <Figure
                              src={imagePath + 'pinch_overlap_after.jpg'}
                              className='h-[260px] w-auto object-contain'
                            />
                            <p className='text-center text-[13px] text-neutral-500'>
                              현을 끊은 뒤. 두 component로 갈라져 겹침 없이 펼쳐집니다.
                            </p>
                          </div>
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 2. 위·아래 면을 어디에 붙이는가</SubHeading>
                    <p className='text-neutral-600'>
                      옆면 띠를 모두 펼치고 나면 윗면과 아랫면이 남습니다. 이 두 면은 옆면 둘레 전체와 맞닿아 있어서,
                      접는 선으로 쓸 수 있는 옆면이 띠를 이루는 옆면 수만큼 있습니다. 앞의 옆면들이 앞뒤로 하나씩만
                      이웃했던 것과 달리, 여기서는 선택지가 아주 많습니다.
                    </p>
                    <p className='text-neutral-600'>
                      어느 옆면에 붙이느냐에 따라 윗면과 아랫면이 회전해 놓이는 자리가 달라집니다. 오목한 윤곽을 가진
                      글리프에서는 아무 옆면이나 고르면 이미 펼쳐 둔 띠 위로 넘어와 겹칩니다.
                    </p>
                    <p className='text-neutral-600'>
                      그래서 여기서는 bounding box로 겹치는 넓이를 직접 쟀습니다. 후보 옆면마다 실제로 그 축으로 펼쳤을
                      때 윗면이 차지하는 범위를 감싸는 최소 직사각형을 구하고, 이미 펼쳐 둔 띠 전체를 감싸는 직사각형과
                      겹치는 넓이를 비교해 가장 덜 겹치는 옆면을 고릅니다. 옆면에서 모서리 길이라는 간접적인 기준이
                      통하지 않았던 것과 달리, 이쪽은 원하는 값을 그대로 재기 때문에 후보가 많아도 안정적으로
                      동작합니다.
                    </p>
                    <p className='text-neutral-600'>
                      다만 이 비교는 근사입니다. 각 면의 실제 모양이 아니라 감싸는 직사각형끼리 비교하기 때문에, 띠가
                      길게 꺾여 있으면 직사각형이 실제 띠보다 훨씬 넓어져서 비어 있는 자리도 겹친다고 판단할 수
                      있습니다. 또 윗면을 놓은 뒤 그 자리를 반영하지 않고 아랫면을 고르기 때문에 둘이 서로 겹칠 가능성도
                      남아 있습니다. 후보가 모두 겹치는 경우에는 그중 가장 덜 겹치는 쪽을 고릅니다.
                    </p>
                    <figure className='my-[12px] flex flex-col gap-[8px]'>
                      <div className='grid grid-cols-1 gap-[12px] sm:grid-cols-2'>
                        <div className='flex flex-col items-center gap-[6px]'>
                          {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                          {/* <ImagePlaceholder
                            id='IMG-8'
                            file='cap_hinge_before.png'
                            desc='오목한 글리프, 임의 옆면에 붙인 윗면이 띠 위로 넘어와 겹침. 띠 전체 bbox 점선'
                          /> */}
                          <Figure
                            src={imagePath + 'cap_hinge_before.jpg'}
                            className='h-[260px] w-auto object-contain'
                          />
                          <p className='text-center text-[13px] text-neutral-500'>
                            임의의 옆면에 붙이면. 윗면이 이미 펼친 띠 위로 넘어와 겹칩니다.
                          </p>
                        </div>
                        <div className='flex flex-col items-center gap-[6px]'>
                          {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                          {/* <ImagePlaceholder
                            id='IMG-8b'
                            file='cap_hinge_after.png'
                            desc='같은 글리프, 가장 덜 겹치는 옆면에 붙인 윗면. 같은 bbox 점선과 비교'
                          /> */}
                          <Figure src={imagePath + 'cap_hinge_after.jpg'} className='h-[260px] w-auto object-contain' />
                          <p className='text-center text-[13px] text-neutral-500'>
                            가장 덜 겹치는 옆면에 붙이면. 띠와 겹치지 않는 자리에 놓입니다.
                          </p>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 3. 구멍의 안쪽 벽은 제외합니다</SubHeading>
                    <p className='text-neutral-600'>
                      구멍이 있는 글리프는 옆면이 여러 개의 고리로 나뉩니다. 'O'라면 바깥 윤곽을 도는 고리 하나와 구멍
                      안쪽을 도는 고리 하나, 'B'라면 구멍이 두 개라 고리가 셋입니다. 이 중 바깥 벽에 해당하는 고리만
                      전개도에 펼치고, 구멍의 안쪽 벽은 전개도에서만 뺍니다.
                    </p>
                    <p className='text-neutral-600'>
                      문제는 어느 고리가 바깥 벽인지를 3D 단계에서 알려주는 정보가 남아 있지 않다는 점입니다. 2D
                      단계에서는 윤곽선끼리의 포함 관계로 exterior와 interior를 구분했습니다. 하지만 이 정보는 여러
                      윤곽을 하나의 3D 입체로 합치는 과정에서 따로 저장되지 않습니다. 그래서 지금은 옆면 조각이 가장
                      많은 고리를 바깥 벽으로 간주합니다. 바깥 윤곽이 구멍보다 길면 면도 더 많을 거라는 가정입니다.
                    </p>
                    <p className='text-neutral-600'>
                      하지만 이 가정은 맞지 않습니다. 옆면 조각의 수는 윤곽선의 길이보다 곡선이 얼마나 잘게 나뉘었는지에
                      더 좌우되기 때문입니다. 실제로 폰트에 따라 점 밀도가 크게 달라서, 같은 방식으로 만들어도 Stone
                      'O'는 옆면이 16개인데 Arbor 'G'는 517개였습니다. 한 글자 안에서도 구멍 쪽 곡선이 바깥 윤곽보다
                      잘게 쪼개져 있으면 구멍 벽이 바깥 벽으로 잘못 선택될 수 있습니다. 가장 확실한 해결책은 고리마다 XZ
                      평면에서의 크기(bounding box 면적)를 비교해 가장 큰 고리를 바깥으로 고르는 것입니다. 이 방식은
                      곡선이 얼마나 잘게 나뉘었는지와 무관하게 판정됩니다.
                    </p>
                    {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                    {/* <ImagePlaceholder
                      id='IMG-9'
                      file='inner_wall.png'
                      desc="'O'나 'B'를 접은 실물/3D — counter 안쪽 벽이 없는 모습"
                    /> */}
                    <Figure src={imagePath + 'inner_wall.jpg'} />
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 4. component가 여럿이면 세로로 쌓습니다</SubHeading>
                    <p className='text-neutral-600'>
                      component마다 기준 면을 따로 두고 전개도를 만든 다음, 완전히 펼친 크기를 재서 서로 겹치지 않도록
                      위아래로 배치합니다.
                    </p>
                    {/* TODO: 이미지 준비되면 아래 ImagePlaceholder를 지우고 Figure 주석을 풀기 */}
                    {/* <ImagePlaceholder
                      id='IMG-10'
                      file='islands_stack.png'
                      desc="Arbor '0' 전개도 세 장(테두리, 점, 막대)이 세로로 쌓인 화면"
                    /> */}
                    <Figure src={imagePath + 'islands_stack.jpg'} />
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>유형별 전개도</SubHeading>
                    <div className='overflow-x-auto'>
                      <table className='w-full min-w-[520px] text-left text-[14px]'>
                        <thead>
                          <tr className='border-b border-black text-black'>
                            <th className='py-[6px] pr-[16px] font-semibold'>유형</th>
                            <th className='py-[6px] pr-[16px] font-semibold'>예시</th>
                            <th className='py-[6px] font-semibold'>전개도</th>
                          </tr>
                        </thead>
                        <tbody className='align-top text-neutral-600'>
                          {[
                            ['A. 단순', 'I, L', '옆면이 한 줄의 띠로 펴지고, 위·아래 면이 각각 한 자리에 붙습니다.'],
                            [
                              'B. 구멍 n개',
                              'O, B',
                              '옆면 고리가 1 + 구멍 수개로 나뉩니다. 가장 큰 고리만 펼치고 구멍 벽은 제외합니다. 위·아래 면은 구멍이 뚫린 모양 그대로 펼쳐집니다.',
                            ],
                            [
                              'C. component 여러 개',
                              'i, ㅃ',
                              'component마다 독립된 전개도가 만들어지고 세로로 쌓입니다.',
                            ],
                            ['D. 구멍 안의 섬', 'Arbor “0”', 'C와 같습니다. component별로 각각 전개도를 갖습니다.'],
                            [
                              'E. pinch',
                              'Stone 말, limnlimn k',
                              '한 점에서 닿아 생긴 가짜 연결을 먼저 끊습니다. 윗면까지 갈라지면(Stone 말) 두 component로 나뉘어 C와 같이 처리되고, 윗면이 이어져 있으면(limnlimn k) 한 장 그대로 B와 같이 처리됩니다.',
                            ],
                          ].map(([type, example, result]) => (
                            <tr key={type} className='border-b border-neutral-200'>
                              <td className='py-[8px] pr-[16px] font-semibold text-black'>{type}</td>
                              <td className='py-[8px] pr-[16px]'>{example}</td>
                              <td className='py-[8px]'>{result}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>겹침을 완전히 막을 수는 없습니다</SubHeading>
                    <p className='text-neutral-600'>
                      겹치지 않는 절단 트리를 고르는 문제는 일반적으로 어렵습니다. 볼록 다면체에 대해서도 항상 겹치지
                      않는 모서리 전개가 존재하는지는 Dürer의 추측으로 아직 미해결이고, [10] 비볼록 다면체에서는 어떻게
                      모서리를 잘라도 겹침을 피할 수 없는 예가 알려져 있습니다. [11] 그래서 spanning tree를 바로
                      시뮬레이션하지 않고 glyph에서 겹침을 확인하는 방식으로 접근하고 있습니다. 좀 더 나아가 prism
                      이외에 다양한 형태의 3D 입체에서 전개도가 생성될 수 있도록 일반화하는 연구를 진행하고 싶습니다.
                    </p>
                  </div>
                </Chapter>

                <div className='flex flex-col gap-[8px] border-t border-black pt-[24px]'>
                  <p className='text-[13px] font-medium text-[#FF2D8C]'>References</p>
                  <ol className='flex flex-col gap-[2px] text-[13px] text-neutral-500'>
                    {[
                      ['타이포그래피 사전 — 글리프', 'https://typography-dictionary.kr/terms/glyph'],
                      ['Wikipedia — Counter (typography)', 'https://en.wikipedia.org/wiki/Counter_(typography)'],
                      [
                        'Microsoft — OpenType spec, glyf table',
                        'https://learn.microsoft.com/en-us/typography/opentype/spec/glyf',
                      ],
                      ['FontForge — More on glyphs', 'https://fontforge.org/docs/tutorial/editexample2.html'],
                      ['OGC — Simple Feature Access, Part 1', 'https://www.ogc.org/standard/sfa/'],
                      [
                        'Esri — ArcSDE 10.0 SDK, Geometry types',
                        'https://help.arcgis.com/en/geodatabase/10.0/sdk/arcsde/concepts/geometry/shapes/types.htm',
                      ],
                      ['Wikipedia — Even–odd rule', 'https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule'],
                      ['OGC — CityGML 3.0 Conceptual Model (ISO 19107)', 'https://docs.ogc.org/is/20-010/20-010.html'],
                      ['MeshLib — Non-Manifold vs. Manifold Mesh', 'https://meshlib.io/blog/non-manifold-meshes/'],
                      [
                        'Open Problem Garden — Dürer’s Conjecture',
                        'https://www.openproblemgarden.org/op/d_urers_conjecture',
                      ],
                      [
                        'Bern, Demaine, Eppstein, Kuo, Mantler, Snoeyink — Ununfoldable Polyhedra with Convex Faces (2003)',
                        'https://erikdemaine.org/papers/Ununfoldable/',
                      ],
                    ].map(([label, href], i) => (
                      <li key={href}>
                        [{i + 1}]{' '}
                        <a href={href} target='_blank' rel='noopener noreferrer' className='underline hover:text-black'>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

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
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
