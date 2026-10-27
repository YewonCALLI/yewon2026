'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from './projectlist'

export function ProjectMedia({
  project,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  nativeControls = false,
}: {
  project: Project
  sizes?: string
  nativeControls?: boolean // use Vimeo's own player UI (sound, play/pause) instead of the silent background mode
}) {
  const [imageFailed, setImageFailed] = useState(false)

  if (project.vimeoId) {
    const hash = project.vimeoHash ? `h=${project.vimeoHash}&` : ''
    return (
      <iframe
        src={
          nativeControls
            ? `https://player.vimeo.com/video/${project.vimeoId}?${hash}autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`
            : `https://player.vimeo.com/video/${project.vimeoId}?${hash}background=1&autoplay=1&muted=1&loop=1&playsinline=1`
        }
        title={`${project.name} video`}
        allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
        className={`absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 ${
          nativeControls ? '' : 'pointer-events-none'
        }`}
      />
    )
  }

  if (!imageFailed) {
    return (
      <Image
        src={project.cover}
        alt={project.name}
        fill
        sizes={sizes}
        quality={90}
        className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
        onError={() => setImageFailed(true)}
      />
    )
  }

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <span className='text-label text-neutral-500'>{project.name}</span>
    </div>
  )
}
