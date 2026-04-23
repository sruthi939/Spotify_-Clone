import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Phone, ChevronRight, ArrowLeft, ShieldCheck, Loader2, Mail, Smartphone, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [step, setStep] = useState('mobile') 
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const navigate = useNavigate()

  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  // SIMULATE SMS ARRIVAL
  useEffect(() => {
    if (step === 'otp') {
        const timeout = setTimeout(() => {
            setShowNotification(true)
            // Auto-hide after 5 seconds
            setTimeout(() => setShowNotification(false), 5000)
        }, 2000)
        return () => clearTimeout(timeout)
    }
  }, [step])

  const handleMobileSubmit = (e) => {
    e.preventDefault()
    if (mobile.length === 10) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setStep('otp')
        setTimer(30)
      }, 1500)
    } else {
      alert("Please enter a valid 10-digit mobile number")
    }
  }

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code === '1234') {
      setLoading(true)
      setTimeout(() => {
        localStorage.setItem('mobileNumber', mobile)
        navigate('/')
      }, 1000)
    } else {
      alert("Invalid OTP. Please use '1234' for testing.")
      setOtp(['', '', '', ''])
      document.getElementById('otp-0').focus()
    }
  }

  const resendOtp = () => {
    if (timer === 0) {
      setTimer(30)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)
      }, 1000)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4 font-sans relative overflow-hidden'>
      
      {/* SMS NOTIFICATION SIMULATION */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-[380px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 z-[200] transition-all duration-500 shadow-2xl ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
          <div className='w-10 h-10 bg-[#1ED760] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(30,215,96,0.5)]'>
            <Smartphone className='text-black w-5 h-5' />
          </div>
          <div className='flex-1'>
            <p className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Messages • Now</p>
            <p className='text-xs font-bold text-white'>Your Spotify code is <span className='text-[#1ED760] font-black text-sm'>1234</span>. Don't share this with anyone.</p>
          </div>
          <X onClick={() => setShowNotification(false)} className='w-4 h-4 text-gray-500 cursor-pointer hover:text-white' />
      </div>

      <div className='w-full max-w-[450px] bg-[#111] border border-[#222] p-10 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] relative overflow-hidden'>
        
        <div className='absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#1ED760] to-[#D4AF37]'></div>

        {step === 'otp' && !loading && (
          <button 
            onClick={() => setStep('mobile')}
            className='absolute left-8 top-10 text-gray-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest'
          >
            <ArrowLeft className='w-4 h-4' /> Back
          </button>
        )}

        <div className='flex justify-center mb-10 mt-6'>
          <img className='w-36 hover:scale-105 transition-all cursor-pointer' src={assets.spotify_logo} alt="Spotify" />
        </div>

        <div className='text-center mb-12'>
          <h1 className='text-4xl font-black mb-3 tracking-tighter'>
            {step === 'mobile' ? 'Welcome Back' : 'Verification'}
          </h1>
          <div className='flex items-center justify-center gap-2'>
            {step === 'otp' && <Smartphone className='w-4 h-4 text-[#1ED760]' />}
            <p className='text-gray-400 text-sm font-bold'>
                {step === 'mobile' 
                ? 'Sign in to continue to Spotify.' 
                : `Enter the code sent to +91 ${mobile}`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className='flex flex-col items-center justify-center py-16 space-y-6'>
            <div className='relative'>
                <div className='w-20 h-20 border-4 border-[#1ED760]/10 rounded-full'></div>
                <div className='w-20 h-20 border-4 border-[#1ED760] border-t-transparent rounded-full animate-spin absolute top-0 left-0'></div>
            </div>
            <p className='text-[#1ED760] font-black tracking-widest text-xs uppercase animate-pulse'>Secure Connection...</p>
          </div>
        ) : (
          <>
            {step === 'mobile' ? (
              <form className='space-y-8' onSubmit={handleMobileSubmit}>
                <div className='space-y-3'>
                  <label className='text-[10px] font-black uppercase tracking-[4px] text-gray-500 ml-2'>Mobile Number</label>
                  <div className='relative'>
                    <div className='absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pr-4 border-r border-[#333]'>
                      <span className='text-sm font-black text-gray-400'>+91</span>
                    </div>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="00000 00000"
                      className='w-full bg-[#1a1a1a] border border-[#333] rounded-[24px] py-6 pl-24 pr-6 text-xl font-black tracking-[4px] focus:outline-none focus:border-[#1ED760] transition-all placeholder:text-gray-800'
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className='w-full bg-[#1ED760] text-black font-black py-6 rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95 shadow-2xl group'
                >
                  Continue with Mobile <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-all' />
                </button>

                <div className='flex items-center gap-4 py-4'>
                    <div className='h-[1px] flex-1 bg-[#222]'></div>
                    <span className='text-[10px] font-black text-gray-600 uppercase tracking-widest'>or</span>
                    <div className='h-[1px] flex-1 bg-[#222]'></div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <button type='button' className='flex items-center justify-center gap-2 p-4 bg-[#1a1a1a] border border-[#333] rounded-2xl hover:bg-[#222] transition-all'>
                        <Mail className='w-4 h-4 text-gray-400' />
                        <span className='text-[10px] font-black uppercase tracking-widest'>Email</span>
                    </button>
                    <button type='button' className='flex items-center justify-center gap-2 p-4 bg-[#1a1a1a] border border-[#333] rounded-2xl hover:bg-[#222] transition-all'>
                        <Phone className='w-4 h-4 text-gray-400' />
                        <span className='text-[10px] font-black uppercase tracking-widest'>Google</span>
                    </button>
                </div>
              </form>
            ) : (
              <form className='space-y-12' onSubmit={handleLogin}>
                <div className='flex justify-between gap-4'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className='w-full h-20 bg-[#1a1a1a] border border-[#333] rounded-2xl text-center text-4xl font-black focus:outline-none focus:border-[#1ED760] transition-all text-[#1ED760]'
                      required
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <div className='space-y-6'>
                  <button 
                    type="submit"
                    className='w-full bg-white text-black font-black py-6 rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95 shadow-2xl'
                  >
                    <ShieldCheck className='w-6 h-6' /> Verify & Login
                  </button>
                  
                  <div className='text-center'>
                    <p className='text-xs text-gray-500 font-bold'>
                      Didn't receive code? {timer > 0 ? (
                        <span className='text-gray-400 ml-1'>Wait <span className='text-white font-black'>{timer}s</span></span>
                      ) : (
                        <button onClick={resendOtp} type='button' className='text-[#1ED760] font-black hover:underline ml-1 underline-offset-4'>Resend code</button>
                      )}
                    </p>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        <div className='mt-16 text-center pt-8 border-t border-[#222]'>
          <p className='text-[10px] text-gray-600 font-black tracking-widest uppercase mb-2'>
            Secure verification by Spotify
          </p>
          <div className='flex items-center justify-center gap-4 text-[9px] text-gray-700 font-bold'>
            <span className='hover:text-gray-400 cursor-pointer'>Privacy Policy</span>
            <span className='w-1 h-1 bg-gray-800 rounded-full'></span>
            <span className='hover:text-gray-400 cursor-pointer'>Terms of Service</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
