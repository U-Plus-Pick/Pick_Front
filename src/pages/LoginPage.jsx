import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import css from '../styles/scss/LoginPage.module.scss'
import gsap from 'gsap'
import LoginForm from '../components/Sign/LoginForm'
import SignUpAgreement from '../components/Sign/SignUpAgreement'
import SignUpForm from '../components/Sign/SignUpForm'

const LoginPage = () => {
  const [step, setStep] = useState('init')
  const [animating, setAnimating] = useState(false)
  const overlayRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const stepParam = params.get('step')

    const timer = setTimeout(() => {
      if (stepParam === 'signup') {
        animateCircle('signup', '100% 100%')
      } else if (stepParam === 'agreement') {
        animateCircle('agreement', '100% 100%')
      } else {
        animateCircle('login', '0 0')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [location.search])

  const animateCircle = (targetStep, origin) => {
    const ov = overlayRef.current
    if (!ov) return

    if (step === 'agreement' && targetStep === 'signup') {
      setStep('signup')
      setAnimating(false)
      return
    }

    setAnimating(true)

    // 공통 스타일
    ov.style.position = 'fixed'
    ov.style.borderRadius = '50%'
    ov.style.background = 'linear-gradient(50deg, #ffc3c3 0%, #e6007e 88%)'
    ov.style.pointerEvents = 'none'
    ov.style.zIndex = '999'
    ov.style.display = 'block'
    ov.style.opacity = '1'

    // 위치 지정 함수
    const setOriginPosition = origin => {
      if (origin === '0 0') {
        ov.style.top = '-60vw'
        ov.style.left = '-60vw'
        ov.style.bottom = 'auto'
        ov.style.right = 'auto'
      } else {
        ov.style.top = 'auto'
        ov.style.left = 'auto'
        ov.style.bottom = '-60vw'
        ov.style.right = '-60vw'
      }
      ov.style.width = '120vw'
      ov.style.height = '120vw'
      ov.style.transformOrigin = 'center center'
    }

    const tl = gsap.timeline()

    // ✅ "상태 전환이 서로 다른 방향"일 경우에는 중간에 커졌다가 줄어드는 애니메이션 실행
    const shouldExpand =
      (step === 'login' && (targetStep === 'agreement' || targetStep === 'signup')) ||
      ((step === 'agreement' || step === 'signup') && targetStep === 'login')

    if (shouldExpand) {
      // 현재 위치 기준으로 시작
      const currentOrigin = step === 'login' ? '0 0' : '100% 100%'
      setOriginPosition(currentOrigin)
      tl.set(ov, { scale: 1 })

      // 확장
      tl.to(ov, {
        scale: 2.5,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          // 타겟 위치로 이동
          setOriginPosition(origin)
        },
      })

      // 다시 축소
      tl.to(ov, {
        scale: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          setStep(targetStep)
          ov.style.zIndex = '1'
          setAnimating(false)
        },
      })
    } else {
      // 일반 축소 애니메이션 (초기 진입 등)
      setOriginPosition(origin)
      tl.set(ov, { scale: 2.5 })
      tl.to(ov, {
        scale: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          setStep(targetStep)
          ov.style.zIndex = '1'
          setAnimating(false)
        },
      })
    }
  }

  // 처음 로드: 로그인 애니메이션 (좌상단 기준)
  useEffect(() => {
    // 초기 로딩 시 약간의 지연 후 시작
    const timer = setTimeout(() => {
      animateCircle('login', '0 0')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const goToAgreement = () => {
    if (animating) return
    // 우하단 기준으로 애니메이션
    navigate('/login?step=agreement')
  }

  const goToSignUp = () => {
    if (animating) return
    // 단순 폼 교체 (애니메이션 없음)
    navigate('/login?step=signup')
  }

  const goToLogin = () => {
    if (animating) return
    // 좌상단 기준으로 애니메이션
    navigate('/login')
  }

  const globalClass =
    step === 'login'
      ? 'step-login'
      : step === 'agreement'
        ? 'step-agreement'
        : step === 'signup'
          ? 'step-signup'
          : ''

  return (
    <>
      {/* 애니메이션 원 */}
      <div ref={overlayRef} className={css.initOverlay} />

      {/* 실제 화면 - 초기 상태에서는 숨김 */}
      <div className={`${css.container} ${globalClass} ${step === 'init' ? css.hidden : ''}`}>
        <div className={css.row}>
          <div className={`${css.col} ${css.left}`}>
            {step === 'login' && <img src="/logo1.png" className={css.logoImg1} alt="Logo 1" />}
            {step === 'agreement' && (
              <img src="/U+Logo.png" className={css.logoImg2} alt="U+ Logo" />
            )}
            {step === 'signup' && (
              <img src="/PickLogo.png" className={css.logoImg3} alt="Pick Logo" />
            )}
          </div>
          <div className={`${css.col} ${css.right}`}>
            {step === 'login' && <LoginForm onNext={goToAgreement} />}
            {step === 'agreement' && <SignUpAgreement onNext={goToSignUp} goToLogin={goToLogin} />}
            {step === 'signup' && <SignUpForm onBack={goToAgreement} goToLogin={goToLogin} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
