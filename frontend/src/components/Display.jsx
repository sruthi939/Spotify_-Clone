import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './Home'
import DisplayAlbum from './Album'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import DisplayComingSoon from './DisplayComingSoon'
import Profile from './Profile'
import Search from './Search'
import Podcasts from './Podcasts'
import Music from './Music'
import Premium from './Premium'

const Display = () => {
  const displayRef = useRef(null)
  const location = useLocation()
  const { albumsData, setFilter } = useContext(PlayerContext)

  const isAlbum = location.pathname.includes('/album/')
  const albumId = isAlbum ? location.pathname.split('/').pop() : null

  useEffect(() => {
    if (location.pathname === '/') setFilter('All')
    else if (location.pathname === '/music') setFilter('Music')
    else if (location.pathname === '/podcasts') setFilter('Podcasts')
  }, [location.pathname])

  const currentAlbum = isAlbum ? (albumsData.find(a => a._id === albumId) || albumsData[Number(albumId)]) : null

  const bgColor =
    isAlbum && currentAlbum
      ? currentAlbum.bgColor
      : '#111111' // Slightly lighter black for home

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(180deg, ${bgColor}, #050505 60%)`
        : 'linear-gradient(180deg, #161616 0%, #050505 40%)'
    }
  }, [isAlbum, bgColor])

  return (
    <div
      ref={displayRef}
      className='w-full m-2 px-4 pt-3 rounded-2xl text-white overflow-auto lg:w-[80%] lg:ml-0 transition-all duration-500'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
        <Route path='/search' element={<Search />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/podcasts' element={<Podcasts />} />
        <Route path='/music' element={<Music />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Display