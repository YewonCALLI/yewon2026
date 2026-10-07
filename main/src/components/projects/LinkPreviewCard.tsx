'use client'

import { useEffect, useState } from 'react'

interface OgData {
  title: string
  description: string
  image: string
  url: string
}

interface LinkPreviewCardProps {
  href: string
}

export function LinkPreviewCard({ href }: LinkPreviewCardProps) {
  const [data, setData] = useState<OgData | null>(null)

  const fallbackHost = (() => {
    try {
      return new URL(href).hostname
    } catch {
      return href
    }
  })()

  useEffect(() => {
    let cancelled = false
    fetch(`/api/og?url=${encodeURIComponent(href)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json: OgData | null) => {
        if (!cancelled && json) setData(json)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [href])

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex w-full flex-row overflow-hidden rounded-[8px] border border-black transition-colors hover:bg-black'
    >
      <div className='relative aspect-video w-[200px] shrink-0 overflow-hidden bg-neutral-100'>
        {data?.image && (
          <img
            src={data.image}
            alt={data.title}
            className='h-full w-full object-cover transition-transform duration-300'
          />
        )}
      </div>
      <div className='flex flex-col justify-center gap-[4px] px-[16px] py-[12px]'>
        <p className='text-[15px] font-semibold text-black group-hover:text-white'>{data?.title ?? fallbackHost}</p>
        {data?.description && (
          <p className='text-[13px] text-neutral-500 group-hover:text-white'>{data.description}</p>
        )}
        <p className='text-[11px] text-neutral-400 group-hover:text-white'>{data?.url ?? fallbackHost}</p>
      </div>
    </a>
  )
}
