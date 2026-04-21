import React from 'react'
import { Home, Search, Library, Plus, ArrowRight } from 'lucide-react'

const Sidebar = () => {
    return (
        <div className='w-[25%] h-full p-2 hidden lg:flex flex-col gap-2 text-white'>

            {/* Top Menu */}
            <div className='bg-[#121212] rounded-2xl p-6 space-y-5'>

                <div className='flex items-center gap-4 cursor-pointer hover:text-[#D4AF37] transition-all'>
                    <Home className='w-6 h-6' />
                    <p className='font-semibold text-[15px]'>Home</p>
                </div>

                <div className='flex items-center gap-4 cursor-pointer hover:text-[#D4AF37] transition-all'>
                    <Search className='w-6 h-6' />
                    <p className='font-semibold text-[15px]'>Search</p>
                </div>

            </div>

            {/* Library */}
            <div className='bg-[#121212] rounded-2xl h-full p-5 flex flex-col gap-5'>

                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <Library className='w-6 h-6 text-[#D4AF37]' />
                        <p className='font-semibold text-[15px]'>Your Library</p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Plus className='w-5 h-5 cursor-pointer hover:text-[#D4AF37]' />
                        <ArrowRight className='w-5 h-5 cursor-pointer hover:text-[#D4AF37]' />
                    </div>
                </div>

                {/* Playlist Card */}
                <div className='bg-[#1d1d1d] rounded-2xl p-5 space-y-3'>
                    <h1 className='font-bold text-[15px]'>Create your first playlist</h1>
                    <p className='text-sm text-gray-400'>It's easy, we'll help you</p>

                    <button className='px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-all'>
                        Create Playlist
                    </button>
                </div>

                {/* Podcast Card */}
                <div className='bg-[#1d1d1d] rounded-2xl p-5 space-y-3'>
                    <h1 className='font-bold text-[15px]'>Let’s find some podcasts to follow</h1>
                    <p className='text-sm text-gray-400'>We’ll keep you updated on new episodes</p>

                    <button className='px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-all'>
                        Browse Podcasts
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Sidebar
