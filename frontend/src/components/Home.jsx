import React, { useContext } from 'react'
import Navbar from './Navbar'
import PlayerContext from '../context/PlayerContext'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext)
  return (
    <>
      <Navbar />

      {/* Featured Charts */}
      <div className='mt-8 mb-8'>

        <div className='flex items-center justify-between mb-5'>
          <h1 className='font-bold text-3xl text-white hover:text-[#D4AF37] transition-colors cursor-pointer'>Featured Charts</h1>
          <p className='text-sm text-[#D4AF37] font-semibold cursor-pointer hover:text-[#1ED760] transition-colors'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-4'>
          {albumsData.map((item, index) => (
            <AlbumItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>

      </div>

      {/* Biggest Hits */}
      <div className='mb-8'>

        <div className='flex items-center justify-between mb-5'>
          <h1 className='font-bold text-3xl text-white hover:text-[#D4AF37] transition-colors cursor-pointer'>
            Today’s Biggest Hits
          </h1>

          <p className='text-sm text-[#D4AF37] font-semibold cursor-pointer hover:text-[#1ED760] transition-colors'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-4'>
          {songsData.map((item, index) => (
            <SongItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>

      </div>

      {/* Recommended Section */}
      <div className='mb-10'>

        <div className='flex items-center justify-between mb-5'>
          <h1 className='font-bold text-3xl text-white hover:text-[#D4AF37] transition-colors cursor-pointer'>
            Recommended For You
          </h1>

          <p className='text-sm text-[#D4AF37] font-semibold cursor-pointer hover:text-[#1ED760] transition-colors'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-4'>
          {songsData.slice(0, 6).map((item, index) => (
            <SongItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </>
  )
}

export default DisplayHome