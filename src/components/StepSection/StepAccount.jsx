import React from 'react'

const StepAccount = ({ onNext, userApiData, accountInfo, setAccountInfo }) => {
  const userName = userApiData?.user_name

  // 입력 완료 여부 (둘 다 입력했는지)
  const isFormValid = accountInfo.userBank !== '' && accountInfo.userAccount.trim() !== ''

  const handleAccountChange = e => {
    const value = e.target.value
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setAccountInfo(prev => ({ ...prev, userAccount: onlyNumber }))
  }

  const handleBankChange = e => {
    setAccountInfo(prev => ({ ...prev, userBank: e.target.value }))
  }

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>매달 결합원의 요금제를 정산 받을 계좌를 입력해 주세요</h2>
        <p>안전을 위해 본인 명의의 계좌만 등록 가능해요</p>
      </div>

      <div className="step-input-wrapper account">
        <div>
          <p>이름</p>
          <input value={userName} disabled />
        </div>
        <div>
          <p>은행</p>
          <select value={accountInfo.userBank} onChange={handleBankChange}>
            <option value="">은행 선택</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="하나은행">하나은행</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="토스뱅크">토스뱅크</option>
          </select>
        </div>

        <div>
          <p>계좌번호</p>
          <input
            value={accountInfo.userAccount}
            onChange={handleAccountChange}
            placeholder="숫자만 입력 (예: 1234567890123)"
          />
        </div>
      </div>

      <button
        className="step-next"
        onClick={onNext}
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? '#e6007e' : '#ccc',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
        }}
      >
        다음
      </button>
    </div>
  )
}

export default StepAccount
