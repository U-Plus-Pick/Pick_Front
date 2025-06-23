import React, { useState } from 'react'
import css from '../../styles/scss/BundleRole.module.scss'
import BundleIntro1 from '../../assets/BundleIntro1.png'
import BundleRoleCard from './BundleRoleCard'
import { bundleRoleData } from './bundleRoleData'
import { FaCheck } from 'react-icons/fa'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function BundleRole() {
  const [activeTab, setActiveTab] = useState('host')

  const handleToggle = tab => {
    setActiveTab(tab)
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
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

        <div className={css.cardSlider}>
          <Slider {...settings}>
            {bundleRoleData[activeTab].map((item, idx) => (
              <BundleRoleCard key={idx} {...item} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
