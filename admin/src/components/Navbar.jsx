import React from 'react'
import { Search, Bell, User, ChevronDown } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-6 bg-[#050505] border-b border-[#111] sticky top-0 z-50'>
      
      {/* Search */}
      <div className='relative w-[400px]'>
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />
        <input 
          type="text" 
          placeholder="Search for songs, albums, artists..." 
          className='w-full bg-[#111] border border-[#222] rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/5 transition-all'
        />
      </div>

      {/* Right side */}
      <div className='flex items-center gap-6'>
        
        <button className='relative p-2 bg-[#111] rounded-full border border-[#222] hover:bg-[#222] transition-all'>
            <Bell className='w-5 h-5 text-gray-400' />
            <span className='absolute top-2 right-2 w-2 h-2 bg-[#1ED760] rounded-full'></span>
        </button>

        <div className='flex items-center gap-3 pl-6 border-l border-[#222] cursor-pointer group'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#1ED760] to-[#159f46] flex items-center justify-center text-black font-black text-xs shadow-lg'>
                S
            </div>
            <div className='hidden md:block text-left'>
                <p className='text-xs font-black text-white'>Sruthi Admin</p>
                <p className='text-[10px] text-gray-500 font-bold uppercase'>Super Admin</p>
            </div>
            <ChevronDown className='w-4 h-4 text-gray-500 group-hover:text-white transition-all' />
        </div>

      </div>
    </div>
  )
}

export default Navbar
