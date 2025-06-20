import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StepSelector from './StepSection/StepSelector'
import StepTerms from './StepSection/StepTerms'
import StepPersonalInfo from './StepSection/StepPersonalInfo'

import '../styles/scss/bundleApplyCard.scss'

const BundleApplyCard = ({ currentStep, direction, onNext, onBack }) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepSelector onNext={onNext} />
      case 2:
        return <StepTerms onNext={onNext} onBack={onBack} />
      case 3:
        return <StepPersonalInfo onBack={onBack} />
      default:
        return null
    }
  }

  return (
    <div className="card-container">
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
