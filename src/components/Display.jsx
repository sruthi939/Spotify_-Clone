import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './Home'
import DisplayAlbum from './Album'
import { albumsData } from '../assets/assets'

const Display = () => {
  const displayRef = useRef(null)
  const location = useLocation()

  const isAlbum = location.pathname.includes('/album/')
  const albumId = isAlbum ? location.pathname.split('/').pop() : null

  const bgColor =
    isAlbum && albumsData[Number(albumId)]
      ? albumsData[Number(albumId)].bgColor
      : '#121212'

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(180deg, ${bgColor}, #121212 55%)`
        : '#121212'
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