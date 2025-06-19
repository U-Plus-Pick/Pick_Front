import React from 'react'
import css from '../../styles/scss/HeroAssistant.module.scss'
import UpiImage from '../../assets/HeroIamge2.png' // 너 이미지명 정확히 다시 확인해줘

const HeroAssistant = () => {
  return (
    <section className={css.heroAssistant}>
      <div className={css.leftText}>
        복잡한 통신 속,
        <br />
        당신을 가장 먼저
        <br />
        <span>이해하는</span> 존재
      </div>

      <img className={css.upi} src={UpiImage} alt="유피 캐릭터" />

      <div className={css.rightText}>
        <span className={css.uplus}>U+</span>
        <br />
        <strong>Personal</strong>
        <br />
        <strong>Intelligence</strong>
        <br />
        <span className={css.name}>유피</span>가 함께합니다.
      </div>
    </section>
  )
}

export default HeroAssistant
