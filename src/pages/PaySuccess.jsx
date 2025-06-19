import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SuccessPage() {
  const [params] = useSearchParams()
  const paymentKey = params.get('paymentKey')
  const orderId = params.get('orderId')
  const amount = params.get('amount')
  return (
    <div>
      <h2>결제 성공 🎉</h2>
      <p>paymentKey: {paymentKey}</p>
      <p>orderId: {orderId}</p>
      <p>amount: {amount}</p>
    </div>
  )
}

function FailPage() {
  return <h2>결제 실패 😢</h2>
}

export { SuccessPage, FailPage }
