import { motion } from 'framer-motion'
import type { Project, ProjectSkill } from './projectlist'
import { ProjectMedia } from './ProjectMedia'

function SkillTags({ skills }: { skills?: ProjectSkill[] }) {
  if (!skills || skills.length === 0) return null
  return <p className='text-[10px] tracking-wide text-neutral-400'>{skills.join('  /  ')}</p>
}

function ProjectMeta({ project }: { project: Project }) {
  const rows = [
    project.award && { label: 'Award', value: project.award },
    project.exhibition && { label: 'Exhibition', value: project.exhibition },
    project.residency && { label: 'Residency', value: project.residency },
    project.publication && { label: 'Publication', value: project.publication },
    project.client && { label: 'Client', value: project.client },
    project.funded && project.funded.length > 0 && { label: 'Funded by', value: project.funded.join(', ') },
  ].filter(Boolean) as { label: string; value: string }[]

  if (rows.length === 0) return null

  return (
    <div className='mt-[2px] flex flex-col gap-[3px]'>
      {rows.map((row) => (
        <p key={row.label} className='text-[10px] leading-snug text-neutral-400'>
          <span className='text-neutral-500'>{row.label}</span> · {row.value}
        </p>
      ))}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      id={project.slug}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5 }}
      className='group flex scroll-mt-[80px] flex-col gap-[12px] rounded-[8px] border border-transparent p-[10px] transition-colors duration-200 hover:border-black'
    >
      <div className='relative aspect-video w-full overflow-hidden bg-neutral-100'>
        <ProjectMedia project={project} />
      </div>

      <div className='flex flex-col gap-[2px]'>
        <div className='flex items-baseline justify-between gap-[8px]'>
          <span className='text-[12px] font-bold leading-tight'>{project.name}</span>
        </div>

        {project.description && (
          <p className='text-[12px] leading-snug text-neutral-500'>{project.description}</p>
        )}
        <ProjectMeta project={project} />
      </div>
    </motion.div>
  )
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className='w-full py-[80px] text-center text-[13px] text-neutral-400'>
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
