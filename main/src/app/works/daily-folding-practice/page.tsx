'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/projects'
import { ProjectMedia } from '../ProjectMedia'
import { projects } from '../projectlist'
import { ProjectSidebar } from '../ProjectSidebar'
import CroppedFigure from '../../../components/projects/CroppedFigure'
import { Figure } from '../../../components/projects/Figure'
import Head from 'next/head'

const imagePath = '/images/projects/daily-folding-practice/'

const sectionIds = ['process', 'archive'] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className='text-[13px] font-medium text-[#FF2D8C]'>{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='mt-[4px] max-w-[640px] text-[20px] font-semibold leading-snug text-black md:text-[22px]'>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className='text-[15px] font-semibold text-black'>{children}</h3>
}

function ImagePlaceholder({ id, file, desc }: { id: string; file: string; desc: string }) {
  return (
    <div className='my-[12px] flex aspect-video w-full flex-col items-center justify-center gap-[6px] border border-dashed border-neutral-400 bg-neutral-50 px-[16px] text-center'>
      <p className='text-[13px] font-semibold text-[#FF2D8C]'>{id}</p>
      <p className='text-[13px] text-neutral-600'>{desc}</p>
      <p className='font-mono text-[12px] text-neutral-400'>{file}</p>
    </div>
  )
}

function Chapter({
  id,
  kicker,
  title,
  children,
}: {
  id?: string
  kicker: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div
      id={id}
      className='flex scroll-mt-[110px] flex-col gap-[20px] border-t border-black pt-[40px] first:border-t-0 first:pt-0'
    >
      <div>
        <Kicker>{kicker}</Kicker>
        <SectionTitle>{title}</SectionTitle>
      </div>
      {children}
    </div>
  )
}

