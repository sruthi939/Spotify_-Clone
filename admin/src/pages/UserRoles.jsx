import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { Users, Shield, User, UserCheck, Star, MoreVertical, Search, ShieldAlert, Loader2 } from 'lucide-react'

const UserRoles = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`)
            if (response.data.success) {
                setUsers(response.data.users)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Shield className='w-4 h-4 text-[#1ED760]' />
            case 'artist': return <Star className='w-4 h-4 text-[#D4AF37]' />
            default: return <User className='w-4 h-4 text-gray-500' />
        }
    }

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <Users className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>Role Management</h2>
                </div>
                
                <div className='relative w-[350px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4' />
                    <input type="text" placeholder="Search users or roles..." className='w-full bg-[#111] border border-[#222] rounded-full py-2.5 px-12 text-sm font-bold focus:outline-none focus:border-[#1ED760]' />
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <Loader2 className='w-12 h-12 text-[#1ED760] animate-spin' />
                    <p className='text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse'>Fetching user database...</p>
                </div>
            ) : users.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4 bg-[#111] rounded-[40px] border border-[#222] border-dashed'>
                    <ShieldAlert className='w-12 h-12 text-gray-700' />
                    <p className='text-gray-500 font-bold'>No users found in the system.</p>
                </div>
            ) : (
                <div className='bg-[#0a0a0a] border border-[#111] rounded-[40px] overflow-hidden shadow-2xl'>
                    <table className='w-full text-left'>
                        <thead>
                            <tr className='bg-[#111] border-b border-[#222]'>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Identity</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Assigned Role</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Last Session</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right'>Permissions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-[#111]'>
                            {users.map((u) => (
                                <tr key={u._id} className='group hover:bg-[#ffffff03] transition-all'>
                                    <td className='px-8 py-6'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-white font-black group-hover:border-[#1ED760]/30 transition-all shadow-lg'>
                                                {u.name ? u.name[0] : '?'}
                                            </div>
                                            <div>
                                                <p className='font-black text-white text-sm'>{u.name}</p>
                                                <p className='text-xs text-gray-500 font-bold'>{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <div className='flex items-center gap-2 px-3 py-1.5 bg-[#111] rounded-full w-fit border border-[#222] group-hover:border-white/10 transition-all'>
                                            {getRoleIcon(u.role)}
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'text-[#1ED760]' : u.role === 'artist' ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                                                {u.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <p className='text-xs font-bold text-gray-500'>{u.lastActive || 'N/A'}</p>
                                    </td>
                                    <td className='px-8 py-6 text-right'>
                                        <div className='flex items-center justify-end gap-2'>
                                            <button className='px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-[#222] transition-all'>
                                                Edit Rights
                                            </button>
                                            <button className='p-2 hover:bg-red-500/10 text-gray-600 hover:text-red-500 rounded-xl transition-all'>
                                                <ShieldAlert className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className='mt-8 p-6 bg-[#1ED760]/5 border border-[#1ED760]/10 rounded-3xl flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <ShieldCheck className='text-[#1ED760] w-6 h-6' />
                    <div>
                        <p className='text-sm font-black text-white'>RBAC Enforcement Active</p>
                        <p className='text-xs text-gray-500 font-bold'>Role-based access control is currently restricting restricted API routes.</p>
                    </div>
                </div>
                <button className='bg-[#1ED760] text-black text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:scale-105 transition-all shadow-xl'>
                    Audit Logs
                </button>
            </div>
        </div>
    )
}

const ShieldCheck = ({className}) => (
    <div className={className}>
        <Shield className='w-6 h-6 fill-current' />
    </div>
)

export default UserRoles
