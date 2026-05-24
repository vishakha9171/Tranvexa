
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 py-4 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-800 tracking-wide uppercase">Tranvexa Logistics Terminal</span>
          <span className="text-slate-300">|</span>
          <span>v1.0.0 (Production Master)</span>
        </div>

        
        <div className="flex items-center gap-6">
          <span className="hidden md:inline-block">Yard Cluster: Central India Factory Gate</span>
          <p>© {currentYear} Tranvexa Inc. All industrial logistics rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;