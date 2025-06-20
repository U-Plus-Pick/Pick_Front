import React from 'react'
import css from '../../styles/scss/HeroLastPage.module.scss'
import HeroLast from '../../assets/HeroLast.png'
import { FiArrowUpRight } from 'react-icons/fi'

const HeroLastPage = () => {
  return (
    <section className={css.heroLast}>
      <div className={css.card}>
        <img src={HeroLast} alt="HeroLast" className={css.HeroLast} />
        <p className={css.subText}>가입 후 즉시 사용 가능합니다.</p>
        <h2 className={css.title}>
          <span className={css.highlight1}>U+Pick</span>
          <span>을 시작할 준비가 되셨나요?</span>
        </h2>
        <div className={css.buttonGroup}>
          <button className={css.loginBtn}>
            로그인 하러 가기
            <div className={css.iconWrapper1}>
              <FiArrowUpRight />
            </div>
          </button>
          <button className={css.consultBtn}>
            요금제 상담하기
            <div className={css.iconWrapper2}>
              <FiArrowUpRight />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroLastPage
