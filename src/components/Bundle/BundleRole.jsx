import React, { useState } from 'react'
import css from '../../styles/scss/BundleRole.module.scss'
import BundleIntro1 from '../../assets/BundleIntro1.png'
import BundleRoleCard from './BundleRoleCard'
import { bundleRoleData } from './bundleRoleData'
import { FaCheck } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function BundleRole() {
  const [activeTab, setActiveTab] = useState('host')

  const handleToggle = tab => {
    setActiveTab(tab)
  }

  return (
    <section className={css.bundleRole}>
      <div className={css.toggleWrap}>
        {['host', 'member'].map(role => (
          <div
            key={role}
            className={`${css.toggleItem} ${css[role]} ${activeTab === role ? css.active : ''}`}
            onClick={() => handleToggle(role)}
          >
            <div className={css.imgCircle}>
              <img src={BundleIntro1} alt={role} />
              {activeTab === role && (
                <div className={css.check}>
                  <FaCheck />
                </div>
              )}
            </div>
            <div className={css.label}>{role === 'host' ? '결합 대표' : '결합원'}</div>
          </div>
        ))}
      </div>

      <div className={`${css.cardBox} ${activeTab === 'member' ? css.member : ''}`}>
        <div className={`${css.titleTag} ${activeTab === 'member' ? css.member : ''}`}>
          <span className={css.roleText}>{activeTab === 'host' ? '결합 대표' : '결합원'}</span>{' '}
          <span className={css.infoText}>이용 안내</span>
        </div>

        <div className={`${css.cardSlider} ${activeTab === 'member' ? css.member : css.host}`}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {bundleRoleData[activeTab].map((item, idx) => (
              <SwiperSlide key={idx}>
                <BundleRoleCard {...item} activeTab={activeTab} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
