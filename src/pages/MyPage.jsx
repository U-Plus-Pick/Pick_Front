import React from 'react'
import MypageCard from '../components/MypageCard'
import '../styles/scss/MyPage.scss'

const MyPage = () => {
  // 실제 사용 시에는 API나 상태 관리를 통해 받아올 데이터
  const userStatus = 'leader' // 'leader' | 'member' | 'none'
  const userName = '유*피'

  return (
    <div className="mypage-page">
      <MypageCard userStatus={userStatus} userName={userName} />
    </div>
  )
}

export default MyPage
