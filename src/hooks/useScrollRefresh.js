import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const useScrollRestore = () => {
  useEffect(() => {
    let currentSectionId = null

    const getCurrentSection = () => {
      const allSections = document.querySelectorAll('section')
      const scrollY = window.scrollY
      const winHeight = window.innerHeight

      for (let section of allSections) {
        const rect = section.getBoundingClientRect()
        const top = rect.top + scrollY
        const bottom = top + section.offsetHeight

        if (scrollY + winHeight / 2 >= top && scrollY + winHeight / 2 < bottom) {
          return section.id || null
        }
      }

      return null
    }

    const handleResize = () => {
      currentSectionId = getCurrentSection()
      ScrollTrigger.refresh()

      setTimeout(
        () => {
          if (currentSectionId) {
            const el = document.getElementById(currentSectionId)
            if (el) {
              el.scrollIntoView({ behavior: 'instant' })
            }
          }
        },

        100
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}

export default useScrollRestore
