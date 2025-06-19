import { useState, useEffect } from 'react'

const useScrollStep = (stepCount = 4) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight

      const newStep = Math.floor(scrollY / windowHeight)
      const clampedStep = Math.max(0, Math.min(newStep, stepCount - 1))

      setStep(clampedStep)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 실행
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stepCount])

  return step
}

export default useScrollStep
