interface Row {
  slug: string
  name: string
  input: string
  system: string
  output: string
}

// 작업마다 사람의 재료가 시스템을 거쳐 손에 잡히는 결과물로 바뀌는 흐름
const ROWS: Row[] = [
  { slug: 'typofold', name: 'Typofold', input: 'Font', system: 'Geometry unfolding', output: 'Paper craft' },
  {
    slug: 'ganpan',
    name: 'Ganpan',
    input: 'Signboard images',
    system: 'Generative model',
    output: 'Korean typography',
  },
  { slug: 'word-wide-web', name: 'Word Wide Web', input: 'Community words', system: 'Synonym network', output: 'Poem' },
  { slug: 'draw-the-beat', name: 'Draw the Beat!', input: 'Drawing', system: 'Sound mapping', output: 'Music' },
  {
    slug: 'franklin',
    name: 'Franklin',
    input: 'Korean folktales',
    system: 'Debiasing language model',
    output: 'Gender-fair retelling',
  },
]

// Same column layout at every width; gaps, arrows and padding shrink on mobile instead of stacking
const GRID =
  'grid grid-cols-[1fr_14px_1fr_14px_1fr_64px] items-center gap-[4px] md:grid-cols-[1fr_28px_1fr_28px_1fr_160px] md:gap-[12px]'
const CELL =
  'flex h-full items-center justify-center px-[6px] py-[10px] text-center text-label md:px-[16px] md:py-[14px]'

function Arrow() {
  return (
    <svg viewBox='0 0 40 24' className='h-auto w-full text-black' aria-hidden>
      <path
        d='M2 12H36M28 4 36 12 28 20'
        fill='none'
        stroke='currentColor'
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function Index({ n }: { n: string }) {
  return (
    <span className='mr-[6px] inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border border-black text-label'>
      {n}
    </span>
  )
}

export function PrinciplesDiagram() {
  return (
    <figure className='mx-auto mt-[48px] w-full max-w-[1100px]'>
      <div className={`${GRID} pb-[12px] text-center text-label font-medium text-black`}>
        <span>Human material</span>
        <span />
        <span>
          <Index n='1' />
          Computational system
        </span>
        <span />
        <span>
          <Index n='2' />
          Something to hold, make, play
        </span>
        <span className='text-left text-neutral-500'>Work</span>
      </div>

      <ul className='flex flex-col gap-[8px]'>
        {ROWS.map((row) => (
          <li key={row.slug}>
            <a href={`#${row.slug}`} className={`group ${GRID}`}>
              <span className={CELL + ' bg-neutral-100 text-ink'}>{row.input}</span>
              <Arrow />
              <span className={CELL + ' bg-black font-medium text-white'}>{row.system}</span>
              <Arrow />
              <span className={CELL + ' bg-neutral-100 text-ink'}>{row.output}</span>
              <span className='text-label text-neutral-500 transition-colors group-hover:text-black'>{row.name} ↓</span>
            </a>
          </li>
        ))}
      </ul>
    </figure>
  )
}
