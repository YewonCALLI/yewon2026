'use client'

import Link from 'next/link'
import { Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'
import { ProjectGrid } from '@/app/works/ProjectGrid'

const PROGRAMMER_SKILLS = ['Tool Development', 'Computer Graphics', 'Interaction Design'] as const

const programmerProjects = [...projects]
  .filter((p) => p.skills?.some((skill) => PROGRAMMER_SKILLS.includes(skill as (typeof PROGRAMMER_SKILLS)[number])))
  .sort((a, b) => Number(b.created_date) - Number(a.created_date))

export default function ProgrammerPage() {
  return (
    <>
      <Header title='Programmer' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[60px] text-black md:px-[40px] md:pt-[60px]'>
        <ProjectGrid projects={programmerProjects} />
        <Link href='/works' className='mt-[40px] block text-[11px] text-neutral-400 hover:text-black'>
          View all work →
        </Link>
      </main>
    </>
  )
}
