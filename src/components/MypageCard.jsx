import React, { useState, useRef, useEffect } from 'react'
import '../styles/scss/MypageCard.scss'
import { planService, userService, fileService } from '../services/apiService'

const MypageCard = ({ userStatus: defaultUserStatus = 'leader' }) => {
  // userStatus: 'leader' | 'member' | 'none'
  const [isUploading, setIsUploading] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('사용 중인 요금제가 없어요')
  const [newPlan, setNewPlan] = useState('')
  const [planOptions, setPlanOptions] = useState([]) // API로부터 가져올 요금제 목록 (이름만)
  const [planDetailsData, setPlanDetailsData] = useState([]) // 전체 요금제 데이터
  const [monthlyFee, setMonthlyFee] = useState(0) // 현재 요금제의 월 요금
  const [apiUserName, setApiUserName] = useState('유*피') // API에서 받아온 사용자 이름
  const [userStatus, setUserStatus] = useState(defaultUserStatus) // API에서 받아온 사용자 상태
  const fileInputRef = useRef(null)

  // 요금제 목록 가져오기
  const fetchPlanOptions = async () => {
    try {
      // 전체 요금제 데이터와 이름만 따로 받아오기
      const planDetails = await planService.getPlansWithDetails()
      const planNames = await planService.getPlans()

      setPlanDetailsData(planDetails)
      setPlanOptions(planNames)
    } catch (error) {
      console.error('요금제 목록 조회 오류:', error)
      // 오류 발생 시 기본값 사용
      setPlanOptions([
        '5G 프리미엄 에센셜',
        '5G 프리미엄 플러스',
        '5G 베이직',
        '4G 프리미엄',
        '4G 베이직',
      ])
      setPlanDetailsData([])
    }
  }
  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const userData = await userService.getUserInfo()
      // 현재 요금제 설정
      if (userData.plans) {
        setSelectedPlan(userData.plans)
      }
      // 사용자 이름 설정
      if (userData.user_name) {
        setApiUserName(userData.user_name)
      }
      // 사용자 상태 설정 (API에서 제공하는 경우)
      if (userData.user_status || userData.role) {
        setUserStatus(userData.user_status || userData.role)
      }
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error)
    }
  }

  // 컴포넌트 마운트 시 요금제 목록과 사용자 정보 로드
  useEffect(() => {
    fetchPlanOptions()
    fetchUserInfo()
  }, [])
  // 요금제가 변경될 때마다 월 요금 계산
  useEffect(() => {
    if (planDetailsData.length > 0 && selectedPlan) {
      const currentPlanData = planDetailsData.find(plan => plan.plan_name === selectedPlan)
      if (currentPlanData && currentPlanData.plan_monthly_fee) {
        setMonthlyFee(currentPlanData.plan_monthly_fee)
      } else {
        setMonthlyFee(0)
      }
    }
  }, [planDetailsData, selectedPlan])
  // 선택한 요금제의 월 요금 가져오기
  const getMonthlyFeeForPlan = planName => {
    if (planDetailsData.length > 0 && planName) {
      const planData = planDetailsData.find(plan => plan.plan_name === planName)
      return planData?.plan_monthly_fee ? planData.plan_monthly_fee.toLocaleString() + '원' : '00원'
    }
    return '00원'
  }
  // 숫자를 천 단위 콤마 포맷으로 변환하는 함수
  const formatCurrency = amount => {
    const numAmount = Number(amount)
    return isNaN(numAmount) ? '0' : numAmount.toLocaleString()
  }

  const handleFileUpload = async file => {
    setIsUploading(true)

    try {
      await fileService.uploadPaymentReceipt(file, apiUserName, '6월')
      alert('납부확인서가 성공적으로 제출되었습니다.')
    } catch (error) {
      console.error('Upload error:', error)
      alert('파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmitReceipt = () => {
    fileInputRef.current?.click()
  }

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
  const handlePlanConfirm = async () => {
    try {
      await planService.changePlan(newPlan)
      setSelectedPlan(newPlan)
      setShowConfirmModal(false)
      alert('요금제가 성공적으로 변경되었습니다.')
    } catch (error) {
      console.error('요금제 변경 오류:', error)
      alert('요금제 변경 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
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
              <span className="member-name">{apiUserName}</span>
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
          <div className="bill-amount">{formatCurrency(monthlyFee)}원</div>
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
      {/* 우측 영역 */}{' '}
      <div className="right-section">
        {/* 6월 이용요금 */}
        <div className="bill-card">
          <h3 className="bill-month">6월 이용요금</h3>
          <div className="bill-amount">{formatCurrency(monthlyFee)}원</div>
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
    <div className="mypage-content no-party">
      {/* 좌측 영역 */}
      <div className="left-section">
        <div className="empty-state">
          <div className="empty-message">이용하시는 서비스가 없어요</div>
          <div className="upi-character">
            <img src="/none-upi.png" alt="유피 캐릭터" />
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
        <h1 className="user-name">{apiUserName}</h1>
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
              <h3>변경하실 요금제입니다</h3>
              <button className="close-btn" onClick={handleModalClose}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="plan-info">
                <div className="plan-display">
                  <span className="plan-text">{newPlan}</span>
                </div>{' '}
                <div className="plan-note">
                  <span className="note-amount">월 {getMonthlyFeeForPlan(newPlan)}</span>
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

export default MypageCard
