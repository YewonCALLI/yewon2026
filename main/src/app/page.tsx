'use client'

import dynamic from 'next/dynamic'
import { Header } from '@/components/projects'

// three.js only runs in the browser, so the heart scene is loaded client-side only
const HeartMain = dynamic(() => import('@/components/heart/HeartMain'), { ssr: false })

export default function Page() {
  return (
    <>
      <Header title='Home' />
      <main className='relative h-dvh w-full overflow-hidden'>
        <HeartMain />
      </main>
    </>
  )
}
