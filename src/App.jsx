import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatbotPage from './pages/ChatbotPage'
import PaySuccess from './pages/PaySuccessPage'
import MyPage from './pages/MyPage'
import PayFailedPage from './pages/PayFailedPage'
import MainLayout from './layouts/MainLayout'

import './styles/scss/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        {/* Header 있음 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        {/* Header 없음 */}
        <Route path="/payment/success" element={<PaySuccess />} />
        <Route path="/payment/fail" element={<PayFailedPage />} />
      </Routes>
    </Router>
  )
}

export default App
