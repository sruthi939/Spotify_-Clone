import React from 'react'
import Navbar from './Navbar'
import { Play, Mic, TrendingUp, Clock, Star } from 'lucide-react'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'

const Podcasts = () => {
    const { songsData, playWithId } = useContext(PlayerContext)
    const featuredPodcasts = [
        { title: "The Daily", host: "The New York Times", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400", color: "#8d67ab" },
        { title: "Crime Junkie", host: "audiochuck", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400", color: "#1e3264" },
        { title: "The Joe Rogan Experience", host: "Joe Rogan", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400", color: "#ba5d07" },
        { title: "Ted Talks Daily", host: "TED", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400", color: "#503750" }
    ]

    const categories = [
        "True Crime", "Comedy", "News", "Business", "Society & Culture", "Education", "History", "Health & Fitness"
    ]

    return (
        <div className='flex flex-col h-full bg-gradient-to-b from-[#1a1a1a] to-[#050505] p-2'>
            <Navbar />

            <div className='mt-8 px-2'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='bg-[#1ED760] p-2 rounded-lg'>
                        <Mic className='text-black w-6 h-6' />
                    </div>
                    <h1 className='text-3xl font-black text-white tracking-tighter'>Podcasts</h1>
                </div>

                {/* Featured Section */}
                <section className='mb-10'>
                    <h2 className='text-xl font-bold text-white mb-6'>Featured Podcasts</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {featuredPodcasts.map((pod, i) => (
                            <div key={i} className='bg-[#242424]/40 p-4 rounded-2xl hover:bg-[#2a2a2a] transition-all cursor-pointer group border border-transparent hover:border-[#333]'>
                                <div className='relative aspect-square mb-4 overflow-hidden rounded-xl'>
                                    <img src={pod.img} alt={pod.title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                                    <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all'></div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); playWithId(songsData[i % songsData.length]?._id); }}
                                        className='absolute right-2 bottom-2 w-10 h-10 bg-[#1ED760] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'
                                    >
                                        <Play className='text-black fill-black w-5 h-5 ml-0.5' />
                                    </button>
                                </div>
                                <h3 className='text-sm font-bold text-white truncate'>{pod.title}</h3>
                                <p className='text-xs text-gray-400 mt-1'>{pod.host}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Section */}
                <section className='mb-10'>
                    <h2 className='text-xl font-bold text-white mb-6'>Explore Categories</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3'>
                        {categories.map((cat, i) => (
                            <div key={i} className='bg-[#333]/20 py-3 px-4 rounded-full text-center hover:bg-[#1ED760] hover:text-black transition-all cursor-pointer border border-[#444]'>
                                <span className='text-[10px] font-black uppercase tracking-widest'>{cat}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Episodes */}
                <section className='mb-10'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-bold text-white'>Top Episodes</h2>
                        <span className='text-xs font-bold text-[#1ED760] cursor-pointer hover:underline'>See all</span>
                    </div>
                    <div className='space-y-2'>
                        {[1, 2, 3, 4, 5].map((item, i) => (
                            <div key={item}
                                onClick={() => playWithId(songsData[i % songsData.length]?._id)}
                                className='flex items-center gap-4 p-3 rounded-xl hover:bg-[#ffffff10] transition-all cursor-pointer group'>
                                <div className='w-12 h-12 bg-[#222] rounded-md overflow-hidden flex-shrink-0'>
                                    <img src={`https://images.unsplash.com/photo-${1500000000000 + item}?w=100`} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h4 className='text-sm font-bold text-white truncate'>Episode #{item}: Exploring the Future of Agentic AI</h4>
                                    <div className='flex items-center gap-2 text-[10px] text-gray-400 mt-1'>
                                        <span className='flex items-center gap-1'><TrendingUp className='w-3 h-3 text-[#1ED760]' /> Trending</span>
                                        <span>•</span>
                                        <span className='flex items-center gap-1'><Clock className='w-3 h-3' /> 45 min</span>
                                        <span>•</span>
                                        <span className='flex items-center gap-1'><Star className='w-3 h-3 text-yellow-500 fill-yellow-500' /> 4.9</span>
                                    </div>
                                </div>
                                <button className='w-8 h-8 rounded-full border border-[#444] flex items-center justify-center hover:border-white transition-all opacity-0 group-hover:opacity-100'>
                                    <Play className='w-3 h-3 text-white fill-white' />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Podcasts
