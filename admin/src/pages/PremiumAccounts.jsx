import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { Crown, Search, User, CheckCircle, Star, Shield, Loader2, Mail } from 'lucide-react'

const PremiumAccounts = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPremiumUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`)
            if (response.data.success) {
                // Filter users who are premium
                const premiumUsers = response.data.users.filter(u => u.isPremium || u.currentPlan !== 'Free')
                setUsers(premiumUsers)
            }
        } catch (error) {
            console.error("Error fetching premium users:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPremiumUsers()
    }, [])

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <Crown className='text-[#D4AF37] w-6 h-6 shadow-[0_0_15px_rgba(212,175,55,0.3)]' />
                    <h2 className='text-3xl font-black tracking-tighter'>Premium Subscribers</h2>
                </div>
                
                <div className='relative w-[350px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4' />
                    <input type="text" placeholder="Filter premium accounts..." className='w-full bg-[#111] border border-[#222] rounded-full py-2.5 px-12 text-sm font-bold focus:outline-none focus:border-[#D4AF37]' />
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <Loader2 className='w-12 h-12 text-[#D4AF37] animate-spin' />
                    <p className='text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse'>Loading VIP records...</p>
                </div>
            ) : users.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4 bg-[#111] rounded-[40px] border border-[#222] border-dashed'>
                    <Star className='w-12 h-12 text-gray-700' />
                    <p className='text-gray-500 font-bold'>No active premium subscriptions found.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {users.map((u, i) => (
                        <div key={i} className='bg-gradient-to-br from-[#111] to-[#050505] border border-[#222] p-8 rounded-[40px] relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all'>
                            <div className='absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-all'></div>
                            
                            <div className='relative z-10'>
                                <div className='flex items-start justify-between mb-6'>
                                    <div className='w-16 h-16 rounded-3xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-2xl font-black text-[#D4AF37]'>
                                        {u.name[0]}
                                    </div>
                                    <div className='px-4 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20'>
                                        <p className='text-[10px] font-black text-[#D4AF37] uppercase tracking-widest'>{u.currentPlan || 'Premium'}</p>
                                    </div>
                                </div>

                                <h3 className='text-xl font-black text-white mb-1 group-hover:text-[#D4AF37] transition-colors'>{u.name}</h3>
                                <div className='flex items-center gap-2 mb-8'>
                                    <Mail className='w-3 h-3 text-gray-600' />
                                    <p className='text-xs font-bold text-gray-500'>{u.email}</p>
                                </div>

                                <div className='flex items-center justify-between pt-6 border-t border-white/5'>
                                    <div className='flex items-center gap-2'>
                                        <CheckCircle className='w-4 h-4 text-[#1ED760]' />
                                        <span className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>Active Status</span>
                                    </div>
                                    <button className='text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all'>
                                        Manage Access
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='mt-12 p-10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/10 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8'>
                <div className='flex items-center gap-6'>
                    <div className='p-4 bg-[#D4AF37]/10 rounded-3xl'>
                        <Shield className='w-8 h-8 text-[#D4AF37]' />
                    </div>
                    <div>
                        <h4 className='text-xl font-black text-white mb-1'>Premium Protection Active</h4>
                        <p className='text-sm text-gray-500 font-bold'>Verified premium accounts are protected by multi-layer encryption and priority server allocation.</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='text-right'>
                        <p className='text-xs font-bold text-gray-500 uppercase'>Monthly Retention</p>
                        <p className='text-2xl font-black text-[#D4AF37]'>94.2%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumAccounts
