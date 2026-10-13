import Link from 'next/link'
import { projects } from './projectlist'

export function ProjectSidebar({ activeSlug }: { activeSlug: string }) {
  const topLevel = projects.filter((p) => !p.parent)

  const renderLink = (slug: string, name: string, isChild = false) => (
    <Link
      key={slug}
      href={`/works/${slug}`}
      className={`text-[13px] leading-snug transition-colors ${isChild ? 'pl-[12px]' : ''} ${
        slug === activeSlug ? 'font-bold text-black' : 'text-neutral-400 hover:text-black'
      }`}
    >
      {name}
    </Link>
  )

  return (
    <aside className='hidden md:block w-full shrink-0 border-b border-black px-[30px] py-[24px] md:sticky md:top-[60px] md:h-[calc(100dvh-60px)] md:w-[240px] md:overflow-y-auto md:border-b-0 md:border-r md:px-[30px] md:py-[20px]'>
      <p className='text-[11px] text-neutral-400'>All Works</p>
      <nav className='mt-[16px] flex flex-col gap-[10px]'>
        {topLevel.flatMap((p) => [
          renderLink(p.slug, p.name),
          ...projects.filter((c) => c.parent === p.slug).map((c) => renderLink(c.slug, c.name, true)),
        ])}
      </nav>
    </aside>
  )
}
