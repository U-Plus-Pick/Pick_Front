import React, { useState } from 'react'
import css from '../../styles/scss/SignUp.module.scss'
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa'
import axios from 'axios'

const SignUpForm = ({ goToLogin }) => {
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

  const isPasswordMatch =
    form.password && form.confirmPassword && form.password === form.confirmPassword
  const isPasswordWrong =
    form.password && form.confirmPassword && form.password !== form.confirmPassword

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name: form.name,
        birthdate: new Date(form.birth).toISOString(), // ✅ birthdate로 변경
        email: form.email,
        phone: form.phone,
        password: form.password,
        passwordConfirm: form.confirmPassword,
        plan: form.plan,
      })

      if (response.data?.message === '회원가입 성공') {
        alert('회원가입 성공! 로그인 페이지로 이동합니다.')
        goToLogin()

        console.log({
          name: form.name,
          birthdate: form.birth,
          email: form.email,
          phone: form.phone,
          password: form.password,
          plan: form.plan,
        })
      } else {
        alert(response.data?.message || '회원가입에 실패했습니다.')

        console.log({
          name: form.name,
          birthdate: form.birth,
          email: form.email,
          phone: form.phone,
          password: form.password,
          passwordConfirm: form.confirmPassword,
          plan: form.plan,
        })
      }
    } catch (err) {
      console.error(err)
      console.log({
        name: form.name,
        birthdate: form.birth,
        email: form.email,
        phone: form.phone,
        password: form.password,
        passwordConfirm: form.confirmPassword,
        plan: form.plan,
      })
      alert(err.response?.data?.error || '회원가입 중 에러가 발생했습니다.')
    }
  }

  return (
    <div className={css.card}>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="이름" onChange={handleChange} required />
        <input name="birth" type="date" placeholder="생년월일" onChange={handleChange} required />
        <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
        <input name="phone" placeholder="전화번호" onChange={handleChange} required />

        <div className={css.confirmWrapper}>
          <input
            name="password"
            type={isConfirmTyping ? 'password' : showPw ? 'text' : 'password'}
            placeholder="비밀번호"
            onChange={handleChange}
            required
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
            required
          />
          <div className={css.iconWrap}>
            <FaEye className={css.eyeIcon} onClick={() => setShowConfirmPw(!showConfirmPw)} />
            {isPasswordMatch && <FaCheckCircle className={css.checkIcon} />}
            {isPasswordWrong && <FaTimesCircle className={css.errorIcon} />}
          </div>
        </div>

        <input name="plan" placeholder="요금제" onChange={handleChange} required />

        <button type="submit" className={css.submitBtn}>
          회원가입
        </button>

        <p className={css.loginText}>
          이미 회원이신가요?{' '}
          <span className={css.link} onClick={goToLogin}>
            로그인하러 가기
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm
