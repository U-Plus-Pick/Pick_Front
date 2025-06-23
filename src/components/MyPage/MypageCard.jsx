import React, { useState, useRef, useEffect, useCallback } from 'react'
import '../../styles/scss/MypageCard.scss'
import { planService, userService, fileService, partyService } from '../../services/apiService'
import PaymentSummaryBox from './PaymentSummaryBox'
import BillCard from './BillCard'
import PlanCard from './PlanCard'
import ManageCard from './ManageCard'
import PlanModal from './PlanModal'
import ConfirmModal from './ConfirmModal'
import {
  getPreviousMonthDateRange,
  formatCurrency,
  TOGETHER_DISCOUNT,
  UPICK_FEE_LEADER,
  UPICK_FEE_MEMBER,
  MAX_PARTY_SIZE,
} from '../../utils/mypageUtils'

const MypageCard = ({ userStatus: defaultUserStatus = 'none' }) => {
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
  const [apiUserEmail, setApiUserEmail] = useState('') // API에서 받아온 사용자 이메일
  const [apiUserPhone, setApiUserPhone] = useState('') // API에서 받아온 사용자 전화번호
  const [userStatus, setUserStatus] = useState(defaultUserStatus) // API에서 받아온 사용자 상태
  const [partyMembers, setPartyMembers] = useState([]) // 파티원 정보 (본인 제외)
  const [totalPartyFee, setTotalPartyFee] = useState(0) // 파티원 총 요금
  const [totalBillAmount, setTotalBillAmount] = useState(0) // 총 결제 금액 (나 + 파티원)
  const [settlementAmount, setSettlementAmount] = useState(0) // 정산받는 금액
  const today = new Date()
  const month = String(today.getMonth() + 1)

  // 전 달 날짜 범위
  const previousMonthRange = getPreviousMonthDateRange()

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
      console.log('사용자 정보 API 응답:', userData)

      // 현재 요금제 설정
      console.log(userData.plans)
      if (userData.plans) {
        setSelectedPlan(userData.plans)
      } else {
        // 요금제가 없는 경우 기본값으로 설정
        setSelectedPlan('사용 중인 요금제가 없어요')
      }

      // 사용자 이름 설정
      if (userData.user_name) {
        setApiUserName(userData.user_name)
      }

      // 사용자 이메일 설정
      if (userData.user_email) {
        setApiUserEmail(userData.user_email)
      }

      // 사용자 전화번호 설정
      if (userData.user_phone) {
        setApiUserPhone(userData.user_phone)
      }

      // 사용자 상태 설정 (API에서 제공하는 경우)
      if (userData.apply_division) {
        setUserStatus(userData.apply_division)
        console.log('사용자 상태 설정:', userData.apply_division)
      } else {
        // apply_division이 없거나 null인 경우 none으로 설정
        setUserStatus('none')
        console.log('사용자 상태를 none으로 설정')
      }
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error)
      // 오류 발생 시 기본값으로 설정
      setUserStatus('none')
      setSelectedPlan('사용 중인 요금제가 없어요')
    }
  }

  // 파티 정보 가져오기
  const fetchPartyInfo = useCallback(async () => {
    try {
      const partyData = await partyService.getPartyInfo()
      const userData = await userService.getUserInfo()

      console.log('파티 정보 API 응답:', partyData)

      // 파티 정보가 없는 경우 (none 상태)
      if (
        !partyData ||
        (!partyData.leader_infor && (!partyData.crew_infor || partyData.crew_infor.length === 0))
      ) {
        console.log('파티 정보가 없음 - none 상태로 설정')
        setUserStatus('none')
        setPartyMembers([])
        setTotalPartyFee(0)
        setTotalBillAmount(0)
        return
      }

      const currentUserEmail = userData.user_email || ''

      // 모든 파티원 정보 (리더 + 크루)
      const allMembers = []

      // 리더 정보 추가
      if (partyData.leader_infor) {
        allMembers.push({
          email: partyData.leader_infor.leader_email,
          name: partyData.leader_infor.leader_name,
          plan_name: partyData.leader_infor.plan_name,
          monthly_fee: partyData.leader_infor.plan_fee,
          role: 'leader',
        })
      }

      // 크루 정보 추가
      if (partyData.crew_infor && Array.isArray(partyData.crew_infor)) {
        partyData.crew_infor.forEach(member => {
          allMembers.push({
            email: member.member_email,
            name: member.member_name,
            plan_name: member.plan_name,
            monthly_fee: member.plan_monthly_fee,
            role: 'member',
          })
        })
      }

      // 본인을 제외한 파티원들만 필터링
      const otherMembers = allMembers.filter(member => member.email !== currentUserEmail)
      setPartyMembers(otherMembers)

      // 파티원 총 요금 계산 (본인 제외)
      const totalFee = otherMembers.reduce((total, member) => total + (member.monthly_fee || 0), 0)
      setTotalPartyFee(totalFee)

      // 총 결제 금액 계산 (본인 + 파티원)
      const totalAmount = totalFee + monthlyFee
      setTotalBillAmount(totalAmount)

      console.log('파티 정보 로드 완료:', {
        allMembers,
        otherMembers,
        currentUserEmail,
        totalPartyFee: totalFee,
        monthlyFee,
        totalBillAmount: totalAmount,
      })
    } catch (error) {
      console.error('파티 정보 조회 오류:', error)
      // 파티 정보 조회 실패 시 none 상태로 설정
      setUserStatus('none')
      setPartyMembers([])
      setTotalPartyFee(0)
      setTotalBillAmount(0)
    }
  }, [monthlyFee])

  // 컴포넌트 마운트 시 요금제 목록과 사용자 정보, 파티 정보 로드
  useEffect(() => {
    fetchPlanOptions()
    fetchUserInfo()
    fetchPartyInfo()
  }, [fetchPartyInfo])

  // 요금제가 변경될 때마다 월 요금 계산
  useEffect(() => {
    if (
      planDetailsData.length > 0 &&
      selectedPlan &&
      selectedPlan !== '사용 중인 요금제가 없어요'
    ) {
      const currentPlanData = planDetailsData.find(plan => plan.plan_name === selectedPlan)
      if (currentPlanData && currentPlanData.plan_monthly_fee) {
        setMonthlyFee(currentPlanData.plan_monthly_fee)
      } else {
        setMonthlyFee(0)
      }
    } else {
      setMonthlyFee(0)
    }
  }, [planDetailsData, selectedPlan]) // userStatus 조건 제거

  // 월요금이 변경될 때마다 총 결제 금액 재계산
  useEffect(() => {
    const totalAmount = totalPartyFee + monthlyFee
    setTotalBillAmount(totalAmount)
  }, [monthlyFee, totalPartyFee])
  // 정산받는 금액 계산 (총 결제 금액 - 투게더 할인 + U+Pick 이용료)
  useEffect(() => {
    const upickFee = userStatus === 'leader' ? UPICK_FEE_LEADER : UPICK_FEE_MEMBER
    const calculatedSettlement = totalBillAmount - TOGETHER_DISCOUNT + upickFee
    setSettlementAmount(calculatedSettlement)
  }, [totalBillAmount, userStatus])

  // 선택한 요금제의 월 요금 가져오기
  const getMonthlyFeeForPlan = planName => {
    if (planDetailsData.length > 0 && planName) {
      const planData = planDetailsData.find(plan => plan.plan_name === planName)
      return planData?.plan_monthly_fee ? planData.plan_monthly_fee.toLocaleString() + '원' : '00원'
    }
    return '00원'
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
        <PaymentSummaryBox
          userStatus={userStatus}
          totalBillAmount={totalBillAmount}
          formatCurrency={formatCurrency}
          partyMembers={partyMembers}
          apiUserName={apiUserName}
          totalPartyFee={totalPartyFee}
          togetherDiscount={TOGETHER_DISCOUNT}
          upickFeeLeader={UPICK_FEE_LEADER}
          upickFeeMember={UPICK_FEE_MEMBER}
          settlementAmount={settlementAmount}
          maxPartySize={MAX_PARTY_SIZE}
        />
      </div>
      {/* 우측 영역 */}
      <div className="right-section">
        <BillCard
          month={month}
          monthlyFee={monthlyFee}
          formatCurrency={formatCurrency}
          previousMonthRange={previousMonthRange}
          onSubmitReceipt={handleSubmitReceipt}
          isUploading={isUploading}
          userStatus={userStatus}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
        />
        <PlanCard selectedPlan={selectedPlan} onPlanChange={handlePlanChange} />
        <ManageCard
          userStatus={userStatus}
          userName={apiUserName}
          userEmail={apiUserEmail || 'ureca04@gmail.com'}
          userPhone={apiUserPhone || '01012341234'}
          settlementAmount={settlementAmount}
        />
      </div>
    </div>
  )

  const renderMemberContent = () => (
    <div className="mypage-content">
      {/* 좌측 영역 */}
      <div className="left-section">
        <PaymentSummaryBox
          userStatus={userStatus}
          totalBillAmount={totalBillAmount}
          formatCurrency={formatCurrency}
          partyMembers={partyMembers}
          apiUserName={apiUserName}
          totalPartyFee={totalPartyFee}
          togetherDiscount={TOGETHER_DISCOUNT}
          upickFeeLeader={UPICK_FEE_LEADER}
          upickFeeMember={UPICK_FEE_MEMBER}
          settlementAmount={settlementAmount}
          maxPartySize={MAX_PARTY_SIZE}
        />
      </div>
      {/* 우측 영역 */}
      <div className="right-section">
        <BillCard
          month={month}
          monthlyFee={monthlyFee}
          formatCurrency={formatCurrency}
          previousMonthRange={previousMonthRange}
          onSubmitReceipt={handleSubmitReceipt}
          isUploading={isUploading}
          userStatus={userStatus}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
        />
        <PlanCard selectedPlan={selectedPlan} onPlanChange={handlePlanChange} />
        <ManageCard
          userStatus={userStatus}
          userName={apiUserName}
          userEmail={apiUserEmail || 'ureca04@gmail.com'}
          userPhone={apiUserPhone || '01012341234'}
          settlementAmount={settlementAmount}
        />
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
        <BillCard
          month={month}
          monthlyFee={monthlyFee}
          formatCurrency={formatCurrency}
          previousMonthRange={previousMonthRange}
          onSubmitReceipt={handleSubmitReceipt}
          isUploading={isUploading}
          userStatus={userStatus}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
        />
        <PlanCard selectedPlan={selectedPlan} onPlanChange={handlePlanChange} />
        <ManageCard
          userStatus={userStatus}
          userName={apiUserName}
          userEmail={apiUserEmail || 'ureca04@gmail.com'}
          userPhone={apiUserPhone || '01012341234'}
          settlementAmount={settlementAmount}
        />
      </div>
    </div>
  )

  return (
    <div className="mypage-window">
      {/* 헤더 */}
      <div className="mypage-header">
        <h1 className="user-name">{apiUserName}</h1>
        <span className="greeting">고객님 안녕하세요</span>
      </div>
      <div className="divider"></div>
      {/* 메인 컨텐츠 */}
      {renderContent()}

      <PlanModal
        showPlanModal={showPlanModal}
        planOptions={planOptions}
        selectedPlan={selectedPlan}
        onPlanSelect={handlePlanSelect}
        onModalClose={handleModalClose}
      />

      <ConfirmModal
        showConfirmModal={showConfirmModal}
        newPlan={newPlan}
        getMonthlyFeeForPlan={getMonthlyFeeForPlan}
        onPlanConfirm={handlePlanConfirm}
        onModalClose={handleModalClose}
      />
    </div>
  )
}

export default MypageCard
