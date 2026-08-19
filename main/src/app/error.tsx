'use client'

import { useEffect } from 'react'

async function bustServiceWorkerCaches() {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations()
      await Promise.all(regs.map((r) => r.unregister()))
    }
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => caches.delete(k)))
    }
  } catch {
    // ignore — e.g. Safari private mode throwing on storage access
  }
}

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // Vercel replaces old build chunks on every deploy — a tab left open (or a stale PWA
    // cache) across a deploy asks for a chunk that no longer exists. next-pwa's service
    // worker serves its own cached copy regardless of a plain reload, so the stale chunk
    // keeps loading forever unless we unregister it and clear its caches first. The session
    // flag stops a reload loop if the chunk is genuinely missing for some other reason.
    const isChunkLoadError = error.name === 'ChunkLoadError' || /Loading chunk [\d]+ failed/.test(error.message)
    if (!isChunkLoadError) return

    try {
      const key = 'chunk-reload-attempted'
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // ignore — e.g. Safari private mode throwing on storage access
    }
    bustServiceWorkerCaches().finally(() => window.location.reload())
  }, [error])

  return (
    <div className='fixed inset-0 z-[100000] bg-white flex flex-col items-center justify-center gap-4 p-8 text-center'>
      <p className='text-[#222222] text-base font-medium'>
        페이지를 불러오는 중 문제가 발생했습니다.
        <br />
        새로고침해 주세요.
      </p>
      <button
        onClick={() => window.location.reload()}
        className='px-6 py-2 bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black text-black text-sm font-semibold'
      >
        새로고침
      </button>
    </div>
  )
}
