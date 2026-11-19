'use client'

import { useState } from 'react'
import { Header } from '@/components/projects'
import { ALL_SKILLS, projects, type ProjectSkill } from '@/app/works/projectlist'
import { ProjectGrid } from '@/app/works/ProjectGrid'
import { slides } from '@/app/introSlides'
import { PrinciplesDiagram } from './PrinciplesDiagram'

type Tab = 'All' | ProjectSkill

// use the main page's intro images as thumbnails so both pages show the same picture per project;
// vimeoId is dropped so cards show that image instead of loading a video
const introCoverBySlug = new Map(slides.map((slide) => [slide.projectSlug, slide.src]))

const sortedProjects = [...projects]
  .sort((a, b) => Number(b.created_date) - Number(a.created_date))
  .map((p) => ({ ...p, cover: introCoverBySlug.get(p.slug) ?? p.cover, vimeoId: undefined }))

const TABS: { label: Tab; count: number }[] = [
  { label: 'All' as Tab, count: sortedProjects.length },
  ...ALL_SKILLS.map((skill) => ({
    label: skill,
    count: sortedProjects.filter((p) => p.skills?.includes(skill)).length,
  })),
].filter((tab) => tab.count > 0)

export default function ProgrammerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const visibleProjects =
    activeTab === 'All' ? sortedProjects : sortedProjects.filter((p) => p.skills?.includes(activeTab))

  return (
    <>
      <Header title='Programmer' />
      <main className='min-h-dvh w-full bg-white px-[16px] pb-[100px] pt-[120px] text-black md:px-[40px] md:pt-[160px]'>
        <p className='mx-auto max-w-[720px] text-center text-body font-medium leading-snug text-black'>
          Origami, letters, nursery songs, folktales. The material of culture has been passed down through many hands,
          mouths, and ears. I build software that uses algorithms to open this material up again, so that anyone can make
          something new from it.
        </p>

        <PrinciplesDiagram />

        <div className='mx-auto mt-[60px] flex max-w-[1100px] flex-wrap justify-center gap-[6px]'>
          {TABS.map((tab) => {
            const isActive = tab.label === activeTab
            return (
              <button
                key={tab.label}
                type='button'
                onClick={() => setActiveTab(tab.label)}
                aria-pressed={isActive}
                className={`whitespace-nowrap px-[12px] py-[6px] text-label transition-colors ${
                  isActive ? 'bg-black text-white' : 'bg-neutral-100 text-black hover:bg-neutral-200'
                }`}
              >
                {tab.label}
                <span className={`ml-[6px] ${isActive ? 'text-white/60' : 'text-neutral-500'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        <ProjectGrid projects={visibleProjects} />
      </main>
    </>
  )
}
