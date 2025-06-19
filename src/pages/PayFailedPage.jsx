import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import upi from '../assets/PaidFail.png'

import './PaySuccessPage.scss'

export default function PayFailedPage() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)

  const handleCloseModal = targetPath => {
    setShowModal(false)
    navigate(targetPath)
  }

  return (
    <>
      {showModal && (
        <div className="pay-modal">
          <div className="pay-modal-wrapper fail">
            <h1 className="pay-modal-title">결제가 실패했습니다.</h1>
            <img className="image" alt="결제 유피" src={upi} />
            <p>결제에 실패했습니다. 다시 시도해 주세요.</p>
            <div className="group-btn">
              <button onClick={() => handleCloseModal('/mypage')}>마이페이지로 이동</button>
              <button onClick={() => handleCloseModal('/')}>홈으로 이동</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
