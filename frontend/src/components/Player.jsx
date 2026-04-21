import React, { useContext } from 'react'
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2 } from 'lucide-react'

import PlayerContext from '../context/PlayerContext'

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext)

    return (
        <div className='h-[10%] bg-[#050505] border-t border-[#D4AF37]/20 flex justify-between items-center px-5 text-white shadow-[0_-5px_20px_rgba(0,0,0,0.8)] z-50'>

            {/* Left Song Info */}
            <div className='hidden lg:flex items-center gap-4 w-[25%]'>
                <img
                    className='w-14 h-14 rounded-xl object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)] border border-[#D4AF37]/20'
                    src={track.image}
                    alt=""
                />
                <div className='min-w-0'>
                    <p className='font-semibold text-sm truncate hover:text-[#D4AF37] cursor-pointer transition-colors'>
                        {track.name}
                    </p>
                    <p className='text-xs text-gray-400 truncate hover:text-white cursor-pointer transition-colors'>
                        {track.desc?.slice(0, 25)}
                    </p>
                </div>
            </div>

            {/* Center Controls */}
            <div className='flex flex-col items-center gap-3 flex-1'>

                {/* Buttons */}
                <div className='flex items-center gap-6 text-gray-300'>
                    <Shuffle className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                    <SkipBack onClick={previous} className='w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-all' />
                    <button
                        onClick={playStatus ? pause : play}
                        className='w-11 h-11 rounded-full bg-gradient-to-br from-[#1ED760] to-[#159f46] text-black flex items-center justify-center hover:scale-105 shadow-[0_0_15px_rgba(30,215,96,0.4)] transition-all'
                    >
                        {playStatus ? (
                            <Pause className='w-5 h-5 fill-black' />
                        ) : (
                            <Play className='w-5 h-5 fill-black ml-0.5' />
                        )}
                    </button>
                    <SkipForward onClick={next} className='w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-all' />
                    <Repeat className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                </div>

                {/* Seek Bar */}
                <div className='flex items-center gap-3 w-full max-w-162.5'>
                    <p className='text-xs text-[#D4AF37] font-medium'>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className='flex-1 h-1.5 bg-[#1a1a1a] rounded-full cursor-pointer overflow-hidden border border-[#333]'
                    >
                        <hr
                            ref={seekBar}
                            className='h-full border-none w-[35%] bg-gradient-to-r from-[#D4AF37] to-[#f3ca40] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)] relative'
                        />
                    </div>

                    <p className='text-xs text-gray-400 font-medium'>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>

                </div>

            </div>

            {/* Right Controls */}
            <div className='hidden lg:flex items-center gap-4 w-[25%] justify-end text-gray-300'>

                <Mic2 className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                <ListMusic className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />
                <MonitorSpeaker className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                <Volume2 className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />

                <div className='w-24 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]'>
                    <div className='w-[60%] h-full bg-[#1ED760] rounded-full shadow-[0_0_10px_rgba(30,215,96,0.8)]'></div>
                </div>

                <Maximize2 className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />

            </div>

        </div>
    )
}

export default Player