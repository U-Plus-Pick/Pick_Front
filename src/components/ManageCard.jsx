import React from 'react'

const ManageCard = ({ userStatus }) => {
  const getTitle = () => {
    switch (userStatus) {
      case 'leader':
        return '결제 정산 관리'
      case 'member':
        return '결제 정산 관리'
      case 'none':
        return '결제 매칭 신청'
      default:
        return '결제 정산 관리'
    }
  }

  const getButtonText = () => {
    switch (userStatus) {
      case 'leader':
        return '변경하기'
      case 'member':
        return '결제하기'
      case 'none':
        return '신청하기'
      default:
        return '변경하기'
    }
  }

  return (
    <div className="manage-card">
      <span className="manage-title">{getTitle()}</span>
      <button className="manage-btn">{getButtonText()}</button>
    </div>
  )
}

export default ManageCard
