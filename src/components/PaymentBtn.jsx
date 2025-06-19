import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import React, { useEffect, useState } from 'react'

export default function PaymentBtn() {
  const [payment, setPayment] = useState(null)

  // 실제 사용자 정보로 변경해주세요.
  const email = 'ureca04@gmail.com'
  const name = '김유피'
  const phoneNum = '01012341234'
  const [amount] = useState({
    currency: 'KRW',
    value: 50000,
  })

  const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY

  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0') - 1 // 요금 청구된 달

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey)
        const payment = tossPayments.payment({
          customerKey: email,
        })
        setPayment(payment)
      } catch (error) {
        console.error('Error fetching payment:', error)
      }
    }
    fetchPayment()
  }, [clientKey, email])

  async function requestPayment() {
    const orderId = `${email.split('@')[0]}_${month}` // email과 결제 월을 조합한 주문 ID
    await payment.requestPayment({
      method: 'CARD',
      amount,
      orderId,
      orderName: `${month}월 투게더 결합 요금 납부`,
      successUrl: window.location.origin + '/payment/success',
      failUrl: window.location.origin + '/payment/fail',
      customerEmail: email,
      customerName: name,
      customerMobilePhone: phoneNum,
      card: {
        useEscrow: false,
        flowMode: 'DEFAULT',
        useCardPoint: false,
        useAppCardOnly: false,
      },
    })
  }
  return (
    <button className="button" onClick={() => requestPayment()}>
      {amount.value.toLocaleString()}원 결제하기
    </button>
  )
}
