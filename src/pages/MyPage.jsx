import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MypageCard from '../components/MyPage/MypageCard'
import '../styles/scss/MyPage.scss'
import PaymentBtn from '../components/paymentBtn'

const MyPage = () => {
  const navigate = useNavigate()

  // JWT 토큰 유효성 검사 함수
  const isTokenValid = () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return false

      // JWT 토큰을 디코딩하여 만료 시간 확인
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000 // 현재 시간을 초 단위로 변환

      // 토큰이 만료되었는지 확인
      if (payload.exp && payload.exp < currentTime) {
        // 만료된 토큰 제거
        localStorage.removeItem('token')
        return false
      }

      return true
    } catch (error) {
      console.error('토큰 검증 에러:', error)
      // 잘못된 토큰 제거
      localStorage.removeItem('token')
      return false
    }
  }

  // 컴포넌트 마운트 시 토큰 검증
  useEffect(() => {
    if (!isTokenValid()) {
      // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
      navigate('/login', { replace: true })
    }
  }, [navigate])

  // localStorage 변화 감지 (로그아웃 시)
  useEffect(() => {
    const handleStorageChange = () => {
      if (!isTokenValid()) {
        navigate('/login', { replace: true })
      }
    }

    // storage 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange)

    // 같은 탭에서의 변경사항도 감지하기 위한 주기적 확인
    const intervalId = setInterval(() => {
      if (!isTokenValid()) {
        navigate('/login', { replace: true })
      }
    }, 5000) // 5초마다 확인

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [navigate])

  return (
    <div className="mypage-page">
      <MypageCard />
      {/* <PaymentBtn /> */}
    </div>
  )
}

export default MyPage
