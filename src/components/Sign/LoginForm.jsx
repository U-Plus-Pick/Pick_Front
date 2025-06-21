import React from 'react'
import css from '../../styles/scss/LoginForm.module.scss'

const LoginForm = ({ onNext }) => {
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
        <button type="button" className={css.signupBtn} onClick={onNext}>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default LoginForm
