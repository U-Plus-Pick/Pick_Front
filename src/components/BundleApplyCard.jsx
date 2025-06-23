import { AnimatePresence, motion } from 'framer-motion'
import StepSelector from './StepSection/StepSelector'
import StepTerms from './StepSection/StepTerms'
import StepPersonalInfo from './StepSection/StepPersonalInfo'
import StepAccount from './StepSection/StepAccount'
import StepSummary from './StepSection/StepSummary'
import StepComplete from './StepSection/StepComplete'
import { GrFormPreviousLink } from 'react-icons/gr'
import '../styles/scss/bundleApplyCard.scss'
import { useEffect, useState } from 'react'
import { userService } from '../services/apiService'

const BundleApplyCard = ({ currentStep, direction, onNext, onBack, userInfo, setUserInfo }) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepSelector onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />
      case 2:
        return <StepTerms onNext={onNext} />
      case 3:
        return <StepPersonalInfo onNext={onNext} userApiData={userApiData} />
      case 4:
        return <StepAccount onNext={onNext} />
      case 5:
        return <StepSummary onNext={onNext} userInfo={userInfo} />
      case 6:
        return <StepComplete />
      default:
        return null
    }
  }

  const [userApiData, setUserApiData] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo()
        console.log('사용자 정보 API 응답:', data)
        setUserApiData(data)
      } catch (error) {
        console.error('사용자 정보 조회 오류:', error)
      }
    }

    fetchUserInfo()
  }, [])
  return (
    <div className="card-container">
      {currentStep > 1 && (
        <button onClick={onBack} className="step-prev">
          <GrFormPreviousLink />
        </button>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ height: '100%' }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BundleApplyCard
