import React, { useState } from 'react'
import axios from 'axios'
import { Music, Image as ImageIcon, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const AddSong = () => {
    const [image, setImage] = useState(false)
    const [song, setSong] = useState(false)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [album, setAlbum] = useState("none")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('desc', desc)
            formData.append('image', image)
            formData.append('audio', song)
            formData.append('album', album)

            const response = await axios.post('http://localhost:4000/api/song/add', formData)

            if (response.data.success) {
                setSuccess(true)
                setName("")
                setDesc("")
                setAlbum("none")
                setImage(false)
                setSong(false)
                setTimeout(() => setSuccess(false), 3000)
            }
        } catch (error) {
            console.error("Error adding song:", error)
        }
        setLoading(false)
    }

    return (
        <div className='p-8'>
            <div className='flex items-center gap-3 mb-10'>
                <Music className='text-[#1ED760] w-6 h-6' />
                <h2 className='text-3xl font-black tracking-tighter'>Add New Track</h2>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-10'>
                
                <div className='flex flex-col md:flex-row gap-12 w-full'>
                    {/* Audio Upload */}
                    <div className='flex flex-col gap-4 flex-1'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Upload Audio File</p>
                        <input onChange={(e)=>setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
                        <label htmlFor="song" className='group cursor-pointer'>
                            <div className={`w-full h-48 border-2 border-dashed ${song ? 'border-[#1ED760] bg-[#1ED760]/5' : 'border-[#222] hover:border-[#1ED760]/50'} rounded-3xl flex flex-col items-center justify-center gap-4 transition-all`}>
                                {song ? (
                                    <div className='text-center'>
                                        <CheckCircle className='w-12 h-12 text-[#1ED760] mx-auto mb-2' />
                                        <p className='text-xs font-black text-white max-w-[200px] truncate'>{song.name}</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className='w-12 h-12 text-gray-600 group-hover:text-[#1ED760] transition-all' />
                                        <p className='text-xs font-bold text-gray-500 group-hover:text-gray-300 transition-all'>Drop MP3 file or click to browse</p>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div className='flex flex-col gap-4 w-[250px]'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Upload Cover Art</p>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                        <label htmlFor="image" className='group cursor-pointer'>
                            <div className={`w-full aspect-square border-2 border-dashed ${image ? 'border-[#1ED760] bg-[#1ED760]/5' : 'border-[#222] hover:border-[#1ED760]/50'} rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all relative`}>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} className='w-full h-full object-cover animate-in fade-in zoom-in duration-500' alt="" />
                                ) : (
                                    <>
                                        <ImageIcon className='w-10 h-10 text-gray-600 group-hover:text-[#1ED760] transition-all' />
                                        <p className='text-[10px] font-bold text-gray-500 text-center px-6'>600x600 recommended</p>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Track Title</p>
                        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-[#111] border border-[#222] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' placeholder='Enter song name' type="text" required />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Description / Artist</p>
                        <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='bg-[#111] border border-[#222] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' placeholder='Enter artist or description' type="text" required />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Select Album</p>
                        <select onChange={(e)=>setAlbum(e.target.value)} defaultValue={album} className='bg-[#111] border border-[#222] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all cursor-pointer appearance-none'>
                            <option value="none">Standalone Single</option>
                        </select>
                    </div>
                </div>

                <button type='submit' disabled={loading} className='w-full md:w-auto px-16 py-5 bg-[#1ED760] text-black font-black rounded-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1ED760]/10 disabled:opacity-50 mt-4'>
                    {loading ? (
                        <>
                            <Loader2 className='w-5 h-5 animate-spin' />
                            Uploading Track...
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle className='w-5 h-5' />
                            Success!
                        </>
                    ) : (
                        <>
                            <Upload className='w-5 h-5' />
                            Publish Song
                        </>
                    )}
                </button>

            </form>
        </div>
    )
}

export default AddSong
