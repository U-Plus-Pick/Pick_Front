import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ChatbotPage from './pages/ChatbotPage'
import './styles/scss/main.scss'
import PaymentBtn from './components/PaymentBtn'
import PaySuccess from './pages/PaySuccessPage'
import MyPage from './pages/MyPage'
import PayFailedPage from './pages/PayFailedPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/" element={<PaymentBtn />} />
            <Route path="/payment/success" element={<PaySuccess />} />
            <Route path="/payment/fail" element={<PayFailedPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
