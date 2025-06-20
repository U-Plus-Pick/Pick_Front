import React, { useState, useRef } from 'react'
import './Mypage.scss'

const Mypage = ({ userStatus = 'leader', userName = '유*피' }) => {
  // userStatus: 'leader' | 'member' | 'none'
  const [isUploading, setIsUploading] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('5G 프리미엄 에센셜')
  const [newPlan, setNewPlan] = useState('')
  const fileInputRef = useRef(null)

  // 요금제 목록
  const planOptions = [
    '5G 프리미엄 에센셜',
    '5G 프리미엄 플러스',
    '5G 베이직',
    '4G 프리미엄',
    '4G 베이직',
  ]

  // 파일 업로드 함수
  const handleFileUpload = async file => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userName', userName)
      formData.append('month', '6월')

      // 서버에 파일 전송
      const response = await fetch('/api/upload-payment-receipt', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('납부확인서가 성공적으로 제출되었습니다.')
      } else {
        throw new Error('업로드 실패')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
    }
  }

  // 납부확인서 제출 버튼 클릭 핸들러
  const handleSubmitReceipt = () => {
    fileInputRef.current?.click()
  }

  // 파일 선택 핸들러
  const handleFileSelect = event => {
    const file = event.target.files[0]
    if (file) {
      // 파일 형식 검증
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('JPG, PNG, PDF 파일만 업로드 가능합니다.')
        return
      }

      // 파일 크기 검증 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB 이하여야 합니다.')
        return
      }
      handleFileUpload(file)
    }
  } // 요금제 변경 관련 핸들러
  const handlePlanChange = () => {
    setShowPlanModal(true)
  }

  const handlePlanSelect = plan => {
    setNewPlan(plan)
    setShowPlanModal(false)
    setShowConfirmModal(true)
  }

  const handlePlanConfirm = () => {
    setSelectedPlan(newPlan)
    setShowConfirmModal(false)
    alert('요금제가 성공적으로 변경되었습니다.')
  }

  const handleModalClose = () => {
    setShowPlanModal(false)
    setShowConfirmModal(false)
    setNewPlan('')
  }

  const renderContent = () => {
    switch (userStatus) {
      case 'leader':
        return renderLeaderContent()
      case 'member':
        return renderMemberContent()
      case 'none':
        return renderNoPartyContent()
      default:
        return renderLeaderContent()
    }
  }

  const renderLeaderContent = () => (
    <div className="mypage-content">
      {/* 좌측 영역 */}
      <div className="left-section">
        {/* 총 결제 금액 박스 */}
        <div className="payment-summary-box">
          <div className="box-header">
            <h3 className="section-title">총 결제 금액</h3>
            <span className="status-text">523,320원/월</span>
          </div>
          {/* 매칭 상태 행 */}
          <div className="matching-grid">
            <div className="member-card leader">
              <div className="crown-icon">👑</div>
              <span className="member-name">유*피</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">최*수</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">한*준</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">박*규</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">곽*미</span>
            </div>
          </div>
          {/* 요금 정보 */}
          <div className="fee-info">
            <div className="fee-row">
              <span className="fee-label">파티원 총 요금</span>
              <span className="fee-amount">424,500원</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">투게더로 인한 할인 금액</span>
              <span className="fee-amount">100,000원</span>
            </div>
          </div>{' '}
          {/* U+Pick 이용료 */}
          <div className="upick-fee">
            <div className="fee-header">
              <span className="service-name">U+Pick 이용료</span>
              <div className="price-info">
                <span className="original-price">2,000원</span>
                <span className="current-price">1,000원</span>
              </div>
            </div>
            <div className="discount-info">대표자 할인 적용 완료</div>
          </div>
          {/* 정산받는 금액 */}
          <div className="settlement-row">
            <span className="settlement-label">정산받는 금액</span>{' '}
            <span className="settlement-amount">323,000원</span>
          </div>
        </div>
      </div>{' '}
      {/* 우측 영역 */}
      <div className="right-section">
        {' '}
        {/* 6월 이용요금 */}
        <div className="bill-card">
          <h3 className="bill-month">6월 이용요금</h3>
          <div className="bill-amount">105,590원</div>
          <div className="bill-footer">
            <div className="bill-period">25.05.01 ~ 25.05.31</div>
            <button className="submit-btn" onClick={handleSubmitReceipt} disabled={isUploading}>
              {isUploading ? '업로드 중...' : '납부확인서 제출'}
            </button>
          </div>
        </div>{' '}
        {/* 5G 프리미엄 에센셜 */}
        <div className="plan-card">
          <span className="plan-name">{selectedPlan}</span>
          <button className="change-btn" onClick={handlePlanChange}>
            변경하기
          </button>
        </div>
        {/* 결제 정산 관리 */}
        <div className="manage-card">
          <span className="manage-title">결제 정산 관리</span>
          <button className="manage-btn">변경하기</button>
        </div>
      </div>
    </div>
  )
  const renderMemberContent = () => (
    <div className="mypage-content">
      {/* 좌측 영역 */}
      <div className="left-section">
        {/* 총 결제 금액 박스 */}
        <div className="payment-summary-box">
          <div className="box-header">
            <h3 className="section-title">총 결제 금액</h3>
            <span className="status-text">523,320원/월</span>
          </div>
          {/* 매칭 상태 행 */}
          <div className="matching-grid">
            <div className="member-card filled">
              <div className="crown-icon">👑</div>
              <span className="member-name">급*디</span>
            </div>
            <div className="member-card filled current-user">
              <span className="member-name">최*수</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">한*준</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">박*규</span>
            </div>
            <div className="member-card filled">
              <span className="member-name">금*디</span>
            </div>
          </div>
          {/* 요금 정보 */}
          <div className="fee-info">
            <div className="fee-row">
              <span className="fee-label">파티원 총 요금</span>
              <span className="fee-amount">424,500원</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">투게더로 인한 할인 금액</span>
              <span className="fee-amount">100,000원</span>
            </div>
          </div>
          {/* U+Pick 이용료 */}
          <div className="upick-fee">
            <div className="fee-header">
              <span className="service-name">U+Pick 이용료</span>
              <div className="price-info">
                <span className="current-price">2,000원</span>
              </div>
            </div>
          </div>
          {/* 정산받는 금액 */}
          <div className="settlement-row">
            <span className="settlement-label">정산받을 금액</span>
            <span className="settlement-amount">108,590원</span>
          </div>
        </div>
      </div>
      {/* 우측 영역 */}
      <div className="right-section">
        {/* 6월 이용요금 */}
        <div className="bill-card">
          <h3 className="bill-month">6월 이용요금</h3>
          <div className="bill-amount">105,590원</div>
          <div className="bill-footer">
            <div className="bill-period">25.05.01 ~ 25.05.31</div>
            <button className="submit-btn" onClick={handleSubmitReceipt} disabled={isUploading}>
              {isUploading ? '업로드 중...' : '요금명세서 제출'}
            </button>
          </div>
        </div>
        {/* 5G 프리미엄 에센셜 */}
        <div className="plan-card">
          <span className="plan-name">{selectedPlan}</span>
          <button className="change-btn" onClick={handlePlanChange}>
            변경하기
          </button>
        </div>
        {/* 결제 정산 관리 */}
        <div className="manage-card">
          <span className="manage-title">결제 정산 관리</span>
          <button className="manage-btn">결제하기</button>
        </div>
      </div>
    </div>
  )
  const renderNoPartyContent = () => (
    <div className="mypage-content">
      {/* 좌측 영역 */}
      <div className="left-section">
        {/* 총 결제 금액 박스 */}
        <div className="payment-summary-box">
          <div className="box-header">
            <h3 className="section-title">총 결제 금액</h3>
            <span className="status-text">0원/월</span>
          </div>
          {/* 매칭 상태 행 */}
          <div className="matching-grid">
            <div className="member-card empty">
              <span className="member-name">매칭 대기</span>
            </div>
            <div className="member-card empty">
              <span className="member-name">매칭 대기</span>
            </div>
            <div className="member-card empty">
              <span className="member-name">매칭 대기</span>
            </div>
            <div className="member-card empty">
              <span className="member-name">매칭 대기</span>
            </div>
            <div className="member-card empty">
              <span className="member-name">매칭 대기</span>
            </div>
          </div>
          {/* 요금 정보 */}
          <div className="fee-info">
            <div className="fee-row">
              <span className="fee-label">파티원 총 요금</span>
              <span className="fee-amount">0원</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">투게더로 인한 할인 금액</span>
              <span className="fee-amount">0원</span>
            </div>
          </div>
          {/* U+Pick 이용료 */}
          <div className="upick-fee">
            <div className="fee-header">
              <span className="service-name">U+Pick 이용료</span>
              <div className="price-info">
                <span className="current-price">0원</span>
              </div>
            </div>
            <div className="discount-info">서비스 이용 후 요금이 부과됩니다</div>
          </div>
          {/* 정산받는 금액 */}
          <div className="settlement-row">
            <span className="settlement-label">정산받을 금액</span>
            <span className="settlement-amount">0원</span>
          </div>
        </div>
      </div>
      {/* 우측 영역 */}
      <div className="right-section">
        {/* 6월 이용요금 */}
        <div className="bill-card">
          <h3 className="bill-month">6월 이용요금</h3>
          <div className="bill-amount">0원</div>
          <div className="bill-footer">
            <div className="bill-period">25.05.01 ~ 25.05.31</div>
            <div className="empty-text">납부하실 요금이 없어요</div>
          </div>
        </div>
        {/* 5G 프리미엄 에센셜 */}
        <div className="plan-card">
          <span className="plan-name">사용 중인 요금제가 없어요</span>
          <button className="change-btn" onClick={handlePlanChange}>
            변경하기
          </button>
        </div>
        {/* 결제 정산 관리 */}
        <div className="manage-card">
          <span className="manage-title">결제 매칭 신청</span>
          <button className="manage-btn">신청하기</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mypage-window">
      {/* 헤더 */}
      <div className="mypage-header">
        <h1 className="user-name">{userName}</h1>
        <span className="greeting">고객님 안녕하세요</span>
      </div>{' '}
      <div className="divider"></div> {/* 메인 컨텐츠 */}
      {renderContent()}
      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".jpg,.jpeg,.png,.pdf"
        style={{ display: 'none' }}
      />{' '}
      {/* 요금제 변경 모달 */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>변경하실 요금제를 선택하세요</h3>
              <button className="close-btn" onClick={handleModalClose}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="plan-dropdown">
                {planOptions.map(plan => (
                  <div
                    key={plan}
                    className={`plan-option ${plan === selectedPlan ? 'current' : ''}`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan}
                    {plan === selectedPlan && <span className="current-label">현재 이용중</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 요금제 변경 확인 모달 */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>바뀌 사용할 요금제입니다</h3>
              <button className="close-btn" onClick={handleModalClose}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="plan-info">
                <div className="plan-display">
                  <span className="plan-text">{newPlan}</span>
                </div>
                <div className="plan-note">
                  <span className="note-amount">월 00원</span>
                  <span className="note-text">대표자 요금과 별도로 측정됩니다</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="confirm-btn" onClick={handlePlanConfirm}>
                  확인
                </button>{' '}
              </div>{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mypage
