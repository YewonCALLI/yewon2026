'use client'

import Image from 'next/image'
import { Header } from '@/components/projects'

const INTRO =
  'As a researcher working in computational origami, digital fabrication, and computer graphics, I am engaged in designing tools that turn digital 3D forms into foldable objects, presenting papers at conferences such as HCI Korea, and collaborating across design and engineering.'

const THEMES = [
  {
    title: 'Computational Origami',
    body: 'I study how 3D forms can be translated into foldable structures. My work so far unfolds 3D models into paper nets, and addresses the gap between the faces a user perceives and the geometry a renderer produces. Next, I want to take this beyond letterforms to more complex geometries and the foldability constraints they bring.',
    question: 'How can complex 3D forms be unfolded into nets that remain foldable?',
  },
  {
    title: 'Fabrication-Aware Design Tools',
    body: 'Making a form foldable is only half the problem; someone still has to cut, fold, and assemble it. I design tools that account for the physical process of making, so that what looks right on screen can actually be built by hand.',
    question: 'Which unfolding method is easiest for humans to cut, fold, and assemble?',
  },
  {
    title: 'Ownership in Human–Tool Collaboration',
    body: 'Automation makes creation easier, but it can also make the result feel like it belongs to the tool. I study how a tool can automate the tedious parts while leaving the maker enough physical and expressive involvement to feel the result is theirs.',
    question: 'How can we provide the convenience of automation while not losing the sense of having made it yourself?',
  },
  {
    title: 'AI & Society',
    body: 'I study how language models and generative systems inherit the biases of the data they learn from, and how such systems can be designed around the people they serve. My earlier work includes debiasing Korean fairytale generation and designing accessible exercise tools with older adults.',
    question: 'Why do all fairytale girls want a party, while all fairytale boys fight dragons?',
  },
]

const GOOGLE_SCHOLAR_URL = 'https://scholar.google.com/citations?hl=en&user=uU7H-LIAAAAJ'

type ProfileLine = string | { text: string; href: string }

const PROFILE: { label: string; lines: ProfileLine[]; note?: string }[] = [
  {
    label: 'Affiliation',
    lines: ['M.S. in Computational Design', 'Carnegie Mellon University', 'School of Architecture'],
    note: 'Aug 2026 – May 2028 (expected)',
  },
  {
    label: 'Education',
    lines: ['B.A.S. in Art & Technology', 'B.S. in Convergence Software', 'Sogang University'],
    note: '2020 – 2025, Cum Laude',
  },
  {
    label: 'Research Fields',
    lines: ['Origami Engineering, Digital Fabrication,', 'Computer Graphics, Human–Computer Interaction'],
  },
  {
    label: 'Awards',
    lines: ['HCI Korea Conference Creative Awards 2025', 'HCI Korea Conference Creative Awards 2023'],
  },
  {
    label: 'Scholarships',
    lines: ['Merit-based Scholarship, Carnegie Mellon University', 'Yuyeon Foundation Scholarship', 'SW Scholarship, Naver'],
  },
  {
    label: 'External Links',
    lines: [
      { text: 'Google Scholar', href: GOOGLE_SCHOLAR_URL },
      { text: 'GitHub', href: 'https://github.com/YewonCALLI' },
      { text: 'LinkedIn', href: 'https://www.linkedin.com/in/yewon-jang-1a0b4b1b9/' },
      { text: 'Instagram', href: 'https://www.instagram.com/yewoncalli/' },
    ],
  },
]

const TEACHING = [
  {
    term: 'Winter 2025',
    text: 'Workshop Assistant, SEED Creative Workshop for Children, Smilegate FutureLab',
    note: 'Assisted the artist Ardong in running a web-based workshop on "Necessary Connections: Digital Citizen" for about 8 elementary and middle school students.',
  },
  {
    term: 'Fall 2022',
    text: 'Instructor and Organizer, Create your own AR snowball using SPARK AR, in collaboration with the Hyundai Motor Company Chung Mong-koo Foundation',
    note: 'Workshop for 8 participants interested in coding.',
  },
  {
    term: 'Spring 2022',
    text: 'Teaching Assistant, Intro to Creative Computing (AAT2004), Sogang University',
    note: 'Attended every session of this online course, mentored students, and answered their coding questions in p5.js and Processing.',
  },
]

