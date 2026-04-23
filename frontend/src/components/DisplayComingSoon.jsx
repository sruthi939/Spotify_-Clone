import React from 'react'
import Navbar from './Navbar'

const DisplayComingSoon = ({ title }) => {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex-1 flex flex-col items-center justify-center space-y-6'>
        <div className='w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#1ED760] flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(30,215,96,0.2)]'>
            <span className='text-3xl font-black text-black'>S</span>
        </div>
        <div className='text-center'>
            <h1 className='text-4xl font-black text-white mb-2 uppercase tracking-widest'>{title}</h1>
            <p className='text-gray-400 font-medium'>This feature is currently under development.</p>
        </div>
        <button 
            onClick={() => window.history.back()}
            className='px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all active:scale-95'
        >
            Go Back
        </button>
      </div>
    </div>
  )
}

export default DisplayComingSoon
