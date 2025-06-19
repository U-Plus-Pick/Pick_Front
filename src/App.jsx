import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PaymentBtn from './components/PaymentBtn'
import PaySuccess from './pages/PaySuccessPage'
import MyPage from './pages/MyPage'
import PayFailedPage from './pages/PayFailedPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentBtn />} />
        <Route path="/payment/success" element={<PaySuccess />} />
        <Route path="/payment/fail" element={<PayFailedPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  )
}

export default App
