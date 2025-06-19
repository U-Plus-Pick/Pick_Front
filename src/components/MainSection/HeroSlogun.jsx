import React from 'react'
import css from '../../styles/scss/HeroIntro.module.scss'

const HeroIntro = () => {
  return (
    <section className={css.heroIntro}>
      <div className={css.textLeft}>
        당신의 <span>U+</span>
      </div>

      <div className={css.centerCircle}>U⁺Pick</div>

      <div className={css.textRight}>
        당신만의 <span>AI</span>
      </div>

      {/* 동심원 배경 */}
      <div className={css.ring + ' ' + css.ring1}></div>
      <div className={css.ring + ' ' + css.ring2}></div>
      <div className={css.ring + ' ' + css.ring3}></div>
      <div className={css.ring + ' ' + css.ring4}></div>
    </section>
  )
}

export default HeroIntro
