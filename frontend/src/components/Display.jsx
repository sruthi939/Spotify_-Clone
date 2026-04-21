import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './Home'
import DisplayAlbum from './Album'
import PlayerContext from '../context/PlayerContext'
import { useContext } from 'react'

const Display = () => {
  const displayRef = useRef(null)
  const location = useLocation()
  const { albumsData } = useContext(PlayerContext)

  const isAlbum = location.pathname.includes('/album/')
  const albumId = isAlbum ? location.pathname.split('/').pop() : null

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
      className='w-full m-2 px-6 pt-4 rounded-2xl text-white overflow-auto lg:w-[75%] lg:ml-0 transition-all duration-500'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  )
}

export default Display