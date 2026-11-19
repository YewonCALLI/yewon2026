//components/projects/Header.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  title: string
  accentColor?: string
  light?: boolean
  mobileLight?: boolean
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Researcher', href: '/researcher', identity: 'Identity 01' },
  { label: 'Artist', href: '/artist', identity: 'Identity 02' },
  { label: 'Programmer', href: '/programmer', identity: 'Identity 03' },
  { label: 'Writer', href: '/writer', identity: 'Identity 04' },
]

// TODO: 실제 연락처/SNS 정보로 교체
const CONTACT = {
  inquiries: 'yewon11351@gmail.com',
  address: 'Based in Pittsburgh and Seoul',
}

const SOCIALS = [{ label: 'Instagram', href: 'https://www.instagram.com/yewon.calli/' }]

// Pages that exist in more than one language, mapped to their counterpart.
const LANGUAGE_ALTERNATES: Record<string, { label: string; href: string }> = {
  '/works/daily-folding-practice': { label: '한국어', href: '/works/daily-folding-practice/ko' },
  '/works/daily-folding-practice/ko': { label: 'EN', href: '/works/daily-folding-practice' },
  '/works/weaving-letters': { label: '한국어', href: '/works/weaving-letters/ko' },
  '/works/weaving-letters/ko': { label: 'EN', href: '/works/weaving-letters' },
  '/works/xr-science-museum': { label: '한국어', href: '/works/xr-science-museum/ko' },
  '/works/xr-science-museum/ko': { label: 'EN', href: '/works/xr-science-museum' },
}

export function Header({ title, accentColor = '#0059ff', light = false, mobileLight = light }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState('')
  const pathname = usePathname()
  const languageAlternate = pathname ? LANGUAGE_ALTERNATES[pathname] : undefined

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      )
    }
    updateTime()
    const id = setInterval(updateTime, 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      {/* md and up: horizontal navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-[50] hidden h-[62px] w-full items-center justify-between gap-4 overflow-x-auto px-[30px] md:flex transform-gpu will-change-transform ${
          light
            ? 'bg-white backdrop-blur-md border-b border-black text-black'
            : 'bg-[#111111] md:bg-transparent md:mix-blend-difference text-white'
        }`}
      >
        <div className='flex shrink-0 items-center gap-6'>
          <Link href='/' className='flex flex-col items-start justify-center leading-[120%]'>
            <span className={`text-title font-medium ${light ? 'text-black' : 'text-white'}`}>Yewon Jang</span>
            <span
              className={`md:hidden max-w-[160px] truncate text-title font-medium ${light ? 'text-black' : 'text-white'}`}
            >
              {title}
            </span>
          </Link>

          <nav className='flex items-center gap-5'>
            {NAV_ITEMS.filter((item) => item.label !== 'Home').map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-title font-medium transition-colors ${
                    light
                      ? isActive
                        ? 'text-black'
                        : 'text-black/60 hover:text-black'
                      : isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.identity && (
                    <span className='mr-[6px] text-label font-normal transition-colors' style={{ color: accentColor }}>
                      {item.identity}
                    </span>
                  )}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className={`flex shrink-0 items-center gap-5 text-label ${light ? 'text-black/60' : 'text-white/70'}`}>
          {languageAlternate && (
            <Link
              href={languageAlternate.href}
              className={`transition-colors ${light ? 'hover:text-black' : 'hover:text-white'}`}
            >
              {languageAlternate.label}
            </Link>
          )}
          <span>{CONTACT.inquiries}</span>
          <span>{CONTACT.address}</span>
          <div className='flex items-center gap-3'>
            {SOCIALS.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`transition-colors ${light ? 'hover:text-black' : 'hover:text-white'}`}
                >
                  {social.label}
                </a>
              ) : (
                <span key={social.label}>{social.label}</span>
              ),
            )}
          </div>
        </div>
      </header>

      {/* below md: same look as the home page's mobile filter bar (blue strip + white boxes + black toggle) */}
      {/* 바 높이 46px 고정: 7px + (4px + 24px + 4px) + 7px — 프로젝트 상세 페이지의 sticky 네비가 이 값에 맞춰 붙음 */}
      <div className='pointer-events-none fixed left-0 top-0 z-50 flex w-screen flex-col items-start md:hidden'>
        <div className='pointer-events-auto flex h-[46px] w-fit items-stretch'>
          <div className='flex flex-row gap-2 bg-[#0059ff] p-[7px]'>
            <Link
              href='/'
              onClick={() => setIsOpen(false)}
              className='whitespace-nowrap bg-white px-2 py-1 leading-6 text-black'
            >
              Yewon Jang
            </Link>
            <span className='max-w-[160px] truncate bg-white px-2 py-1 leading-6 text-black'>{isOpen ? 'Menu' : title}</span>
          </div>

          <button
            type='button'
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className='flex cursor-pointer items-center justify-center bg-black px-3 text-white'
          >
            {isOpen ? '▲' : '▼'}
          </button>
        </div>

        {/* expanded: the blue strip grows into a sheet of white boxes, same language as the closed bar */}
        <div
          className={`pointer-events-auto grid w-full transition-[grid-template-rows] duration-300 ease-out ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          aria-hidden={!isOpen}
        >
          <div className='overflow-hidden'>
            <div className='flex flex-col gap-[7px] bg-[#0059ff] px-[7px] pb-[7px] pt-[7px]'>
              <nav className='flex flex-col gap-[7px]'>
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      tabIndex={isOpen ? undefined : -1}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-2 py-2 ${
                        isActive ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.identity && (
                        <span className='text-label' style={{ color: accentColor }}>
                          {item.identity}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>

              <div className='flex flex-col gap-[2px] px-[2px] pt-[4px] text-label text-white'>
                {languageAlternate && (
                  <Link
                    href={languageAlternate.href}
                    tabIndex={isOpen ? undefined : -1}
                    onClick={() => setIsOpen(false)}
                    className='w-fit bg-white px-2 py-[2px] text-black'
                  >
                    {languageAlternate.label}
                  </Link>
                )}
                <a href={`mailto:${CONTACT.inquiries}`} tabIndex={isOpen ? undefined : -1} className='underline'>
                  {CONTACT.inquiries}
                </a>
                <span>{CONTACT.address}</span>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    {SOCIALS.map((social) =>
                      social.href ? (
                        <a
                          key={social.label}
                          href={social.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          tabIndex={isOpen ? undefined : -1}
                          className='underline'
                        >
                          {social.label}
                        </a>
                      ) : (
                        <span key={social.label}>{social.label}</span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
