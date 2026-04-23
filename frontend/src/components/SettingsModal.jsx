import React, { useState } from 'react'
import { X, ChevronLeft, ToggleLeft, ToggleRight, Check, Shield, Lock, Eye, EyeOff, Trash2 } from 'lucide-react'
import axios from 'axios'

const SettingsModal = ({ setting, isOpen, onClose }) => {
  const [toggles, setToggles] = useState({
    push: true,
    email: false,
    public: true,
    activity: true,
    highQuality: true,
    darkMode: true
  })

  // Change Password State
  const [showPasswordUI, setShowPasswordUI] = useState(false)
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen || !setting) return null

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePasswordUpdate = async () => {
    if (!passwords.new || passwords.new !== passwords.confirm) {
        alert("Passwords do not match!")
        return
    }
    setIsUpdating(true)
    // SIMULATE REAL API CALL
    setTimeout(() => {
        setIsUpdating(false)
        setIsSuccess(true)
        setTimeout(() => {
            setIsSuccess(false)
            setShowPasswordUI(false)
            setPasswords({ old: '', new: '', confirm: '' })
        }, 2000)
    }, 1500)
  }

  const renderContent = () => {
    if (showPasswordUI) {
        return (
            <div className='space-y-6'>
                <div onClick={() => setShowPasswordUI(false)} className='flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer hover:text-white transition-all uppercase tracking-widest'>
                    <ChevronLeft className='w-4 h-4' /> Back to Account
                </div>
                <div className='space-y-4 bg-[#111] p-6 rounded-3xl border border-[#222]'>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Current Password</label>
                        <div className='relative'>
                            <input 
                                type={showPass ? "text" : "password"} 
                                value={passwords.old}
                                onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                                className='w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 outline-none focus:border-[#1ED760]' 
                            />
                            <div onClick={() => setShowPass(!showPass)} className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white'>
                                {showPass ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-widest text-gray-500'>New Password</label>
                        <input 
                            type="password" 
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            className='w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 outline-none focus:border-[#1ED760]' 
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-[10px] font-black uppercase tracking-widest text-gray-500'>Confirm New Password</label>
                        <input 
                            type="password" 
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            className='w-full bg-[#1a1a1a] border border-[#333] rounded-xl p-4 outline-none focus:border-[#1ED760]' 
                        />
                    </div>
                    
                    <button 
                        onClick={handlePasswordUpdate}
                        disabled={isUpdating}
                        className='w-full py-4 bg-[#1ED760] text-black font-black rounded-full hover:scale-105 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2'
                    >
                        {isUpdating ? "Updating..." : isSuccess ? "Success!" : "Update Password"}
                        {isSuccess && <Check className='w-5 h-5' />}
                    </button>
                </div>
            </div>
        )
    }

    switch (setting.title) {
      case 'Account':
        return (
          <div className='space-y-6'>
            <div className='p-6 bg-[#111] rounded-2xl border border-[#222]'>
                <p className='text-[10px] font-black uppercase tracking-widest text-[#1ED760] mb-2'>Verified Identity</p>
                <h4 className='text-xl font-black text-white tracking-tighter'>+91 {localStorage.getItem('mobileNumber')}</h4>
                <p className='text-xs text-gray-500 mt-1'>Managed via secure mobile authentication.</p>
            </div>
            <div className='space-y-3'>
                <button 
                    onClick={() => setShowPasswordUI(true)}
                    className='w-full p-4 bg-[#1a1a1a] hover:bg-[#222] text-white font-bold text-sm rounded-xl text-left transition-all flex items-center justify-between group border border-transparent hover:border-[#333]'
                >
                    <div className='flex items-center gap-3'>
                        <Lock className='w-4 h-4 text-gray-500' />
                        Change Account Password
                    </div>
                    <ChevronLeft className='w-4 h-4 rotate-180 text-gray-600 group-hover:text-white' />
                </button>
                <button 
                    onClick={() => { if(window.confirm("Permanently delete account?")) alert("Account scheduled for deletion.") }}
                    className='w-full p-4 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold text-sm rounded-xl text-left transition-all flex items-center gap-3 group'
                >
                    <Trash2 className='w-4 h-4 opacity-50 group-hover:opacity-100' />
                    Delete Account & Data
                </button>
            </div>
          </div>
        )
      case 'Language':
        return (
          <div className='space-y-2'>
            {['English (US)', 'English (UK)', 'Hindi (हिन्दी)', 'Spanish (Español)', 'French (Français)'].map((lang) => (
              <div key={lang} className='flex items-center justify-between p-4 hover:bg-[#111] rounded-xl cursor-pointer group'>
                <p className={`font-bold ${lang.includes('English') ? 'text-[#1ED760]' : 'text-white'}`}>{lang}</p>
                {lang.includes('English (US)') && <Check className='text-[#1ED760] w-5 h-5' />}
              </div>
            ))}
          </div>
        )
      case 'Notifications':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between p-4 bg-[#111] rounded-xl'>
              <div>
                <p className='font-bold text-white'>Push Notifications</p>
                <p className='text-xs text-gray-500'>Receive alerts on your device</p>
              </div>
              <div onClick={() => handleToggle('push')} className='cursor-pointer'>
                {toggles.push ? <ToggleRight className='text-[#1ED760] w-8 h-8' /> : <ToggleLeft className='text-gray-600 w-8 h-8' />}
              </div>
            </div>
            <div className='flex items-center justify-between p-4 bg-[#111] rounded-xl'>
              <div>
                <p className='font-bold text-white'>Email Notifications</p>
                <p className='text-xs text-gray-500'>Weekly discovery and news</p>
              </div>
              <div onClick={() => handleToggle('email')} className='cursor-pointer'>
                {toggles.email ? <ToggleRight className='text-[#1ED760] w-8 h-8' /> : <ToggleLeft className='text-gray-600 w-8 h-8' />}
              </div>
            </div>
          </div>
        )
      case 'Privacy & Social':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between p-4 bg-[#111] rounded-xl'>
              <div>
                <p className='font-bold text-white'>Public Profile</p>
                <p className='text-xs text-gray-400'>Others can see your playlists</p>
              </div>
              <div onClick={() => handleToggle('public')} className='cursor-pointer'>
                {toggles.public ? <ToggleRight className='text-[#1ED760] w-8 h-8' /> : <ToggleLeft className='text-gray-600 w-8 h-8' />}
              </div>
            </div>
            <div className='flex items-center justify-between p-4 bg-[#111] rounded-xl'>
              <div>
                <p className='font-bold text-white'>Listening Activity</p>
                <p className='text-xs text-gray-400'>Share what you listen to</p>
              </div>
              <div onClick={() => handleToggle('activity')} className='cursor-pointer'>
                {toggles.activity ? <ToggleRight className='text-[#1ED760] w-8 h-8' /> : <ToggleLeft className='text-gray-600 w-8 h-8' />}
              </div>
            </div>
          </div>
        )
      case 'Audio Quality':
        return (
          <div className='space-y-4'>
            {['Automatic', 'Low', 'Normal', 'High', 'Very High'].map((q) => (
              <div key={q} className='flex items-center justify-between p-4 hover:bg-[#111] rounded-xl cursor-pointer group'>
                <p className={`font-bold ${q === 'Very High' ? 'text-[#1ED760]' : 'text-white'}`}>{q}</p>
                {q === 'Very High' && <Check className='text-[#1ED760] w-5 h-5' />}
              </div>
            ))}
          </div>
        )
      case 'Appearance':
        return (
          <div className='space-y-6'>
             <div className='flex items-center justify-between p-4 bg-[#111] rounded-xl'>
              <div>
                <p className='font-bold text-white'>Dark Mode</p>
                <p className='text-xs text-gray-400'>Using Spotify's signature theme</p>
              </div>
              <div onClick={() => handleToggle('darkMode')} className='cursor-pointer'>
                {toggles.darkMode ? <ToggleRight className='text-[#1ED760] w-8 h-8' /> : <ToggleLeft className='text-gray-600 w-8 h-8' />}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className='py-10 text-center text-gray-400'>
            <Shield className='w-12 h-12 mx-auto mb-4 opacity-20' />
            <p className='font-bold text-sm'>Select a category to view settings.</p>
          </div>
        )
    }
  }

  return (
    <div className='fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[110] p-4'>
      <div className='bg-[#0a0a0a] border border-[#222] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative'>
        
        {/* Header */}
        <div className='p-6 flex items-center justify-between border-b border-[#222] bg-[#111]'>
            <div className='flex items-center gap-3'>
                <div onClick={onClose} className='p-2 hover:bg-[#222] rounded-full cursor-pointer transition-all'>
                    <ChevronLeft className='w-5 h-5 text-white' />
                </div>
                <div>
                    <h3 className='text-xl font-black text-white tracking-tighter'>{setting.title}</h3>
                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{setting.desc}</p>
                </div>
            </div>
            <X onClick={onClose} className='text-gray-500 cursor-pointer hover:text-white w-6 h-6' />
        </div>

        <div className='p-8 min-h-[400px] max-h-[70vh] overflow-y-auto scrollbar-hide'>
            {renderContent()}
        </div>

        {/* Footer */}
        <div className='p-6 bg-[#050505] border-t border-[#222] flex justify-between items-center'>
            <span className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>Encryption Active</span>
            <button 
                onClick={onClose}
                className='px-6 py-2 bg-white text-black font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all'
            >
                Done
            </button>
        </div>

      </div>
    </div>
  )
}

export default SettingsModal
