//components/projects/Footer.tsx

'use client'

export function Footer() {
  return (
    <div className='w-full flex flex-col-reverse justify-between items-center gap-[14px] px-[42px] py-[clamp(0px,6.16dvh,52px)] md:flex-row md:px-[40px] md:py-[12px] lg:px-[40px] lg:py-[28px]'>
      <div className='left-[40px] top-[28px] justify-start text-[14px] text-[#222222] md:mb-0 text-center font-medium capitalize leading-[120%] md:text-left'>
        © 2026 Samsung Design Membership<span className='md:hidden'>.</span>
        <br className='md:hidden' />
        <span className='hidden md:inline'> </span>All rights reserved
      </div>
      <div className='w-fit h-6 left-[1089px] top-[28px] inline-flex justify-center items-center gap-[28px]'>
        <a
          href='https://www.design.samsung.com/kr/contents/sdm/'
          target='_blank'
          rel='noopener noreferrer'
          className='justify-start text-[#222222] text-sm font-medium underline uppercase text-nowrap leading-[120%] hover:opacity-80 transition-opacity'
        >
          Official Page
        </a>
        <a
          href='https://www.instagram.com/samsungdesignmembership/'
          target='_blank'
          rel='noopener noreferrer'
          className='justify-start text-[#222222] text-sm font-medium underline uppercase text-nowrap leading-[120%] hover:opacity-80 transition-opacity'
        >
          Instagram
        </a>
        <a
          href='https://www.behance.net/Samsung_Design_Mem'
          target='_blank'
          rel='noopener noreferrer'
          className='justify-start text-[#222222] text-sm font-medium underline uppercase text-nowrap leading-[120%] hover:opacity-80 transition-opacity'
        >
          Behance
        </a>
      </div>
    </div>
  )
}
