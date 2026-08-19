'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/projects'
import { ALL_SKILLS, projects, type ProjectSkill } from './projectlist'
import { ProjectGrid } from './ProjectGrid'

export default function WorksPage() {
  const [selectedSkills, setSelectedSkills] = useState<ProjectSkill[]>([])

  const toggleSkill = (skill: ProjectSkill) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const clearFilters = () => setSelectedSkills([])

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedSkills.length === 0
        ? projects
        : projects.filter((p) => selectedSkills.some((skill) => p.skills?.includes(skill)))
    return [...filtered].sort((a, b) => Number(b.created_date) - Number(a.created_date))
  }, [selectedSkills])

  return (
    <>
      <Header title='Works' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[60px] text-black md:px-[40px] md:pt-[60px]'>
        <div className='mt-[38px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px]'>
          {ALL_SKILLS.map((skill) => {
            const isActive = selectedSkills.includes(skill)
            return (
              <button
                key={skill}
                type='button'
                onClick={() => toggleSkill(skill)}
                className={`text-[11px] transition-colors ${
                  isActive ? 'text-black underline' : 'text-black hover:text-neutral-700'
                }`}
              >
                {skill}
              </button>
            )
          })}

          {selectedSkills.length > 0 && (
            <button
              type='button'
              onClick={clearFilters}
              className='text-[11px] text-neutral-400 transition-colors hover:text-black'
            >
              Clear
            </button>
          )}
        </div>

        <ProjectGrid projects={filteredProjects} />
      </main>
    </>
  )
}
