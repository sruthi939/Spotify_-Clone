import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { filter, setFilter } = useContext(PlayerContext)

  const [isDownloading, setIsDownloading] = useState(false)

  return (
    <>
      {/* Top Navbar */}
      <div className='w-full flex justify-between items-center font-semibold'>

        {/* Navigation Buttons */}
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='w-10 h-10 bg-[#0f0f0f] border border-[#222] rounded-full flex items-center justify-center hover:border-[#D4AF37] transition-all'
          >
            <ArrowLeft className='w-5 h-5 text-white' />
          </button>

          <button
            onClick={() => navigate(1)}
            className='w-10 h-10 bg-[#0f0f0f] border border-[#222] rounded-full flex items-center justify-center hover:border-[#D4AF37] transition-all'
          >
            <ArrowRight className='w-5 h-5 text-white' />
          </button>
        </div>

        {/* Right Buttons */}
        <div className='flex items-center gap-4'>

          <button 
            onClick={() => navigate('/premium')}
            className='hidden md:block bg-gradient-to-r from-[#D4AF37] to-[#b39024] text-black text-[11px] px-5 py-2 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]'>
            Explore Premium
          </button>

          <button 
            onClick={() => {
                setIsDownloading(true);
                setTimeout(() => setIsDownloading(false), 3000);
            }}
            className='flex items-center gap-2 bg-[#0f0f0f] border border-[#222] px-4 py-2 rounded-full text-[11px] font-semibold hover:border-[#1ED760] hover:text-[#1ED760] hover:shadow-[0_0_15px_rgba(30,215,96,0.2)] transition-all'>
            {isDownloading ? (
                <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
                    <span>Installing...</span>
                </div>
            ) : (
                <>
                    <Download className='w-4 h-4' />
                    Install App
                </>
            )}
          </button>

          <div 
            onClick={() => navigate('/profile')}
            className='w-10 h-10 rounded-full bg-gradient-to-br from-[#1ED760] to-[#159f46] text-black font-bold flex items-center justify-center shadow-[0_0_15px_rgba(30,215,96,0.4)] cursor-pointer hover:scale-110 transition-all text-sm'>
            D
          </div>

        </div>
      </div>

      {/* Filter Tabs - Only show on home, music, or podcasts */}
      {['/', '/music', '/podcasts'].includes(location.pathname) && (
        <div className='flex items-center gap-3 mt-6'>
          <button 
            onClick={() => { setFilter('All'); navigate('/'); }}
            className={`${filter === 'All' ? 'bg-gradient-to-r from-[#D4AF37] to-[#b39024] text-black' : 'bg-[#111] border border-[#222] text-white'} px-5 py-2 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:scale-105 transition-all`}>
            All
          </button>

          <button 
            onClick={() => { setFilter('Music'); navigate('/music'); }}
            className={`${filter === 'Music' ? 'bg-[#1ED760] text-black' : 'bg-[#111] border border-[#222] text-white'} px-5 py-2 rounded-full text-xs font-semibold hover:border-[#1ED760] transition-all`}>
            Music
          </button>

          <button 
            onClick={() => { setFilter('Podcasts'); navigate('/podcasts'); }}
            className={`${filter === 'Podcasts' ? 'bg-[#1ED760] text-black' : 'bg-[#111] border border-[#222] text-white'} px-5 py-2 rounded-full text-xs font-semibold hover:border-[#1ED760] transition-all`}>
            Podcasts
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar