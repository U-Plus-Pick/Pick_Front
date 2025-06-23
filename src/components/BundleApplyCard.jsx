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

const BundleApplyCard = ({
  currentStep,
  direction,
  onNext,
  onBack,
  userBundleInfo,
  setUserBundleInfo,
  accountInfo,
  setAccountInfo,
}) => {
  const [userApiData, setUserApiData] = useState(null)

  const stepComponents = {
    1: (
      <StepSelector
        onNext={onNext}
        userBundleInfo={userBundleInfo}
        setUserBundleInfo={setUserBundleInfo}
      />
    ),
    2: <StepTerms onNext={onNext} />,
    3: <StepPersonalInfo onNext={onNext} userApiData={userApiData} />,
    4: (
      <StepAccount
        onNext={onNext}
        userApiData={userApiData}
        accountInfo={accountInfo}
        setAccountInfo={setAccountInfo}
      />
    ),
    5: (
      <StepSummary
        onNext={onNext}
        userBundleInfo={userBundleInfo}
        userApiData={userApiData}
        accountInfo={accountInfo}
      />
    ),
    6: <StepComplete />,
  }

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

  const FIRST_STEP = 1
  const LAST_STEP = 6
  const SHOW_BACK_BUTTON = currentStep > FIRST_STEP && currentStep < LAST_STEP

  return (
    <div className="card-container">
      {SHOW_BACK_BUTTON && (
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
          {stepComponents[currentStep] || null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BundleApplyCard
