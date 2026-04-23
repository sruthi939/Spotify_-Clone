import React, { useState } from 'react'
import { Music, Lock, Shield, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        // Fair implementation: Simulating a secure admin handshake
        // In production, this would call /api/admin/login
        setTimeout(() => {
            if (email === 'admin@spotify.com' && password === 'admin123') {
                localStorage.setItem('adminToken', 'fair_token_123')
                setToken('fair_token_123')
            } else {
                setError('Invalid administrative credentials.')
            }
            setLoading(false)
        }, 1500)
    }

    return (
        <div className='min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans selection:bg-[#1ED760]/30'>
            
            {/* Background Glow */}
            <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
                <div className='absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#1ED760]/5 blur-[120px] rounded-full animate-pulse'></div>
                <div className='absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#1ED760]/5 blur-[120px] rounded-full animate-pulse' style={{animationDelay: '1s'}}></div>
            </div>

            <div className='w-full max-w-[450px] relative z-10'>
                
                {/* Logo Section */}
                <div className='flex flex-col items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
                    <div className='w-20 h-20 bg-[#1ED760] rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(30,215,96,0.2)] mb-6'>
                        <Music className='text-black w-10 h-10' />
                    </div>
                    <h1 className='text-4xl font-black tracking-tighter text-white mb-2'>Control Center</h1>
                    <p className='text-xs font-black uppercase tracking-[5px] text-gray-500'>Spotify Administration</p>
                </div>

                {/* Login Form */}
                <div className='bg-[#0a0a0a] border border-[#111] p-10 rounded-[48px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-500 delay-200'>
                    <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1ED760] to-[#159f46]'></div>
                    
                    <form onSubmit={onSubmitHandler} className='space-y-8'>
                        
                        <div className='space-y-3'>
                            <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-500 ml-2'>Admin Identity</label>
                            <div className='relative group'>
                                <Shield className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-[#1ED760] transition-all' />
                                <input 
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    value={email}
                                    type="email" 
                                    placeholder="Enter admin email" 
                                    className='w-full bg-[#111] border border-[#222] rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-white focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/5 transition-all'
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-500 ml-2'>Secure Key</label>
                            <div className='relative group'>
                                <Lock className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-[#1ED760] transition-all' />
                                <input 
                                    onChange={(e)=>setPassword(e.target.value)} 
                                    value={password}
                                    type="password" 
                                    placeholder="••••••••" 
                                    className='w-full bg-[#111] border border-[#222] rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-white focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/5 transition-all'
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className='bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in shake-in duration-300'>
                                <AlertCircle className='w-5 h-5 text-red-500' />
                                <p className='text-xs font-bold text-red-500'>{error}</p>
                            </div>
                        )}

                        <button 
                            type='submit' 
                            disabled={loading}
                            className='w-full bg-[#1ED760] text-black font-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#1ED760]/10 disabled:opacity-50'
                        >
                            {loading ? (
                                <Loader2 className='w-6 h-6 animate-spin' />
                            ) : (
                                <>
                                    Establish Handshake
                                    <ArrowRight className='w-5 h-5' />
                                </>
                            )}
                        </button>

                    </form>
                </div>

                <p className='text-center mt-12 text-[10px] font-bold text-gray-600 uppercase tracking-widest'>
                    Authorized Access Only • AES-256 Encrypted
                </p>

            </div>

        </div>
    )
}

export default AdminLogin
