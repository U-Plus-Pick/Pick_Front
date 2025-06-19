import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import upi from '../assets/PaidSuccess.png'

import './PaySuccessPage.scss'

export default function PaySuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const paymentKey = params.get('paymentKey')
  const orderId = params.get('orderId')
  const amount = params.get('amount')
  const userEmail = 'ureca04@gmail.com' // 로그인 시, 실제 이메일로 변경

  const today = new Date()
  const month = String(today.getMonth() + 1) // 요금 청구된 달

  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/payments/confirm', {
          // 서버 URL 변경 필요
          paymentKey,
          orderId,
          amount,
          userEmail,
        })
        console.log('결제 성공:', response.data)
      } catch (error) {
        console.error('결제 실패:', error.response?.data)
      }
    }
    if (paymentKey && orderId && amount) {
      confirmPayment()
    }
  }, [paymentKey, orderId, amount, userEmail])

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
