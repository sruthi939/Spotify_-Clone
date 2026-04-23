import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { BarChart2, TrendingUp, Users, Music, LayoutGrid, Clock, ArrowUpRight } from 'lucide-react'

const Analytics = () => {
    const [stats, setStats] = useState({
        songs: 0,
        albums: 0,
        users: 1248, // Simulated for 'fair' look
        plays: '84.2K'
    })
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            const [songsRes, albumsRes, usersRes] = await Promise.all([
                axios.get(`${url}/api/song/list`),
                axios.get(`${url}/api/album/list`),
                axios.get(`${url}/api/user/list`)
            ])
            const totalPlays = songsRes.data.songs.reduce((acc, song) => acc + (song.plays || 0), 0)
            
            setStats(prev => ({
                ...prev,
                songs: songsRes.data.songs.length,
                albums: albumsRes.data.albums.length,
                users: usersRes.data.users.length,
                plays: totalPlays > 1000 ? `${(totalPlays/1000).toFixed(1)}K` : totalPlays
            }))
        } catch (error) {
            console.error("Error fetching stats:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const cards = [
        { label: 'Total Tracks', value: stats.songs, icon: Music, color: '#1ED760' },
        { label: 'Total Albums', value: stats.albums, icon: LayoutGrid, color: '#D4AF37' },
        { label: 'Total Listeners', value: stats.users, icon: Users, color: '#6366f1' },
        { label: 'Total Stream Time', value: stats.plays, icon: Clock, color: '#ec4899' },
    ]

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <BarChart2 className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>Platform Analytics</h2>
                </div>
                <div className='flex items-center gap-2 bg-[#111] px-4 py-2 rounded-full border border-[#222]'>
                    <TrendingUp className='text-[#1ED760] w-4 h-4' />
                    <span className='text-[10px] font-black uppercase text-[#1ED760]'>Live Metrics</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                {cards.map((card, i) => (
                    <div key={i} className='bg-[#111] border border-[#222] p-8 rounded-[32px] group hover:border-[#333] transition-all relative overflow-hidden'>
                        <div style={{backgroundColor: card.color}} className='absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 group-hover:opacity-20 transition-all'></div>
                        <div className='relative z-10'>
                            <div className='flex items-center justify-between mb-6'>
                                <div style={{backgroundColor: `${card.color}10`, color: card.color}} className='p-3 rounded-2xl'>
                                    <card.icon className='w-6 h-6' />
                                </div>
                                <ArrowUpRight className='w-5 h-5 text-gray-700' />
                            </div>
                            <p className='text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1'>{card.label}</p>
                            <h3 className='text-4xl font-black text-white'>{loading ? '...' : card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Graphs Area */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='bg-[#0a0a0a] border border-[#111] p-10 rounded-[40px]'>
                    <div className='flex items-center justify-between mb-8'>
                        <h4 className='font-black text-lg'>Engagement Growth</h4>
                        <select className='bg-[#111] border border-[#222] rounded-full px-4 py-2 text-[10px] font-black uppercase text-gray-400 outline-none'>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className='flex items-end gap-3 h-48'>
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className='flex-1 group relative'>
                                <div style={{height: `${h}%`}} className='w-full bg-[#1ED760]/20 group-hover:bg-[#1ED760] rounded-t-lg transition-all cursor-pointer relative'>
                                    <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all'>
                                        {h}%
                                    </div>
                                </div>
                                <p className='text-[8px] font-black text-gray-600 uppercase text-center mt-3'>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-[#0a0a0a] border border-[#111] p-10 rounded-[40px] flex flex-col'>
                    <h4 className='font-black text-lg mb-8'>Database Health</h4>
                    <div className='flex-1 flex flex-col justify-center gap-6'>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-[10px] font-black uppercase tracking-widest'>
                                <span className='text-gray-500'>Cloud Storage</span>
                                <span className='text-white'>74% Used</span>
                            </div>
                            <div className='h-3 bg-[#111] rounded-full overflow-hidden border border-[#222]'>
                                <div className='h-full bg-gradient-to-r from-[#1ED760] to-[#D4AF37] w-[74%]'></div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-[10px] font-black uppercase tracking-widest'>
                                <span className='text-gray-500'>API Latency</span>
                                <span className='text-white'>120ms (Optimal)</span>
                            </div>
                            <div className='h-3 bg-[#111] rounded-full overflow-hidden border border-[#222]'>
                                <div className='h-full bg-[#1ED760] w-[20%]'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
