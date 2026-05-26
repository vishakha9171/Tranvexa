import { useNavigate } from 'react-router-dom';
import { Shield, Truck, BarChart3, ArrowRight } from 'lucide-react';

export default function PublicLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-black" />,
      title: "Fleet Allocation Engine",
      description: "Prevent asset conflicts with high-density, real-time vehicle booking and manifest status automation."
    },
    {
      icon: <Shield className="w-6 h-6 text-black" />,
      title: "Secure Yard Gatekeeping",
      description: "Automate driver compliance tracking, digital gate-pass validation, and regional credential security."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-black" />,
      title: "Live Telematics Dashboard",
      description: "Monitor end-to-end yard metrics, load distributions, and transit fulfillment status on a unified grid."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Public Header/Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-wider text-black">TRANVEXA</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Core</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')} 
              className="text-sm font-medium text-gray-600 hover:text-black transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="bg-black text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-gray-100 px-6 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-none">
            Industrial Fleet Logistics & Dispatch Orchestration
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed">
            A high-density asset management portal built for real-time tracking, intelligent operator allocation, and automated manifest routing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-medium shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Access Platform <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition"
            >
              Operator Log In
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full flex-1">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Built for Mission-Critical Supply Chains</h2>
          <p className="text-gray-500 mt-2">Enterprise parameters engineered to optimize system yard throughput.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="p-3 bg-slate-100 rounded-xl w-fit mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-normal">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Call To Action (CTA) */}
      <section className="bg-black text-white px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Ready to streamline dispatch operations?</h2>
          <p className="text-slate-400 mt-3 mb-8 font-normal">Connect to your live fleet database registry and deploy transport manifests instantly.</p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-black px-6 py-3.5 rounded-xl font-semibold shadow hover:bg-slate-50 transition"
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-8 text-center text-xs text-gray-400 font-normal">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Tranvexa Logistics Corp. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-600 cursor-pointer">Security Protocol</span>
            <span className="hover:text-gray-600 cursor-pointer">API Manifest</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}