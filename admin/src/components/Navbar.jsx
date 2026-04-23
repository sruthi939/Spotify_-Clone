import React, { useState } from 'react'
import { Search, Bell, User, ChevronDown, CheckCircle, Info } from 'lucide-react'

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='flex items-center justify-between p-6 bg-[#050505] border-b border-[#111] sticky top-0 z-50'>
      
      {/* Search */}
      <div className='relative w-[400px]'>
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />
        <input 
          type="text" 
          placeholder="Search for tracks, albums, or settings..." 
          className='w-full bg-[#111] border border-[#222] rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/5 transition-all'
        />
      </div>

      {/* Right side */}
      <div className='flex items-center gap-6'>
        
        <div className='relative'>
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 bg-[#111] rounded-full border ${showNotifications ? 'border-[#1ED760] bg-[#1ED760]/5' : 'border-[#222]'} hover:bg-[#222] transition-all`}
            >
                <Bell className={`w-5 h-5 ${showNotifications ? 'text-[#1ED760]' : 'text-gray-400'}`} />
                <span className='absolute top-2 right-2 w-2 h-2 bg-[#1ED760] rounded-full shadow-[0_0_10px_rgba(30,215,96,0.5)]'></span>
            </button>

            {showNotifications && (
                <div className='absolute top-full right-0 mt-4 w-[320px] bg-[#0a0a0a] border border-[#111] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                    <div className='p-5 border-b border-[#111] flex items-center justify-between bg-[#111]/50'>
                        <h4 className='text-xs font-black uppercase tracking-widest'>Admin Alerts</h4>
                        <span className='text-[10px] text-[#1ED760] font-bold'>2 New</span>
                    </div>
                    <div className='p-2'>
                        <div className='p-4 hover:bg-[#ffffff03] rounded-2xl flex gap-3 transition-all cursor-pointer group'>
                            <div className='w-10 h-10 bg-[#1ED760]/10 rounded-full flex items-center justify-center flex-shrink-0'>
                                <CheckCircle className='w-5 h-5 text-[#1ED760]' />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-white'>System Online</p>
                                <p className='text-[10px] text-gray-500 mt-1 leading-relaxed'>The Spotify Backend is currently running at optimal performance.</p>
                            </div>
                        </div>
                        <div className='p-4 hover:bg-[#ffffff03] rounded-2xl flex gap-3 transition-all cursor-pointer group'>
                            <div className='w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0'>
                                <Info className='w-5 h-5 text-blue-500' />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-white'>Asset Sync</p>
                                <p className='text-[10px] text-gray-500 mt-1 leading-relaxed'>Cloudinary storage has been successfully synchronized with the DB.</p>
                            </div>
                        </div>
                    </div>
                    <button className='w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white bg-[#111]/30 transition-all'>
                        View All System Logs
                    </button>
                </div>
            )}
        </div>

        <div className='relative'>
            <div 
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center gap-3 pl-6 border-l border-[#222] cursor-pointer group transition-all`}
            >
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#1ED760] to-[#159f46] flex items-center justify-center text-black font-black text-xs shadow-lg group-hover:scale-105 transition-all'>
                    S
                </div>
                <div className='hidden md:block text-left'>
                    <p className='text-xs font-black text-white group-hover:text-[#1ED760] transition-colors'>Sruthi Admin</p>
                    <p className='text-[10px] text-gray-500 font-bold uppercase'>Super Admin</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-white transition-all ${showProfile ? 'rotate-180' : ''}`} />
            </div>

            {showProfile && (
                <div className='absolute top-full right-0 mt-4 w-[200px] bg-[#0a0a0a] border border-[#111] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200'>
                    <div className='p-2'>
                        <button className='w-full flex items-center gap-3 p-3 hover:bg-[#ffffff03] rounded-xl text-left transition-all'>
                            <User className='w-4 h-4 text-gray-500' />
                            <span className='text-xs font-bold'>Admin Account</span>
                        </button>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className='w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-xl text-left transition-all text-red-500'
                        >
                            <Bell className='w-4 h-4' />
                            <span className='text-xs font-bold'>Logout Dashboard</span>
                        </button>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
