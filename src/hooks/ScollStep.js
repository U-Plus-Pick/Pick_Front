import { useState, useEffect } from 'react'

const useScrollStep = (stepCount = 4) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const newStep = Math.floor(scrollY / windowHeight)
      setStep(Math.min(newStep, stepCount - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stepCount])

  return step
}

export default useScrollStep
