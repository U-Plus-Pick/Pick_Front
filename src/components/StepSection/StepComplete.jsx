import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function StepComplete({ userApiData }) {
  const navigate = useNavigate()

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>투게더 지인 결합 신청이 완료되었습니다 !</h2>
      </div>
      <div className="step-input-wrapper complete">
        <img src="/bundle-success.png" alt="결합 대표" />
        <div>
          <div>
            결합원이 모두 모이면 <br />
            <strong>[{userApiData.user_email}]</strong>으로 알림이 갑니다. <br />
            <br />
            이제 더 저렴한 가격으로 <br />
            <strong>LG U+</strong> 요금제를 즐길 수 있어요.
          </div>
          <p>자세한 결합 정보는 마이페이지에서 확인가능합니다.</p>
        </div>
      </div>
      <div className="step-complete">
        <button className="step-next" onClick={() => navigate('/mypage')}>
          마이페이지로 이동
        </button>
        <button className="step-next" onClick={() => navigate('/')}>
          홈으로 이동
        </button>
      </div>
    </div>
  )
}
