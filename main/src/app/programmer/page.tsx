'use client'

import { useState } from 'react'
import { Header } from '@/components/projects'
import { ALL_SKILLS, projects, type ProjectSkill } from '@/app/works/projectlist'
import { ProjectGrid } from '@/app/works/ProjectGrid'
import { PrinciplesDiagram } from './PrinciplesDiagram'

type Tab = 'All' | ProjectSkill

const sortedProjects = [...projects].sort((a, b) => Number(b.created_date) - Number(a.created_date))

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
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[120px] text-black md:px-[40px]'>
        <section className='mx-auto flex max-w-[720px] flex-col items-center gap-[16px] text-center'>
          <h1 className='text-display font-medium text-black'>Tools & Interactive Systems</h1>
          <p className='text-heading text-ink'>in Programming and Computational Design.</p>
          <p className='mt-[8px] text-body leading-relaxed text-ink'>
            Origami, letters, nursery songs, folktales. The material of culture has been passed down through many hands,
            mouths, and ears. I build software that uses algorithms to open this material up again, so that anyone can
            make something new from it.
          </p>
        </section>

        <PrinciplesDiagram />

        <div className='mx-auto mt-[60px] grid max-w-[1100px] grid-cols-2 gap-[8px] md:grid-cols-4'>
          {TABS.map((tab) => {
            const isActive = tab.label === activeTab
            return (
              <button
                key={tab.label}
                type='button'
                onClick={() => setActiveTab(tab.label)}
                className={`px-[20px] py-[24px] text-left text-body transition-colors ${
                  isActive ? 'bg-black text-white' : 'bg-neutral-100 text-black hover:bg-neutral-200'
                }`}
              >
                {tab.label}
                <span className={`ml-[8px] text-label ${isActive ? 'text-white/60' : 'text-neutral-500'}`}>
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
