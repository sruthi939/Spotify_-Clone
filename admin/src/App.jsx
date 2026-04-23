import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AddSong from './pages/AddSong'
import ListSong from './pages/ListSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import Analytics from './pages/Analytics'
import UserRoles from './pages/UserRoles'
import Settings from './pages/Settings'

export const url = 'http://localhost:4000'

const App = () => {
  return (
    <div className='flex min-h-screen bg-[#050505] text-white font-sans'>
      
      {/* Sidebar Navigation */}
      <Sidebar />

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
            <Route path='/' element={<Analytics />} /> {/* Changed default to Analytics for 'fair' look */}
          </Routes>
        </div>

      </div>

    </div>
  )
}

export default App
