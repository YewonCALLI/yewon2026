'use client'
import { useState, useEffect } from 'react'

type OrientationLockType =
  | 'portrait'
  | 'landscape'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary'

interface RotatedPaperDemoProps {
  onDirectionsClick: () => void
  displayName: string
}

export function RotatedPaper({ className = '', isMobile = false }) {
  return (
    //종이의 크기
    <div
      className={`
      w-[99.47vw] h-[clamp(488px,57.81dvh,941.2298px)] bg-white rounded-lg
      md:w-[clamp(640.7787px,83.33vw,880px)] md:h-[67.38dvh]
      md-landscape:w-[880.0000262670924px] md-landscape:h-[537px]
      lg:w-[clamp(880px,59vw,1540px)] lg:h-[clamp(538px,62dvh,941px)]
      ${className}
    `}
    ></div>
  )
}

export default function RotatedPaperDemo({ onDirectionsClick, displayName }: RotatedPaperDemoProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent
      const mobileRegex = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(mobileRegex.test(userAgent) || isTouch)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    const detectAndLockOrientation = async () => {
      if (!isMobile) return

      try {
        let currentOrientation: 'portrait' | 'landscape' | null = null

        if (screen.orientation) {
          const orientationType = screen.orientation.type
          if (orientationType.includes('portrait')) {
            currentOrientation = 'portrait'
          } else if (orientationType.includes('landscape')) {
            currentOrientation = 'landscape'
          }
        } else {
          const isPortrait = window.innerHeight > window.innerWidth
          currentOrientation = isPortrait ? 'portrait' : 'landscape'
        }

        if ((screen.orientation as any)?.lock && currentOrientation) {
          await (screen.orientation as any).lock(currentOrientation as OrientationLockType)
        }
      } catch (error) {}
    }

    if (isMobile) {
      detectAndLockOrientation()
    }

    return () => {
      try {
        if ((screen.orientation as any)?.unlock) {
          ;(screen.orientation as any).unlock()
        }
      } catch (error) {}
    }
  }, [isMobile])

  return (
    <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-[100]'>
      <div className='relative transform -rotate-6'>
        <RotatedPaper isMobile={isMobile} />
        <div className='absolute inset-0 flex flex-col items-center justify-center pr-8 pl-8 gap-[71px] md:gap-[82px] lg:gap-[88px] text-black z-[110] transform rotate-6'>
          <div className='text-center w-[264px] md:w-[85%] font-medium text-[17px] md:text-[clamp(17px,1.5vw,38.5px)]'>
            <p className='leading-[160%] break-keep'>안녕하세요.</p>
            <p className='break-keep'>
              2026 MEP 〈every else〉에 {displayName}
              {displayName !== '여러분' && '님'}을 초대합니다.
            </p>

            <p>
              전시는 8월 11일부터 15일까지,
              <br />
              삼성전자 서울 R&D 캠퍼스 A타워 2층
              <br />
              갤러리 1, 2에서 진행됩니다.
              <br className='block' /> 소중한 발걸음으로 함께해 주세요.
            </p>
          </div>
          <div className='inline-flex flex-col justify-center text-[clamp(17px,1.23vw,31.5px)] items-center gap-2 md:gap-3'>
            <button
              onClick={onDirectionsClick}
              className='text-zinc-600 font-medium underline leading-[150%] hover:text-zinc-800 transition-colors'
            >
              오시는 길
            </button>
            <a
              href='https://www.newformative.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-zinc-600 font-medium underline leading-[150%] hover:text-zinc-800 transition-colors'
            >
              웹사이트 보러가기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
