import React from 'react'
import css from '../../styles/scss/PaymentChange.module.scss'

const PaymentChange = ({ onClose, accountInfo, setAccountInfo, onSave }) => {
  const isFormValid = accountInfo.userBank !== '' && accountInfo.userAccount.trim() !== ''

  const handleAccountChange = e => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '')
    setAccountInfo(prev => ({ ...prev, userAccount: onlyNumber }))
  }

  const handleBankChange = e => {
    setAccountInfo(prev => ({ ...prev, userBank: e.target.value }))
  }

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={css.title}>
          <h2>정산 계좌 변경</h2>
          <p>본인 명의의 계좌만 등록 가능해요</p>
        </div>

        <div className={css.form}>
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

        <button className={css.saveBtn} onClick={onSave} disabled={!isFormValid}>
          저장
        </button>
      </div>
    </div>
  )
}

export default PaymentChange
