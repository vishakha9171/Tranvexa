import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [metrics, setMetrics] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    deliveredOrders: 0,
    driversAvailable: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vehiclesRes, tripsRes, driversRes] = await Promise.all([
          API.get('/vehicles'),
          API.get('/trips'),
          API.get('/drivers')
        ]);

        const allVehicles = vehiclesRes.data.data || [];
        const allTrips = tripsRes.data.data || [];
        const allDrivers = driversRes.data.data || [];

        setTrips(allTrips.slice(0, 5)); 
        
        setMetrics({
          totalVehicles: allVehicles.length,
          activeTrips: allTrips.filter(t => t.status === 'In Transit').length,
          deliveredOrders: allTrips.filter(t => t.status === 'Delivered').length,
          driversAvailable: allDrivers.filter(d => d.status === 'Available').length
        });
      } catch (err) {
        console.error("Error connecting dashboard to logistics pipeline:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-600 font-medium">
        Loading real-time fleet yard metrics...
      </div>
    );
  }

  const statsConfig = [
    { title: 'Total Fleet Vehicles', value: metrics.totalVehicles, icon: '🚚', change: 'Live' },
    { title: 'Active Transits', value: metrics.activeTrips, icon: '📦', change: 'In Route' },
    { title: 'Completed Deliveries', value: metrics.deliveredOrders, icon: '✅', change: 'Archived' },
    { title: 'Operators Available', value: metrics.driversAvailable, icon: '👨‍✈️', change: 'On Standby' }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Transport Dashboard</h2>
          <p className="text-gray-500 mt-1">Monitor production line outputs, delivery fulfillment, and live asset allocations.</p>
        </div>

        <button 
          onClick={() => navigate('/dispatch')}
          className="bg-black text-white px-5 py-3 rounded-xl font-medium shadow hover:opacity-90 transition text-center"
        >
          + Create Manifest Dispatch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{item.change}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Recent Transits</h3>
            <p className="text-sm text-gray-500 mt-1">Real-time status tracking logs across regional dispatch fields.</p>
          </div>
          <button 
            onClick={() => navigate('/trips')}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-sm font-medium"
          >
            View All Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Trip ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Assigned Vehicle</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Operator (Driver)</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Destination Yard</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Transit Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-400">No active transport operations found in database registry.</td>
                </tr>
              ) : (
                trips.map((trip, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{trip.tripId || `TRIP-${trip._id.substring(18)}`}</td>
                    <td className="px-6 py-4 text-gray-600">{trip.vehicleId?.vehicleNumber || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-gray-600">{trip.driverId?.fullName || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-gray-600">{trip.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(trip.status)}`}>
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}