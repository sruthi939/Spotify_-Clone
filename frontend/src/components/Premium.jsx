import React from 'react'
import Navbar from './Navbar'
import { Check, Zap, Smartphone, Headphones, ShieldCheck, Star } from 'lucide-react'
import PaymentModal from './PaymentModal'
import { useState } from 'react'

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const benefits = [
    { title: "Ad-free music listening", desc: "Enjoy uninterrupted music.", icon: <ShieldCheck className='w-6 h-6 text-[#1ED760]' /> },
    { title: "Offline playback", desc: "Save your data by listening offline.", icon: <Smartphone className='w-6 h-6 text-[#1ED760]' /> },
    { title: "Play in any order", desc: "Any song, any time.", icon: <Zap className='w-6 h-6 text-[#1ED760]' /> },
    { title: "High audio quality", desc: "Listen in high fidelity.", icon: <Headphones className='w-6 h-6 text-[#1ED760]' /> }
  ]

  const plans = [
    { 
        name: "Mini", 
        price: "₹7 / day", 
        features: ["1 mobile account", "Download 30 songs on 1 device", "Ad-free music on mobile", "UPI and cards accepted"],
        color: "#7358ff"
    },
    { 
        name: "Student", 
        price: "₹59 / month", 
        features: ["1 verified account", "Up to 50% discount for students", "Ad-free music", "Download 10k songs/device"],
        color: "#f3ca40"
    },
    { 
        name: "Individual", 
        price: "₹119 / month", 
        features: ["1 account", "Ad-free music listening", "Download 10k songs/device", "Prepaid or subscription"], 
        popular: true,
        color: "#1ED760"
    },
    { 
        name: "Duo", 
        price: "₹149 / month", 
        features: ["2 accounts", "For couples under one roof", "Ad-free music", "Download 10k songs/device"],
        color: "#e8115b"
    },
    { 
        name: "Family", 
        price: "₹179 / month", 
        features: ["Up to 6 accounts", "For family under one roof", "Block explicit music", "Download 10k songs/device"],
        color: "#27856a"
    }
  ]

  const handleSubscription = (plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  return (
    <div className='flex flex-col h-full bg-[#050505] text-white'>
      <Navbar />
      
      {/* Payment Modal Overlay */}
      {selectedPlan && (
        <PaymentModal 
            plan={selectedPlan} 
            isOpen={isModalOpen} 
            onClose={() => { setIsModalOpen(false); setSelectedPlan(null); }} 
        />
      )}
      
      <div className='flex-1 overflow-y-auto scrollbar-hide pb-20'>
        
        {/* Hero Section */}
        <div className='bg-gradient-to-b from-[#1d1d1d] to-[#050505] pt-16 pb-12 px-8 text-center'>
            <div className='flex justify-center mb-6'>
                <div className='bg-[#1ED760] p-4 rounded-3xl rotate-12 shadow-[0_0_50px_rgba(30,215,96,0.3)]'>
                    <Star className='text-black w-10 h-10 fill-black' />
                </div>
            </div>
            <h1 className='text-5xl font-black mb-4 tracking-tighter'>Get Premium free for 1 month</h1>
            <p className='text-lg text-gray-300 font-medium max-w-xl mx-auto'>
                Just <span className='text-[#D4AF37] font-bold'>₹119/month</span> after. Cancel anytime. Ad-free music, offline listening, and much more.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
                <button 
                    onClick={() => handleSubscription('Individual')}
                    className='w-full sm:w-auto px-10 py-4 bg-[#1ED760] text-black font-black rounded-full hover:scale-105 transition-all shadow-xl'>
                    GET STARTED
                </button>
                <button 
                    className='w-full sm:w-auto px-10 py-4 border border-[#D4AF37] text-[#D4AF37] font-black rounded-full hover:bg-[#D4AF37] hover:text-black transition-all'>
                    VIEW ALL PLANS
                </button>
            </div>
            <p className='text-[10px] text-gray-500 mt-6 font-bold uppercase tracking-widest'>Terms and conditions apply. Open only to users who haven't tried Premium.</p>
        </div>

        {/* Why Premium Section */}
        <section className='px-8 py-20 bg-[#0a0a0a] border-y border-[#D4AF37]/10'>
            <h2 className='text-3xl font-black text-center mb-16 uppercase tracking-tighter text-[#D4AF37]'>Why go Premium?</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                {benefits.map((benefit, i) => (
                    <div key={i} className='flex flex-col items-center text-center space-y-4 group'>
                        <div className='w-16 h-16 bg-[#111] border border-[#222] group-hover:border-[#1ED760] rounded-full flex items-center justify-center shadow-lg transition-all duration-300'>
                            {benefit.icon}
                        </div>
                        <h3 className='font-black text-lg text-white group-hover:text-[#1ED760] transition-colors'>{benefit.title}</h3>
                        <p className='text-sm text-gray-400 font-medium'>{benefit.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Plans Section */}
        <section className='px-8 py-20 bg-[#050505]'>
            <h2 className='text-3xl font-black text-center text-white mb-4 uppercase tracking-tighter'>Pick your <span className='text-[#1ED760]'>Premium</span></h2>
            <p className='text-center text-gray-400 mb-16 font-medium'>Listen without limits on your phone, speaker, and other devices.</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[1400px] mx-auto'>
                {plans.map((plan, i) => (
                    <div key={i} className={`relative flex flex-col p-6 rounded-3xl border-2 ${plan.popular ? 'border-[#1ED760] bg-[#121212]' : 'border-[#222] bg-[#0a0a0a]'} shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-500`}>
                        {plan.popular && (
                            <span className='absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1ED760] text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest'>
                                Most Popular
                            </span>
                        )}
                        <h3 className='text-xl font-black mb-1'>{plan.name}</h3>
                        <p className='text-lg font-bold text-[#D4AF37] mb-6'>{plan.price}</p>
                        
                        <div className='flex-1 space-y-3 mb-8'>
                            {plan.features.map((feat, j) => (
                                <div key={j} className='flex items-start gap-2'>
                                    <Check className='w-3 h-3 text-[#1ED760] mt-1 shrink-0' />
                                    <span className='text-[11px] font-medium text-gray-400 leading-tight'>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => handleSubscription(plan)}
                            className={`w-full py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${plan.popular ? 'bg-[#1ED760] text-black hover:scale-105 shadow-[0_0_20px_rgba(30,215,96,0.3)]' : 'bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:scale-105'}`}>
                            Get {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </div>
  )
}

export default Premium
