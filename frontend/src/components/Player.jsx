import React, { useContext } from 'react'
import {
    Shuffle,
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Repeat,
    Mic2,
    ListMusic,
    MonitorSpeaker,
    Volume2,
    Maximize2
} from 'lucide-react'

import { PlayerContext } from '../context/PlayerContext'

const Player = () => {
    const { 
        track, 
        seekBar, 
        seekBg, 
        playStatus, 
        play, 
        pause, 
        time, 
        previous, 
        next, 
        seekSong, 
        volume, 
        changeVolume, 
        isShuffle, 
        toggleShuffle, 
        isRepeat, 
        toggleRepeat 
    } = useContext(PlayerContext)

    return (
        <div className='h-[10%] bg-[#050505] border-t border-[#D4AF37]/20 flex justify-between items-center px-5 text-white shadow-[0_-5px_20px_rgba(0,0,0,0.8)] z-50'>

            {/* Left Song Info */}
            <div className='hidden lg:flex items-center gap-4 w-[25%]'>

                <img
                    className='w-14 h-14 rounded-xl object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)] border border-[#D4AF37]/20'
                    src={track?.image || null}
                    alt=""
                />

                <div className='min-w-0'>
                    <p className='font-semibold text-sm truncate hover:text-[#D4AF37] cursor-pointer transition-colors'>
                        {track?.name || 'No Song'}
                    </p>

                    <p className='text-xs text-gray-400 truncate hover:text-white cursor-pointer transition-colors'>
                        {track?.desc?.slice(0, 25) || 'Loading...'}
                    </p>
                </div>

            </div>

            {/* Center Controls */}
            <div className='flex flex-col items-center gap-3 flex-1'>

                <div className='flex items-center gap-6 text-gray-300'>

                    <Shuffle 
                        onClick={toggleShuffle}
                        className={`w-4 cursor-pointer hover:text-white transition-colors ${isShuffle ? 'text-[#1ED760]' : 'text-gray-400'}`} 
                    />
                    <SkipBack 
                        onClick={previous}
                        className='w-5 cursor-pointer hover:text-white transition-colors fill-current' 
                    />

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

                    <SkipForward 
                        onClick={next}
                        className='w-5 cursor-pointer hover:text-white transition-colors fill-current' 
                    />
                    <Repeat 
                        onClick={toggleRepeat}
                        className={`w-4 cursor-pointer hover:text-white transition-colors ${isRepeat ? 'text-[#1ED760]' : 'text-gray-400'}`} 
                    />

                </div>

                {/* Seek */}
                <div className='flex items-center gap-3 w-full max-w-[650px]'>

                    <p className='text-xs text-[#D4AF37] font-medium'>
                        {time?.currentTime?.minute || 0}:
                        {(time?.currentTime?.second || 0).toString().padStart(2, '0')}
                    </p>

                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className='flex-1 h-1.5 bg-[#1a1a1a] rounded-full cursor-pointer overflow-hidden border border-[#333]'
                    >
                        <hr
                            ref={seekBar}
                            className='h-full border-none w-[35%] bg-gradient-to-r from-[#D4AF37] to-[#f3ca40] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                        />
                    </div>

                    <p className='text-xs text-gray-400 font-medium'>
                        {time?.totalTime?.minute || 0}:
                        {(time?.totalTime?.second || 0).toString().padStart(2, '0')}
                    </p>

                </div>

            </div>

            {/* Right Controls */}
            <div className='hidden lg:flex items-center gap-4 w-[25%] justify-end text-gray-300'>

                <Mic2 className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                <ListMusic className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />
                <MonitorSpeaker className='w-4 h-4 cursor-pointer hover:text-[#1ED760] transition-all' />
                <Volume2 className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />

                <div className='flex items-center gap-2 w-24 bg-[#1a1a1a] rounded-full h-1.5 relative group border border-[#333]'>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume * 100}
                        onChange={changeVolume}
                        className='absolute w-full h-full opacity-0 cursor-pointer z-10'
                    />
                    <div 
                        style={{ width: `${volume * 100}%` }}
                        className='h-full bg-gradient-to-r from-[#1ED760] to-[#159f46] rounded-full shadow-[0_0_10px_rgba(30,215,96,0.8)]'
                    ></div>
                </div>

                <Maximize2 className='w-4 h-4 cursor-pointer hover:text-[#D4AF37] transition-all' />

            </div>

        </div>
    )
}

export default Player