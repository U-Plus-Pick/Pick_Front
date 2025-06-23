import { allowedPlans } from '../../constants/StepData'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosCloseCircle } from 'react-icons/io'

const StepPersonalInfo = ({ onNext, userApiData }) => {
  const formatPhoneNumber = phone => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 - $2 - $3')
  }

  const confirmPlans = plans => {
    if (plans.length < 1) return 'none'
    return allowedPlans.includes(plans) ? 'allowed' : 'not'
  }
  const phoneNumber = formatPhoneNumber(userApiData?.user_phone)
  const userEmail = userApiData?.user_email
  const userBirth = userApiData?.user_birth
  const userPlans = userApiData?.plans
  const userName = userApiData?.user_name
  const isPlans = confirmPlans(userPlans)
  const isAllowed = isPlans === 'allowed'

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>[{userName}]님의 개인 정보를 확인해 주세요</h2>
        <p>개인 정보는 마이페이지에서 변경 가능합니다.</p>
      </div>
      <div className="step-input-wrapper personal">
        <div>
          <p>LG U+ 휴대폰 번호</p>
          <input value={phoneNumber} disabled />
        </div>
        <div>
          <p>이메일</p>
          <input value={userEmail} disabled />
        </div>
        <div>
          <p>생년월일</p>
          <input value={userBirth} disabled />
        </div>
        <div className={`${isPlans}`}>
          <p>요금제</p>
          <div className="plans-allowed-input">
            <input value={userPlans} disabled />
            {isAllowed ? (
              <FaCircleCheck color={'#1da511'} />
            ) : (
              <IoIosCloseCircle color={'#dc3545'} />
            )}
          </div>
          <p className="plans-info">
            {isPlans === 'allowed' && `'${userPlans}'는 지인 결합 할인이 가능한 요금제입니다.`}
            {isPlans === 'not' && `'${userPlans}'은 지인 결합 할인이 불가능한 요금제입니다.`}
            {isPlans === 'none' && '선택된 요금제가 없습니다. 마이페이지에서 설정해주세요.'}
          </p>
        </div>
      </div>
      <button
        className="step-next"
        disabled={!isAllowed}
        style={{
          backgroundColor: isAllowed ? '#e6007e' : '#ccc',
          cursor: isAllowed ? 'pointer' : 'not-allowed',
        }}
        onClick={onNext}
      >
        다음
      </button>
    </div>
  )
}

export default StepPersonalInfo
