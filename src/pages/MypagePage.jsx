import React from 'react'
import Mypage from '../components/Mypage'
import './MypagePage.scss'

const MypagePage = () => {
  // 실제 사용 시에는 API나 상태 관리를 통해 받아올 데이터
  const userStatus = 'leader' // 'leader' | 'member' | 'none'
  const userName = '유*피'

  return (
    <div className="mypage-page">
      <Mypage userStatus={userStatus} userName={userName} />
    </div>
  )
}

export default MypagePage
