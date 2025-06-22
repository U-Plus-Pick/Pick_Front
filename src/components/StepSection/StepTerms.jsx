import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdNavigateNext } from 'react-icons/md'

const StepTerms = ({ onNext }) => {
  const [selectedTerm, setSelectedTerm] = useState('privacy')
  const [checkedTerms, setCheckedTerms] = useState([])

  const termsList = [
    {
      key: 'privacy',
      title: '개인정보 수집 및 이용 동의',
      desc: '이름, 연락처 등은 파티 매칭을 위해 수집돼요.',
      detail: {
        '1) 수집 항목': '이름, 생년월일, 연락처',
        '2) 수집 목적': '결합 파티 매칭 및 정산 처리\n결합 진행을 위한 파티장/파티원 간 식별',
        '3) 보유 및 이용기간': '서비스 이용 종료 또는 결합 종료일 기준 30일 후 파기',
        '4) 동의 거부 시 불이익': '동의를 거부할 수 있으나, 결합 서비스 이용이 제한될 수 있습니다.',
      },
    },
    {
      key: 'thirdparty',
      title: '제3자 제공 동의',
      desc: '파티장에게 이름/연락처/생년월일을 공유해요.',
      detail: {
        '1) 제공받는 자': '결합 그룹의 대표장',
        '2) 제공 항목': '이름, 생년월일, 연락처',
        '3) 제공 목적': '결합원 본인 확인, 정산 내역 확인, 연락 필요 시 사용',
        '4) 보유 및 이용 기간': '결합 종료일 기준 30일 후 파기',
        '5) 동의 거부 시 불이익': '동의를 거부할 경우, 결합 서비스 이용이 불가능합니다.',
      },
    },
    {
      key: 'payment',
      title: '결제정보 수집 및 자동 정산 동의',
      desc: '카드 정보 또는 계좌 정보를 받아요.',
      detail: {
        '1) 수집 항목': '카드 정보(파티원) 또는 계좌 정보(파티장)를 받아요.',
        '2) 수집 목적': '자동 결제와 정산 송금을 위해 필요해요.',
        '3) 이용 및 보관 기간': '서비스 이용 중에만 보관되고, 탈퇴 후엔 삭제돼요.',
        '4) 결제 및 정산 처리 방식': '파티원은 매달 자동 결제되고, 파티장에게는 정산금이 입금돼요.',
        '5) 동의 거부 시 불이익': '동의를 거부할 경우, 결합 서비스 이용이 불가능합니다.',
      },
    },
    {
      key: 'autopay',
      title: '서비스 이용료 자동결제 동의',
      desc: '매월 정기적으로 이용료가 요금에 포함돼요.',
      detail: {
        '1) 이용료':
          '파티원: 월 3,000원\n파티장: 월 1,500원\n(부가세 포함, 통신요금과는 별도로 청구됨)',
        '2) 결제 방식': '매월 1일 자동결제 (최초 결합일 기준)',
        '3) 이용료 목적': '결합 매칭, 파티 관리, 정산 지원, 플랫폼 유지 및 고객 응대 비용',
        '4) 해지 및 환불':
          '탈퇴 시 다음 결제분부터 부과되지 않으며, 당월 이용료는 환불되지 않습니다.',
        '5) 동의 거부 시 불이익': '결합 신청이 불가능합니다.',
      },
    },
    {
      key: 'terms',
      title: '서비스 이용약관 동의',
      desc: '파티 해지, 정산 방식, 매칭 운영 등 모든 서비스 정책에 동의해요.',
      detail: {
        '1) 정산 기준': '결합원 요금 납부 완료 후 매월 1일 자동 정산',
        '2) 중도 탈퇴 시 정산 규칙': '할인 금액 기준 손해 정산, 대표자 보전 기준',
        '3) 파티 구성 유지 조건': '인원이 2명 이하가 되면 자동 해지',
        '4) 대표자 역할과 책임': '요금 납부 및 정산 책임',
        '5) 매칭 지연 안내': '매칭에 수일이 소요될 수 있으며, 매칭 전까지 요금 미청구',
        '6) 전체 약관 보기': '약관 전체는 [서비스 이용약관 전체보기]를 통해 확인하실 수 있습니다.',
      },
    },
  ]

  const handleToggleCheck = key => {
    if (checkedTerms.includes(key)) {
      setCheckedTerms(prev => prev.filter(item => item !== key))
    } else {
      setCheckedTerms(prev => [...prev, key])
    }
  }

  const allChecked = checkedTerms.length === termsList.length

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
          {termsList.map(term => (
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
            {Object.entries(termsList.find(term => term.key === selectedTerm)?.detail || {}).map(
              ([title, content]) => (
                <div key={title} style={{ marginBottom: '12px' }}>
                  <strong>{title}</strong>
                  <p style={{ whiteSpace: 'pre-line', marginTop: '4px' }}>{content}</p>
                </div>
              )
            )}
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
