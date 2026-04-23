import React from 'react'
import { PlusCircle, List, Music, LayoutGrid, BarChart2, Users, Settings, LogOut, CreditCard, Crown, Shield } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = ({ setToken }) => {
  const location = useLocation()

  const navItems = [
    { to: '/add-song', label: 'Add Song', icon: PlusCircle, group: 'Management' },
    { to: '/list-song', label: 'List Songs', icon: List, group: 'Management' },
    { to: '/add-album', label: 'Add Album', icon: PlusCircle, group: 'Management' },
    { to: '/list-album', label: 'List Albums', icon: LayoutGrid, group: 'Management' },
    { to: '/analytics', label: 'Analytics', icon: BarChart2, group: 'System' },
    { to: '/user-roles', label: 'User Roles', icon: Users, group: 'System' },
    { to: '/premium', label: 'Premium VIPs', icon: Crown, group: 'System' },
    { to: '/payments', label: 'Payment History', icon: CreditCard, group: 'System' },
    { to: '/profile', label: 'Admin Profile', icon: Shield, group: 'System' },
    { to: '/settings', label: 'System Settings', icon: Settings, group: 'System' },
  ]

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to end your administrative session?")) {
        setToken('')
    }
  }

  return (
    <div className='w-[18%] min-h-screen bg-[#050505] border-r border-[#111] flex flex-col p-6'>
      
      {/* Logo */}
      <div className='flex items-center gap-3 mb-12 px-2'>
        <div className='w-10 h-10 bg-[#1ED760] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(30,215,96,0.3)]'>
          <Music className='text-black w-6 h-6' />
        </div>
        <h1 className='text-xl font-black tracking-tighter'>Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar'>
        
        <p className='text-[10px] font-black text-gray-500 uppercase tracking-[3px] mb-4 px-2 mt-4'>Management</p>
        
        {navItems.filter(i => i.group === 'Management').map((item) => {
          const isActive = location.pathname === item.to
          const Icon = item.icon
          
          return (
            <NavLink 
              key={item.to} 
              to={item.to} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-[#1ED760]/10 text-[#1ED760] border border-[#1ED760]/20' : 'text-gray-400 hover:text-white hover:bg-[#111] border border-transparent'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#1ED760]' : 'text-gray-500 group-hover:text-white'}`} />
              <span className='text-sm font-bold'>{item.label}</span>
            </NavLink>
          )
        })}

        <div className='pt-8 space-y-1'>
            <p className='text-[10px] font-black text-gray-500 uppercase tracking-[3px] mb-4 px-2'>System & Users</p>
            
            {navItems.filter(i => i.group === 'System').map((item) => {
              const isActive = location.pathname === item.to
              const Icon = item.icon
              
              return (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-[#1ED760]/10 text-[#1ED760] border border-[#1ED760]/20' : 'text-gray-400 hover:text-white hover:bg-[#111] border border-transparent'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#1ED760]' : 'text-gray-500 group-hover:text-white'}`} />
                  <span className='text-sm font-bold'>{item.label}</span>
                </NavLink>
              )
            })}
        </div>
      </nav>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className='flex items-center gap-4 px-4 py-4 mt-auto rounded-xl text-red-500 hover:bg-red-500/10 transition-all group font-black uppercase text-[10px] tracking-widest'
      >
        <LogOut className='w-5 h-5' />
        End Session
      </button>

    </div>
  )
}

export default Sidebar
