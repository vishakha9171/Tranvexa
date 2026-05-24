import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Shuffle, Truck, Route, Users, Radio } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Dispatch Board', path: '/dispatch', icon: Shuffle },
    { label: 'Vehicles Fleet', path: '/vehicles', icon: Truck },
    { label: 'Active Trips', path: '/trips', icon: Route },
    { label: 'Operators / Drivers', path: '/drivers', icon: Users },
  ];

  return (
    <aside className="hidden md:flex w-72 flex-col bg-slate-950 text-slate-100 border-r border-slate-900 min-h-screen sticky top-0 shadow-2xl select-none">
      <div className="p-6 border-b border-slate-900 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 text-white">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Tranvexa
            </h1>
            <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase mt-0.5">
              Logistics Engine
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 mt-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium tracking-wide text-xs md:text-sm transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-md shadow-md" />
              )}
              <IconComponent 
                className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-200 ${
                  isActive 
                    ? 'text-white scale-105' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-105'
                }`} 
              />
              <span className="flex-1">{item.label}</span>
              {!isActive && (
                <span className="opacity-0 -translate-x-1.5 transition-all duration-200 text-[10px] text-slate-600 group-hover:opacity-100 group-hover:translate-x-0">
                  ➔
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900 bg-slate-950/20">
        <div className="bg-slate-900/40 rounded-xl p-3.5 border border-slate-900/80 flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Terminal: <span className="text-slate-200 font-bold">HQ-INDORE-01</span>
          </div>
        </div>
      </div>
    </aside>
  );
}