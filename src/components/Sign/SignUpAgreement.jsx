import React, { useState } from 'react'
import css from '../../styles/scss/SignUpAgreement.module.scss'

const SignUpAgreement = ({ onNext }) => {
  const [checkAll, setCheckAll] = useState(false)
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    sensitive: false,
  })

  const handleCheckAll = () => {
    const next = !checkAll
    setCheckAll(next)
    setChecks({
      terms: next,
      privacy: next,
      sensitive: next,
    })
  }

  const handleCheck = name => {
    const nextChecks = { ...checks, [name]: !checks[name] }
    setChecks(nextChecks)
    const allChecked = Object.values(nextChecks).every(Boolean)
    setCheckAll(allChecked)
  }

  const isAllChecked = Object.values(checks).every(Boolean)

  return (
    <div className={css.card}>
      <h2 className={css.title}>약관동의</h2>

      <div className={css.allAgree}>
        <label className={css.checkLabel}>
          <input type="checkbox" checked={checkAll} onChange={handleCheckAll} />
          <span>
            <strong>전체 동의하기</strong>
          </span>
        </label>
        <p>
          전체동의는 필수 제공 항목과 선택 제공 항목에 대한 동의를 <br />
          포함하고 있으며, 선택 제공 항목에 대한 동의를 거부해도 <br />
          서비스 이용이 가능합니다.
        </p>
      </div>

      <hr className={css.divider} />

      <div className={css.description}>
        <p>
          유플픽 서비스 내 이용자 식별, 회원관리 및 서비스 제공을 위해
          고객님의 개인정보를 제공합니다. <br />
          정보는 개인정보 제3자 제공 동의 시부터 서비스 탈퇴 시 <br />
          지체없이 파기됩니다.
        </p>
      </div>

      <div className={css.checkList}>
        <label>
          <input type="checkbox" checked={checks.privacy} onChange={() => handleCheck('privacy')} />
          <span>[필수] 개인정보이용동의</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={checks.sensitive}
            onChange={() => handleCheck('sensitive')}
          />
          <span>[필수] 고유식별정보처리동의</span>
        </label>
        <label>
          <input type="checkbox" checked={checks.terms} onChange={() => handleCheck('terms')} />
          <span>[필수] 서비스이용약관동의</span>
        </label>
      </div>

      <button className={css.nextBtn} disabled={!isAllChecked} onClick={onNext}>
        다음으로
      </button>
    </div>
  )
}

export default SignUpAgreement
