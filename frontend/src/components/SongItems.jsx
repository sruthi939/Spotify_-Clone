import React, { useContext } from 'react'
import PlayerContext from '../context/PlayerContext'

const SongItems = ({name, image, desc, id}) => {

    const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={() => playWithId(id)} className='min-w-45 p-3 rounded-xl cursor-pointer bg-[#111] hover:bg-[#1a1a1a] border border-transparent hover:border-[#1ED760]/30 hover:shadow-[0_0_20px_rgba(30,215,96,0.15)] transition-all duration-300 group'>
      <img className='rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_4px_20px_rgba(30,215,96,0.2)] transition-all' src={image} alt="" />
      <p className='font-bold mt-3 mb-1 text-white group-hover:text-[#1ED760] transition-colors'>{name}</p>
      <p className='text-gray-400 text-sm group-hover:text-gray-300 transition-colors'>{desc}</p>
    </div>
  )
}

export default SongItems
