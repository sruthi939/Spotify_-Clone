import React, { useState } from 'react'
import { User, Mail, Shield, Key, Bell, Globe, Camera, Save, CheckCircle, LogOut } from 'lucide-react'

const AdminProfile = () => {
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 1200)
    }

    return (
        <div className='p-8 pb-32 max-w-6xl mx-auto'>
            
            <div className='flex items-center justify-between mb-12'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-[#1ED760]/10 rounded-2xl flex items-center justify-center'>
                        <Shield className='text-[#1ED760] w-6 h-6' />
                    </div>
                    <h2 className='text-3xl font-black tracking-tighter'>Admin Security Profile</h2>
                </div>
                <button 
                    onClick={handleSave}
                    className='px-10 py-4 bg-[#1ED760] text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#1ED760]/10 flex items-center gap-3'
                >
                    {isSaving ? 'Syncing...' : saved ? <><CheckCircle className='w-4 h-4' /> Profile Updated</> : <><Save className='w-4 h-4' /> Save Profile</>}
                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                
                {/* Left: Identity Card */}
                <div className='lg:col-span-1 space-y-8'>
                    <div className='bg-[#111] border border-[#222] rounded-[48px] p-10 flex flex-col items-center text-center relative overflow-hidden'>
                        <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1ED760]/10 to-transparent'></div>
                        
                        <div className='relative mb-6'>
                            <div className='w-32 h-32 rounded-[40px] bg-gradient-to-br from-[#1ED760] to-[#159f46] flex items-center justify-center text-4xl font-black text-black shadow-2xl relative group cursor-pointer'>
                                S
                                <div className='absolute inset-0 bg-black/40 rounded-[40px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center'>
                                    <Camera className='text-white w-8 h-8' />
                                </div>
                            </div>
                            <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-[#050505] border-4 border-[#050505] rounded-full flex items-center justify-center'>
                                <div className='w-full h-full bg-[#1ED760] rounded-full animate-pulse'></div>
                            </div>
                        </div>

                        <h3 className='text-2xl font-black text-white mb-1'>Sruthi Admin</h3>
                        <p className='text-xs font-black text-[#1ED760] uppercase tracking-[4px] mb-8'>Super Administrator</p>
                        
                        <div className='w-full pt-8 border-t border-[#222] space-y-4 text-left'>
                            <div className='flex items-center gap-3'>
                                <Mail className='w-4 h-4 text-gray-600' />
                                <span className='text-xs font-bold text-gray-400'>sruthi@spotify.com</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Globe className='w-4 h-4 text-gray-600' />
                                <span className='text-xs font-bold text-gray-400'>Central HQ - Kerala</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-red-500/5 border border-red-500/10 rounded-[40px] p-8 group hover:bg-red-500/10 transition-all cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-red-500/10 rounded-2xl'>
                                    <LogOut className='w-5 h-5 text-red-500' />
                                </div>
                                <div>
                                    <p className='text-xs font-black text-red-500 uppercase tracking-widest'>Termination</p>
                                    <p className='text-[10px] text-gray-500 font-bold'>End administrative session</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Settings Form */}
                <div className='lg:col-span-2 bg-[#0a0a0a] border border-[#111] rounded-[48px] p-12'>
                    <h4 className='text-xl font-black mb-10'>Profile Configuration</h4>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='space-y-3'>
                            <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Display Name</p>
                            <div className='relative group'>
                                <User className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#1ED760] transition-colors' />
                                <input type="text" defaultValue="Sruthi Admin" className='w-full bg-[#111] border border-[#222] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' />
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Email Address</p>
                            <div className='relative group'>
                                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#1ED760] transition-colors' />
                                <input type="email" defaultValue="sruthi@spotify.com" className='w-full bg-[#111] border border-[#222] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' />
                            </div>
                        </div>

                        <div className='space-y-3 md:col-span-2'>
                            <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500'>Update Secure Password</p>
                            <div className='relative group'>
                                <Key className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#1ED760] transition-colors' />
                                <input type="password" placeholder="Enter new administrative password" className='w-full bg-[#111] border border-[#222] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#1ED760] transition-all' />
                            </div>
                        </div>

                        <div className='md:col-span-2 pt-6'>
                            <div className='p-6 bg-[#111] rounded-3xl border border-[#222] flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <Bell className='text-[#1ED760] w-6 h-6' />
                                    <div>
                                        <p className='text-sm font-black'>Critical Notifications</p>
                                        <p className='text-[10px] text-gray-600 font-bold uppercase tracking-widest'>Email & Push Alerts Enabled</p>
                                    </div>
                                </div>
                                <div className='w-12 h-6 bg-[#1ED760] rounded-full p-1 flex justify-end'>
                                    <div className='w-4 h-4 bg-white rounded-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminProfile
