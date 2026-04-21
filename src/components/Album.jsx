import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { Clock, Play, Heart, MoreHorizontal } from 'lucide-react'
import PlayerContext from '../context/PlayerContext'

const Album = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const {playWithId} = useContext(PlayerContext)

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className='mt-10 flex flex-col md:flex-row md:items-end gap-8'>
        <img
          className='w-56 h-56 rounded-2xl object-cover shadow-[0_0_35px_rgba(212,175,55,0.20)] border border-[#D4AF37]/20'
          src={albumData.image}
          alt=""
        />
        <div className='flex flex-col gap-2'>
          <p className='uppercase text-xs tracking-[4px] text-[#D4AF37] font-bold'>
            Playlist
          </p>
          <h2 className='text-5xl md:text-7xl font-black leading-tight'>
            {albumData.name}
          </h2>
          <h4 className='text-gray-300 text-sm md:text-base'>
            {albumData.desc}
          </h4>
          <p className='mt-2 text-sm text-gray-400 flex flex-wrap items-center gap-2'>
            <img className='w-5' src={assets.spotify_logo} alt="" />
            <b className='text-white'>Spotify</b>
            • 1,323,154 likes
            • 50 songs
            • 2 hr 30 min
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center gap-6 mt-8'>
        <button className='w-16 h-16 rounded-full bg-[#39ff5a] flex items-center justify-center shadow-[0_0_35px_rgba(57,255,90,0.55)] hover:scale-105 transition-all'>
          <Play className='w-8 h-8 text-black fill-black ml-1' />
        </button>
        <Heart className='w-7 h-7 text-[#D4AF37] cursor-pointer hover:scale-110 transition-all' />
        <MoreHorizontal className='w-7 h-7 text-gray-300 cursor-pointer hover:text-white' />
      </div>

      {/* Table Head */}
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 px-2 text-[#8b8b8b] text-sm border-b border-[#222] pb-3'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <Clock className='m-auto w-4' />
      </div>

      {/* Songs */}
      <div className='space-y-1 pb-10'>
        {songsData.map((item, index) => (
          <div
            onClick={() => playWithId(item.id)}
            key={index}
            className='grid grid-cols-3 sm:grid-cols-4 gap-2 items-center px-3 py-3 rounded-xl hover:bg-[#ffffff10] transition-all cursor-pointer'
          >
            <p className='text-white flex items-center'>
              <b className='mr-4 text-[#8b8b8b] w-4'>{index + 1}</b>
              <img
                className='w-11 h-11 rounded object-cover mr-4'
                src={item.image}
                alt=""
              />
              <span className='truncate'>{item.name}</span>
            </p>
            <p className='text-sm truncate text-gray-400'>
              {albumData.name}
            </p>
            <p className='text-sm hidden sm:block text-gray-500'>
              5 days ago
            </p>
            <p className='text-sm text-center text-gray-400'>
              {item.duration}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Album