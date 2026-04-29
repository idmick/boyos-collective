import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TRACKING_PARAMS = ['fbclid', 'igshid', 'igsh', 'mibextid']

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  let shouldRedirect = false

  TRACKING_PARAMS.forEach((param) => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      shouldRedirect = true
    }
  })

  if (!shouldRedirect) {
    return NextResponse.next()
  }

  return NextResponse.redirect(url, 308)
}

