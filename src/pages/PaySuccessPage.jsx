import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { paymentService } from '../services/apiService'

import upi from '../assets/PaidSuccess.png'

import '../styles/scss/PaySuccessPage.scss'

export default function PaySuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const paymentKey = params.get('paymentKey')
  const orderId = params.get('orderId')
  const amount = params.get('amount')
  const userEmail = 'ureca04@gmail.com' // 로그인 연결 시, 실제 이메일로 변경

  const today = new Date()
  const month = String(today.getMonth() + 1)

  const [showModal, setShowModal] = useState(true)
  const [isRequested, setIsRequested] = useState(false)

  useEffect(() => {
    const confirmPayment = async () => {
      if (isRequested) return // 중복 요청 막기
      setIsRequested(true)

      try {
        const payInfo = {
          id: orderId,
          user_email: userEmail,
          payment_key: paymentKey,
          amount: Number(amount),
          payment_method: 'CARD',
          paid_status: 'SUCCESS',
          paid_at: new Date().toISOString(),
        }

        const result = await paymentService.postTossInfo(payInfo)
        console.log('결제 저장 성공:', result)
      } catch (error) {
        console.error('결제 실패:', error.response?.data)
      }
    }
    if (paymentKey && orderId && amount) {
      confirmPayment()
    }
  }, [paymentKey, orderId, amount, userEmail, isRequested])

  const handleCloseModal = targetPath => {
    setShowModal(false)
    navigate(targetPath)
  }

  return (
    <>
      {showModal && (
        <div className="pay-modal">
          <div className="pay-modal-wrapper">
            <h1 className="pay-modal-title">요금제가 성공적으로 결제되었습니다.</h1>
            <div className="pay-modal-content">
              <img className="image" alt="결제 유피" src={upi} />
              <div className="pay-modal-desc">
                <div className="pay-modal-price">
                  <p>{month}월 납부 요금</p>
                  <span>
                    {Number(amount).toLocaleString()} 원<br />
                  </span>
                </div>
                <div className="pay-modal-info">
                  <p>
                    U+Pick 결합 할인
                    <br /> 20,000원
                  </p>
                  <p>
                    결제 ID
                    <br />
                    {paymentKey}
                  </p>
                </div>
              </div>
            </div>
            <p>
              2025년 {month - 1}월 1일부터 2025년 {month - 1}월 30일까지 사용한 요금입니다.
            </p>
            <div className="group-btn">
              <button onClick={() => handleCloseModal('/mypage')}>마이페이지로 이동</button>
              <button onClick={() => handleCloseModal('/')}>홈으로 이동</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
