import React from 'react'
import { useNavigate } from 'react-router-dom'

function PayFailedPage() {
  const navigate = useNavigate()
  const closeModal = () => {
    navigate('/')
  }
  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>결제 실패 </h2>
        <button onClick={closeModal}>확인</button>
      </div>
    </div>
  )
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
}

export default PayFailedPage
