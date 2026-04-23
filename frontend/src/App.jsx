import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const { audioRef, track } = useContext(PlayerContext)

  return (
    <div className='h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={
          <>
            <div className='h-[92%] flex'>
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
