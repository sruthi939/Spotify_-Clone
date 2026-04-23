import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItems = ({ name, image, desc, id }) => {

  const { playWithId } = useContext(PlayerContext)

  return (
    <div onClick={() => playWithId(id)} className='w-[100px] flex-shrink-0 p-2 rounded-xl cursor-pointer bg-[#111]/50 hover:bg-[#1a1a1a] border border-[#222] hover:border-[#1ED760]/30 transition-all duration-300 group'>
      <div className='relative aspect-square overflow-hidden rounded-md mb-2'>
        <img className='w-full h-full object-cover shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-all duration-500' src={image} alt="" />
      </div>
      <p className='font-bold text-[10px] text-white truncate group-hover:text-[#1ED760] transition-colors'>{name}</p>
      <p className='text-gray-400 text-[8px] line-clamp-1 mt-0.5 group-hover:text-gray-300 transition-colors'>{desc}</p>
    </div>
  )
}

export default SongItems
