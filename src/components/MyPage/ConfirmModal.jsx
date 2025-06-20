import React from 'react'

const ConfirmModal = ({
  showConfirmModal,
  newPlan,
  getMonthlyFeeForPlan,
  onPlanConfirm,
  onModalClose,
}) => {
  if (!showConfirmModal) return null

  return (
    <div className="modal-overlay" onClick={onModalClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>변경하실 요금제입니다</h3>
          <button className="close-btn" onClick={onModalClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="plan-info">
            <div className="plan-display">
              <span className="plan-text">{newPlan}</span>
            </div>
            <div className="plan-note">
              <span className="note-amount">월 {getMonthlyFeeForPlan(newPlan)}</span>
            </div>
          </div>
          <div className="modal-actions">
            <button className="confirm-btn" onClick={onPlanConfirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
