import React from 'react'

const PlanCard = ({ selectedPlan, onPlanChange }) => {
  const getPlanText = () => {
    return selectedPlan
  }

  return (
    <div className="plan-card">
      <span className="plan-name">{getPlanText()}</span>
      <button className="change-btn" onClick={onPlanChange}>
        변경하기
      </button>
    </div>
  )
}

export default PlanCard
