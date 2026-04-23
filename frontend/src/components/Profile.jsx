import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import { Edit2, LogOut, Settings as SettingsIcon, Share2, CreditCard, CheckCircle, Clock, ChevronRight, Bell, Shield, User, Volume2, Moon, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import SettingsModal from './SettingsModal'
import axios from 'axios'

const Profile = () => {
  const navigate = useNavigate();
  const { songsData, playWithId } = useContext(PlayerContext)
  const [payments, setPayments] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [activeSetting, setActiveSetting] = useState(null)
  const [name, setName] = useState('Deepmind User')
  const userMobile = localStorage.getItem('mobileNumber') || ''

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment/list')
        if (response.data.success) {
          const userPayments = response.data.payments.filter(p => p.userMobile === userMobile)
          setPayments(userPayments.reverse())
        }
      } catch (error) {
        console.error("Error fetching payments:", error)
      }
    }
    if (userMobile) fetchPayments()
  }, [userMobile])

  const activePlan = payments.length > 0 ? payments[0] : null

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const settingsItems = [
    { icon: <User className='w-5 h-5 text-gray-400' />, title: "Account", desc: "Change your email or password" },
    { icon: <Bell className='w-5 h-5 text-gray-400' />, title: "Notifications", desc: "Choose what you want to hear from us" },
    { icon: <Shield className='w-5 h-5 text-gray-400' />, title: "Privacy & Social", desc: "Control your visibility and connections" },
    { icon: <Volume2 className='w-5 h-5 text-gray-400' />, title: "Audio Quality", desc: "Optimize your listening experience" },
    { icon: <Moon className='w-5 h-5 text-gray-400' />, title: "Appearance", desc: "Switch between dark and light themes" },
    { icon: <Globe className='w-5 h-5 text-gray-400' />, title: "Language", desc: "Change app language" }
  ]

  return (
    <div className='flex flex-col min-h-full bg-[#050505] text-white relative'>
      <Navbar />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4'>
            <div className='bg-[#181818] w-full max-w-md rounded-3xl p-8 border border-[#333] shadow-2xl'>
                <h3 className='text-2xl font-black mb-6'>Edit Details</h3>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Profile Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full bg-[#2a2a2a] border border-[#333] rounded-lg p-3 outline-none focus:border-[#1ED760]'
                        />
                    </div>
                    <div className='space-y-2 opacity-50'>
                        <label className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Mobile Number</label>
                        <input type="text" value={`+91 ${userMobile}`} disabled className='w-full bg-[#2a2a2a] border border-[#333] rounded-lg p-3 cursor-not-allowed' />
                    </div>
                </div>
                <div className='flex items-center gap-4 mt-10'>
                    <button onClick={() => setShowEditModal(false)} className='flex-1 py-3 font-bold text-gray-400 hover:text-white transition-all'>Cancel</button>
                    <button onClick={() => setShowEditModal(false)} className='flex-1 py-3 bg-white text-black font-black rounded-full hover:scale-105 transition-all'>Save Changes</button>
                </div>
            </div>
        </div>
      )}

      {/* Settings Detail Modal */}
      <SettingsModal 
        setting={activeSetting} 
        isOpen={showSettingsModal} 
        onClose={() => { setShowSettingsModal(false); setActiveSetting(null); }} 
      />

      {/* Profile Header */}
      <div className='mt-10 flex flex-col md:flex-row md:items-end gap-8 px-4'>
        <div className='relative group'>
          <div className='w-48 h-48 rounded-full bg-gradient-to-br from-[#1ED760] to-[#159f46] flex items-center justify-center text-7xl font-black text-black shadow-[0_20px_60px_rgba(30,215,96,0.2)] group-hover:scale-105 transition-all duration-500 uppercase'>
            {name[0]}
          </div>
          <button 
            onClick={() => setShowEditModal(true)}
            className='absolute bottom-2 right-2 bg-[#222] p-3 rounded-full border border-[#333] hover:bg-[#333] transition-all shadow-xl group-hover:scale-110'
          >
            <Edit2 className='w-5 h-5 text-white' />
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <p className='uppercase text-[10px] tracking-[4px] text-[#1ED760] font-black'>Verified Profile</p>
            {activePlan && (
              <span className='bg-[#D4AF37] text-black text-[9px] font-black px-2 py-0.5 rounded-sm uppercase'>Premium</span>
            )}
          </div>
          <h2 className='text-5xl md:text-8xl font-black leading-none text-white tracking-tighter'>
            {name}
          </h2>
          <p className='text-gray-400 font-bold'>+91 {userMobile}</p>
          <div className='flex items-center gap-4 text-xs font-bold text-gray-500 mt-4 uppercase tracking-widest'>
            <span className='hover:text-white cursor-pointer'>24 Playlists</span>
            <span>•</span>
            <span className='hover:text-white cursor-pointer'>1.2k Followers</span>
            <span>•</span>
            <span className='hover:text-white cursor-pointer'>89 Following</span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4 mt-10 px-4'>
        <button 
            onClick={() => setShowEditModal(true)}
            className='bg-white text-black px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl'>
          Edit Profile
        </button>
        <button className='p-3 rounded-full border border-[#333] hover:border-gray-400 transition-all'>
          <Share2 className='w-5 h-5 text-gray-400' />
        </button>
        <button className='p-3 rounded-full border border-[#333] hover:border-gray-400 transition-all'>
          <SettingsIcon className='w-5 h-5 text-gray-400' />
        </button>
        <button onClick={handleLogout} className='flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest hover:text-red-400 transition-all ml-auto'>
          <LogOut className='w-5 h-5' />
          Logout
        </button>
      </div>

      <div className='mt-12 space-y-12 px-4 pb-20'>
        
        {/* Top Tracks Section */}
        <section>
            <h3 className='text-2xl font-black mb-6 tracking-tighter'>Your Top Tracks This Month</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {songsData.slice(0, 4).map((song, i) => (
                    <div 
                        key={i} 
                        onClick={() => playWithId(song._id)}
                        className='flex items-center gap-4 p-3 bg-[#111] hover:bg-[#1a1a1a] rounded-xl cursor-pointer group transition-all border border-transparent hover:border-[#333]'
                    >
                        <span className='w-4 text-xs font-bold text-gray-500'>{i+1}</span>
                        <img src={song.image} alt="" className='w-12 h-12 rounded-md object-cover shadow-lg' />
                        <div className='flex-1'>
                            <p className='font-bold text-sm text-white group-hover:text-[#1ED760]'>{song.name}</p>
                            <p className='text-[10px] text-gray-500'>{song.desc}</p>
                        </div>
                        <span className='text-[10px] text-gray-500 font-medium'>{song.duration}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* Subscription Detail */}
        <div className='bg-gradient-to-r from-[#111] to-[#0a0a0a] rounded-3xl p-8 border border-[#222] relative overflow-hidden shadow-2xl'>
          <div className='absolute -right-10 -top-10 opacity-5'>
            <CreditCard className='w-64 h-64 text-white' />
          </div>
          <div className='relative z-10'>
            <h3 className='text-sm font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-6'>Subscription Details</h3>
            {activePlan ? (
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div>
                  <p className='text-3xl font-black text-white tracking-tighter mb-1'>Spotify {activePlan.planName}</p>
                  <p className='text-xs text-gray-400 font-medium'>Renews on {new Date(new Date(activePlan.date).setMonth(new Date(activePlan.date).getMonth() + 1)).toLocaleDateString()}</p>
                </div>
                <div className='flex items-center gap-3 bg-[#1ED760]/10 border border-[#1ED760]/20 px-6 py-3 rounded-2xl'>
                  <CheckCircle className='text-[#1ED760] w-5 h-5' />
                  <span className='text-sm font-black text-[#1ED760] uppercase tracking-widest'>Current Plan</span>
                </div>
              </div>
            ) : (
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div>
                  <p className='text-3xl font-black text-white tracking-tighter mb-1'>Spotify Free</p>
                  <p className='text-xs text-gray-400 font-medium'>Experience uninterrupted music with Premium.</p>
                </div>
                <button onClick={() => navigate('/premium')} className='bg-[#D4AF37] text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg'>
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        </div>

        {/* App Settings List */}
        <section>
            <h3 className='text-2xl font-black mb-6 tracking-tighter'>Account Settings</h3>
            <div className='bg-[#0a0a0a] border border-[#111] rounded-3xl overflow-hidden'>
                {settingsItems.map((item, i) => (
                    <div 
                        key={i} 
                        onClick={() => { setActiveSetting(item); setShowSettingsModal(true); }}
                        className='flex items-center justify-between p-5 hover:bg-[#111] cursor-pointer transition-all border-b border-[#111] last:border-none group'
                    >
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 bg-[#111] group-hover:bg-[#1a1a1a] rounded-full flex items-center justify-center transition-all'>
                                {item.icon}
                            </div>
                            <div>
                                <p className='font-bold text-sm text-white'>{item.title}</p>
                                <p className='text-[10px] text-gray-500'>{item.desc}</p>
                            </div>
                        </div>
                        <ChevronRight className='w-4 h-4 text-gray-600 group-hover:text-white transition-all' />
                    </div>
                ))}
            </div>
        </section>

        {/* Payment History Table */}
        {payments.length > 0 && (
          <div>
            <div className='flex items-center gap-3 mb-8'>
              <Clock className='text-[#1ED760] w-5 h-5' />
              <h3 className='text-2xl font-black text-white tracking-tighter'>Billing History</h3>
            </div>
            <div className='bg-[#111] rounded-2xl overflow-hidden border border-[#222] shadow-2xl'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-[#0a0a0a] border-b border-[#222]'>
                    <th className='px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Invoice</th>
                    <th className='px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Amount</th>
                    <th className='px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Method</th>
                    <th className='px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} className='border-b border-[#222]/50 hover:bg-[#ffffff03] transition-all'>
                      <td className='px-6 py-4 font-bold text-sm text-white'>Spotify {p.planName}</td>
                      <td className='px-6 py-4 font-black text-sm text-[#D4AF37]'>{p.amount}</td>
                      <td className='px-6 py-4 text-xs text-gray-400 font-bold uppercase'>{p.paymentMethod}</td>
                      <td className='px-6 py-4'>
                        <span className='bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase'>Paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
