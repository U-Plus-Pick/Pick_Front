import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <section className="hero-section">
          <h1>U+Pick</h1>
          <p className="hero-subtitle">당신에게 맞는 완벽한 요금제를 찾아드립니다</p>
          <p className="hero-description">
            AI 유피가 개인의 사용 패턴을 분석하여 최적의 요금제를 추천해드립니다.
          </p>

          <div className="cta-buttons">
            <Link to="/chatbot" className="btn btn-primary">
              AI 상담 시작하기
            </Link>
            <Link to="/chatbot?type=plan" className="btn btn-secondary">
              요금제 추천받기
            </Link>
          </div>
        </section>

        <section className="features-section">
          <h2>U+Pick의 특별한 기능</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>요금제 추천</h3>
              <p>사용 패턴을 분석하여 가장 적합한 요금제를 추천해드립니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>결합 할인</h3>
              <p>인터넷과 모바일을 함께 사용하면 더 큰 할인 혜택을 받을 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>멤버십 혜택</h3>
              <p>다양한 멤버십 혜택과 특별한 서비스를 경험해보세요.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
