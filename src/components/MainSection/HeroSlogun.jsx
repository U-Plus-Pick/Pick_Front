import React from 'react'
import css from '../../styles/scss/HeroSlogun.module.scss'

const HeroSlogun = () => {
  return (
    <section className={css.heroSlogun}>
      <div className={css.textLeft}>
        당신의 <span>U+</span>
      </div>

      <div className={css.centerCircle}>U⁺Pick</div>

      <div className={css.textRight}>
        당신만의 <span>AI</span>
      </div>

      <div className={`${css.ring} ${css.ring1}`}></div>
      <div className={`${css.ring} ${css.ring2}`}></div>
      <div className={`${css.ring} ${css.ring3}`}></div>
      <div className={`${css.ring} ${css.ring4}`}></div>
    </section>
  )
}

export default HeroSlogun
