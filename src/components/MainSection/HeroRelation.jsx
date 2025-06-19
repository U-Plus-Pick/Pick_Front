import React from 'react'
import useScrollStep from '../../hooks/ScollStep'
import css from '../../styles/scss/HeroRelation.module.scss'
import HeroRelation1 from '../../assets/HeroRelation1.png'
import HeroRelation2 from '../../assets/HeroRelation2.png'
import HeroRelation3 from '../../assets/HeroRelation3.png'
import HeroRelationLeft from '../../assets/HeroRelationLeft.png'
import HeroRelationRight from '../../assets/HeroRelationRight.png'
import HeroLine from '../../assets/HeroLine.png'
import HeroLineCurve from '../../assets/HeroCurveLine.png'

const texts = [
  {
    lines: [
      '바쁜 일상 속',
      '<span class="pink">복잡한 통신 생활</span>',
      '',
      '더 이상',
      '<span class="purple">놓치지 마세요.</span>',
    ],
  },
  {
    lines: [
      'LG U+는',
      '언제나 <span class="pink">고객님</span>과',
      '더 가깝게 <span class="purple">연결</span>됩니다.',
    ],
  },
  {
    lines: [
      '<span class="pink">U+Pick</span> 과 함께',
      '요금제부터 멤버십까지',
      '더 <span class="purple">쉽고</span>, 더 <span class="purple">간편하게</span>',
    ],
  },
]

const HeroRelation = () => {
  const step = useScrollStep(4)

  return (
    <section className={css.heroRelation}>
      <h2 className={css.title}>
        <span className={css.lg}>LG U+</span>의 혜택
        <br />
        <span className={css.pick}>U+Pick</span>으로 더 가깝게
      </h2>

      <div className={css.content}>
        <img src={HeroRelationLeft} alt="left penguin" className={css.HeroRelationLeft} />

        <div className={css.cardWrapper}>
          <img src={HeroLine} alt="line1" className={css.lineOne} />
          <img src={HeroLine} alt="line2" className={css.lineTwo} />
          <img src={HeroLineCurve} alt="lineCurve" className={css.lineCurve} />

          {[HeroRelation1, HeroRelation2, HeroRelation3].map((img, i) => (
            <div key={i} className={`${css.card} ${step >= i + 1 ? css.flipped : ''}`}>
              <div className={css.cardInner}>
                <div className={css.cardFront}>
                  <img src={img} alt={`card${i + 1}`} className={css[`HeroRelation${i + 1}`]} />
                </div>
                <div className={css.cardBack}>
                  <img src={img} alt={`bg${i + 1}`} className={css.cardBackImageBehind} />
                  <div className={css.cardText}>
                    {texts[i].lines.map((line, index) =>
                      line === '' ? (
                        <br key={index} />
                      ) : (
                        <p
                          key={index}
                          className={css.line}
                          dangerouslySetInnerHTML={{ __html: line }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <img src={HeroRelationRight} alt="right penguin" className={css.HeroRelationRight} />
      </div>
    </section>
  )
}

export default HeroRelation