export default function DailyFoldingPracticePage() {
  const project = projects.find((p) => p.slug === 'daily-folding-practice')
  if (!project) notFound()

  const [activeSection, setActiveSection] = useState<string>(sectionIds[0])
  const [isNavStuck, setIsNavStuck] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel')
    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => setIsNavStuck(entry.boundingClientRect.top < 61), {
      root: null,
      rootMargin: '-61px 0px 0px 0px',
      threshold: 0,
    })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header title={project.name} accentColor='#FF2D8C' light mobileLight={isNavStuck} />
      <main className='min-h-dvh w-full pt-[60px] text-black'>
        <div className='flex w-full flex-col md:flex-row md:items-start'>
          {/* Left: full project list */}
          <ProjectSidebar activeSlug={project.slug} />

          {/* Right: project content */}
          <div className='min-w-0 flex-1 px-[22px] py-[24px] md:px-[40px] md:py-[40px]'>
            <div className='flex flex-col justify-between  md:flex-row'>
              <div>
                <Link href={`/works/${project.parent}`} className='text-[13px] text-neutral-400 hover:text-black'>
                  ← Part of TypoFold
                </Link>
                <h1 className='text-[24px] font-semibold'>{project.name}</h1>
              </div>
              <div className='flex flex-col gap-[4px] text-[16px] leading-relaxed lg:w-[60%]'>
                <p className='text-[#FF2D8C]'>
                  Collaborated with type designer Namju Ok to further develop TypoFold through a deeper understanding of
                  type design.
                </p>
                <p className='text-black'>
                  04.2026 - 05.2026 / Workshop, Computational Design, Interactive Media / Space PADO
                </p>
              </div>
            </div>

            <div className='relative mt-[16px] aspect-[3/4] w-full overflow-hidden md:aspect-video md:overflow-hidden'>
              <ProjectMedia project={project} />
            </div>

            {/* In-page section nav */}
            <div id='nav-sentinel' className='h-0' />
            <nav className='sticky top-[60px] z-10 -mx-[22px] mt-[24px] flex gap-x-[16px] overflow-x-auto border-b border-black bg-white px-[22px] py-[10px] no-scroll-bar md:-mx-[40px] md:px-[40px]'>
              {sectionIds.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`shrink-0 text-[14px] capitalize transition-colors ${
                    activeSection === id ? 'font-bold text-black' : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  {id}
                </a>
              ))}
            </nav>

            <div className='mt-[32px] flex flex-col gap-[64px] text-[15px] leading-relaxed'>
              {/* OVERVIEW */}
              <section id='process' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Process' title='About the Collaboration'>
                  <div className='grid grid-cols-1 gap-[12px] md:grid-cols-3'>
                    <Figure className='w-full' src={imagePath + 'workshop_poster.png'} />
                    <Figure className='w-full' src={imagePath + 'workshop_poster2.png'} />

                    {/* <Figure className='w-[35.65%]' src={imagePath + '16.jpg'} /> */}
                    <p>
                      I collaborated with type designer Namju Ok (@nevi_books). Together, we applied fonts that real
                      designers make and use to TypoFold. This helped me understand how fonts are built and structured,
                      and I used that understanding to improve TypoFold. We worked together for about two months. As an
                      outcome of this collaboration, we ran a free workshop for designers at Space PADO.
                    </p>
                  </div>
                </Chapter>

                <Chapter kicker='Fonts' title='Four Font Families by Namju Ok'>
                  {/* TODO: if Koshmar Italic was used, change this to "7 styles" and Koshmar below to "Regular, Italic" */}
                  <p>
                    Through this collaboration, I was fortunate to apply four of Namju's font families, 6 styles in
                    total, to TypoFold.
                  </p>
                  <dl className='grid grid-cols-[max-content_1fr] gap-x-[24px] gap-y-[4px] text-[14px]'>
                    {[
                      ['limnlimn', 'Leaves, Fresh'],
                      ['Stone', 'Heavy, Classy'],
                      ['Arbor', 'Regular'],
                      ['Koshmar', 'Regular'],
                    ].map(([family, styles]) => (
                      <div key={family} className='contents'>
                        <dt className='font-semibold'>{family}</dt>
                        <dd className='text-neutral-600'>{styles}</dd>
                      </div>
                    ))}
                  </dl>
                  <Figure src={imagePath + 'fontlists.png'} />
                  <p>
                    The four fonts all look very different, so each one needed its own kind of unfolding. I worked with
                    Namju to go through the glyphs for letters and special characters, font by font. For each glyph, we
                    recorded what type of polyhedron it would become once converted to 3D.
                  </p>
                </Chapter>

                <Chapter kicker='Terms' title='A Shared Vocabulary'>
                  <p>
                    Before describing the types of polyhedra, I want to introduce the terms used in this piece. TypoFold
                    converts 2D glyphs into 3D solids, and then unfolds them back into a flat net. Because of this, no
                    single field's vocabulary was enough to describe the whole process. With Namju's help, I learned the
                    terms used in typography design. In this piece, I describe a glyph's shape using typographic terms,
                    and I describe a polyhedron's structure using terms from GIS and computer graphics. [8]
                  </p>
                  <div className='flex flex-col'>
                    {[
                      {
                        term: 'Glyph',
                        body: (
                          <>
                            A glyph is an individual character that makes up a font. A single letter can be built from
                            two or more glyphs. Punctuation marks can also count as separate glyphs if they look
                            different, even when they serve the same function. For example, the vertical comma used in
                            vertical writing and the regular comma used in horizontal writing are treated as two
                            different glyphs. [1]
                          </>
                        ),
                      },
                      {
                        term: 'Counter',
                        image: 'counter.png',
                        body: (
                          <>
                            In type design, the white space enclosed by a stroke is called a counter. There are two
                            broad types of counters. A closed counter is fully enclosed by the stroke and is not
                            connected to the outer margin, as in A, B, D, O, P, Q, and R. An open counter connects to
                            the outer margin through a gap called an aperture, as in C, S, c, and s. [2]
                          </>
                        ),
                      },
                      {
                        term: 'Contour',
                        body: (
                          <>
                            A contour is an unbroken line made of straight and curved segments. It can be either open or
                            closed. [4] Font files store the contour data that makes up each glyph, and I used
                            opentype.js to convert this data into SVG path strings.
                          </>
                        ),
                      },
                      {
                        term: 'Exterior / Interior ring',
                        image: 'ring.png',
                        body: (
                          <>
                            Depending on the font format, contours are stored in one of two ways: TrueType (ttf) or
                            PostScript/CFF (otf). [3] Both formats store contours in drawing order, and both use winding
                            direction to decide which region to fill. TrueType draws the outer contour clockwise, while
                            CFF draws it counterclockwise. However, neither format stores which contour sits inside
                            which one. Font renderers use the nonzero rule to fill shapes based on this direction, but
                            since the two formats wind in opposite directions, I decided to determine containment by
                            position instead. To do this, I sample points evenly along each contour and use ray casting
                            to check whether each point falls inside another contour. Then I count how many layers deep
                            each contour sits. An even count means the contour is exterior, and an odd count means it is
                            interior. This follows the same logic as the even-odd fill rule. [7] Note that for fonts
                            whose contours were drawn overlapping each other, the two rules can give different results.
                          </>
                        ),
                      },
                      {
                        term: 'Polyhedron / Polyhedra',
                        body: (
                          <>
                            Converting a glyph's data to SVG and extruding it with a height value produces a 3D solid. I
                            call this solid a polyhedron. Some glyphs, such as 'i', are made of several separate solids.
                            In these cases, I use the plural form, polyhedra, and treat all the solids from a single
                            glyph as one group.
                          </>
                        ),
                      },
                    ].map(({ term, image, body }) => (
                      <div
                        key={term}
                        className='grid grid-cols-1 gap-[12px] border-t border-neutral-200 py-[24px] md:grid-cols-[1fr_2fr] md:gap-[40px]'
                      >
                        <div className='flex flex-col gap-[12px]'>
                          <SubHeading>{term}</SubHeading>
                          {image && <Figure className='w-[70%] md:w-full' src={imagePath + image} />}
                        </div>
                        <p className='text-neutral-600'>{body}</p>
                      </div>
                    ))}
                  </div>
                </Chapter>

                <Chapter kicker='Font Tree' title='Types of Polyhedra from a Glyph'>
                  <p>
                    Using these terms, I mapped out, as a tree, what kind of polyhedron a glyph becomes once it is
                    converted to 3D. The tree asks two or three questions in sequence. At each leaf, it is decided
                    whether the glyph becomes one Polyhedron or several Polyhedra, and how many exterior and interior
                    rings make up its boundary.
                  </p>
                  <Figure src={imagePath + 'Font Tree.png'} />
                  <div className='flex flex-col gap-[24px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>1. How many connected components?</SubHeading>
                      <p className='text-neutral-600'>
                        The first question is how many separate components make up the glyph. A glyph with a single
                        component, like 'I' or 'O', becomes one Polyhedron. A glyph like 'i', where the body and the dot
                        are separate, becomes several Polyhedra. Even the same letter 'i' can become one Polyhedron or
                        several Polyhedra, depending on how the font draws it. When a glyph has several Polyhedra, the
                        net splits into that many separate pieces.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>2. Any Closed Counters?</SubHeading>
                      <p className='text-neutral-600'>
                        The second question is whether the glyph has any closed counters. A glyph with no closed
                        counters has its boundary defined by the exterior ring alone. A glyph with closed counters gets
                        one interior ring for each counter. For example, 'O' is a Polyhedron with one exterior ring and
                        one interior ring, and 'B' has one exterior ring and two interior rings.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>3. Any Nested Exterior Rings?</SubHeading>
                      <p className='text-neutral-600'>
                        When a glyph has several components and a closed counter, I check whether another component sits
                        inside the hole. This kind of component is called an exterior ring at depth 2. Even though it
                        looks like a single shape from the outside, it is not connected to the outer component. Because
                        of this, it becomes a separate Polyhedron. Arbor's '0' is a good example. It is made of three
                        Polyhedra: the outer ring, the center dot, and the top bar. Here, the center dot is the nested
                        exterior ring.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Edge case: Pinch point</SubHeading>
                      <p className='text-neutral-600'>
                        Some glyphs have a contour that touches another contour, or touches itself, at a single point. I
                        first noticed this in the horse-shaped dingbat in Stone Heavy and Classy. However, once I
                        checked every glyph across all four fonts, I found that this was more common than I expected.
                        There were three ways this contact could happen.
                      </p>
                      <ul className='flex flex-col gap-[2px] pl-[16px] text-neutral-600'>
                        <li>(a) A contour touching itself: Stone's horse</li>
                        <li>(b) Two different exterior rings touching: limnlimn i, l, y</li>
                        <li>(c) An exterior ring touching an interior ring: limnlimn k</li>
                      </ul>
                      <p className='text-neutral-600'>
                        Whether this kind of contact is allowed in a 2D polygon depends on the data model. OGC Simple
                        Features allows two different rings to touch at a point, but it does not allow a ring to touch
                        itself. [5] Esri's model, on the other hand, allows a ring to touch itself too. [6] Either way,
                        once the shape is extruded, that point becomes a non-manifold edge shared by four side faces.
                        [9] I call these points pinch points, and I cut the connection they create. However, cutting the
                        connection does not always split the net into two pieces. For Stone's horse and limnlimn i, the
                        letterform is divided into two faces on either side of the contact point, so cutting the
                        connection produces two Polyhedra. limnlimn k is different. Its counter touches the outer
                        contour, but the letterform itself stays in one piece, so I treat it as a single Polyhedron. In
                        this case, cutting the connection only keeps the outer wall and the counter wall from mixing
                        together.
                      </p>
                      {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure
                      <ImagePlaceholder
                        id='IMG-2'
                        file='pinch_types.png'
                        desc="(a) Stone's horse / (b) limnlimn i / (c) limnlimn k 2D contours, contact point circled in pink"
                      /> */}
                      <Figure src={imagePath + 'pinch_types.jpg'} />
                      {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                      {/* <ImagePlaceholder
                        id='IMG-3'
                        file='pinch_3d.png'
                        desc="Stone's horse in 3D, a close-up of the contact point where four side faces share one vertical edge"
                      /> */}
                      <Figure src={imagePath + 'pinch_3d.jpg'} />
                    </div>
                  </div>
                </Chapter>

                <Chapter kicker='Technical Challenge' title='Choosing a Spanning Tree for Unfolding'>
                  <p>
                    Earlier I classified glyph types by their number of connected components and their number of
                    exterior and interior rings. Now I want to explain how I designed the unfolding for each type.
                  </p>
                  <div className='flex flex-col gap-[8px] border border-neutral-300 p-[16px] text-[14px]'>
                    <dl className='flex flex-col gap-[8px] text-neutral-600'>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://en.wikipedia.org/wiki/Dual_graph'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            Dual graph
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          A graph with one vertex for each face of a planar graph G. An edge connects two faces that
                          share an edge. Here, each face of the solid's surface becomes a point, and faces that share an
                          edge are connected by a line.
                        </dd>
                      </div>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://en.wikipedia.org/wiki/Spanning_tree'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            Spanning tree
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          A spanning subgraph is a subgraph that includes every vertex. A spanning tree is a spanning
                          subgraph that is also a tree, meaning it has no cycles but still connects every vertex. In the
                          net, the edges that are kept become fold lines, and the edges that are removed become cut
                          lines.
                        </dd>
                      </div>
                      <div>
                        <dt className='inline font-semibold text-black'>
                          <a
                            href='https://en.wikipedia.org/wiki/Chordal_graph'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underline'
                          >
                            Chord
                          </a>{' '}
                        </dt>
                        <dd className='inline'>
                          An edge that connects two vertices on a cycle without itself being part of that cycle.
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className='flex flex-col gap-[32px]'>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Step 1. Unfolding the side faces: choosing which edges to cut</SubHeading>
                      <p className='text-neutral-600'>
                        To flatten a solid, you need to decide which edges to cut and which edges to fold. To handle
                        this with computation, I split the solid's surface into flat faces and build a dual graph G =
                        (V, E). Here, V is the set of faces, and E is the set of face pairs that share an edge. An
                        edge's weight w(e) is the length of the shared edge. There are several ways to produce a net,
                        such as star unfolding, source unfolding, and cut locus unfolding. However, this piece only
                        covers edge unfolding, which cuts strictly along the edges of the solid.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[20px]'>
                        <svg
                          viewBox='0 0 460 215'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='The dual graph of an extruded ring-shaped glyph: side faces become points, adjacency becomes lines'
                        >
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <circle cx='110' cy='120' r='76' />
                            <circle cx='110' cy='120' r='40' />
                            <line x1='110.0' y1='80.0' x2='110.0' y2='44.0' />
                            <line x1='125.3' y1='83.0' x2='139.1' y2='49.8' />
                            <line x1='138.3' y1='91.7' x2='163.7' y2='66.3' />
                            <line x1='147.0' y1='104.7' x2='180.2' y2='90.9' />
                            <line x1='150.0' y1='120.0' x2='186.0' y2='120.0' />
                            <line x1='147.0' y1='135.3' x2='180.2' y2='149.1' />
                            <line x1='138.3' y1='148.3' x2='163.7' y2='173.7' />
                            <line x1='125.3' y1='157.0' x2='139.1' y2='190.2' />
                            <line x1='110.0' y1='160.0' x2='110.0' y2='196.0' />
                            <line x1='94.7' y1='157.0' x2='80.9' y2='190.2' />
                            <line x1='81.7' y1='148.3' x2='56.3' y2='173.7' />
                            <line x1='73.0' y1='135.3' x2='39.8' y2='149.1' />
                            <line x1='70.0' y1='120.0' x2='34.0' y2='120.0' />
                            <line x1='73.0' y1='104.7' x2='39.8' y2='90.9' />
                            <line x1='81.7' y1='91.7' x2='56.3' y2='66.3' />
                            <line x1='94.7' y1='83.0' x2='80.9' y2='49.8' />
                          </g>
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <line x1='350.0' y1='62.0' x2='372.2' y2='66.4' />
                            <line x1='372.2' y1='66.4' x2='391.0' y2='79.0' />
                            <line x1='391.0' y1='79.0' x2='403.6' y2='97.8' />
                            <line x1='403.6' y1='97.8' x2='408.0' y2='120.0' />
                            <line x1='408.0' y1='120.0' x2='403.6' y2='142.2' />
                            <line x1='403.6' y1='142.2' x2='391.0' y2='161.0' />
                            <line x1='391.0' y1='161.0' x2='372.2' y2='173.6' />
                            <line x1='372.2' y1='173.6' x2='350.0' y2='178.0' />
                            <line x1='350.0' y1='178.0' x2='327.8' y2='173.6' />
                            <line x1='327.8' y1='173.6' x2='309.0' y2='161.0' />
                            <line x1='309.0' y1='161.0' x2='296.4' y2='142.2' />
                            <line x1='296.4' y1='142.2' x2='292.0' y2='120.0' />
                            <line x1='292.0' y1='120.0' x2='296.4' y2='97.8' />
                            <line x1='296.4' y1='97.8' x2='309.0' y2='79.0' />
                            <line x1='309.0' y1='79.0' x2='327.8' y2='66.4' />
                            <line x1='327.8' y1='66.4' x2='350.0' y2='62.0' />
                          </g>
                          <g>
                            <circle cx='350.0' cy='62.0' r='4' fill='currentColor' />
                            <circle cx='372.2' cy='66.4' r='4' fill='currentColor' />
                            <circle cx='391.0' cy='79.0' r='4' fill='currentColor' />
                            <circle cx='403.6' cy='97.8' r='4' fill='currentColor' />
                            <circle cx='408.0' cy='120.0' r='4' fill='currentColor' />
                            <circle cx='403.6' cy='142.2' r='4' fill='currentColor' />
                            <circle cx='391.0' cy='161.0' r='4' fill='currentColor' />
                            <circle cx='372.2' cy='173.6' r='4' fill='currentColor' />
                            <circle cx='350.0' cy='178.0' r='4' fill='currentColor' />
                            <circle cx='327.8' cy='173.6' r='4' fill='currentColor' />
                            <circle cx='309.0' cy='161.0' r='4' fill='currentColor' />
                            <circle cx='296.4' cy='142.2' r='4' fill='currentColor' />
                            <circle cx='292.0' cy='120.0' r='4' fill='currentColor' />
                            <circle cx='296.4' cy='97.8' r='4' fill='currentColor' />
                            <circle cx='309.0' cy='79.0' r='4' fill='currentColor' />
                            <circle cx='327.8' cy='66.4' r='4' fill='currentColor' />
                          </g>
                          <g fill='currentColor' stroke='none' fontSize='11'>
                            <text x='110' y='208' textAnchor='middle'>
                              Side faces
                            </text>
                            <text x='350' y='208' textAnchor='middle'>
                              Dual graph
                            </text>
                            <text x='230' y='116' textAnchor='middle'>
                              ⟶
                            </text>
                            <text x='230' y='136' textAnchor='middle' fontSize='10'>
                              face = point
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          Each side face becomes a point, and adjacent faces are connected by a line.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        An edge unfolding is the same as choosing one spanning tree T from this dual graph G. Every
                        face, except the root, rotates flat around the edge it shares with its parent in T. A different
                        T produces a different layout, and it also changes the chance of overlap. In other words, the
                        question of how to unfold a solid is the same as the question of which spanning tree to choose.
                      </p>
                      <p className='text-neutral-600'>
                        For glyphs without a pinch point, this choice was never a problem. Each side face only has two
                        neighbors, the ones directly before and after it. Because of this, the graph made only from side
                        faces is simply a collection of cycles. With one exterior ring and one interior ring, you get
                        two side-face strips. A cycle's spanning tree is just the cycle with one edge removed. No matter
                        which edge is removed, the result is always a single strip. Only the position of the cut
                        changes, and the strip never overlaps itself.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>Where the overlap came from</SubHeading>
                      <p className='text-neutral-600'>
                        The problem appeared in glyphs with a pinch point. At this point, four side faces share a single
                        vertical edge. As a result, two faces that would normally be reached only by going most of the
                        way around the contour suddenly become direct neighbors. In graph terms, this creates a chord
                        across the cycle. The faces meeting at that point each gain one extra neighbor, so their degree
                        increases to 3.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <svg
                          viewBox='0 0 460 230'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='A chord across a cycle graph turning two distant faces into neighbors'
                        >
                          <g fill='none' stroke='currentColor' strokeWidth='1.5'>
                            <line x1='150.0' y1='40.0' x2='170.7' y2='42.7' />
                            <line x1='170.7' y1='42.7' x2='190.0' y2='50.7' />
                            <line x1='190.0' y1='50.7' x2='206.6' y2='63.4' />
                            <line x1='206.6' y1='63.4' x2='219.3' y2='80.0' />
                            <line x1='219.3' y1='80.0' x2='227.3' y2='99.3' />
                            <line x1='227.3' y1='99.3' x2='230.0' y2='120.0' />
                            <line x1='230.0' y1='120.0' x2='227.3' y2='140.7' />
                            <line x1='227.3' y1='140.7' x2='219.3' y2='160.0' />
                            <line x1='219.3' y1='160.0' x2='206.6' y2='176.6' />
                            <line x1='206.6' y1='176.6' x2='190.0' y2='189.3' />
                            <line x1='190.0' y1='189.3' x2='170.7' y2='197.3' />
                            <line x1='170.7' y1='197.3' x2='150.0' y2='200.0' />
                            <line x1='150.0' y1='200.0' x2='129.3' y2='197.3' />
                            <line x1='129.3' y1='197.3' x2='110.0' y2='189.3' />
                            <line x1='110.0' y1='189.3' x2='93.4' y2='176.6' />
                            <line x1='93.4' y1='176.6' x2='80.7' y2='160.0' />
                            <line x1='80.7' y1='160.0' x2='72.7' y2='140.7' />
                            <line x1='72.7' y1='140.7' x2='70.0' y2='120.0' />
                            <line x1='70.0' y1='120.0' x2='72.7' y2='99.3' />
                            <line x1='72.7' y1='99.3' x2='80.7' y2='80.0' />
                            <line x1='80.7' y1='80.0' x2='93.4' y2='63.4' />
                            <line x1='93.4' y1='63.4' x2='110.0' y2='50.7' />
                            <line x1='110.0' y1='50.7' x2='129.3' y2='42.7' />
                            <line x1='129.3' y1='42.7' x2='150.0' y2='40.0' />
                          </g>
                          <g>
                            <circle cx='150.0' cy='40.0' r='3.5' fill='currentColor' />
                            <circle cx='170.7' cy='42.7' r='3.5' fill='currentColor' />
                            <circle cx='190.0' cy='50.7' r='3.5' fill='currentColor' />
                            <circle cx='206.6' cy='63.4' r='3.5' fill='currentColor' />
                            <circle cx='219.3' cy='80.0' r='3.5' fill='currentColor' />
                            <circle cx='227.3' cy='99.3' r='3.5' fill='currentColor' />
                            <circle cx='230.0' cy='120.0' r='3.5' fill='currentColor' />
                            <circle cx='227.3' cy='140.7' r='3.5' fill='currentColor' />
                            <circle cx='219.3' cy='160.0' r='3.5' fill='currentColor' />
                            <circle cx='206.6' cy='176.6' r='3.5' fill='currentColor' />
                            <circle cx='190.0' cy='189.3' r='3.5' fill='currentColor' />
                            <circle cx='170.7' cy='197.3' r='3.5' fill='currentColor' />
                            <circle cx='150.0' cy='200.0' r='3.5' fill='currentColor' />
                            <circle cx='129.3' cy='197.3' r='3.5' fill='currentColor' />
                            <circle cx='110.0' cy='189.3' r='3.5' fill='currentColor' />
                            <circle cx='93.4' cy='176.6' r='3.5' fill='currentColor' />
                            <circle cx='80.7' cy='160.0' r='3.5' fill='currentColor' />
                            <circle cx='72.7' cy='140.7' r='3.5' fill='currentColor' />
                            <circle cx='70.0' cy='120.0' r='3.5' fill='currentColor' />
                            <circle cx='72.7' cy='99.3' r='3.5' fill='currentColor' />
                            <circle cx='80.7' cy='80.0' r='3.5' fill='currentColor' />
                            <circle cx='93.4' cy='63.4' r='3.5' fill='currentColor' />
                            <circle cx='110.0' cy='50.7' r='3.5' fill='currentColor' />
                            <circle cx='129.3' cy='42.7' r='3.5' fill='currentColor' />
                          </g>
                          <line x1='227.3' y1='99.3' x2='93.4' y2='176.6' stroke='#FF2D8C' strokeWidth='2' />
                          <circle cx='227.3' cy='99.3' r='5.5' fill='#FF2D8C' />
                          <circle cx='93.4' cy='176.6' r='5.5' fill='#FF2D8C' />
                          <g fill='currentColor' stroke='none' fontSize='11'>
                            <text x='150' y='28' textAnchor='middle'>
                              Face 0 (start)
                            </text>
                            <text x='239.3' y='103.3'>
                              Face 5
                            </text>
                            <text x='81.4' y='180.6' textAnchor='end'>
                              Face 15
                            </text>
                            <text x='150' y='222' textAnchor='middle'>
                              The cycle around the contour, plus the chord created by the pinch point
                            </text>
                          </g>
                          <g fill='#FF2D8C' stroke='none' fontSize='11'>
                            <text x='300' y='96'>
                              10 steps around the cycle,
                            </text>
                            <text x='300' y='114'>
                              1 step with the chord.
                            </text>
                            <text x='300' y='132'>
                              BFS will always
                            </text>
                            <text x='300' y='150'>
                              take this shortcut.
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          A chord connects two faces that are far apart on the contour, giving them a graph distance of
                          1. At an actual pinch point, all four side faces connect to each other. Here, though, this is
                          simplified to a single chord.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        The key point here is that BFS does not choose this shortcut because it prefers to. It simply
                        has no other choice. TypoFold builds its spanning tree using BFS, or breadth-first search. This
                        method attaches the faces closest to the start face first, so every face ends up connected to
                        the start by the fewest possible steps. Let's look at a case with 24 faces, where face 0 is the
                        start and a chord links face 5 and face 15.
                      </p>
                      <table className='w-full max-w-[420px] text-[14px]'>
                        <tbody>
                          <tr className='border-b border-neutral-200'>
                            <td className='py-[6px] pr-[16px] text-neutral-600'>
                              Distance to face 15 without the chord
                            </td>
                            <td className='py-[6px]'>min(15, 24 − 15) = 9</td>
                          </tr>
                          <tr className='border-b border-neutral-200'>
                            <td className='py-[6px] pr-[16px] text-neutral-600'>With the chord</td>
                            <td className='py-[6px]'>d(5) + 1 = 6</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className='text-neutral-600'>
                        Since 6 is less than 9, the chord lies on the shortest path. By definition, BFS produces a
                        shortest-path tree, so it cannot avoid using this chord. The moment the chord is used as a fold
                        axis, though, the layout breaks. When a strip is unfolded in a single line, each face's position
                        is set by its cumulative width along the contour. This means that face 15 ends up in the slot
                        that should belong to face 6, which is the face right after face 5 on the contour. Face 15's
                        subtree then keeps unfolding in that direction. At the same time, the subtree that continues
                        from face 6 demands the same slot. As a result, the two subtrees overlap.
                      </p>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                      <SubHeading>The fix: removing the chord</SubHeading>
                      <p className='text-neutral-600'>
                        I considered weighting the edges by the length of the shared edge. However, in a solid extruded
                        to a uniform height, every edge shared between side faces has the same thickness, so this
                        weighting did not help at all. Instead, I left BFS as it was. I simply removed the problem
                        connection from the graph before the search even began.
                      </p>
                      <p className='text-neutral-600'>
                        When a contour touches itself at a point p, the four side faces that meet there share the same
                        vertical edge. As a result, they are all treated as neighbors of one another. This false
                        connection binds together side walls that should actually unfold separately.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <svg
                          viewBox='0 0 460 230'
                          className='w-full max-w-[560px] text-black'
                          role='img'
                          aria-label='A comparison of how reconnecting at the pinch point leaves the cycle whole or splits it in two'
                        >
                          <g>
                            <circle cx='112' cy='66' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                            <circle cx='112' cy='142' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                          </g>
                          <g stroke='#FF2D8C' strokeWidth='2'>
                            <line x1='101' y1='93' x2='123' y2='115' />
                            <line x1='123' y1='93' x2='101' y2='115' />
                          </g>
                          <g>
                            <circle cx='336' cy='66' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                            <circle cx='336' cy='158' r='38' fill='none' stroke='currentColor' strokeWidth='2' />
                          </g>
                          <g fill='currentColor' stroke='none' fontSize='11' textAnchor='middle'>
                            <text x='112' y='205'>
                              Reconnect in contour order
                            </text>
                            <text x='112' y='221'>
                              One cycle, one net
                            </text>
                            <text x='336' y='210'>
                              Reconnect within the same component
                            </text>
                            <text x='336' y='223'>
                              Two cycles, two nets
                            </text>
                          </g>
                          <g fill='#FF2D8C' stroke='none' fontSize='10' textAnchor='middle'>
                            <text x='112' y='134'>
                              Crosses at the pinch point
                            </text>
                            <text x='336' y='115'>
                              Connection cut
                            </text>
                          </g>
                        </svg>
                        <figcaption className='text-[13px] text-neutral-500'>
                          The outcome depends on how the four side faces meeting at the pinch point are reconnected. If
                          they are reconnected following contour order, they stay as a single component, just as before.
                          If only the side faces that belong to the same component are reconnected, they split into two
                          components instead.
                        </figcaption>
                      </figure>
                      <p className='text-neutral-600'>
                        So which of the four side faces at p were originally connected to each other? The clue lies in
                        the top and bottom faces. At p, the top faces only touch at a single vertex. Since TypoFold only
                        treats two faces as neighbors when they share an edge, meaning they share at least two vertices,
                        the top face never uses p as a connection point. Because of this, I can temporarily remove the
                        four side faces at p from the graph and compute the connected components. This reveals, through
                        the top face, which component each side face originally belonged to. I then check which
                        component each of the four side faces is attached to. I reconnect only the pairs that belong to
                        the same component, and I cut the rest.
                      </p>
                      <p className='text-neutral-600'>
                        At first, I tried pairing side faces that were simply close to each other, but this approach
                        failed. Near a pinch point, physical closeness does not tell you which component a face belongs
                        to. Relying on the top and bottom faces, which were already correctly split, turned out to be
                        the more stable approach.
                      </p>
                      {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                      {/* <ImagePlaceholder
                        id='IMG-5'
                        file='pinch_cap_split.jpg'
                        desc="Stone's horse seen from above, the two pieces of the top face in different colors, with p marked"
                      /> */}
                      <Figure
                        className='h-[260px] my-4 w-auto object-contain'
                        src={imagePath + 'pinch_cap_split.jpg'}
                      />
                      <p className='text-neutral-600'>
                        The outcome falls into two cases, depending on the shape of the top face. For glyphs like
                        Stone's horse or limnlimn i, the top face splits into two pieces at p. In these cases, the graph
                        also splits into two components, which gives two separate nets. These two nets are folded
                        individually and then glued together. For glyphs like limnlimn k, the counter touches the outer
                        contour, but the top face stays in one piece. In this case, the net also stays as a single
                        piece. However, the outer wall and the counter wall still separate from each other at this
                        point. So the counter wall is dropped from the net under the same rule used in Step 3, and it
                        unfolds in the same way 'O' does.
                      </p>
                      <figure className='my-[12px] flex flex-col gap-[8px]'>
                        <div className='grid grid-cols-1 gap-[12px] sm:grid-cols-2'>
                          <div className='flex flex-col items-center gap-[6px] '>
                            {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                            {/* <ImagePlaceholder
                              id='IMG-4'
                              file='pinch_overlap_before.png'
                              desc="Stone's horse net before cutting the chord, the two overlapping subtrees shown in translucent color"
                            /> */}
                            <Figure
                              src={imagePath + 'pinch_overlap_before.jpg'}
                              className='h-[260px] w-auto object-contain'
                            />
                            <p className='text-center text-[13px] text-neutral-500'>
                              Before cutting the chord. Two subtrees claim the same slot and overlap.
                            </p>
                          </div>
                          <div className='flex flex-col items-center gap-[6px]'>
                            {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                            {/* <ImagePlaceholder
                              id='IMG-6'
                              file='pinch_overlap_after.png'
                              desc='Two separated nets for the same glyph as IMG-4'
                            /> */}
                            <Figure
                              src={imagePath + 'pinch_overlap_after.jpg'}
                              className='h-[260px] w-auto object-contain'
                            />
                            <p className='text-center text-[13px] text-neutral-500'>
                              After cutting the chord. Split into two components, unfolding without overlap.
                            </p>
                          </div>
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 2. Where to attach the top and bottom faces</SubHeading>
                    <p className='text-neutral-600'>
                      Once the entire side-face strip is unfolded, the top and bottom faces remain. These two faces
                      touch the whole perimeter of side faces, so there are as many possible fold edges as there are
                      side faces in the strip. Unlike the side faces, which only ever had one neighbor in front and one
                      behind, here there are a lot of options.
                    </p>
                    <p className='text-neutral-600'>
                      Which side face it is attached to determines where the top and bottom face rotate into place. For
                      glyphs with a concave outline, an arbitrary choice can swing the face right over the strip that is
                      already unfolded, causing an overlap.
                    </p>
                    <p className='text-neutral-600'>
                      So, for this step, I measured the overlap area directly, using bounding boxes. For each candidate
                      side face, I calculate the smallest rectangle that would enclose the top face if it were unfolded
                      along that axis. I then compare this rectangle with the rectangle that encloses the whole strip
                      that has already been unfolded, and I choose whichever candidate produces the smallest overlap
                      area. With the side faces, the indirect method of using edge length did not work. Here, though, I
                      am measuring the exact quantity I care about, so this method stays reliable no matter how many
                      candidates there are.
                    </p>
                    <p className='text-neutral-600'>
                      This comparison is only an approximation, though. It compares bounding rectangles rather than each
                      face's actual shape. Because of this, a long, winding strip can make the rectangle much larger
                      than the strip itself. As a result, an empty space can sometimes be misjudged as overlapping. In
                      addition, the bottom face is chosen without knowing where the top face has already landed, so the
                      two faces can still end up overlapping each other. When every candidate overlaps, I simply choose
                      whichever one produces the smallest overlap.
                    </p>
                    <figure className='my-[12px] flex flex-col gap-[8px]'>
                      <div className='grid grid-cols-1 gap-[12px] sm:grid-cols-2'>
                        <div className='flex flex-col items-center gap-[6px]'>
                          {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                          {/* <ImagePlaceholder
                            id='IMG-8'
                            file='cap_hinge_before.png'
                            desc='A concave glyph, the top face attached at an arbitrary side face swinging over the strip. The whole-strip bounding box dashed'
                          /> */}
                          <Figure
                            src={imagePath + 'cap_hinge_before.jpg'}
                            className='h-[260px] w-auto object-contain'
                          />
                          <p className='text-center text-[13px] text-neutral-500'>
                            Attached to an arbitrary side face. The top face swings over the already-unfolded strip and
                            overlaps it.
                          </p>
                        </div>
                        <div className='flex flex-col items-center gap-[6px]'>
                          {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                          {/* <ImagePlaceholder
                            id='IMG-8b'
                            file='cap_hinge_after.png'
                            desc='The same glyph, the top face attached at the least-overlapping side face. Compared against the same dashed bounding box'
                          /> */}
                          <Figure src={imagePath + 'cap_hinge_after.jpg'} className='h-[260px] w-auto object-contain' />
                          <p className='text-center text-[13px] text-neutral-500'>
                            Attached to the least-overlapping side face. It lands in a spot that does not overlap the
                            strip.
                          </p>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 3. Excluding the inner wall of a hole</SubHeading>
                    <p className='text-neutral-600'>
                      Glyphs with holes have their side faces split into several cycles. 'O' has one cycle running
                      around the outer contour and one cycle running around the inside of the hole. 'B' has two holes,
                      so it has three cycles in total. Only the cycle that forms the outer wall is unfolded into the
                      net. The inner wall of the hole is removed from the net only, not from the 3D model.
                    </p>
                    <p className='text-neutral-600'>
                      The problem is that nothing at the 3D stage records which cycle is the outer wall. At the 2D
                      stage, I distinguished exterior from interior based on which contour contained which. However,
                      this information is not carried over when several contours are merged into one 3D solid. Because
                      of this, I currently treat whichever cycle has the most side faces as the outer wall. This is
                      based on the assumption that a longer outer contour will also have more faces than the hole.
                    </p>
                    <p className='text-neutral-600'>
                      However, this assumption does not hold. The number of side faces depends more on how finely a
                      curve is subdivided into segments than on how long the contour actually is. Point density varies a
                      lot from font to font. Built in the same way, Stone's 'O' has only 16 side faces, while Arbor's
                      'G' has 517. Even within a single letter, if the hole's curve is subdivided more finely than the
                      outer contour, the hole wall can be mistakenly chosen as the outer wall. The most reliable fix is
                      to compare each cycle's footprint on the XZ plane, using its bounding-box area, and then choose
                      whichever cycle is largest as the outer wall. This measure does not depend on how finely the curve
                      was subdivided at all.
                    </p>
                    {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                    {/* <ImagePlaceholder
                      id='IMG-9'
                      file='inner_wall.png'
                      desc="'O' or 'B' folded, shown as a real object or in 3D, with no inner wall around the counter"
                    /> */}
                    <Figure src={imagePath + 'inner_wall.jpg'} />
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Step 4. Stacking multiple components vertically</SubHeading>
                    <p className='text-neutral-600'>
                      Each component gets its own reference face and its own net. I then measure each net's fully
                      unfolded size and stack them vertically so that none of them overlap.
                    </p>
                    {/* TODO: once the image is ready, remove the ImagePlaceholder below and uncomment the Figure */}
                    {/* <ImagePlaceholder
                      id='IMG-10'
                      file='islands_stack.png'
                      desc="Arbor's '0', three nets (the ring, the dot, and the bar) stacked vertically"
                    /> */}
                    <Figure src={imagePath + 'islands_stack.jpg'} />
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Nets by type</SubHeading>
                    <div className='overflow-x-auto'>
                      <table className='w-full min-w-[520px] text-left text-[14px]'>
                        <thead>
                          <tr className='border-b border-black text-black'>
                            <th className='py-[6px] pr-[16px] font-semibold'>Type</th>
                            <th className='py-[6px] pr-[16px] font-semibold'>Examples</th>
                            <th className='py-[6px] font-semibold'>Net</th>
                          </tr>
                        </thead>
                        <tbody className='align-top text-neutral-600'>
                          {[
                            [
                              'A. Simple',
                              'I, L',
                              'The side faces unfold into a single strip, with the top and bottom faces each attached at one spot.',
                            ],
                            [
                              'B. n holes',
                              'O, B',
                              'The side faces split into 1 + (number of holes) cycles. Only the largest cycle is unfolded, and the hole walls are excluded. The top and bottom faces unfold still showing their holes.',
                            ],
                            [
                              'C. Multiple components',
                              'i, ㅃ',
                              'Each component gets its own independent net, and the nets are stacked vertically.',
                            ],
                            ['D. An island inside a hole', 'Arbor “0”', 'Same as C. Each component gets its own net.'],
                            [
                              'E. Pinch',
                              'Stone’s horse, limnlimn k',
                              "The false connection created at the contact point is cut first. If the top face also splits, as with Stone's horse, the glyph is treated as two components, the same as type C. If the top face stays whole, as with limnlimn k, it stays a single net, the same as type B.",
                            ],
                          ].map(([type, example, result]) => (
                            <tr key={type} className='border-b border-neutral-200'>
                              <td className='py-[8px] pr-[16px] font-semibold text-black'>{type}</td>
                              <td className='py-[8px] pr-[16px]'>{example}</td>
                              <td className='py-[8px]'>{result}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <SubHeading>Overlap</SubHeading>
                    <p className='text-neutral-600'>
                      Choosing a cutting tree that never overlaps is, in general, a difficult problem. It is still not
                      known whether a non-overlapping edge unfolding always exists for convex polyhedra. This is known
                      as Dürer's conjecture, and it remains unsolved. [10] For non-convex polyhedra, there are known
                      examples where overlap cannot be avoided, no matter how the edges are cut. [11] Because of this,
                      instead of simulating spanning trees directly, I check for overlap on the glyph itself. Going
                      forward, I would like to generalize this approach, so that nets can also be generated for 3D
                      solids beyond simple prisms.
                    </p>
                  </div>
                </Chapter>

                <div className='flex flex-col gap-[8px] border-t border-black pt-[24px]'>
                  <p className='text-[13px] font-medium text-[#FF2D8C]'>References</p>
                  <ol className='flex flex-col gap-[2px] text-[13px] text-neutral-500'>
                    {[
                      ['Typography Dictionary — Glyph', 'https://typography-dictionary.kr/terms/glyph'],
                      ['Wikipedia — Counter (typography)', 'https://en.wikipedia.org/wiki/Counter_(typography)'],
                      [
                        'Microsoft — OpenType spec, glyf table',
                        'https://learn.microsoft.com/en-us/typography/opentype/spec/glyf',
                      ],
                      ['FontForge — More on glyphs', 'https://fontforge.org/docs/tutorial/editexample2.html'],
                      ['OGC — Simple Feature Access, Part 1', 'https://www.ogc.org/standard/sfa/'],
                      [
                        'Esri — ArcSDE 10.0 SDK, Geometry types',
                        'https://help.arcgis.com/en/geodatabase/10.0/sdk/arcsde/concepts/geometry/shapes/types.htm',
                      ],
                      ['Wikipedia — Even–odd rule', 'https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule'],
                      ['OGC — CityGML 3.0 Conceptual Model (ISO 19107)', 'https://docs.ogc.org/is/20-010/20-010.html'],
                      ['MeshLib — Non-Manifold vs. Manifold Mesh', 'https://meshlib.io/blog/non-manifold-meshes/'],
                      [
                        'Open Problem Garden — Dürer’s Conjecture',
                        'https://www.openproblemgarden.org/op/d_urers_conjecture',
                      ],
                      [
                        'Bern, Demaine, Eppstein, Kuo, Mantler, Snoeyink — Ununfoldable Polyhedra with Convex Faces (2003)',
                        'https://erikdemaine.org/papers/Ununfoldable/',
                      ],
                    ].map(([label, href], i) => (
                      <li key={href}>
                        [{i + 1}]{' '}
                        <a href={href} target='_blank' rel='noopener noreferrer' className='underline hover:text-black'>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id='archive' className='flex scroll-mt-[110px] flex-col gap-[56px] lg:w-full'>
                <Chapter kicker='Archive' title='Installation views'>
                  <div className='flex flex-wrap gap-[12px]'>
                    <Figure src={imagePath + '01.jpg'} />
                    <div className='grid grid-cols-1 gap-[12px] md:grid-cols-2'>
                      <Figure src={imagePath + '02.jpg'} />
                      <Figure src={imagePath + '03.jpg'} />
                      <Figure src={imagePath + '04.jpg'} />
                      <Figure src={imagePath + '05.jpg'} />
                    </div>
                    <Figure src={imagePath + '06.jpg'} />
                    <div className='grid grid-cols-1 gap-[12px] overflow-hidden md:grid-cols-2'>
                      <Figure src={imagePath + '07.jpg'} />
                      <div className='grid grid-rows-2 h-full'>
                        <Figure src={imagePath + '08.jpg'} />
                        <Figure src={imagePath + '09.jpg'} />
                      </div>
                      <Figure src={imagePath + '10.jpg'} />
                      <Figure src={imagePath + '11.jpg'} />
                    </div>
                    <Figure src={imagePath + '12.jpg'} />

                    <div className='flex gap-[12px] w-full overflow-hidden'>
                      <Figure className='w-[35.65%]' src={imagePath + '13.jpg'} />
                      <Figure className='w-[64.35%]' src={imagePath + '14.jpg'} />
                    </div>
                    <Figure src={imagePath + '15.jpg'} />
                  </div>
                </Chapter>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
