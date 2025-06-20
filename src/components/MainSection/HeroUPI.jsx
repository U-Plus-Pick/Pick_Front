import React from 'react'
import css from '../../styles/scss/HeroUPI.module.scss'
import HeroWalkingUPI from '../../assets/HeroWalkingUPI.mp4'

const HeroUPI = () => {
  return (
    <section className={css.heroUPI}>
      <div className={css.leftText}>
        복잡한 통신 속,
        <br />
        당신을 가장 먼저
        <br />
        <span className={css.highlight1}>이해하는</span> 존재
      </div>

      <video className={css.upi} src={HeroWalkingUPI} autoPlay muted loop playsInline />

      <div className={css.rightText}>
        <p>
          <span className={css.highlight2}>U+</span>
          <br />
          <span className={css.highlight2}>P</span>ersonal
          <br />
          <span className={css.highlight2}>I</span>ntelligence
          <br />
          <span className={css.highlight2}>유피</span>가 함께합니다.
        </p>
      </div>
    </section>
  )
}

export default HeroUPI
