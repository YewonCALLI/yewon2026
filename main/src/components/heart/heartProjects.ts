import { projects, type Project } from '@/app/works/projectlist'
import { slides } from '@/app/introSlides'

// Thumbnails come from the main slides (src/app/introSlides.ts) so every page shows the same image per project.
const introCoverBySlug = new Map(slides.map((slide) => [slide.projectSlug, slide.src]))

// Newest first. A project's position in this list decides which point on the heart it sits on.
export const heartProjects: Project[] = [...projects]
  .sort((a, b) => Number(b.created_date) - Number(a.created_date))
  .map((p) => ({ ...p, cover: introCoverBySlug.get(p.slug) ?? p.cover }))

export const heartYears = Array.from(new Set(heartProjects.map((p) => p.created_date)))
