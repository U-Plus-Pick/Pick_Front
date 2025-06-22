import React, { useState } from 'react'
import BundleApplyCard from '../components/BundleApplyCard'
import '../styles/scss/bundleApply.scss'

const BundleApply = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    setCurrentStep(prev => prev + 1, 6)
    console.log(currentStep)
  }
  const handleBack = () => {
    setDirection(-1)
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="bundle-Container">
      <div className="bundle-ellipse big"></div>
      <div className="bundle-ellipse medium"></div>
      <div className="bundle-ellipse small"></div>

      <BundleApplyCard
        currentStep={currentStep}
        direction={direction}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  )
}

export default BundleApply
