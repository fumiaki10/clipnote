import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='app-container'>
      <Sidebar onClickNew={() => setIsModalOpen(true)}/>
        <div className="main-content">
          <Header />
        </div>
    </div>
    
  )
}

export default App
