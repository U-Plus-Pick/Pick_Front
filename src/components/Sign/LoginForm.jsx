import React, { useState } from 'react'
import css from '../../styles/scss/LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'https://port-0-pick-back-mcbpw7z924e60211.sel5.cloudtype.app/api/users/signin',
        {
          email: form.email,
          password: form.password,
        }
      )

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token)
        onLoginSuccess()
      }
    } catch (err) {
      const message = err.response?.data?.message || '로그인 실패'
      setErrorMessage(message)
    }
  }

  return (
    <div className={css.card}>
      <form onSubmit={handleSubmit}>
        {/* 로그인 실패 메세지 */}
        {errorMessage && <p className={css.errorText}>{errorMessage}</p>}
        <div className={css.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={css.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={css.loginBtn}>
          로그인
        </button>
        <button
          type="button"
          className={css.signupBtn}
          onClick={() => navigate('/login?step=agreement')}
        >
          회원가입
        </button>
      </form>
    </div>
  )
}

export default LoginForm
