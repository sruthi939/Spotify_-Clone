import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'

const DisplayHome = () => {
  return (
    <>
      <Navbar />

      {/* Featured Charts */}
      <div className='mt-8 mb-8'>

        <div className='flex items-center justify-between mb-5'>
          <h1 className='font-bold text-3xl text-white'>Featured Charts</h1>
          <p className='text-sm text-[#D4AF37] cursor-pointer hover:underline'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-2'>
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
          <h1 className='font-bold text-3xl text-white'>
            Today’s Biggest Hits
          </h1>

          <p className='text-sm text-[#D4AF37] cursor-pointer hover:underline'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-2'>
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
          <h1 className='font-bold text-3xl text-white'>
            Recommended For You
          </h1>

          <p className='text-sm text-[#D4AF37] cursor-pointer hover:underline'>
            Show all
          </p>
        </div>

        <div className='flex gap-5 overflow-x-auto scrollbar-hide pb-2'>
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