import React, { useState } from 'react'
import axios from 'axios'
import { LayoutGrid, Image as ImageIcon, Upload, CheckCircle, Loader2 } from 'lucide-react'

const AddAlbum = () => {
    const [image, setImage] = useState(false)
    const [color, setColor] = useState("#1ED760")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
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
            formData.append('bgColour', color)

            const response = await axios.post('http://localhost:4000/api/album/add', formData)

            if (response.data.success) {
                setSuccess(true)
                setName("")
                setDesc("")
                setImage(false)
                setTimeout(() => setSuccess(false), 3000)
            }
        } catch (error) {
            console.error("Error adding album:", error)
        }
        setLoading(false)
    }

    return (
        <div className='p-8'>
            <div className='flex items-center gap-3 mb-10'>
                <LayoutGrid className='text-[#1ED760] w-6 h-6' />
                <h2 className='text-3xl font-black tracking-tighter'>Create New Album</h2>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-10'>
                
                <div className='flex flex-col gap-4 w-[250px]'>
                    <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Album Cover</p>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                    <label htmlFor="image" className='group cursor-pointer'>
                        <div className={`w-full aspect-square border-2 border-dashed ${image ? 'border-[#1ED760] bg-[#1ED760]/5' : 'border-[#222] hover:border-[#1ED760]/50'} rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-4 transition-all relative shadow-xl`}>
                            {image ? (
                                <img src={URL.createObjectURL(image)} className='w-full h-full object-cover animate-in fade-in duration-500' alt="" />
                            ) : (
                                <>
                                    <ImageIcon className='w-10 h-10 text-gray-600 group-hover:text-[#1ED760] transition-all' />
                                    <p className='text-[10px] font-bold text-gray-500 text-center px-6'>Official Artwork</p>
                                </>
                            )}
                        </div>
                    </label>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Album Name</p>
                        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-[#111] border border-[#222] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' placeholder='Enter album name' type="text" required />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Album Description</p>
                        <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='bg-[#111] border border-[#222] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' placeholder='Enter album details' type="text" required />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Theme Color</p>
                        <div className='flex items-center gap-4 bg-[#111] border border-[#222] rounded-2xl p-3'>
                            <input onChange={(e)=>setColor(e.target.value)} value={color} type="color" className='w-10 h-10 bg-transparent cursor-pointer border-none rounded-lg' />
                            <span className='text-xs font-black uppercase text-gray-400 font-mono tracking-widest'>{color}</span>
                        </div>
                    </div>
                </div>

                <button type='submit' disabled={loading} className='w-full md:w-auto px-16 py-5 bg-[#1ED760] text-black font-black rounded-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1ED760]/10 disabled:opacity-50 mt-4'>
                    {loading ? (
                        <>
                            <Loader2 className='w-5 h-5 animate-spin' />
                            Creating Album...
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle className='w-5 h-5' />
                            Created!
                        </>
                    ) : (
                        <>
                            <Upload className='w-5 h-5' />
                            Publish Album
                        </>
                    )}
                </button>

            </form>
        </div>
    )
}

export default AddAlbum
