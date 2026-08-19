'use client'

import Link from 'next/link'
import { Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'
import { ProjectGrid } from '@/app/works/ProjectGrid'

const ARTIST_SKILLS = ['Media Art', 'Digital Fabrication'] as const

const artistProjects = [...projects]
  .filter((p) => p.skills?.some((skill) => ARTIST_SKILLS.includes(skill as (typeof ARTIST_SKILLS)[number])))
  .sort((a, b) => Number(b.created_date) - Number(a.created_date))

export default function ArtistPage() {
  return (
    <>
      <Header title='Artist' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[60px] text-black md:px-[40px] md:pt-[60px]'>
        <ProjectGrid projects={artistProjects} />
        <Link href='/works' className='mt-[40px] block text-[11px] text-neutral-400 hover:text-black'>
          View all work →
        </Link>
      </main>
    </>
  )
}
