import React from 'react'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

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

          <button className='hidden md:block bg-[#D4AF37] text-black text-sm px-5 py-2 rounded-full hover:scale-105 transition-all shadow-[0_0_18px_rgba(212,175,55,0.25)]'>
            Explore Premium
          </button>

          <button className='flex items-center gap-2 bg-[#0f0f0f] border border-[#222] px-4 py-2 rounded-full text-sm hover:border-[#D4AF37] transition-all'>
            <Download className='w-4 h-4' />
            Install App
          </button>

          <div className='w-10 h-10 rounded-full bg-linear-to-br from-[#D4AF37] to-[#8b6914] text-black font-bold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.35)] cursor-pointer'>
            D
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className='flex items-center gap-3 mt-6'>

        <button className='bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all'>
          All
        </button>

        <button className='bg-[#111] border border-[#222] text-white px-5 py-2 rounded-full text-sm hover:border-[#D4AF37] transition-all'>
          Music
        </button>

        <button className='bg-[#111] border border-[#222] text-white px-5 py-2 rounded-full text-sm hover:border-[#D4AF37] transition-all'>
          Podcasts
        </button>

      </div>
    </>
  )
}

export default Navbar