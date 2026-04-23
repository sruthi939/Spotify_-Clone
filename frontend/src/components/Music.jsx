import React, { useContext } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext'
import SongItems from './SongItems'
import AlbumItems from './AlbumItems'
import { Music as MusicIcon, ListMusic, Zap, Heart, Play } from 'lucide-react'

const Music = () => {
  const { songsData, albumsData, playWithId } = useContext(PlayerContext)

  return (
    <div className='flex flex-col h-full bg-gradient-to-b from-[#1a1a1a] to-[#050505] p-2'>
      <Navbar />
      
      <div className='mt-8 px-2'>
        <div className='flex items-center gap-3 mb-8'>
            <div className='bg-[#1ED760] p-2 rounded-lg'>
                <MusicIcon className='text-black w-6 h-6' />
            </div>
            <h1 className='text-3xl font-black text-white tracking-tighter'>Music</h1>
        </div>

        {/* New Releases Section */}
        <section className='mb-10'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                    <Zap className='text-[#D4AF37] w-5 h-5' />
                    <h2 className='text-xl font-bold text-white'>New Releases</h2>
                </div>
                <span className='text-xs font-bold text-[#D4AF37] cursor-pointer hover:underline'>See all</span>
            </div>
            <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-4'>
                {albumsData.slice(0, 8).map((item, index) => (
                    <AlbumItems key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                ))}
            </div>
        </section>

        {/* Popular Tracks Section */}
        <section className='mb-10'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                    <ListMusic className='text-[#1ED760] w-5 h-5' />
                    <h2 className='text-xl font-bold text-white'>Popular Tracks</h2>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2'>
                {songsData.slice(0, 9).map((item, index) => (
                    <div key={index} 
                        onClick={() => playWithId(item._id)}
                        className='flex items-center gap-4 p-2 rounded-lg hover:bg-[#ffffff05] transition-all cursor-pointer group'>
                        <div className='relative'>
                            <img src={item.image} alt="" className='w-10 h-10 rounded-md object-cover shadow-lg' />
                            <div onClick={(e) => { e.stopPropagation(); playWithId(item._id); }} className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-md'>
                                <Play className='w-5 h-5 text-white fill-white' />
                            </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm font-bold text-white truncate group-hover:text-[#1ED760] transition-colors'>{item.name}</p>
                            <p className='text-[10px] text-gray-500 truncate'>{item.desc}</p>
                        </div>
                        <div className='flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all'>
                            <Heart className='w-4 h-4 text-gray-500 hover:text-[#1ED760] transition-colors' />
                            <span className='text-[10px] text-gray-500 font-medium'>{item.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Fresh Finds Section */}
        <section className='mb-10'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>Fresh Finds</h2>
            </div>
            <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-4'>
                {songsData.slice(5, 12).map((item, index) => (
                    <SongItems key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                ))}
            </div>
        </section>

      </div>
    </div>
  )
}

export default Music
