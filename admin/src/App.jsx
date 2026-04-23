import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AddSong from './pages/AddSong'
import ListSong from './pages/ListSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import Analytics from './pages/Analytics'
import UserRoles from './pages/UserRoles'
import Settings from './pages/Settings'
import PaymentHistory from './pages/PaymentHistory'
import PremiumAccounts from './pages/PremiumAccounts'
import AdminProfile from './pages/AdminProfile'
import AdminLogin from './pages/AdminLogin'

export const url = 'http://localhost:4000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')

  useEffect(() => {
    if (token) {
        localStorage.setItem('adminToken', token)
    } else {
        localStorage.removeItem('adminToken')
    }
  }, [token])

  if (!token) {
    return <AdminLogin setToken={setToken} />
  }

  return (
    <div className='flex min-h-screen bg-[#050505] text-white font-sans selection:bg-[#1ED760]/30'>
      
      {/* Sidebar Navigation */}
      <Sidebar setToken={setToken} />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col h-screen overflow-hidden'>
        <Navbar />
        
        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505] scroll-smooth'>
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-album' element={<ListAlbum />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/user-roles' element={<UserRoles />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/payments' element={<PaymentHistory />} />
            <Route path='/premium' element={<PremiumAccounts />} />
            <Route path='/profile' element={<AdminProfile />} />
            <Route path='/' element={<Navigate to="/analytics" />} />
          </Routes>
        </div>

      </div>

    </div>
  )
}

export default App
