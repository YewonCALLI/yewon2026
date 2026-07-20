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
import { Box } from '@react-three/drei'

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [showDirections, setShowDirections] = useState(false)
  const [displayName, setDisplayName] = useState('여러분')
  const [isMobile, setIsMobile] = useState(false)
  const [isMotionPanelOpen, setIsMotionPanelOpen] = useState(false)
  const [isGyroPopupVisible, setIsGyroPopupVisible] = useState(false)
  const [useLottie, setUseLottie] = useState(false)
  const isLandscape = useIsLandscape()
  const isPhone = useIsPhone({ cutoff: 768 })

  const [showTiltPrompt, setShowTiltPrompt] = useState(false)
  const [tiltPermissionDenied, setTiltPermissionDenied] = useState(false)
  const [requestTiltPermission, setRequestTiltPermission] = useState<(() => Promise<boolean>) | null>(null)

  const handleActivateTilt = async () => {
    if (!requestTiltPermission) return
    const granted = await requestTiltPermission()
    if (granted) setShowTiltPrompt(false)
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
        setDisplayName('여러분') // 파라미터가 없으면 기본값
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

        <SceneCanvas
          onTiltNeedsPermission={(requestPermission) => {
            setRequestTiltPermission(() => requestPermission)
            setShowTiltPrompt(true)
          }}
          onTiltPermissionDenied={() => {
            setTiltPermissionDenied(true)
            setShowTiltPrompt(false)
          }}
        />

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
                  <div className="w-[832px] text-center justify-start text-[#222222] text-[1.94vw] font-medium font-['Pretendard'] leading-[160%]">
                    안녕하세요. <br />
                    2026 MEP 〈every else〉에 김삼성님을 초대합니다. <br />
                    전시는 8월 11일부터 15일까지, <br />
                    삼성전자 서울 R&amp;D 캠퍼스 A타워 2층, <br />
                    갤러리 1,2에서 진행됩니다. <br />
                    소중한 발걸음으로 함께해 주세요.
                  </div>
                  <div className='flex flex-col justify-start items-center gap-[9.23px]'>
                    <button
                      onClick={() => setShowDirections(true)}
                      className='px-[21.1px] py-[2.64px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'
                    >
                      <div className='justify-center text-black text-[1.80vw] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Directions
                      </div>
                    </button>
                    <div className='px-[21.1px] py-[2.64px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'>
                      <div className='justify-center text-black text-[1.80vw] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
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
                      김삼성님을 초대합니다.
                    </p>
                    <p className="text-[#222222] text-base font-medium font-['Pretendard'] leading-[160%] pl-[30.48px]">
                      전시는 8월 11일부터 15일까지, <br />
                      삼성전자 서울 R&amp;D 캠퍼스 A타워 2층, <br />
                      이노베이션 스튜디오에서 진행됩니다. <br />
                      서로 다른 시선을 함께해 주세요.
                    </p>
                  </div>
                  <div className='flex flex-col items-end self-end gap-[7px]'>
                    <button
                      onClick={() => setShowDirections(true)}
                      className='h-[45px] px-[17.8px] py-[2.23px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'
                    >
                      <div className='text-black text-[22.27px] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                        Directions
                      </div>
                    </button>
                    <div className='h-[45px] px-[17.8px] py-[2.23px] bg-white rounded-full outline outline-2 outline-offset-[-2px] outline-black inline-flex justify-center items-center gap-3'>
                      <div className='text-black text-[22.27px] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
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

      <div className='footer-container hidden md:block fixed bottom-0 w-screen z-[9999]'>
        <Footer />
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key='intro'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => setShowIntro(false)}
            className='fixed inset-0 z-[10000] bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center gap-8 px-8 cursor-pointer'
          >
            <div className='relative w-[clamp(120px,40vw,180px)] aspect-[161/110]'>
              <motion.svg
                className='absolute inset-0 w-full h-full'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 161 110'
                fill='none'
                animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1.05, 0.95, 0.95, 1] }}
                transition={{ duration: 4, times: [0, 0.4, 0.5, 0.9, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                <circle cx='32.8796' cy='27.5767' r='9.54569' fill='white' />
                <circle cx='55.1528' cy='51.9711' r='5.30316' fill='white' />
                <circle cx='14.8489' cy='70.0019' r='14.8489' fill='white' />
                <circle cx='67.3501' cy='89.6235' r='12.1973' fill='white' />
                <circle cx='33.4099' cy='103.412' r='5.83348' fill='white' />
                <circle cx='146.367' cy='13.7882' r='13.7882' fill='white' />
                <circle cx='106.063' cy='101.821' r='7.42443' fill='white' />
                <circle cx='101.821' cy='46.6677' r='11.667' fill='white' />
              </motion.svg>
              <motion.svg
                className='absolute inset-0 w-full h-full'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 198 137'
                fill='none'
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.95, 0.95, 1.05, 1, 0.95] }}
                transition={{ duration: 4, times: [0, 0.4, 0.5, 0.9, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d='M28.2412 41.8159C21.3046 39.2503 18.5058 30.9375 22.4781 24.699C26.508 18.3701 35.3942 17.4715 40.6095 22.8656L60.6228 43.5645C62.1825 45.1776 62.4895 47.6268 61.3763 49.5749C60.1523 51.7169 57.559 52.6597 55.2453 51.8039L28.2412 41.8159Z'
                  fill='white'
                />
                <path
                  d='M56.7854 123.6C55.0387 127.654 50.1332 129.259 46.3281 127.021C42.3775 124.697 41.501 119.36 44.5009 115.895L70.0809 86.3471C70.4581 85.9114 71.0779 85.7774 71.6014 86.0185C72.2396 86.3124 72.5269 87.0616 72.2489 87.7069L56.7854 123.6Z'
                  fill='white'
                />
                <path
                  d='M135.514 122.047C138.135 124.856 137.7 129.327 134.587 131.578C131.355 133.915 126.795 132.749 125.081 129.147L110.466 98.4347C110.25 97.9818 110.36 97.4409 110.735 97.1079C111.192 96.7019 111.89 96.7346 112.307 97.1816L135.514 122.047Z'
                  fill='white'
                />
                <path
                  d='M78.6374 74.6275C77.9961 76.5164 75.7114 77.2478 74.0924 76.0824C72.3712 74.8435 72.4669 72.2514 74.2747 71.1428L79.4345 67.9786C79.6789 67.8288 79.9857 67.8247 80.2339 67.9681C80.5568 68.1545 80.703 68.543 80.5831 68.8961L78.6374 74.6275Z'
                  fill='white'
                />
                <path
                  d='M33.2903 101.774C25.0687 108.322 12.8776 105.346 8.59804 95.7464C4.27395 86.0464 10.3796 74.894 20.8811 73.3106L64.6408 66.7126C66.377 66.4508 68.0944 67.2891 68.9561 68.8189C69.975 70.6279 69.5302 72.9089 67.9062 74.2024L33.2903 101.774Z'
                  fill='white'
                />
                <path
                  d='M162.279 41.2119C172.759 40.4031 179.654 29.9182 176.245 19.9755C172.801 9.92941 160.733 5.92677 151.968 11.9232L115.443 36.9105C113.994 37.9019 113.308 39.6856 113.72 41.3925C114.206 43.4108 116.086 44.7773 118.156 44.6175L162.279 41.2119Z'
                  fill='white'
                />
                <path
                  d='M168.462 106.503C174.788 112.5 185.073 110.91 189.293 103.283C193.557 95.5769 189.308 85.9271 180.744 83.8702L145.059 75.2989C143.643 74.9588 142.164 75.5289 141.343 76.7315C140.372 78.1535 140.577 80.0699 141.827 81.2544L168.462 106.503Z'
                  fill='white'
                />
                <path
                  d='M99.7648 103.862C102.623 113.159 95.2335 122.42 85.534 121.697C75.4663 120.947 69.5775 110.003 74.4985 101.188L84.6602 82.9847C85.511 81.4607 87.1071 80.503 88.8522 80.4693C91.0425 80.4271 92.9957 81.8412 93.6394 83.9353L99.7648 103.862Z'
                  fill='white'
                />
                <path
                  d='M122.009 51.0398C131.591 49.3659 139.855 57.8542 137.926 67.3874C135.924 77.2825 124.33 81.7577 116.199 75.774L99.4081 63.4176C98.0023 62.383 97.2515 60.6798 97.4362 58.9441C97.668 56.7657 99.315 55.0045 101.473 54.6275L122.009 51.0398Z'
                  fill='white'
                />
              </motion.svg>
            </div>

            <p className="text-center text-white text-base font-medium font-['Pretendard'] leading-[160%] max-w-[240px] tracking-[-2%]">
              화면을 터치하여, every else의 <br />
              시선을 경험해보세요.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowIntro(false)
              }}
              className='h-11 px-[27.5px] py-[2.23px] rounded-full outline outline-[1.67px] outline-offset-[-1.67px] outline-white flex justify-center items-center gap-2.5'
            >
              <span className='text-white text-[23px] font-semibold font-english leading-[150%] tracking-[-4.6%]'>
                Continue
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showTiltPrompt && (
        <div className='fixed inset-0 flex items-center justify-center z-[1000] bg-[#000000DD] pointer-events-none'>
          <div className='pointer-events-auto'>
            <div className='bg-white/95 backdrop-blur-sm rounded-[10px] p-6 shadow-2xl text-center max-w-xs'>
              <div className='mb-4'>
                <div className='mx-auto mb-3 rounded-full flex items-center justify-center'>
                  <img src='/images/icon.svg' alt='Icon' className='text-black w-12 h-12' />
                </div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>움직임 효과 활성화</h3>
                <p className='text-sm text-gray-600'>기기를 기울여 배경을 움직여보세요</p>
              </div>
              <button
                onClick={handleActivateTilt}
                className='w-full bg-[#222222] text-white py-3 px-6 rounded-[500px] font-medium transition-all duration-200 transform hover:scale-105 active:scale-95'
              >
                활성화하기
              </button>
            </div>
          </div>
        </div>
      )}

      {tiltPermissionDenied && (
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
    </>
  )
}
