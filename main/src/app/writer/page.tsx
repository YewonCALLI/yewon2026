'use client'

import Link from 'next/link'
import { Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'

const publications = projects.filter((p) => p.publication)

export default function WriterPage() {
  return (
    <>
      <Header title='Writer' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[60px] text-black md:px-[40px] md:pt-[60px]'>
        <p className='mt-[38px] max-w-[520px] text-[13px] leading-relaxed text-neutral-500'>
          Selected writing and research notes will live here.
        </p>

        {publications.length > 0 && (
          <section className='mt-[48px]'>
            <h2 className='text-[11px] font-semibold uppercase tracking-wide text-neutral-400'>Publications</h2>
            <div className='mt-[16px] flex flex-col gap-[12px]'>
              {publications.map((project) => (
                <div key={project.slug} className='flex flex-col gap-[2px]'>
                  <span className='text-[12px] font-bold leading-tight'>{project.name}</span>
                  <p className='text-[11px] leading-snug text-neutral-500'>
                    {project.publication} · {project.created_date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <Link href='/works' className='mt-[48px] block text-[11px] text-neutral-400 hover:text-black'>
          View all work →
        </Link>
      </main>
    </>
  )
}
