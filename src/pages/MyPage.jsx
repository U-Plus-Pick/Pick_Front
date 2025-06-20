import React from 'react'
import MypageCard from '../components/MyPage/MypageCard'
import '../styles/scss/MyPage.scss'
import PaymentBtn from '../components/paymentBtn'

const MyPage = () => {
  return (
    <div className="mypage-page">
      <MypageCard />
      {/* <PaymentBtn /> */}
    </div>
  )
}

export default MyPage
