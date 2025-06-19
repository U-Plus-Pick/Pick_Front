import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function PaySuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const paymentKey = params.get('paymentKey')
  const orderId = params.get('orderId')
  const amount = params.get('amount')
  const userEmail = 'ureca04@gmail.com' // 로그인 시, 실제 이메일로 변경

  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/payments/confirm', {
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

  const closeModal = () => {
    setShowModal(false)
    navigate('/mypage')
  }

  return (
    <>
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>결제 완료 </h2>
            <p>orderId: {orderId}</p>
            <p>amount: {amount}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </>
  )
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
}
