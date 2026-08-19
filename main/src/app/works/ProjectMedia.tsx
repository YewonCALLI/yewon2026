'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from './projectlist'

export function ProjectMedia({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (project.vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&muted=1&loop=1&playsinline=1`}
        title={`${project.name} video`}
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
        className='pointer-events-none absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2'
      />
    )
  }

  if (!imageFailed) {
    return (
      <Image
        src={project.cover}
        alt={project.name}
        fill
        sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
        className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
        onError={() => setImageFailed(true)}
      />
    )
  }

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <span className='text-[11px] text-neutral-300'>{project.name}</span>
    </div>
  )
}
