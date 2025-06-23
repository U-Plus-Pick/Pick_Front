import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatbotPage from './pages/ChatbotPage'
import PaySuccess from './pages/PaySuccessPage'
import MyPage from './pages/MyPage'
import PayFailedPage from './pages/PayFailedPage'
import MainLayout from './layouts/MainLayout'
import MainPage from './pages/MainPage'
import BundleApply from './pages/BundleApplyPage'

import './styles/scss/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        {/* Header 있음 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/bundle" />
          <Route path="/bundle/apply" element={<BundleApply />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/login" />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/membership" />
        </Route>
        {/* Header 없음 */}
        <Route path="/payment/success" element={<PaySuccess />} />
        <Route path="/payment/fail" element={<PayFailedPage />} />
      </Routes>
    </Router>
  )
}

export default App
