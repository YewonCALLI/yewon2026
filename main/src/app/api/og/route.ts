import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 86400

function matchMetaContent(html: string, attr: 'property' | 'name', key: string): string | undefined {
  const forward = new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`, 'i')
  const reversed = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${key}["']`, 'i')
  return html.match(forward)?.[1] ?? html.match(reversed)?.[1]
}

function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase()
  if (lower === 'localhost' || lower.endsWith('.local')) return true
  const ipv4 = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (ipv4) {
    const [a, b] = ipv4.slice(1).map(Number)
    if (a === 127 || a === 10 || a === 0) return true
    if (a === 169 && b === 254) return true
    if (a === 172 && b >= 16 && b <= 31) return true
    if (a === 192 && b === 168) return true
  }
  if (lower === '::1' || lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd')) return true
  return false
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('url')
  if (!target) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(target)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
    return NextResponse.json({ error: 'Unsupported protocol' }, { status: 400 })
  }
  if (isPrivateHost(targetUrl.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 })
  }

  try {
    const res = await fetch(targetUrl.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)' },
      redirect: 'follow',
      next: { revalidate: 86400 },
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
    }
    const html = await res.text()

    const title =
      matchMetaContent(html, 'property', 'og:title') ??
      html.match(/<title>([^<]*)<\/title>/i)?.[1] ??
      targetUrl.hostname
    const description =
      matchMetaContent(html, 'property', 'og:description') ?? matchMetaContent(html, 'name', 'description') ?? ''
    let image = matchMetaContent(html, 'property', 'og:image') ?? ''
    if (image) {
      try {
        image = new URL(image, targetUrl).toString()
      } catch {
        image = ''
      }
    }

    return NextResponse.json({
      title: title.trim(),
      description: description.trim(),
      image,
      url: targetUrl.hostname,
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
