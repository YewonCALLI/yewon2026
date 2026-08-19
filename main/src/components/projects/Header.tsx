//components/projects/Header.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  title: string
  accentColor?: string
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

const SOCIALS = ['Instagram', 'X']

export function Header({ title, accentColor = '#FF2D8C' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState('')
  const pathname = usePathname()

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
      <header className='fixed inset-x-0 top-0 z-50 hidden h-[62px] items-center justify-between gap-4 overflow-x-auto bg-[#111111] md:bg-transparent md:mix-blend-difference px-[30px] text-white md:flex'>
        <div className='flex shrink-0 items-center gap-6'>
          <Link href='/' className='flex flex-col items-start justify-center leading-[120%]'>
            <span className='text-[20px] font-semibold text-white'>Yewon Jang</span>
            <span className='md:hidden max-w-[160px] truncate text-[20px] font-semibold text-white'>{title}</span>
          </Link>

          <nav className='flex items-center gap-5'>
            {NAV_ITEMS.filter((item) => item.label !== 'Home').map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-[20px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.identity && (
                    <span
                      className='mr-[6px] text-[11px] font-normal transition-colors'
                      style={{ color: accentColor }}
                    >
                      {item.identity}
                    </span>
                  )}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className='flex shrink-0 items-center gap-5 text-[11px] text-white/70'>
          <span>{CONTACT.inquiries}</span>
          <span>{CONTACT.address}</span>
          <div className='flex items-center gap-3'>
            {SOCIALS.map((social) => (
              <span key={social}>{social}</span>
            ))}
          </div>
          <span className='text-white/60'>EDT {time}</span>
        </div>
      </header>

      {/* below md: collapsible menu */}
      <div className='fixed left-1/2 top-[16px] z-50 -translate-x-1/2 md:hidden'>
        <button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className='flex h-[44px] w-[359px] max-w-[92vw] items-center justify-between gap-3 rounded-md bg-[#111111] px-[16px]'
        >
          <span className='flex flex-col items-start justify-center leading-[120%]'>
            <span className='text-[10px] font-medium text-white/60'>Yewon Jang</span>
            <span className='max-w-[240px] truncate text-[12px] font-semibold text-white'>{isOpen ? 'Menu' : title}</span>
          </span>
          <span className='relative flex h-[14px] w-[14px] shrink-0 items-center justify-center'>
            <span
              className={`absolute h-[1.5px] w-[14px] bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-[14px] bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </span>
        </button>

        <div
          className={`absolute left-0 top-[52px] flex max-h-[70vh] w-[359px] max-w-[92vw] origin-top flex-col justify-between overflow-y-auto rounded-md bg-[#0A0A0A] px-[16px] pb-[16px] pt-[12px] text-white shadow-xl transition-all duration-300 ease-out ${
            isOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div>
            <nav>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => {
                    if (item.href === '#') event.preventDefault()
                    setIsOpen(false)
                  }}
                  className='block border-b border-white/10 py-[12px] text-[15px] font-medium'
                >
                  {item.identity && (
                    <span
                      className='mr-[12px] text-[11px] font-normal transition-colors'
                      style={{ color: accentColor }}
                    >
                      {item.identity}
                    </span>
                  )}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex flex-col gap-[10px] pt-[10px]'>
            <div className='flex flex-col gap-[2px] border-t border-white/10 pt-[10px] text-[11px] text-white/80'>
              <span>Inquiries: {CONTACT.inquiries}</span>
              <span>Address: {CONTACT.address}</span>
            </div>

            <div className='flex flex-col gap-[2px] border-t border-white/10 pt-[10px] text-[11px] text-white/80'>
              {SOCIALS.map((social) => (
                <span key={social}>{social}</span>
              ))}
            </div>

            <div className='flex items-center justify-between border-t border-white/10 pt-[10px] text-[10px] text-white/60'>
              <span>© 2026 Yewon Jang</span>
              <span>EDT {time}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
