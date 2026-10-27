'use client'

import { Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'

const publications = projects.filter((p) => p.publication)

export default function WriterPage() {
  return (
    <>
      <Header title='Writer' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[60px] text-black md:px-[40px] md:pt-[60px]'>
        <p className='mt-[38px] max-w-[520px] text-label leading-relaxed text-neutral-600'>
          Selected writing and research notes will live here.
        </p>

        {publications.length > 0 && (
          <section className='mt-[48px]'>
            <h2 className='text-label font-medium uppercase tracking-wide text-neutral-500'>Publications</h2>
            <div className='mt-[16px] flex flex-col gap-[12px]'>
              {publications.map((project) => (
                <div key={project.slug} className='flex flex-col gap-[2px]'>
                  <span className='text-label font-medium leading-tight'>{project.name}</span>
                  <p className='text-label leading-snug text-neutral-600'>
                    {project.publication} · {project.created_date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
