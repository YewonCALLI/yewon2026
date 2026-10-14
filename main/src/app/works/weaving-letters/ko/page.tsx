'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../../ProjectMedia'
import { projects } from '../../projectlist'
import { Figure } from '../../../../components/projects/Figure'
import { ProjectSidebar } from '../../ProjectSidebar'

const accentColor = '#B02DFF'

const imagePath = '/images/projects/weaving-letters/'

const sectionIds = ['overview', 'process', 'archive'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-label font-medium text-[#B02DFF]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mt-[4px] max-w-[640px] text-title font-medium leading-snug text-black md:text-title'>
      {children}
    </h2>
  )
}

function ImagePlaceholder({ id, file, desc }: { id: string; file: string; desc: string }) {
  return (
    <div className='my-[12px] flex aspect-video w-full flex-col items-center justify-center gap-[6px] border border-dashed border-neutral-400 bg-neutral-50 px-[16px] text-center'>
      <p className='text-label font-medium text-[#B02DFF]'>{id}</p>
      <p className='text-label text-neutral-600'>{desc}</p>
      <p className='font-mono text-label text-neutral-500'>{file}</p>
    </div>
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className='underline hover:text-[#B02DFF]'>
      {children}
    </a>
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

export default function WeavingLettersKoPage() {
  const project = projects.find((p) => p.slug === 'weaving-letters')
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
            <div className='flex flex-col justify-between  md:flex-row'>
              <div>
                <Link href={`/works/${project.parent}`} className='text-label text-neutral-500 hover:text-black'>
                  ← Part of TypoFold
                </Link>
                <h1 className='text-title font-medium'>{project.name}</h1>
              </div>
              <div className='flex flex-col gap-[4px] text-body leading-relaxed lg:w-[70%]'>
                <p className='text-[#B02DFF]'>
                  HCI Korea에 포스터 논문으로 제출했던 TypoFold의 내용을 엮은 zine.
                </p>
                <p className='text-ink'>
                  06.2026 - 07.2026 / Zine, Typography, Textile Pattern / bokbokbok, 휴간북스
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
                <Chapter kicker='Overview' title='About the Zine'>
                  <p>
                    <i>Weaving Letters</i>는 p5.js로 짠 5가지 텍스타일 패턴(스트라이프, 체크, 페어아일, 아가일, 노르딕)을
                    A부터 Z까지의 3D 타이포그래피에 입힌 전개도 모음집이다. 코드로 만든 패턴이 종이에 출력되어 자르고
                    접혀 손에 쥐어지는 과정을 담는다. 원하는 장을 뜯어 입체 글자를 만들어보자.
                  </p>
                  <Figure src={imagePath + '01.jpg'} />
                </Chapter>
              </section>

              {/* PROCESS */}
              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Process' title='Making the Zine'>
                  <p>
                    HCI Korea Conference에 포스터 논문으로 제출했던 TypoFold의 내용으로 zine <i>Weaving Letters</i>를
                    제작했습니다. Zine을 만드는 과정에서 내용을 어떻게 시각적으로 잘 전달할 수 있을지 고민하며
                    다이어그램을 다듬었습니다.
                  </p>
                  <p>
                    Zine을 언젠가 만들어보고 싶다는 생각은 있었지만 늘 부담감이 앞섰던 것 같습니다. 이번 기회로 디자인과
                    제본을 직접 해보며 작업하게 되면서, 코딩을 벗어나는 재미가 있었던 작업이었습니다.
                  </p>
                  <div className='flex flex-col gap-[16px] md:flex-row'>
                    <div className='md:flex-[1.5_1_0%]'>
                      <Figure src={imagePath + '02.jpg'} />
                    </div>
                    <div className='md:flex-[0.75_1_0%]'>
                      <Figure src={imagePath + '03.jpg'} />
                    </div>
                  </div>
                </Chapter>
              </section>

              {/* ARCHIVE */}
              <section id='archive' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-[70%]'>
                <Chapter kicker='Archive' title='Exhibited'>
                  <p>
                    <i>Weaving Letters</i>는 6~7월 동안{' '}
                    <ExternalLink href='https://www.instagram.com/bok3books/'>
                      <i>bokbokbok</i> 진 서점
                    </ExternalLink>
                    과{' '}
                    <ExternalLink href='https://www.instagram.com/huganbooks/'>
                      <i>휴간북스</i> 진 마켓
                    </ExternalLink>
                    에서 소개되었습니다. 총 30부를 배포했고, 모두 완판되었습니다!
                  </p>
                  <div className='flex flex-col gap-[16px] md:flex-row'>
                    <div className='md:flex-[1.5_1_0%]'>
                      <Figure src={imagePath + '04.jpg'} />
                    </div>
                    <div className='md:flex-[0.75_1_0%]'>
                      <Figure src={imagePath + '05.jpg'} />
                    </div>
                  </div>

                  <Figure src={imagePath + '06.jpg'} />
                  <div className='flex flex-col gap-[16px] md:flex-row'>
                    <div className='md:flex-[1.5_1_0%]'>
                      <Figure src={imagePath + '07.jpg'} />
                    </div>
                    <div className='md:flex-[0.75_1_0%]'>
                      <Figure src={imagePath + '08.jpg'} />
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