// * equal contribution
const PUBLICATIONS = [
  {
    authors: 'Yewon Jang & Yongsoon Choi',
    title: 'TypoFold: A Creative Tool for Converting Code-Art based 3D Typography into Paper craft.',
    venue: 'Proceedings of HCI Korea, 2025.',
  },
  {
    authors: 'Jiin An*, Saetbyeol Leeyouk*, Yewon Jang*, & Dasaem Jeong',
    title: 'Construction of Debiased Korean AI Fairytale Generator.',
    venue: 'Journal of Digital Contents Society, 24(7), 1513-1528, 2023.',
    href: 'https://doi.org/10.9728/dcs.2023.24.7.1513',
  },
  {
    authors: 'Jiin An*, Saetbyeol Leeyouk*, Yewon Jang*, & Dasaem Jeong',
    title: 'Debiased Korean AI fairytale generator, <Franklin>.',
    venue: 'Proceedings of HCI Korea, 2023.',
  },
]

export default function ResearcherPage() {
  return (
    <>
      <Header title='Researcher' />
      <main className='min-h-dvh w-full bg-white px-[30px] pb-[100px] pt-[120px] text-ink md:px-[40px] md:pt-[160px]'>
        <p className='max-w-[720px] text-title font-medium leading-snug text-black'>{INTRO}</p>

        <section className='mt-[80px]'>
          <h2 className='text-label font-medium'>Profile</h2>
          <div className='mt-[24px] flex flex-col gap-[32px] md:flex-row md:gap-[48px]'>
            <Image
              src='/images/profile/yewon.jpg'
              alt='Yewon Jang'
              width={1400}
              height={1400}
              className='aspect-square h-auto w-full max-w-[160px] shrink-0 self-start object-cover'
            />
            <dl className='min-w-0 max-w-[480px] flex-1'>
              {PROFILE.map((row) => (
                <div
                  key={row.label}
                  className='grid gap-[4px] border-t border-neutral-300 py-[10px] md:grid-cols-[110px_1fr] md:items-baseline'
                >
                  <dt className='text-label font-medium text-neutral-500'>{row.label}</dt>
                  <dd className='flex flex-col gap-[1px] text-label leading-snug text-black'>
                    {row.lines.map((line) =>
                      typeof line === 'string' ? (
                        <span key={line}>{line}</span>
                      ) : (
                        <a
                          key={line.text}
                          href={line.href}
                          target='_blank'
                          rel='noreferrer'
                          className='w-fit hover:text-neutral-500'
                        >
                          {line.text}
                        </a>
                      ),
                    )}
                    {row.note && <span className='mt-[2px] text-label text-neutral-500'>{row.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className='mt-[80px]'>
          <h2 className='text-label font-medium'>Research Themes</h2>
          <div className='mt-[24px] grid gap-x-[40px] gap-y-[56px] md:grid-cols-2'>
            {THEMES.map((theme, i) => (
              <article key={theme.title} className='border-t border-black pt-[16px] md:border-t-0 md:pt-0'>
                <div className='flex items-baseline gap-[12px]'>
                  <span className='text-heading font-medium text-neutral-500'>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className='text-heading font-medium text-black'>{theme.title}</h3>
                </div>
                <p className='mt-[16px] text-body leading-relaxed'>{theme.body}</p>
                <p className='mt-[16px] text-label leading-relaxed text-neutral-600'>&ldquo;{theme.question}&rdquo;</p>
              </article>
            ))}
          </div>
        </section>

        <section className='mt-[80px]'>
          <h2 className='text-label font-medium'>Publications</h2>
          <ol className='mt-[24px] max-w-[720px]'>
            {PUBLICATIONS.map((pub, i) => (
              <li
                key={pub.title}
                className='grid gap-[4px] border-t border-neutral-200 py-[12px] md:grid-cols-[48px_1fr]'
              >
                <span className='text-label font-medium text-neutral-500'>[{PUBLICATIONS.length - i}]</span>
                <span className='text-body leading-snug'>
                  {pub.authors}. {pub.title} {pub.venue}
                  {pub.href && (
                    <>
                      {' '}
                      <a
                        href={pub.href}
                        target='_blank'
                        rel='noreferrer'
                        className='text-label text-neutral-500 hover:text-black'
                      >
                        DOI →
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className='mt-[12px] text-label text-neutral-500'>* equal contribution</p>
        </section>

        <section className='mt-[80px]'>
          <h2 className='text-label font-medium'>Teaching & Workshops</h2>
          <ul className='mt-[24px] max-w-[720px]'>
            {TEACHING.map((item) => (
              <li
                key={item.text}
                className='grid gap-[4px] border-t border-neutral-200 py-[12px] md:grid-cols-[160px_1fr]'
              >
                <span className='text-label font-medium text-neutral-500'>{item.term}</span>
                <span className='text-body leading-snug'>
                  {item.text}
                  {item.note && <span className='mt-[2px] block text-label text-neutral-500'>{item.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
