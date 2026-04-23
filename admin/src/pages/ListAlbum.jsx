import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { Trash2, LayoutGrid, Search, AlertCircle, Loader2, Music } from 'lucide-react'

const ListAlbum = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            if (response.data.success) {
                setData(response.data.albums)
            }
        } catch (error) {
            console.error("Error fetching albums:", error)
        }
        setLoading(false)
    }

    const removeAlbum = async (id) => {
        if (window.confirm("Are you sure you want to delete this album? This will not delete the songs inside it.")) {
            try {
                const response = await axios.post(`${url}/api/album/remove`, { id })
                if (response.data.success) {
                    fetchAlbums()
                }
            } catch (error) {
                console.error("Error removing album:", error)
            }
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <LayoutGrid className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>Album Collections</h2>
                </div>

                <div className='relative w-[300px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4' />
                    <input type="text" placeholder="Search albums..." className='w-full bg-[#111] border border-[#222] rounded-full py-2 px-10 text-xs font-bold focus:outline-none focus:border-[#1ED760]' />
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <Loader2 className='w-12 h-12 text-[#1ED760] animate-spin' />
                    <p className='text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse'>Loading collections...</p>
                </div>
            ) : data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4 bg-[#111] rounded-[40px] border border-[#222] border-dashed'>
                    <AlertCircle className='w-12 h-12 text-gray-700' />
                    <p className='text-gray-500 font-bold'>No albums created yet.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {data.map((item, index) => (
                        <div key={index} className='bg-[#111] rounded-[32px] p-6 border border-[#222] hover:border-[#1ED760]/30 transition-all group relative overflow-hidden'>
                            {/* Color Bar */}
                            <div style={{ backgroundColor: item.bgColour }} className='absolute top-0 left-0 w-full h-1 opacity-50'></div>

                            <div className='flex flex-col gap-4'>
                                <div className='relative aspect-square rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-all duration-500'>
                                    <img src={item.image} alt="" className='w-full h-full object-cover' />
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all'>
                                        <button className='w-12 h-12 bg-[#1ED760] rounded-full flex items-center justify-center text-black shadow-xl'>
                                            <Music className='w-6 h-6' />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex items-start justify-between'>
                                    <div className='flex-1 pr-4'>
                                        <h3 className='font-black text-lg text-white truncate group-hover:text-[#1ED760] transition-colors'>{item.name}</h3>
                                        <p className='text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate'>{item.desc}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <button
                                            onClick={() => removeAlbum(item._id)}
                                            className='p-2 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between pt-4 border-t border-[#222]'>
                                    <div className='flex items-center gap-2'>
                                        <div style={{ backgroundColor: item.bgColour }} className='w-3 h-3 rounded-full'></div>
                                        <span className='text-[9px] font-black text-gray-500 uppercase tracking-widest'>{item.bgColour}</span>
                                    </div>
                                    <span className='text-[9px] font-black text-[#1ED760] uppercase tracking-widest bg-[#1ED760]/10 px-2 py-0.5 rounded'>Active</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListAlbum
