'use client'
import { Footer } from '@/components/projects'
import RotatedPaperDemo from '@/components/projects/RotatedPaperDemo'
import DirectionsPage from '@/components/projects/DirectionsPage'
import { useScrollAtBottom } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import LottieBackground from '@/components/LottieBackground'
import SceneCanvas from '@/components/SceneCanvas'

import { useIsLandscape } from '@/hooks/useIsLandscape'
import { useIsPhone } from '@/hooks/useIsPhone'
import type { TiltState } from '@/components/CameraTiltRig'
import TuningPanel from '@/components/TuningPanel'

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [showDirections, setShowDirections] = useState(false)
  const [displayName, setDisplayName] = useState('김삼성')
  const [isMobile, setIsMobile] = useState(false)
  const [isMotionPanelOpen, setIsMotionPanelOpen] = useState(false)
  const [isGyroPopupVisible, setIsGyroPopupVisible] = useState(false)
  const [useLottie, setUseLottie] = useState(false)
  const isLandscape = useIsLandscape()
  const isPhone = useIsPhone({ cutoff: 768 })

  const [tiltState, setTiltState] = useState<TiltState>({
    needsPermission: false,
    isGyroActive: false,
    permissionDenied: false,
    orientation: { beta: 0, gamma: 0 },
    requestPermission: async () => false,
  })
  const { isGyroActive, permissionDenied, orientation, requestPermission } = tiltState
  const [showTiltPrompt, setShowTiltPrompt] = useState(false)

  useEffect(() => {
    if (isPhone && !isGyroActive) {
      setShowTiltPrompt(true)
    }
  }, [isPhone, isGyroActive])

  useEffect(() => {
    if (permissionDenied) setShowTiltPrompt(false)
  }, [permissionDenied])

  const handleActivateTilt = async () => {
    if (isGyroActive) {
      setShowTiltPrompt(false)
      return
    }
    await requestPermission()
  }

  // console.log(navigator.userAgent)
  // console.log(isMobile)
  // console.log(isLandscape)

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent
      const mobileRegex = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i
      setIsMobile(mobileRegex.test(userAgent))
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nameFromUrl = urlParams.get('to')

    if (nameFromUrl) {
      const decodedName = decodeURIComponent(nameFromUrl)
      setDisplayName(decodedName)
    }
  }, [])

  useEffect(() => {
    const handleURLChange = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const nameFromUrl = urlParams.get('to')

      if (nameFromUrl) {
        const decodedName = decodeURIComponent(nameFromUrl)
        setDisplayName(decodedName)
      } else {
        setDisplayName('김삼성') // 파라미터가 없으면 기본값
      }
    }

    window.addEventListener('popstate', handleURLChange)

    return () => {
      window.removeEventListener('popstate', handleURLChange)
    }
  }, [])

  return (
    <>
      <div
        className='overflow-hidden relative'
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        {/* <video
          className='absolute inset-0 z-0 w-full h-full object-cover'
          src='/animation/Invitation.webm'
          autoPlay
          loop
          muted
          playsInline
        /> */}

        <SceneCanvas onTiltStateChange={setTiltState} />

        <div className='absolute top-0 left-0 w-full h-[15vh] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none md:hidden' />
        <div className='absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-white to-transparent z-10 pointer-events-none md:hidden' />

        <div className='relative w-full h-full z-20'>
          <AnimatePresence mode='wait'>
            {!showDirections ? (
              <motion.div
                key='home'
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className='w-full h-full'
              >
                {/* PC (md 이상) - 기존 디자인 유지 */}
                <div className='hidden md:flex w-full h-full flex-col justify-center items-center gap-[32px]'>
                  <div className="text-center justify-start text-[#222222] text-[clamp(28px,1.94vw,33px)] font-medium font-['Pretendard'] leading-[160%]">
                    안녕하세요. <br />
                    2026 MEP 〈every else〉에 {displayName}님을 초대합니다. <br />
                    전시는 8월 11일부터 15일까지, <br />
                    삼성전자 서울 R&amp;D 캠퍼스 A타워 2층, <br />
                    갤러리 1,2에서 진행됩니다. <br />
                    소중한 발걸음으로 함께해 주세요.
                  </div>
                  <div className='flex flex-col justify-start items-center gap-[9.23px]'>
                    <button
                      onClick={() => setShowDirections(true)}
                      className='px-[21.1px] py-[4.64px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'
                    >
                      <div className='justify-center text-black text-[clamp(26px,1.80vw,33px)] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Directions
                      </div>
                    </button>
                    <div className='px-[21.1px] py-[4.64px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'>
                      <div className='justify-center text-black text-[clamp(26px,1.80vw,33px)] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Visit Website
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile (md 이하) - 새로운 디자인 */}
                <div className='flex md:hidden w-full h-full flex-col justify-center gap-[clamp(0px,9.59dvh,81px)] px-[5.1%]'>
                  <div className='flex flex-col gap-[10px] pl-[30.48px]'>
                    <p className="text-[#222222] text-base font-medium font-['Pretendard'] leading-[160%]">
                      안녕하세요. <br />
                      2026 MEP 〈every else〉에
                      <br />
                      {displayName}님을 초대합니다.
                    </p>
                    <p className="text-[#222222] text-base font-medium font-['Pretendard'] leading-[160%] pl-[30.48px]">
                      전시는 8월 11일부터 15일까지, <br />
                      삼성전자 서울 R&amp;D 캠퍼스 A타워 2층, <br />
                      이노베이션 스튜디오에서 진행됩니다. <br />
                      서로 다른 시선을 함께해 주세요.
                    </p>
                  </div>
                  <div className='flex flex-col items-end self-end gap-[6.24px]'>
                    <button
                      onClick={() => setShowDirections(true)}
                      className='h-[40px] px-[16px] py-[2px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'
                    >
                      <div className='text-black text-[19.84px] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Directions
                      </div>
                    </button>
                    <div className='h-[40px] px-[16px] py-[2px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'>
                      <div className='text-black text-[19.84px] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Visit Website
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='directions'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='w-full h-full'
              >
                <DirectionsPage onBackClick={() => setShowDirections(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className='footer-container hidden md:block fixed bottom-0 w-screen z-[10]'>
        <Footer />
      </div>

      <AnimatePresence>
        {showTiltPrompt && (
          <motion.div
            key='tilt-prompt'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => setShowTiltPrompt(false)}
            className='fixed inset-0 z-[10000] bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center gap-8 px-8 cursor-pointer'
          >
            <div className='relative w-12 h-auto' style={{ perspective: 600 }}>
              <motion.img
                src='/icons/phone.svg'
                alt=''
                className='w-full h-full object-contain'
                animate={{
                  rotateX: isGyroActive ? -orientation.beta * 0.6 : 0,
                  rotateY: isGyroActive ? orientation.gamma * 0.6 : 0,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
              />
            </div>

            <p className='text-center w-60 text-white text-[clamp(14px,4.1vw,20px)] font-medium font-korean leading-6'>
              기기를 기울여, every else의
              <br />
              시선을 경험해보세요.
            </p>

            <button
              onClick={async (e) => {
                e.stopPropagation()
                await handleActivateTilt()
              }}
              className='w-52 h-12 rounded-[500px] border-[1.50px] border-white flex justify-center items-center'
            >
              <span className='text-center text-white text-[clamp(14px,4.1vw,20px)] font-medium font-korean leading-6'>
                활성화하기
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {permissionDenied && (
        <div className='fixed top-4 left-4 z-[1000] pointer-events-auto'>
          <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm'>
            자이로스코프 권한이 필요합니다
          </div>
        </div>
      )}

      {isPhone && isLandscape && (
        <div className='fixed inset-0 z-[100000] bg-black text-white flex flex-col items-center justify-center p-8 text-center'>
          <img className='pb-[20px]' src='/images/icon-error.svg' />
          <p className='text-[24px] font-bold mb-2'>해당 서비스는 세로 모드 전용입니다</p>
          <p className='text-[17px] text-[#CFCFCF]'>가로 모드에서는 일부 콘텐츠가 보이지 않을 수 있어요</p>
        </div>
      )}

      <TuningPanel />
    </>
  )
}
