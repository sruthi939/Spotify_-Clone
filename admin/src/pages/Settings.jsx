import React, { useState } from 'react'
import { Settings as SettingsIcon, Globe, Lock, Server, Cloud, Database, HardDrive, Terminal, Save, CheckCircle } from 'lucide-react'
import { url } from '../App'

const Settings = () => {
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 1500)
    }

    const sections = [
        {
            title: 'API Configuration',
            icon: Server,
            items: [
                { label: 'Backend URL', value: url, type: 'text', desc: 'Base endpoint for all API operations.' },
                { label: 'Request Timeout', value: '5000ms', type: 'text', desc: 'Maximum time to wait for server response.' }
            ]
        },
        {
            title: 'Security Hub',
            icon: Lock,
            items: [
                { label: 'Maintenance Mode', value: false, type: 'toggle', desc: 'Disable public access to the platform.' },
                { label: 'Force SSL', value: true, type: 'toggle', desc: 'Always redirect to secure HTTPS.' }
            ]
        },
        {
            title: 'Cloud Assets',
            icon: Cloud,
            items: [
                { label: 'Cloudinary Cloud', value: 'spotify-clone-cloud', type: 'text', desc: 'Static image and audio asset storage.' },
                { label: 'Upload Buffer', value: '100MB', type: 'text', desc: 'Maximum single file upload size.' }
            ]
        }
    ]

    return (
        <div className='p-8 pb-32'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <SettingsIcon className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>System Infrastructure</h2>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className='flex items-center gap-2 bg-[#1ED760] text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 shadow-xl'
                >
                    {isSaving ? 'Syncing...' : saved ? <><CheckCircle className='w-4 h-4' /> Saved</> : <><Save className='w-4 h-4' /> Apply Changes</>}
                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {sections.map((section, idx) => (
                    <div key={idx} className='bg-[#0a0a0a] border border-[#111] rounded-[40px] p-10'>
                        <div className='flex items-center gap-4 mb-10'>
                            <div className='p-3 bg-[#111] rounded-2xl border border-[#222]'>
                                <section.icon className='w-5 h-5 text-gray-400' />
                            </div>
                            <h4 className='font-black text-lg tracking-tight'>{section.title}</h4>
                        </div>

                        <div className='space-y-10'>
                            {section.items.map((item, i) => (
                                <div key={i} className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-1'>{item.label}</p>
                                            <p className='text-xs text-gray-600 font-bold'>{item.desc}</p>
                                        </div>
                                        {item.type === 'toggle' ? (
                                            <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${item.value ? 'bg-[#1ED760]' : 'bg-[#222]'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full transition-all ${item.value ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        ) : null}
                                    </div>
                                    {item.type === 'text' && (
                                        <div className='relative group'>
                                            <Terminal className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-hover:text-[#1ED760] transition-colors' />
                                            <input 
                                                type="text" 
                                                defaultValue={item.value} 
                                                className='w-full bg-[#111] border border-[#222] rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-300 focus:outline-none focus:border-[#1ED760] transition-all'
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Status Bar */}
            <div className='fixed bottom-8 right-8 left-[22%] bg-[#111]/80 backdrop-blur-xl border border-white/5 p-4 rounded-3xl flex items-center justify-between shadow-2xl'>
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-[#1ED760] rounded-full animate-pulse'></div>
                        <span className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>Main Server: Online</span>
                    </div>
                    <div className='flex items-center gap-2 border-l border-[#222] pl-6'>
                        <Database className='w-3 h-3 text-gray-600' />
                        <span className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>MongoDB: Connected</span>
                    </div>
                    <div className='flex items-center gap-2 border-l border-[#222] pl-6'>
                        <HardDrive className='w-3 h-3 text-gray-600' />
                        <span className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>Disk Usage: 12%</span>
                    </div>
                </div>
                <div className='text-[10px] font-black uppercase text-gray-600 tracking-widest pr-4'>
                    v1.0.4-stable
                </div>
            </div>
        </div>
    )
}

export default Settings
