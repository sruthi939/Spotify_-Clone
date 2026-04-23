import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext'
import SongItems from './SongItems'
import AlbumItems from './AlbumItems'
import { Search as SearchIcon, X } from 'lucide-react'

const Search = () => {
  const { songsData, albumsData } = useContext(PlayerContext)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSongs = songsData.filter(song => 
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAlbums = albumsData.filter(album => 
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      
      {/* Search Input Section */}
      <div className='mt-6 px-2 sticky top-0 z-10 py-2'>
        <div className='relative max-w-lg group'>
          <SearchIcon className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1ED760] transition-colors' />
          <input 
            type="text" 
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full bg-[#242424] border border-transparent focus:border-[#333] hover:bg-[#2a2a2a] rounded-full py-4 pl-14 pr-12 text-sm font-medium focus:outline-none transition-all'
          />
          {searchTerm && (
            <X 
              onClick={() => setSearchTerm('')}
              className='absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors' 
            />
          )}
        </div>
      </div>

      <div className='mt-8 px-2 overflow-y-auto scrollbar-hide pb-10'>
        
        {searchTerm ? (
          <div className='space-y-10'>
            
            {/* Song Results */}
            {filteredSongs.length > 0 && (
              <div>
                <h2 className='text-2xl font-bold text-white mb-6'>Songs</h2>
                <div className='flex flex-wrap gap-4'>
                  {filteredSongs.map((item, index) => (
                    <SongItems key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                  ))}
                </div>
              </div>
            )}

            {/* Album Results */}
            {filteredAlbums.length > 0 && (
              <div>
                <h2 className='text-2xl font-bold text-white mb-6'>Albums</h2>
                <div className='flex flex-wrap gap-4'>
                  {filteredAlbums.map((item, index) => (
                    <AlbumItems key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                  ))}
                </div>
              </div>
            )}

            {filteredSongs.length === 0 && filteredAlbums.length === 0 && (
              <div className='flex flex-col items-center justify-center py-20 text-center'>
                <SearchIcon className='w-16 h-16 text-gray-700 mb-4' />
                <h3 className='text-xl font-bold text-white'>No results found for "{searchTerm}"</h3>
                <p className='text-gray-400 mt-2'>Please check your spelling or try searching for something else.</p>
              </div>
            )}

          </div>
        ) : (
          <div>
            <div className='flex items-center justify-between mb-6 px-1'>
              <h2 className='text-xl font-bold text-white'>Browse all</h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 px-1'>
              {[
                { name: 'Pop', img: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=400', color: '#8d67ab' },
                { name: 'Rock', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400', color: '#1e3264' },
                { name: 'Jazz', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400', color: '#ba5d07' },
                { name: 'Lo-fi', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400', color: '#503750' },
                { name: 'Hip-Hop', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', color: '#bc5900' },
                { name: 'Dance', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', color: '#d84000' },
                { name: 'Mood', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400', color: '#e8115b' },
                { name: 'Chill', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', color: '#7358ff' },
                { name: 'Workout', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', color: '#777777' },
                { name: 'Hindi', img: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=400', color: '#e1118c' },
                { name: 'K-Pop', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400', color: '#148a08' },
                { name: 'Podcasts', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400', color: '#27856a' },
                { name: 'Indie', img: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400', color: '#608108' },
                { name: 'Soul', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400', color: '#dc148c' },
                { name: 'Classical', img: 'https://images.unsplash.com/photo-1520529611317-0692782e4431?w=400', color: '#7d4b32' },
                { name: 'Electronic', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', color: '#af2896' }
              ].map((cat, i) => (
                <div 
                  key={i} 
                  onClick={() => setSearchTerm(cat.name)}
                  className='h-[120px] rounded-lg cursor-pointer hover:scale-[1.03] active:scale-95 transition-all relative overflow-hidden shadow-lg border border-[#333]/30 group'
                >
                  <img 
                    src={cat.img} 
                    alt={cat.name}
                    className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75' 
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>
                  <h3 className='absolute inset-0 flex items-center justify-center p-3 text-sm font-black text-white uppercase tracking-widest text-center drop-shadow-md group-hover:text-[#1ED760] transition-colors'>
                    {cat.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Search
