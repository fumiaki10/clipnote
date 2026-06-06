import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainArea from './components/MainArea'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='app-container'>
      <Sidebar onClickNew={() => setIsModalOpen(true)} />
      <div className="main-content">
        <Header />
        <MainArea />
      </div>
    </div>

  )
}

export default App
