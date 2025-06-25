import React, { useEffect, useState } from 'react'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { useNavigate } from 'react-router-dom'
import PaymentChange from './PaymentChange'

const ManageCard = ({
  userStatus,
  userName = '김유피',
  userEmail = 'ureca04@gmail.com',
  userPhone = '01012341234',
  settlementAmount = 50000,
}) => {
  const [payment, setPayment] = useState(null)
  const [showChangeModal, setShowChangeModal] = useState(false)
  const [accountInfo, setAccountInfo] = useState({
    userBank: '',
    userAccount: '',
  })
  const navigate = useNavigate()
  const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY
  const today = new Date()
  const month = String(today.getMonth() + 1)
  // Toss Payments 초기화
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey)
        const payment = tossPayments.payment({
          customerKey: userEmail,
        })
        setPayment(payment)
      } catch (error) {
        console.error('Error fetching payment:', error)
      }
    }

    if (userStatus === 'member' && clientKey) {
      fetchPayment()
    }
  }, [clientKey, userEmail, userStatus])

  // 결제 요청 함수
  const requestPayment = async () => {
    if (!payment) {
      alert('결제 시스템을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }
    try {
      const timestamp = Date.now()
      const orderId = `${userEmail.split('@')[0]}_${timestamp}`
      await payment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: settlementAmount,
        },
        orderId,
        orderName: `${month}월 투게더 결합 요금 납부`,
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
        customerEmail: userEmail,
        customerName: userName,
        customerMobilePhone: userPhone,
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      })
    } catch (error) {
      console.error('결제 요청 오류:', error)
      alert('결제 요청 중 오류가 발생했습니다.')
    }
  }
  const getTitle = () => {
    switch (userStatus) {
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
  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    switch (userStatus) {
      case 'member':
        requestPayment()
        break
      case 'leader':
        setShowChangeModal(true)
        break
      case 'none':
        // 신청하기 - /bundle/apply 페이지로 이동
        navigate('/bundle/apply')
        break
      default:
        break
    }
  }

  //계좌 저장 핸들러
  const handleSaveAccount = () => {
    console.log('새 계좌 정보:', accountInfo)
    // TODO: API 호출 등 저장 로직
    setShowChangeModal(false)
  }

  return (
    <>
      {/* 기존 카드 */}
      <div className="manage-card">
        <span className="manage-title">{getTitle()}</span>
        <button className="manage-btn" onClick={handleButtonClick}>
          {getButtonText()}
        </button>
      </div>

      {/* 리더 전용 계좌 변경 모달 */}
      {showChangeModal && (
        <PaymentChange
          onClose={() => setShowChangeModal(false)}
          onSave={handleSaveAccount}
          accountInfo={accountInfo}
          setAccountInfo={setAccountInfo}
          userName={userName}
        />
      )}
    </>
  )
}

export default ManageCard
