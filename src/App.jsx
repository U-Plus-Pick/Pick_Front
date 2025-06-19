import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ChatbotPage from './pages/ChatbotPage'
import './styles/scss/main.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/chatbot" element={<ChatbotPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
