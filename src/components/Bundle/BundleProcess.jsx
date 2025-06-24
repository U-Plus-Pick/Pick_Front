import React from 'react'
import css from '../../styles/scss/BundlePlan.module.scss'
import { processSteps } from '../../constants/BundleData'
import '../../styles/scss/BundleProcess.scss'

const BundleProcess = () => {
  return (
    <section className={css.planSection}>
      <div className={css.inner} style={{ placeItems: 'center', paddingBottom: 150 }}>
        <h2 className={css.title}>투게더 결합은 이렇게 진행돼요!</h2>
        <div className="process-container">
          {processSteps.map((step, index) => {
            let arrowClass = ''
            if (index === 0 || index === 1) {
              arrowClass = 'right'
            } else if (index === 2) {
              arrowClass = 'down'
            } else if (index === 3 || index === 4) {
              arrowClass = 'left'
            }
            return (
              <div className="process-item" key={index}>
                <h3>{step.step}</h3>
                <img src={step.img} alt={step.title} />
                <div>
                  <p className="process-title">{step.title}</p>
                  <p className="process-desc">{step.desc}</p>
                </div>
                {step.tag && <span className="leader-tag">{step.tag}</span>}
                {index !== processSteps.length - 1 && <div className={`arrow ${arrowClass}`} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BundleProcess
