import React, { useState } from 'react'

const StepSelector = ({ onNext, setUserInfo }) => {
  const [isLeader, setIsLeader] = useState(true)

  const handleSelect = leader => {
    setIsLeader(leader)
    setUserInfo(prev => ({
      ...prev,
      role: leader ? 'leader' : 'member',
    }))
  }
  return (
    <div className="card-content">
      <div className="step-title">
        <h2>고객님 어떤 유형으로 결합하시겠어요</h2>
        <p>지인 결합할인은 유형에 따라 수수료가 달라집니다.</p>
      </div>
      <div className="step-card-wrapper selector">
        <button
          className={`step-card-twin ${isLeader ? 'active' : ''}`}
          onClick={() => handleSelect(true)}
        >
          <img src="/step1_leader.png" alt="결합 대표" />
          <p>결합 대표로 할게요</p>
          <div>
            파티원의 요금을 한번에 납부해요.
            <br />
            이용료를 50% 면제해줘요
          </div>
        </button>
        <button
          className={`step-card-twin ${!isLeader ? 'active' : ''}`}
          onClick={() => handleSelect(false)}
        >
          <img src="/step1_member.png" alt="결합원" />
          <p>결합원으로 할게요</p>
          <div>
            U+Pick을 통해 요금이 자동 납부 돼요.
            <br />
            요금에 이용료가 포함돼요.
          </div>
        </button>
      </div>
      <button className="step-next" onClick={onNext}>
        {isLeader ? '결합 대표로 이용하기' : '결합원으로 이용하기'}
      </button>
    </div>
  )
}

export default StepSelector
