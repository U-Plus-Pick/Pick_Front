import React from 'react'

const StepPersonalInfo = ({ onNext }) => {
  const phoneNumber = '010-1234-5678'
  const userEmail = 'upi@upi.com'
  const userBirth = '2000-01-01'
  const userPlans = '5G 프리미어 에센셜'

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>[유피]님의 개인 정보를 확인해 주세요</h2>
        <p>개인 정보는 마이페이지에서 변경 가능합니다.</p>
      </div>
      <div className="step-input-wrapper personal">
        <div>
          <p>LG U+ 휴대폰 번호</p>
          <input value={phoneNumber} disabled />
        </div>
        <div>
          <p>이메일</p>
          <input value={userEmail} disabled />
        </div>
        <div>
          <p>생년월일</p>
          <input value={userBirth} disabled />
        </div>
        <div>
          <p>요금제</p>
          <input value={userPlans} disabled />
        </div>
      </div>
      <button className="step-next" onClick={onNext}>
        다음
      </button>
    </div>
  )
}

export default StepPersonalInfo
