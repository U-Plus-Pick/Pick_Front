import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PaymentBtn from './components/PaymentBtn'
import { SuccessPage, FailPage } from './pages/PaySuccess'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentBtn />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />
      </Routes>
    </Router>
  )
}

export default App
