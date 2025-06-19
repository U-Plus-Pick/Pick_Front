import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const handleMenuClick = menu => {
    setActiveMenu(menu)
    if (menu === 'plan') {
      navigate('/chatbot')
    } else if (menu === 'matching') {
      navigate('/')
    } else if (menu === 'map') {
      navigate('/')
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveMenu('')
  }
  const handleSignup = () => {
    console.log('회원가입 클릭')
  }

  const handleMyPage = () => {
    console.log('마이페이지 클릭')
  }

  const handleLogoClick = () => {
    navigate('/')
    setActiveMenu('')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img
            src="/logo.png"
            alt="U+Pick"
            className="logo-image"
            onClick={handleLogoClick}
            title="홈으로 이동"
          />
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link`}
                onClick={e => {
                  e.preventDefault()
                  handleMenuClick('plan')
                }}
              >
                요금제 추천
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${activeMenu === 'matching' ? 'active' : ''}`}
                onClick={e => {
                  e.preventDefault()
                  handleMenuClick('matching')
                }}
              >
                결합 매칭
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${activeMenu === 'map' ? 'active' : ''}`}
                onClick={e => {
                  e.preventDefault()
                  handleMenuClick('map')
                }}
              >
                멤버십 지도
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-buttons">
          {isLoggedIn ? (
            <>
              <button className="btn btn-mypage" onClick={handleMyPage}>
                마이페이지
              </button>
              <button className="btn btn-logout" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-login" onClick={handleLogin}>
                로그인
              </button>
              <button className="btn btn-signup" onClick={handleSignup}>
                가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
