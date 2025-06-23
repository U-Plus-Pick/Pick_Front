import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdNavigateNext } from 'react-icons/md'
import { termsContents } from '../../constants/StepData'

const StepTerms = ({ onNext }) => {
  const [selectedTerm, setSelectedTerm] = useState('privacy')
  const [checkedTerms, setCheckedTerms] = useState([])

  const handleToggleCheck = key => {
    if (checkedTerms.includes(key)) {
      setCheckedTerms(prev => prev.filter(item => item !== key))
    } else {
      setCheckedTerms(prev => [...prev, key])
    }
  }

  const allChecked = checkedTerms.length === termsContents.length

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>
          결합대표와 개인 정보를 공유하고
          <br />
          결합을 완료하기 위해 약관 동의가 필요해요
        </h2>
      </div>

      <div className="step-card-wrapper terms">
        <div className="step-card-twin">
          {termsContents.map(term => (
            <div key={term.key} className="terms-item" onClick={() => setSelectedTerm(term.key)}>
              <button
                className="terms-check"
                onClick={e => {
                  e.stopPropagation()
                  handleToggleCheck(term.key)
                }}
              >
                <FaCircleCheck color={checkedTerms.includes(term.key) ? 'green' : '#ccc'} />
              </button>
              <div className="terms-text">
                <div>
                  <p className="terms-title">{term.title}</p>
                  <button className="terms-detail">
                    <MdNavigateNext />
                  </button>
                </div>
                <p className="terms-desc">{term.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="step-card-twin">
          <div className="terms-detail-content">
            {Object.entries(
              termsContents.find(term => term.key === selectedTerm)?.detail || {}
            ).map(([title, content]) => (
              <div key={title} style={{ marginBottom: '12px' }}>
                <strong>{title}</strong>
                <p style={{ whiteSpace: 'pre-line', marginTop: '4px' }}>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="step-next"
        onClick={onNext}
        disabled={!allChecked}
        style={{
          backgroundColor: allChecked ? '#e6007e' : '#ccc',
          cursor: allChecked ? 'pointer' : 'not-allowed',
        }}
      >
        다음
      </button>
    </div>
  )
}

export default StepTerms
