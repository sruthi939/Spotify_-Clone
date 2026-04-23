import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { CreditCard, Search, Calendar, DollarSign, User as UserIcon, CheckCircle, Clock, Loader2, ArrowUpDown } from 'lucide-react'

const PaymentHistory = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    const fetchPayments = async () => {
        try {
            const response = await axios.get(`${url}/api/payment/list`)
            if (response.data.success) {
                setPayments(response.data.payments)
            }
        } catch (error) {
            console.error("Error fetching payments:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <div className='p-8'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <CreditCard className='text-[#1ED760] w-6 h-6' />
                    <h2 className='text-3xl font-black tracking-tighter'>Payment Analytics</h2>
                </div>
                
                <div className='relative w-[350px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4' />
                    <input 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="text" 
                        placeholder="Search transactions by mobile or ID..." 
                        className='w-full bg-[#111] border border-[#222] rounded-full py-2.5 px-12 text-sm font-bold focus:outline-none focus:border-[#1ED760]' 
                    />
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4'>
                    <Loader2 className='w-12 h-12 text-[#1ED760] animate-spin' />
                    <p className='text-gray-500 font-bold uppercase text-[10px] tracking-widest animate-pulse'>Auditing transactions...</p>
                </div>
            ) : payments.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-40 gap-4 bg-[#111] rounded-[40px] border border-[#222] border-dashed'>
                    <DollarSign className='w-12 h-12 text-gray-700' />
                    <p className='text-gray-500 font-bold'>No financial records found.</p>
                </div>
            ) : (
                <div className='bg-[#0a0a0a] border border-[#111] rounded-[40px] overflow-hidden shadow-2xl'>
                    <table className='w-full text-left'>
                        <thead>
                            <tr className='bg-[#111] border-b border-[#222]'>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Subscriber</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Plan Details</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Amount</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Date & Method</th>
                                <th className='px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-[#111]'>
                            {payments.filter(p => 
                                p.userMobile.includes(searchTerm) || 
                                p.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.planName.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((p, i) => (
                                <tr key={i} className='group hover:bg-[#ffffff03] transition-all'>
                                    <td className='px-8 py-6'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 rounded-full bg-[#1ED760]/10 flex items-center justify-center'>
                                                <UserIcon className='w-5 h-5 text-[#1ED760]' />
                                            </div>
                                            <div>
                                                <p className='font-black text-white text-sm'>{p.userMobile}</p>
                                                <p className='text-[10px] text-gray-500 font-bold uppercase tracking-tighter'>ID: {p.userId.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <div className='flex flex-col'>
                                            <span className='text-xs font-black text-white uppercase tracking-widest'>{p.planName}</span>
                                            <span className='text-[10px] text-gray-500 font-bold'>Full Access Subscription</span>
                                        </div>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <p className='text-sm font-black text-[#1ED760]'>{p.amount}</p>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <Calendar className='w-3 h-3 text-gray-600' />
                                            <p className='text-xs font-bold text-gray-400'>{new Date(p.date).toLocaleDateString()}</p>
                                        </div>
                                        <p className='text-[10px] font-black text-gray-600 uppercase tracking-widest'>{p.paymentMethod}</p>
                                    </td>
                                    <td className='px-8 py-6 text-right'>
                                        <span className='px-3 py-1 bg-[#1ED760]/10 text-[#1ED760] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#1ED760]/20'>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Financial Summary */}
            {!loading && payments.length > 0 && (
                <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-[#111] p-6 rounded-3xl border border-[#222]'>
                        <p className='text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2'>Total Revenue</p>
                        <h4 className='text-2xl font-black text-white'>₹{payments.reduce((acc, p) => acc + parseInt(p.amount.replace(/[^0-9]/g, '') || 0), 0)}</h4>
                    </div>
                    <div className='bg-[#111] p-6 rounded-3xl border border-[#222]'>
                        <p className='text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2'>Successful Trans.</p>
                        <h4 className='text-2xl font-black text-white'>{payments.length}</h4>
                    </div>
                    <div className='bg-[#111] p-6 rounded-3xl border border-[#222]'>
                        <p className='text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2'>Avg. Ticket Size</p>
                        <h4 className='text-2xl font-black text-white'>₹{Math.round(payments.reduce((acc, p) => acc + parseInt(p.amount.replace(/[^0-9]/g, '') || 0), 0) / (payments.length || 1))}</h4>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentHistory
