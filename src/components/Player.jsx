import React, { useContext } from 'react'
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2 } from 'lucide-react'

import PlayerContext from '../context/PlayerContext'

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext)

    return (
        <div className='h-[10%] bg-[#050505] border-t border-[#1f1f1f] flex justify-between items-center px-5 text-white'>

            {/* Left Song Info */}
            <div className='hidden lg:flex items-center gap-4 w-[25%]'>
                <img
                    className='w-14 h-14 rounded-xl object-cover shadow-lg'
                    src={track.image}
                    alt=""
                />
                <div className='min-w-0'>
                    <p className='font-semibold text-sm truncate'>
                        {track.name}
                    </p>
                    <p className='text-xs text-gray-400 truncate'>
                        {track.desc?.slice(0, 25)}
                    </p>
                </div>
            </div>

            {/* Center Controls */}
            <div className='flex flex-col items-center gap-3 flex-1'>

                {/* Buttons */}
                <div className='flex items-center gap-5 text-gray-300'>
                    <Shuffle className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />
                    <SkipBack onClick={previous} className='w-5 h-5 cursor-pointer hover:text-white transition-all' />
                    <button
                        onClick={playStatus ? pause : play}
                        className='w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all'
                    >
                        {playStatus ? (
                            <Pause className='w-5 h-5 fill-black' />
                        ) : (
                            <Play className='w-5 h-5 fill-black ml-0.5' />
                        )}
                    </button>
                    <SkipForward onClick={next} className='w-5 h-5 cursor-pointer hover:text-white transition-all' />
                    <Repeat className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />
                </div>

                {/* Seek Bar */}
                <div className='flex items-center gap-3 w-full max-w-162.5'>
                    <p className='text-xs text-gray-400'>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className='flex-1 h-1 bg-gray-700 rounded-full cursor-pointer overflow-hidden'
                    >
                        <hr
                            ref={seekBar}
                            className='h-1 border-none w-[35%] bg-[#D4AF37] rounded-full'
                        />
                    </div>

                    <p className='text-xs text-gray-400'>{time.totalTime.minute} : {time.totalTime.second}</p>

                </div>

            </div>

            {/* Right Controls */}
            <div className='hidden lg:flex items-center gap-3 w-[25%] justify-end text-gray-300'>

                <Mic2 className='w-4 h-4 cursor-pointer hover:text-white transition-all' />
                <ListMusic className='w-4 h-4 cursor-pointer hover:text-white transition-all' />
                <MonitorSpeaker className='w-4 h-4 cursor-pointer hover:text-white transition-all' />
                <Volume2 className='w-4 h-4 cursor-pointer hover:text-white transition-all' />

                <div className='w-24 h-1 bg-gray-700 rounded-full overflow-hidden'>
                    <div className='w-[60%] h-1 bg-white rounded-full'></div>
                </div>

                <Maximize2 className='w-4 h-4 cursor-pointer hover:text-white transition-all' />

            </div>

        </div>
    )
}

export default Player