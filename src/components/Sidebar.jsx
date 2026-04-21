import React from 'react'
import { Home, Search } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
            <img className='w-6' src={assets.home_icon} alt="" />
            <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
            <img className='w-6' src={assets.home_icon} alt="" />
            <p className='font-bold'>Search</p>
        </div>
      </div>
      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img className='w-8' src={assets.stack_icon} alt="" />
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex items-center gap-3'>
                <img className='w-8' src={assets.stack_icon} alt="" />
                <img className='w-8' src={assets.plus_icon} alt="" />
            </div>
        </div>
        <div className='p-4 bg-[#121212] m-2 rounded font-semibold flex flex-col items-start just-start gap-1 pl-4'>
          <h1>Create your first playlist</h1>
          <p className='fon-light'>It's easy we will help you</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
        </div>
        <div className='p-4 bg-[#121212] m-2 rounded font-semibold flex flex-col items-start just-start gap-1 pl-4'>
          <h1>Let's findssome podcasts to follow</h1>
          <p className='fon-light'>we'll keep you update on new episodes</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse Podcast</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
