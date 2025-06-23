import React from 'react'

const PlanModal = ({ showPlanModal, planOptions, selectedPlan, onPlanSelect, onModalClose }) => {
  if (!showPlanModal) return null

  return (
    <div className="modal-overlay" onClick={onModalClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>변경하실 요금제를 선택하세요</h3>
          <button className="close-btn" onClick={onModalClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="plan-dropdown">
            {planOptions
              .sort((a, b) => {
                // 현재 선택된 요금제를 최상단으로 배치
                if (a === selectedPlan) return -1
                if (b === selectedPlan) return 1
                return 0
              })
              .map(plan => (
                <div
                  key={plan}
                  className={`plan-option ${plan === selectedPlan ? 'current' : ''}`}
                  onClick={() => onPlanSelect(plan)}
                >
                  {plan}
                  {plan === selectedPlan && <span className="current-label">현재 이용중</span>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanModal
