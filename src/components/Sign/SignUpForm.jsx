import React, { useState } from 'react'
import css from '../../styles/scss/SignUp.module.scss'
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa'

const SignUpForm = ({ onBack }) => {
  const [form, setForm] = useState({
    name: '',
    birth: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    plan: '',
  })

  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const isConfirmTyping = !!form.confirmPassword

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const isPasswordMatch =
    form.password && form.confirmPassword && form.password === form.confirmPassword
  const isPasswordWrong =
    form.password && form.confirmPassword && form.password !== form.confirmPassword

  return (
    <div className={css.card}>
      <form>
        <input name="name" placeholder="이름" onChange={handleChange} />
        <input name="birth" placeholder="생년월일" onChange={handleChange} />
        <input name="email" placeholder="이메일" onChange={handleChange} />
        <input name="phone" placeholder="전화번호" onChange={handleChange} />
        <div className={css.confirmWrapper}>
          <input
            name="password"
            type={isConfirmTyping ? 'password' : showPw ? 'text' : 'password'}
            placeholder="비밀번호"
            onChange={handleChange}
          />
          {!isConfirmTyping && (
            <div className={css.iconWrap}>
              <FaEye className={css.eyeIcon} onClick={() => setShowPw(!showPw)} />
            </div>
          )}
        </div>

        <div className={css.confirmWrapper}>
          <input
            name="confirmPassword"
            type={showConfirmPw ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />
          <div className={css.iconWrap}>
            <FaEye className={css.eyeIcon} onClick={() => setShowConfirmPw(!showConfirmPw)} />
            {isPasswordMatch && <FaCheckCircle className={css.checkIcon} />}
            {isPasswordWrong && <FaTimesCircle className={css.errorIcon} />}
          </div>
        </div>

        <input name="plan" placeholder="요금제" onChange={handleChange} />

        <button type="submit" className={css.submitBtn}>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
