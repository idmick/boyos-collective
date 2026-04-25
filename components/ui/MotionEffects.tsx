import { useEffect } from 'react'

const HERO_SELECTOR = '[data-hero-parallax]'

export default function MotionEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>(HERO_SELECTOR)
    )
    if (!scenes.length) return

    let frame = 0

    const update = () => {
      const viewportHeight = window.innerHeight || 1

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect()
        const sceneCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2
        const progress = Math.max(
          -1,
          Math.min(1, (viewportCenter - sceneCenter) / viewportHeight)
        )
        const maxDepth = Number.parseFloat(
          getComputedStyle(scene).getPropertyValue('--hero-parallax-max-depth')
        )
        const maxLift = Number.parseFloat(
          getComputedStyle(scene).getPropertyValue('--hero-parallax-max-lift')
        )
        const depth = progress * (Number.isFinite(maxDepth) ? maxDepth : 88)
        const contentLift = progress * (Number.isFinite(maxLift) ? maxLift : 42)

        scene.style.setProperty('--hero-depth', `${depth.toFixed(2)}px`)
        scene.style.setProperty(
          '--hero-content-lift',
          `${contentLift.toFixed(2)}px`
        )
      })

      frame = 0
    }

    const scheduleUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return null
}
