'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Footer } from '@/components/projects'
export default function DirectionsPage({ onBackClick }) {
  const [copied, setCopied] = useState(false)
  const address = '서울특별시 서초구 성촌길 33'

  const mapLink =
    'https://map.naver.com/p/directions/-/14140088.4127782,4504149.1985135,%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EC%84%9C%EC%9A%B8R%26D%EC%BA%A0%ED%8D%BC%EC%8A%A4A%ED%83%80%EC%9B%8C,1564943394,PLACE_POI/-/transit?c=15.00,0,0,0,dh'

  const handleCopyAddress = async () => {
    // navigator.clipboard가 없는 환경 대비
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      } catch (err) {
        console.error('Clipboard API 실패:', err)
      }
    }

    const textArea = document.createElement('textarea')
    textArea.value = address
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (fallbackErr) {
      console.error('폴백 복사도 실패:', fallbackErr)
    }

    document.body.removeChild(textArea)
  }

  return (
    <div className='absolute top-0 h-[100dvh] w-[100vw] flex items-center justify-center bg-[#00D0FA] z-10'>
      <div className='w-full max-w-5xl px-8 py-16 flex flex-col items-center text-black gap-[clamp(70px,8.36dvh,83px)]'>
        <h1 className='justify-center text-[#060204] text-[clamp(22px,1.5vw,38.5px)] font-semibold leading-[150%] font-english tracking-[-4.6%] text-center'>
          Directions
        </h1>

        <div className='flex flex-col gap-[clamp(40px,8.31dvh,70.21px)]'>
          <img src='/images/map.svg' className='block md:hidden' />
          <img src='/images/map.svg' className='hidden md:block lg:hidden' />
          <img src='/images/map.svg' className='hidden md-landscape:block lg:hidden' />
          <img src='/images/map.svg' className='hidden lg:block lg:w-[25.8vw]' />

          <div className='flex flex-col justify-start items-center gap-[4px]'>
            <button
              onClick={handleCopyAddress}
              className='flex items-center gap-1 w-fit justify-center transition-colors duration-200'
            >
              <span className="text-center justify-center text-neutral-800 text-[clamp(17px, 1.23vw, 31.5px)] font-medium font-['Pretendard'] leading-[150%] tracking-[-4.6%]">
                {address}
              </span>
              <div className='w-4 h-4 mb-1 relative'>
                <div className='w-2.5 h-3.5 left-[5.64px] top-[0.50px] absolute bg-black/50 rounded-[0.66px]' />
                <div className='w-2.5 h-3.5 left-[3px] top-[3.80px] absolute bg-neutral-800 rounded-[0.66px]' />
              </div>
            </button>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='absolute bottom-72 md:bottom-64 lg:bottom-56 text-sm text-white font-medium bg-black px-3 py-1 flex items-center gap-3 rounded-md'
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-white'>
                    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' fill='currentColor' />
                    <path
                      d='m9 12 2 2 4-4'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  복사되었습니다.
                </motion.div>
              )}
            </AnimatePresence>

            <div className='flex flex-col justify-center items-center gap-10'>
              <a
                href={mapLink}
                target='_blank'
                rel='noopener noreferrer'
                className="text-center justify-start text-neutral-800 text-[clamp(17px, 1.23vw, 31.5px)] font-medium md:font-medium font-['Pretendard'] leading-[150%] tracking-[-4.6%]"
              >
                길 찾기
              </a>
              <button
                onClick={onBackClick}
                className='absolute top-[30px] left-[20px] md:top-9 md:right-9 text-center justify-start text-neutral-800 text-medium lg:text-lg font-normal md:font-medium leading-7'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                  <path
                    d='M15.411 0.366117C15.8992 -0.122039 16.6914 -0.122039 17.1796 0.366117C17.6675 0.854207 17.6674 1.64559 17.1796 2.13369L10.5399 8.77237L17.1786 15.411C17.6668 15.8992 17.6668 16.6914 17.1786 17.1796C16.6904 17.6673 15.8991 17.6675 15.411 17.1796L8.77237 10.5399L2.13369 17.1796C1.64558 17.6674 0.85419 17.6674 0.366117 17.1796C-0.122039 16.6914 -0.122039 15.8992 0.366117 15.411L7.00381 8.77237L0.366117 2.13369C-0.122039 1.64554 -0.122039 0.854272 0.366117 0.366117C0.854276 -0.121992 1.64556 -0.122023 2.13369 0.366117L8.77237 7.00479L15.411 0.366117Z'
                    fill='black'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
