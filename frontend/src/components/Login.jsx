import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Phone, ChevronRight, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [step, setStep] = useState('mobile') 
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const navigate = useNavigate()

  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

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
        localStorage.setItem('userMobile', mobile)
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
      alert("New OTP sent to +91 " + mobile)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4 font-sans'>
      <div className='w-full max-w-[450px] bg-[#111] border border-[#222] p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden'>
        
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#1ED760] to-[#D4AF37]'></div>

        {step === 'otp' && !loading && (
          <button 
            onClick={() => setStep('mobile')}
            className='absolute left-6 top-8 text-gray-500 hover:text-white transition-all flex items-center gap-1 text-xs font-bold uppercase tracking-tighter'
          >
            <ArrowLeft className='w-3 h-3' /> Change Number
          </button>
        )}

        <div className='flex justify-center mb-8 mt-4'>
          <img className='w-32 hover:scale-105 transition-transform cursor-pointer' src={assets.spotify_logo} alt="Spotify" />
        </div>

        <div className='text-center mb-10'>
          <h1 className='text-3xl font-black mb-2 tracking-tight'>
            {step === 'mobile' ? 'Mobile Login' : 'Verification'}
          </h1>
          <p className='text-gray-400 text-sm font-medium'>
            {step === 'mobile' 
              ? 'Enter your mobile number to get started' 
              : `Verification code sent to +91 ${mobile.slice(0,2)}******${mobile.slice(-2)}`}
          </p>
        </div>

        {loading ? (
          <div className='flex flex-col items-center justify-center py-10 space-y-4'>
            <Loader2 className='w-12 h-12 text-[#1ED760] animate-spin' />
            <p className='text-[#1ED760] font-bold animate-pulse'>Securely verifying...</p>
          </div>
        ) : (
          <>
            {step === 'mobile' ? (
              <form className='space-y-8' onSubmit={handleMobileSubmit}>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-[3px] text-gray-500 ml-1'>Phone Number</label>
                  <div className='relative group'>
                    <div className='absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-[#333]'>
                      <span className='text-sm font-black text-gray-400'>+91</span>
                    </div>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="00000 00000"
                      className='w-full bg-[#1a1a1a] border border-[#333] rounded-2xl py-5 pl-20 pr-4 text-xl font-black tracking-[4px] focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/10 transition-all placeholder:text-gray-800'
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className='w-full bg-[#1ED760] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 shadow-[0_15px_35px_rgba(30,215,96,0.25)] group'
                >
                  Get OTP <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </button>
              </form>
            ) : (
              <form className='space-y-10' onSubmit={handleLogin}>
                <div className='flex justify-between gap-3'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className='w-full h-16 bg-[#1a1a1a] border border-[#333] rounded-2xl text-center text-3xl font-black focus:outline-none focus:border-[#1ED760] focus:ring-4 focus:ring-[#1ED760]/10 transition-all text-[#1ED760]'
                      required
                    />
                  ))}
                </div>

                <div className='space-y-4'>
                  <button 
                    type="submit"
                    className='w-full bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 shadow-[0_15px_35px_rgba(255,255,255,0.1)]'
                  >
                    <ShieldCheck className='w-5 h-5' /> Complete Login
                  </button>
                  
                  <div className='text-center'>
                    <p className='text-xs text-gray-500 font-medium'>
                      Didn't receive code? {timer > 0 ? (
                        <span className='text-gray-400 ml-1'>Resend in <span className='text-white font-bold'>{timer}s</span></span>
                      ) : (
                        <button onClick={resendOtp} type='button' className='text-[#1ED760] font-black hover:underline ml-1'>Resend Now</button>
                      )}
                    </p>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        <div className='mt-12 text-center pt-8 border-t border-[#222]'>
          <p className='text-[9px] text-gray-600 uppercase font-black tracking-[2px] leading-loose'>
            Protected by Spotify Cloud Security<br/>
            © 2024 Spotify AB
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
