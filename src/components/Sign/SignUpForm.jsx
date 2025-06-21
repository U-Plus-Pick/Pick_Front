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

  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
      case 'phone':
        return /^010-\d{4}-\d{4}$/.test(value)
      case 'password':
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value)
      case 'confirmPassword':
        return value === form.password
      default:
        return true
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    const updatedForm = { ...form, [name]: value }
    setForm(updatedForm)

    // 유효성 검사 후 errors
    setErrors(prev => ({
      ...prev,
      [name]: !validateField(name, value),
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    //필드 검사
    const newErrors = {
      email: !validateField('email', form.email),
      phone: !validateField('phone', form.phone),
      password: !validateField('password', form.password),
      confirmPassword: !validateField('confirmPassword', form.confirmPassword),
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      alert('입력한 정보가 올바르지 않습니다.')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name: form.name,
        birthdate: new Date(form.birth).toISOString(),
        email: form.email,
        phone: form.phone,
        password: form.password,
        passwordConfirm: form.confirmPassword,
        plan: form.plan,
      })

      if (response.data?.message === '회원가입 성공') {
        alert('회원가입 성공! 로그인 페이지로 이동합니다.')
        goToLogin()
      } else {
        alert(response.data?.message || '회원가입에 실패했습니다.')
      }
    } catch (err) {
      alert(err.response?.data?.error || '회원가입 중 에러가 발생했습니다.')
    }
  }

  return (
    <div className={css.card}>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="이름" onChange={handleChange} required />
        <input name="birth" type="date" placeholder="생년월일" onChange={handleChange} required />

        {/* 이메일 */}
        <div className={css.confirmWrapper}>
          <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
          <div className={css.iconWrap}>
            {!form.email ? null : errors.email ? (
              <FaTimesCircle className={css.errorIcon} />
            ) : (
              <FaCheckCircle className={css.checkIcon} />
            )}
          </div>
        </div>
        {errors.email && <p className={css.errorMsg}>올바른 이메일 형식이 아닙니다.</p>}

        {/* 전화번호 */}
        <div className={css.confirmWrapper}>
          <input
            name="phone"
            placeholder="전화번호 (010-1234-5678)"
            onChange={handleChange}
            required
          />
          <div className={css.iconWrap}>
            {!form.phone ? null : errors.phone ? (
              <FaTimesCircle className={css.errorIcon} />
            ) : (
              <FaCheckCircle className={css.checkIcon} />
            )}
          </div>
        </div>
        {errors.phone && (
          <p className={css.errorMsg}>전화번호는 010-1234-5678 형식이어야 합니다.</p>
        )}

        {/* 비밀번호 */}
        <div className={css.confirmWrapper}>
          <input
            name="password"
            type={showPw ? 'text' : 'password'}
            placeholder="비밀번호"
            onChange={handleChange}
            required
          />
          <div className={css.iconWrap}>
            <FaEye className={css.eyeIcon} onClick={() => setShowPw(!showPw)} />
            {!form.password ? null : errors.password ? (
              <FaTimesCircle className={css.errorIcon} />
            ) : (
              <FaCheckCircle className={css.checkIcon} />
            )}
          </div>
        </div>
        {errors.password && (
          <p className={css.errorMsg}>
            비밀번호는 대문자, 특수문자를 포함한 8자 이상이어야 합니다.
          </p>
        )}

        {/* 비밀번호 확인 */}
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
            {!form.confirmPassword ? null : errors.confirmPassword ? (
              <FaTimesCircle className={css.errorIcon} />
            ) : (
              <FaCheckCircle className={css.checkIcon} />
            )}
          </div>
        </div>
        {errors.confirmPassword && <p className={css.errorMsg}>비밀번호가 일치하지 않습니다.</p>}

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
