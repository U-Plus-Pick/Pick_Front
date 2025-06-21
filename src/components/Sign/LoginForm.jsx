import React from 'react'
import css from '../../styles/scss/LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  return (
    <div className={css.card}>
      <form>
        <div className={css.inputGroup}>
          <input type="email" placeholder="이메일" />
        </div>
        <div className={css.inputGroup}>
          <input type="password" placeholder="비밀번호" />
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
