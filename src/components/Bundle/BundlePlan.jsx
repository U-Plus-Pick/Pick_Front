import React from 'react'
import css from '../../styles/scss/BundlePlan.module.scss'
import BundlePlanImg from '../../assets/BundlePlan/BundlePlanImg.png'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi'

const plans = [
  {
    name: '5G 프리미어 에센셜',
    price: '(85,000원)',
    details: [
      { label: '데이터', value: '무제한', sub: '테더링+쉐어링 70GB' },
      { label: '전화', value: '무제한', sub: '부가통화 300분' },
      { label: '문자', value: '기본 제공' },
      { label: '기본혜택', value: 'U+ 모바일tv 기본 월정액' },
    ],
    total: '65,000원',
  },
  {
    name: '5G 프리미어 레귤러',
    price: '(95,000원)',
    details: [
      { label: '데이터', value: '무제한', sub: '테더링+쉐어링 80GB' },
      { label: '전화', value: '무제한' },
      { label: '문자', value: '기본 제공' },
      { label: '기본혜택', value: 'U+ 모바일tv 기본 월정액' },
      { label: '스마트기기', value: '1대 월정액 할인' },
    ],
    total: '75,000원',
  },
  {
    name: '5G 프리미어 플러스',
    price: '(105,000원)',
    details: [
      { label: '데이터', value: '무제한', sub: '테더링+쉐어링 100GB' },
      { label: '전화', value: '무제한' },
      { label: '문자', value: '기본 제공' },
      { label: '기본혜택', value: 'U+ 모바일tv\n기본 월정액' },
      { label: '스마트기기', value: '2대 월정액 할인' },
    ],
    total: '85,000원',
  },
]

const BundlePlan = () => {
  return (
    <section className={css.planSection}>
      <div className={css.inner}>
        <h2 className={css.title}>
          <span className={css.highlight}>투게더 결합</span>은 이 요금제로만 받으실 수 있어요!
        </h2>

        <div className={css.content}>
          <div className={css.conditionCard}>
            <h3>가입 조건</h3>
            <img src={BundlePlanImg} alt="가입조건 펭귄" />
            <p className={css.planLabel}>5G/LTE 무제한 요금제</p>
            <p className={css.note}>※ 속도 제한 요금제, 나눔 요금제 제외</p>
          </div>

          <div className={css.arrow}>
            <HiOutlineChevronDoubleRight size={36} color="#f5277c" />
          </div>

          <div className={css.planWrapper}>
            <h3 className={css.planHeader}>추천 요금제</h3>
            <div className={css.planCards}>
              {plans.map((plan, idx) => (
                <div key={idx} className={css.planCard}>
                  <h4>{plan.name}</h4>
                  <p className={css.price}>{plan.price}</p>
                  <ul>
                    {plan.details.map((item, i) => (
                      <li key={i} className={css.detailItem}>
                        <div className={css.detailRow}>
                          <span className={css.label}>{item.label}</span>
                          <span className={css.colon}>:</span>
                          <span className={css.value}>{item.value}</span>
                        </div>
                        {item.sub && <div className={css.subText}>{item.sub}</div>}
                      </li>
                    ))}
                  </ul>
                  <div className={css.finalPrice}>
                    <strong>{plan.total}</strong>/인당
                    <p className={css.discount}>20,000원 투게더 결합할인</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BundlePlan
