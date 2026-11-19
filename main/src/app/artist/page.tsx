'use client'

import Image from 'next/image'
import { Header } from '@/components/projects'
import { projects } from '@/app/works/projectlist'
import { ProjectGrid } from '@/app/works/ProjectGrid'

const STATEMENT =
  'Ye₩ is a front-end developer based in Seoul. At some point, she began to feel distant from the graphics she created on screen, and as AI accelerated the pace of code generation, that distance only seemed to grow. In August 2024, she began developing a tool called TypoFold as a way to address this feeling. TypoFold applies code-generated graphics to letterforms as textures, then converts them into flat nets that can be cut and folded by hand. \n\nIljaillja (日字日字), the exhibition opening at Space Pado, archives two months of generating letters, words and sentences with TypoFold and folding each one by hand. Visitors can use TypoFold to fold letters of their own among the sculptures made over these 60 days, helping to fill the space together.'
const FOLDED_COLUMNS = [
  [
    { src: '/images/projects/artist/daily-10.webp', caption: '' },
    { src: '/images/projects/artist/IMG_3512-2.webp', caption: '' },

    { src: '/images/projects/daily-folding-practice/08.jpg', caption: '' },
    { src: '/images/projects/artist/vertical-1.webp', caption: '' },
    { src: '/images/projects/artist/Frame.webp', caption: '' },
    { src: '/images/projects/daily-folding-practice/05.jpg', caption: '' },
    { src: '/images/projects/artist/vertical-1-2.webp', caption: '' },
  ],
  [
    { src: '/images/projects/artist/IMG_3618-2.webp', caption: '' },
    { src: '/images/projects/daily-folding-practice/07.jpg', caption: '' },
    { src: '/images/projects/artist/IMG_3508-2.webp', caption: '' },

    { src: '/images/projects/artist/IMG_3506-2.webp', caption: '' },
    { src: '/images/projects/daily-folding-practice/06.jpg', caption: '' },
    { src: '/images/projects/artist/IMG_3503-2.webp', caption: '' },
    { src: '/images/projects/artist/IMG_3345-2.webp', caption: '' },
  ],
  [
    { src: '/images/projects/daily-folding-practice/02.jpg', caption: '' },
    { src: '/images/projects/artist/IMG_3474-2.webp', caption: '' },
    { src: '/images/projects/daily-folding-practice/04.jpg', caption: '' },
    { src: '/images/projects/artist/IMG_3622-2.webp', caption: '' },
    { src: '/images/projects/artist/vertical-1-1.webp', caption: '' },
    { src: '/images/projects/daily-folding-practice/11.jpg', caption: '' },
    { src: '/images/projects/artist/IMG_3341-2.webp', caption: '' },
  ],
]

const FOLDED_FLAT = Array.from({ length: Math.max(...FOLDED_COLUMNS.map((c) => c.length)) }).flatMap((_, row) =>
  FOLDED_COLUMNS.flatMap((col) => (col[row] ? [col[row]] : [])),
)

function FoldedFigure({ work, sizes }: { work: { src: string; caption: string }; sizes: string }) {
  return (
    <figure className='break-inside-avoid'>
      <Image
        src={work.src}
        alt={work.caption || 'Folded paper letters'}
        width={0}
        height={0}
        sizes={sizes}
        className='h-auto w-full bg-neutral-100'
      />
      {work.caption && (
        <figcaption className='mt-[6px] text-label leading-snug text-neutral-500'>{work.caption}</figcaption>
      )}
    </figure>
  )
}

const ARTIST_SKILLS = ['Media Art', 'Digital Fabrication'] as const

const artistProjects = [...projects]
  .filter((p) => p.slug !== 'typofold')
  .filter((p) => p.skills?.some((skill) => ARTIST_SKILLS.includes(skill as (typeof ARTIST_SKILLS)[number])))
  .sort((a, b) => Number(b.created_date) - Number(a.created_date))

export default function ArtistPage() {
  return (
    <>
      <Header title='Artist' />
      <main className='min-h-dvh w-full bg-white px-[16px] pb-[100px] pt-[120px] text-ink md:px-[40px] md:pt-[160px]'>
        <p className='max-w-[720px] text-body font-medium leading-snug text-black'>{STATEMENT}</p>

        <section className='mt-[80px]'>
          <h2 className='text-label font-medium text-black'>Folded Works</h2>
          <div className='mt-[24px] columns-2 gap-[16px] md:hidden [&>figure]:mb-[16px]'>
            {FOLDED_FLAT.map((work) => (
              <FoldedFigure key={work.src} work={work} sizes='50vw' />
            ))}
          </div>
          <div className='mt-[24px] hidden gap-[24px] md:grid md:grid-cols-3'>
            {FOLDED_COLUMNS.map((col, i) => (
              <div key={i} className='flex flex-col gap-[24px]'>
                {col.map((work) => (
                  <FoldedFigure key={work.src} work={work} sizes='33vw' />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
