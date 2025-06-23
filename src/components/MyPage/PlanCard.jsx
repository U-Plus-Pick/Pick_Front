import React from 'react'

const PlanCard = ({ selectedPlan, onPlanChange, userStatus }) => {
  const getPlanText = () => {
    if (userStatus === 'none') return '사용 중인 요금제가 없어요'
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
