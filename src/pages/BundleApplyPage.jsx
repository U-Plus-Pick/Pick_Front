import React, { useState } from 'react'
import BundleApplyCard from '../components/BundleApplyCard'
import '../styles/scss/BundleApply.scss'
import { useNavigate } from 'react-router-dom'

const BundleApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [userRole, setUserRole] = useState('leader')
  const [accountInfo, setAccountInfo] = useState({
    userBank: '',
    userAccount: '',
  })

  const navigate = useNavigate()
  const handleNext = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    if (currentStep === 3 && userRole === 'member') {
      setCurrentStep(5)
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
        userRole={userRole}
        setUserRole={setUserRole}
        accountInfo={accountInfo}
        setAccountInfo={setAccountInfo}
      />
    </div>
  )
}

export default BundleApplyPage
