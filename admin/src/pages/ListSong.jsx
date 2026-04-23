import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { Trash2, Play, Music, Clock, MoreVertical, Search, AlertCircle, Loader2 } from 'lucide-react'

const ListSong = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`)
            if (response.data.success) {
                setData(response.data.songs)
            }
        } catch (error) {
            console.error("Error fetching songs:", error)
        }
        setLoading(false)
    }

    const removeSong = async (id) => {
        if(window.confirm("Are you sure you want to delete this track?")) {
            try {
                const response = await axios.post(`${url}/api/song/remove`, { id })
                if (response.data.success) {
                    fetchSongs()
                }
            } catch (error) {
                console.error("Error removing song:", error)
            }
        }
    }

    useEffect(() => {
        fetchSongs()
    }, [])

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <Music className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>Track Management</h2>
                </div>
                
                <div className='relative w-[300px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4' />
                    <input type="text" placeholder="Filter songs..." className='w-full bg-[#111] border border-[#222] rounded-full py-2 px-10 text-xs font-bold focus:outline-none focus:border-[#1ED760]' />
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <Loader2 className='w-12 h-12 text-[#1ED760] animate-spin' />
                    <p className='text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse'>Fetching track database...</p>
                </div>
            ) : data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4 bg-[#111] rounded-[40px] border border-[#222] border-dashed'>
                    <AlertCircle className='w-12 h-12 text-gray-700' />
                    <p className='text-gray-500 font-bold'>No tracks found in the database.</p>
                </div>
            ) : (
                <div className='bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-[#111] shadow-2xl'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-[#111] border-b border-[#222]'>
                                <th className='px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Track Info</th>
                                <th className='px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Album</th>
                                <th className='px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Duration</th>
                                <th className='px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className='border-b border-[#111]/50 hover:bg-[#ffffff03] group transition-all'>
                                    <td className='px-8 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <div className='relative w-12 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-all shadow-lg'>
                                                <img src={item.image} alt="" className='w-full h-full object-cover' />
                                                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all'>
                                                    <Play className='w-5 h-5 text-white fill-current' />
                                                </div>
                                            </div>
                                            <div>
                                                <p className='font-black text-sm text-white group-hover:text-[#1ED760] transition-colors'>{item.name}</p>
                                                <p className='text-[10px] text-gray-500 font-bold uppercase tracking-wider'>{item.desc}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-8 py-4'>
                                        <span className='px-3 py-1 bg-[#222] rounded-full text-[9px] font-black uppercase text-gray-400 group-hover:text-white transition-all tracking-tighter'>
                                            {item.album !== "none" ? item.album : "Single"}
                                        </span>
                                    </td>
                                    <td className='px-8 py-4'>
                                        <div className='flex items-center gap-2 text-gray-500 font-bold text-xs'>
                                            <Clock className='w-3 h-3' />
                                            {item.duration}
                                        </div>
                                    </td>
                                    <td className='px-8 py-4 text-right'>
                                        <div className='flex items-center justify-end gap-2'>
                                            <button 
                                                onClick={() => removeSong(item._id)}
                                                className='p-2.5 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90'
                                            >
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                            <button className='p-2.5 rounded-xl text-gray-600 hover:text-white hover:bg-[#222] transition-all'>
                                                <MoreVertical className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ListSong
