import React, { useState } from 'react'
import BundleApplyCard from '../components/BundleApplyCard'
import '../styles/scss/bundleApply.scss'

const BundleApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [direction, setDirection] = useState(1)
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    role: '',
    name: '',
    terms_agreed: true,
  })

  const handleNext = () => {
    if (currentStep === 3 && userInfo.role === 'member') {
      setCurrentStep(5)
      console.log(userInfo.role)
    } else {
      setCurrentStep(currentStep + 1)
    }
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
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  )
}

export default BundleApplyPage
