import { NavLink } from "react-router-dom";
import { Truck, Users, LayoutDashboard, MapPin, SlidersHorizontal } from "lucide-react";

export default function Sidebar() {

  const baseLinkStyle = "flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 font-medium text-sm";
  
 
  const checkActiveState = ({ isActive }) => 
    isActive 
      ? `${baseLinkStyle} bg-slate-900 text-white shadow-sm` 
      : `${baseLinkStyle} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;

  return (
    <div className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 shadow-sm p-5 hidden md:flex flex-col">
      
      
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Fleetora
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Logistics Portal</p>
      </div>


      <nav className="space-y-1.5 flex-1">
        
        <NavLink to="/dashboard" className={checkActiveState}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/vehicles" className={checkActiveState}>
          <Truck size={18} />
          <span>Vehicles</span>
        </NavLink>

        <NavLink to="/drivers" className={checkActiveState}>
          <Users size={18} />
          <span>Drivers</span>
        </NavLink>

        <NavLink to="/trips" className={checkActiveState}>
          <MapPin size={18} />
          <span>Trips</span>
        </NavLink>

        
        <div className="my-4 border-t border-slate-100"></div>

        <NavLink to="/dispatch" className={checkActiveState}>
          <SlidersHorizontal size={18} />
          <span>Dispatch Board</span>
        </NavLink>

      </nav>

     
      <div className="border-t border-slate-100 pt-4 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Operational Guard Active</span>
        </div>
      </div>

    </div>
  );
}