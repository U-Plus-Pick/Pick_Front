import React, { useEffect, useRef, useState } from 'react'
import css from '../styles/scss/LoginPage.module.scss'
import gsap from 'gsap'
import LoginForm from '../components/Sign/LoginForm'
import SignUpAgreement from '../components/Sign/SignUpAgreement'
import SignUpForm from '../components/Sign/SignUpForm'

const LoginPage = () => {
  const [step, setStep] = useState('init')
  const [animating, setAnimating] = useState(false)
  const overlayRef = useRef(null)

  const animateCircle = (targetStep, origin) => {
    const ov = overlayRef.current
    if (!ov) return

    setAnimating(true)

    // 1) 공통 스타일 설정
    ov.style.position = 'fixed'
    ov.style.borderRadius = '50%'
    ov.style.background = 'linear-gradient(50deg, #ffc3c3 0%, #e6007e 88%)'
    ov.style.pointerEvents = 'none'
    ov.style.zIndex = '999'
    ov.style.display = 'block'
    ov.style.opacity = '1'

    // 2) 원의 중심 위치 및 크기 설정
    if (origin === '0 0') {
      // 좌상단: 원의 중심이 화면 좌상단 끝에 위치
      ov.style.width = '120vw' // 더 작은 원
      ov.style.height = '120vw'
      ov.style.top = '-60vw' // 원의 중심이 화면 상단 끝
      ov.style.left = '-60vw' // 원의 중심이 화면 좌측 끝
      ov.style.right = 'auto'
      ov.style.bottom = 'auto'
      ov.style.transformOrigin = 'center center'
    } else {
      // 우하단: 원의 중심이 화면 우하단 끝에 위치
      ov.style.width = '120vw'
      ov.style.height = '120vw'
      ov.style.top = 'auto'
      ov.style.left = 'auto'
      ov.style.bottom = '-60vw' // 원의 중심이 화면 하단 끝
      ov.style.right = '-60vw' // 원의 중심이 화면 우측 끝
      ov.style.transformOrigin = 'center center'
    }

    // 3) 애니메이션 시퀀스
    const tl = gsap.timeline()

    // 첫 번째: 전체 화면을 덮도록 큰 스케일로 시작
    tl.set(ov, { scale: 2.5 }) // 300vw 크기로 전체 화면 덮음

    // 두 번째: 원을 원래 크기로 축소 (1/4 원만 보이게, 화면의 60% 차지)
    tl.to(ov, {
      scale: 1, // 120vw로 축소 → 화면의 60% 정도 차지
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        // 애니메이션 완료 후 콘텐츠 표시
        setStep(targetStep)
        // z-index를 낮춰서 폼이 원 위에 보이도록
        ov.style.zIndex = '1'
        setAnimating(false)
      },
    })
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
    animateCircle('agreement', '100% 100%')
  }

  const goToSignUp = () => {
    if (animating) return
    // 단순 폼 교체 (애니메이션 없음)
    setStep('signup')
  }

  const goToLogin = () => {
    if (animating) return
    // 좌상단 기준으로 애니메이션
    animateCircle('login', '0 0')
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
            {step === 'agreement' && <SignUpAgreement onNext={goToSignUp} onBack={goToLogin} />}
            {step === 'signup' && <SignUpForm onBack={goToAgreement} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
