import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatbotPage from './pages/ChatbotPage'
import PaySuccess from './pages/PaySuccessPage'
import MyPage from './pages/MyPage'
import PayFailedPage from './pages/PayFailedPage'
import MainLayout from './layouts/MainLayout'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import BundlePage from './pages/BundlePage'
import BundleApply from './pages/BundleApplyPage'
import MembershipPage from './pages/MembershipPage'

import './styles/scss/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        {/* Header 있음 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/bundle" element={<BundlePage />} />
          <Route path="/bundle/apply" element={<BundleApply />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/membership" element={<MembershipPage />} />
        </Route>
        {/* Header 없음 */}
        <Route path="/payment/success" element={<PaySuccess />} />
        <Route path="/payment/fail" element={<PayFailedPage />} />
      </Routes>
    </Router>
  )
}

export default App
