import React from 'react'
import css from '../../styles/scss/HeroMembershipMap.module.scss'
import HeroMap from '../../assets/HeroMap.png'
import HeroMapInfo from '../../assets/HeroMapInfo.png'
import HeroCGV from '../../assets/HeroCGV.png'
import HeroGS from '../../assets/HeroGS.png'
import HeroMapMarker from '../../assets/HeroMapMarker.png'

const HeroMembershipMap = () => {
  return (
    <section className={css.mapSection}>
      <h2 className={css.title}>
        바로 옆 <span className={css.highlight}>멤버십</span> 혜택
        <br />
        놓치지 마세요.
      </h2>

      <div className={css.cardWrapper}>
        <div className={css.card}>
          {/* 왼쪽 카드드 */}
          <div className={css.leftContent}>
            <div className={css.block}>
              <h3>
                혜택 <span className={css.pink}>플랫폼 위치</span>를 한 눈에
              </h3>
              <p>분석해 딱 맞는 요금제를 추천해드립니다.</p>
              <div className={css.logoCards}>
                <div className={css.logoCard}>
                  <img src={HeroCGV} alt="CGV" />
                </div>
                <div className={css.logoCard}>
                  <img src={HeroGS} alt="GS25" />
                </div>
              </div>
            </div>

            <div className={css.block}>
              <h3>
                혜택 플랫폼의 <span className={css.purple}>정보 제공</span>
              </h3>
              <p>
                <span className={css.pink}>멤버십</span> 혜택을 받을 수 있는
                <br />
                플랫폼의 <span className={css.purple}>정보</span>를 함께 알려드려요.
              </p>
              <img src={HeroMapInfo} alt="GS25 상세정보 박스" className={css.mapInfoImage} />
            </div>
          </div>

          {/* 오른쪽 카드 */}

          <div className={css.rightContent}>
            <div className={css.mapWrapper}>
              <img src={HeroMap} alt="지도" className={css.mapImage} />

              <div className={css.purpleBox}>
                <img src={HeroMapInfo} className={css.focusedImageInsideBox} />
              </div>

              <div className={css.pinkBox}>
                <img src={HeroMapMarker} className={css.focusedImageInsideBox} />
              </div>
            </div>
          </div>
        </div>
        <div className={css.purpleLine}></div>
        <div className={css.pinkLine}></div>
      </div>
    </section>
  )
}

export default HeroMembershipMap
