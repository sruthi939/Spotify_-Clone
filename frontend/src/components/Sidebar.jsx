import React from 'react'
import { Home, Search, Library, Plus, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()

    return (
        <div className='w-[25%] h-full p-2 hidden lg:flex flex-col gap-2 text-white'>

            {/* Top Menu */}
            <div className='bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#222] rounded-2xl p-6 space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'>

                <div onClick={() => navigate('/')} className='flex items-center gap-4 cursor-pointer hover:text-[#1ED760] transition-all duration-300'>
                    <Home className='w-6 h-6' />
                    <p className='font-semibold text-[15px]'>Home</p>
                </div>

                <div className='flex items-center gap-4 cursor-pointer hover:text-[#1ED760] transition-all duration-300'>
                    <Search className='w-6 h-6' />
                    <p className='font-semibold text-[15px]'>Search</p>
                </div>

            </div>

            {/* Library */}
            <div className='bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#222] rounded-2xl h-full p-5 flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'>

                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 cursor-pointer group'>
                        <Library className='w-6 h-6 text-[#D4AF37] group-hover:text-[#1ED760] transition-colors duration-300' />
                        <p className='font-semibold text-[15px] group-hover:text-white transition-colors'>Your Library</p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Plus className='w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors' />
                        <ArrowRight className='w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors' />
                    </div>
                </div>

                {/* Playlist Card */}
                <div className='bg-[#161616] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 rounded-2xl p-5 space-y-3 transition-all duration-300'>
                    <h1 className='font-bold text-[15px] text-[#D4AF37]'>Create your first playlist</h1>
                    <p className='text-sm text-gray-400'>It's easy, we'll help you</p>

                    <button className='px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#b39024] text-black rounded-full text-sm font-bold hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all'>
                        Create Playlist
                    </button>
                </div>

                {/* Podcast Card */}
                <div className='bg-[#161616] border border-[#1ED760]/10 hover:border-[#1ED760]/30 rounded-2xl p-5 space-y-3 transition-all duration-300'>
                    <h1 className='font-bold text-[15px] text-[#1ED760]'>Let’s find some podcasts to follow</h1>
                    <p className='text-sm text-gray-400'>We’ll keep you updated on new episodes</p>

                    <button className='px-5 py-2 bg-gradient-to-r from-[#1ED760] to-[#17a34a] text-black rounded-full text-sm font-bold hover:scale-105 shadow-[0_0_15px_rgba(30,215,96,0.3)] transition-all'>
                        Browse Podcasts
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Sidebar
