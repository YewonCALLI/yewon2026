import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from './projectlist'
import { ProjectMedia } from './ProjectMedia'

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      id={project.slug}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5 }}
      className='scroll-mt-[80px]'
    >
      <Link
        href={project.externalUrl ?? `/works/${project.slug}`}
        {...(project.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className='group flex flex-col gap-[12px] p-[10px]'
      >
        <div className='relative aspect-video w-full overflow-hidden bg-neutral-100'>
          <ProjectMedia project={project} />
        </div>

        <div className='flex flex-col gap-[4px]'>
          <h3 className='text-heading font-medium leading-tight text-black'>{project.name}</h3>
          {project.description && <p className='text-label leading-snug text-ink'>{project.description}</p>}
          {project.meta && <p className='text-label leading-snug text-neutral-500'>{project.meta}</p>}        </div>
      </Link>
    </motion.div>
  )
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className='w-full py-[80px] text-center text-label text-neutral-500'>
        No projects match the selected filters.
      </div>
    )
  }

  return (
    <section className='mt-[40px] grid grid-cols-1 gap-x-[24px] gap-y-[40px] md:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  )
}
