'use client'

import { useState } from 'react'
import { ALL_SKILLS, type Project, type ProjectSkill } from '@/app/works/projectlist'
import { heartProjects, heartYears } from './heartProjects'

interface HeartProjectListProps {
  onProjectClick: (index: number) => void
  selectedIndex: number | null
}

// md and up: table grouped by year, pinned to the left side of the scene
export function HeartProjectList({ onProjectClick, selectedIndex }: HeartProjectListProps) {
  return (
    <div className='h-[calc(100dvh-120px)] w-full overflow-y-auto'>
      {heartYears.map((year) => (
        <div key={year}>
          <div className='border-b border-black'>
            <h2 className='text-xs uppercase'>{year}</h2>
          </div>

          {heartProjects.map((project, index) =>
            project.created_date !== year ? null : (
              <ProjectRow
                key={project.slug}
                project={project}
                isSelected={selectedIndex === index}
                onClick={() => onProjectClick(index)}
              />
            ),
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectRow({ project, isSelected, onClick }: { project: Project; isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`grid cursor-pointer grid-cols-[1fr_2fr] border-b border-black transition-colors ${
        isSelected ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-500 hover:text-white'
      }`}
    >
      <div className='py-2'>
        <div className='px-1 text-xs underline'>{project.name}</div>
        {/* meta is "period / categories / venue"; the list is already grouped by year, so drop the period */}
        {project.meta && (
          <div className='mt-1 px-3 text-[12px] leading-snug'>{project.meta.split(' / ').slice(1).join(' / ')}</div>
        )}
      </div>
      <div className='border-l border-gray-300 px-2 py-2 text-xs'>{project.description}</div>
    </div>
  )
}

// below md: collapsible bottom bar with year / skill filters and a horizontal card scroll
export function HeartProjectListMobile({ onProjectClick, selectedIndex }: HeartProjectListProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState('all')

  return (
    <div
      className='fixed bottom-0 left-0 z-[40] flex w-screen flex-col items-start overflow-hidden'
      style={{ transition: 'height 0.3s ease', height: isExpanded ? '218px' : '40px' }}
    >
      <div className='flex w-fit items-center justify-end'>
        <div className='flex flex-1 flex-row gap-2 bg-[#0059ff] p-[7px]'>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className='rounded-none border-none bg-white px-2 py-1 text-xs text-black outline-none'
          >
            <option value='all'>All</option>
            {heartYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className='rounded-none border-none bg-white px-2 py-1 text-xs text-black outline-none'
          >
            <option value='all'>All Media</option>
            {ALL_SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setIsExpanded((v) => !v)}
          className='flex h-full min-h-full cursor-pointer items-center justify-center bg-black px-3 text-sm text-white'
        >
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>

      {isExpanded && (
        <div
          className='flex w-full flex-row flex-nowrap gap-[7px] overflow-x-auto overflow-y-hidden bg-[#0059ff] p-[7px]'
          style={{ height: 'calc(220px - 42px)', scrollbarWidth: 'none' }}
        >
          {heartProjects.map((project, index) => {
            const yearMatch = selectedYear === 'all' || project.created_date === selectedYear
            const skillMatch = selectedSkill === 'all' || project.skills?.includes(selectedSkill as ProjectSkill)
            if (!yearMatch || !skillMatch) return null
            const isSelected = selectedIndex === index

            return (
              <button
                key={project.slug}
                type='button'
                onClick={() => onProjectClick(index)}
                aria-pressed={isSelected}
                className={`flex h-full w-[140px] flex-shrink-0 cursor-pointer flex-col text-left transition-colors ${
                  isSelected ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                <div className='flex h-full w-full flex-col justify-between p-2'>
                  <div className='flex flex-col gap-[4px]'>
                    <span className='text-label font-medium leading-tight'>{project.name}</span>
                    {project.description && (
                      <span
                        className={`text-[11px] leading-snug ${isSelected ? 'text-white/70' : 'text-black/60'}`}
                      >
                        {project.description}
                      </span>
                    )}
                  </div>
                  <span className={`self-end text-[11px] ${isSelected ? 'text-white/60' : 'text-black/50'}`}>
                    {project.created_date}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
