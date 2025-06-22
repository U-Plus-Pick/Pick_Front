import React from 'react'

const StepAccount = ({ onNext }) => {
  const userName = '유피'
  const userBank = 'KB국민은행'
  const userNum = '123 - 00 - 0000 - 123'

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>매달 결합원의 요금제를 정산 받을 계좌를 입력해 주세요</h2>
        <p>안전을 위해 본인 명의의 계좌만 등록 가능해요</p>
      </div>
      <div className="step-input-wrapper personal">
        <div>
          <p>이름</p>
          <input value={userName} disabled />
        </div>
        <div>
          <p>은행</p>
          <input value={userBank} disabled />
        </div>
        <div>
          <p>계좌번호</p>
          <input value={userNum} disabled />
        </div>
      </div>
      <button className="step-next" onClick={onNext}>
        다음
      </button>
    </div>
  )
}

export default StepAccount
