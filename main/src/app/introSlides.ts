// Slides shown on the main page (src/app/page.tsx). slide.src is also reused as the
// project thumbnail on the programmer page so both stay in sync.
// projectSlug should match a `slug` in src/app/works/projectlist.ts — clicking the
// centered title (md and up) sends you to that project's dedicated page at /works/[slug].
// color drives the Identity 01-04 text in the header and the active footer thumbnail border.
export type Slide = {
  id: string
  title: string
  src: string
  projectSlug: string
  color: string
  vimeoUrl?: string
  // shrink the video inside the viewport (1 = full-bleed) and fill the margin with videoBg
  videoScale?: number
  videoBg?: string
}

export const slides: Slide[] = [
  {
    id: 'intro-1',
    title: 'TypoFold',
    src: '/images/intro/intro22.jpg',
    projectSlug: 'typofold',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1220276808?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-2',
    title: 'Daily Folding Practice',
    src: '/images/intro/intro7.jpg',
    projectSlug: 'daily-folding-practice',
    color: '#2DFFA0',
  },
  {
    id: 'intro-3',
    title: 'Weaving Letters',
    src: '/images/intro/intro4.jpg',
    projectSlug: 'weaving-letters',
    color: '#B02DFF',
  },
  {
    id: 'intro-4',
    title: '2026 Samsung Design Membership',
    src: '/images/intro/intro8.jpg',
    projectSlug: 'samsung-design-membership-2026',
    color: '#FF7A2D',
    vimeoUrl:
      'https://player.vimeo.com/video/1216876134?h=b5132f6bf0&autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-5',
    title: 'XR Science Museum',
    src: '/images/intro/intro11.jpg',
    projectSlug: 'xr-science-museum',
    color: '#FF2D8C',
  },
  {
    id: 'intro-6',
    title: '2025 Samsung Design Membership',
    src: '/images/intro/intro9.jpg',
    projectSlug: 'samsung-design-membership-2025',
    color: '#2DFFA0',
    vimeoUrl:
      'https://player.vimeo.com/video/1151368571?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-7',
    title: 'Ganpan (간판)',
    src: '/images/intro/intro10.jpg',
    projectSlug: 'ganpan',
    color: '#B02DFF',
  },
  {
    id: 'intro-8',
    title: 'Franklin',
    src: '/images/intro/intro12.jpg',
    projectSlug: 'franklin',
    color: '#FF7A2D',
  },
  {
    id: 'intro-9',
    title: 'Naver Software Education Festival 2023',
    src: '/images/intro/intro17.jpg',
    projectSlug: 'sef-2023',
    color: '#FF2D8C',
  },
  {
    id: 'intro-10',
    title: 'Word Wide Web',
    src: '/images/intro/intro13.jpg',
    projectSlug: 'word-wide-web',
    color: '#2DFFA0',
  },
  {
    id: 'intro-14',
    title: 'Memeproject',
    src: '/images/intro/intro19.jpg',
    projectSlug: 'memeproject',
    color: '#2DFFA0',
  },
  {
    id: 'intro-15',
    title: 'Simulating #1,2,3',
    src: '/images/intro/intro20.jpg',
    projectSlug: 'simulating-1-2-3',
    color: '#FF2D8C',
  },
  {
    id: 'intro-11',
    title: 'Singlet & Multiplet',
    src: '/images/intro/intro14.jpg',
    projectSlug: 'singlet-multiplet',
    color: '#B02DFF',
  },
  {
    id: 'intro-12',
    title: 'Silver Bell',
    src: '/images/intro/intro15.jpg',
    projectSlug: 'silver-bell',
    color: '#5220B7',
    videoScale: 0.8,
    videoBg: '#FFFFFF',
    vimeoUrl:
      'https://player.vimeo.com/video/1165424772?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-13',
    title: 'delta-individualism',
    src: '/images/intro/intro16.jpg',
    projectSlug: 'delta-individualism',
    color: '#FF2D8C',
    vimeoUrl:
      'https://player.vimeo.com/video/1151380515?autoplay=1&loop=1&muted=1&playsinline=1&autopause=1&byline=0&title=0&portrait=0&controls=0&dnt=1&background=1',
  },
  {
    id: 'intro-16',
    title: 'Draw the Beat!',
    src: '/images/intro/intro21.jpg',
    projectSlug: 'draw-the-beat',
    color: '#B02DFF',
  },
]
