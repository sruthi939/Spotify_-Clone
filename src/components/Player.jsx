import React from 'react'
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2 } from 'lucide-react'
import { songsData } from '../assets/assets'

const Player = () => {
    return (
        <div className='h-[10%] bg-[#0a0a0a] border-t border-gray-800 flex justify-between items-center px-5 text-white'>

            {/* Current Song */}
            <div className='hidden lg:flex items-center gap-4 w-[25%]'>
                <img
                    className='w-14 h-14 rounded-lg object-cover'
                    src={songsData[0].image}
                    alt=""
                />

                <div>
                    <p className='font-semibold text-sm'>{songsData[0].name}</p>
                    <p className='text-xs text-gray-400'>
                        {songsData[0].desc.slice(0, 20)}
                    </p>
                </div>
            </div>

            {/* Center Controls */}
            <div className='flex flex-col items-center gap-2 flex-1'>

                <div className='flex items-center gap-5 text-gray-300'>

                    <Shuffle className='w-4 h-4 cursor-pointer hover:text-[#D4AF37]' />
                    <SkipBack className='w-5 h-5 cursor-pointer hover:text-white' />

                    <div className='w-10 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer hover:scale-105 transition-all'>
                        <Play className='w-5 h-5 ml-0.5' />
                    </div>

                    <SkipForward className='w-5 h-5 cursor-pointer hover:text-white' />
                    <Repeat className='w-4 h-4 cursor-pointer hover:text-[#D4AF37]' />

                </div>

                {/* Progress */}
                <div className='flex items-center gap-3 w-full max-w-162.5'>
                    <p className='text-xs text-gray-400'>1:06</p>

                    <div className='flex-1 h-1 bg-gray-700 rounded-full cursor-pointer'>
                        <div className='w-[35%] h-1 bg-[#D4AF37] rounded-full'></div>
                    </div>

                    <p className='text-xs text-gray-400'>3:20</p>
                </div>

            </div>

            {/* Right Controls */}
            <div className='hidden lg:flex items-center gap-3 w-[25%] justify-end text-gray-300'>

                <Mic2 className='w-4 h-4 cursor-pointer hover:text-white' />
                <ListMusic className='w-4 h-4 cursor-pointer hover:text-white' />
                <MonitorSpeaker className='w-4 h-4 cursor-pointer hover:text-white' />
                <Volume2 className='w-4 h-4 cursor-pointer hover:text-white' />

                <div className='w-24 h-1 bg-gray-700 rounded-full'>
                    <div className='w-[60%] h-1 bg-white rounded-full'></div>
                </div>

                <Maximize2 className='w-4 h-4 cursor-pointer hover:text-white' />

            </div>

        </div>
    )
}

export default Player