import { useState, useEffect } from 'react';
import API from '../services/api';

const MetricCard = ({ label, value, borderColor }) => (
  <div className={`bg-white p-5 rounded-lg border-l-4 ${borderColor} shadow-sm transition-all duration-200 hover:shadow-md`}>
    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{label}</p>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const DispatchBoard = () => {
  const [orders, setOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchDispatchData = async () => {
      try {
        const [ordersRes, vehiclesRes, driversRes] = await Promise.all([
          API.get('/orders/pending'),
          API.get('/vehicles?status=Available'),
          API.get('/drivers?status=Available')
        ]);
        
        setOrders(ordersRes.data.data || []);
        setVehicles(vehiclesRes.data.data || []);
        setDrivers(driversRes.data.data || []);
      } catch (err) {
        console.error("Error populating dispatch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDispatchData();
  }, []);

  const handleToggleOrder = (orderId) => {
    setSelectedOrderIds(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const selectedOrdersData = orders.filter(o => selectedOrderIds.includes(o._id));
  const totalCargoWeight = selectedOrdersData.reduce((sum, o) => sum + o.weightKg, 0);
  const targetVehicle = vehicles.find(v => v._id === selectedVehicleId);
  const isOverloaded = targetVehicle ? totalCargoWeight > targetVehicle.maxCapacityKg : false;

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (selectedOrderIds.length === 0 || !selectedVehicleId || !selectedDriverId || !destination) {
      alert("Please fulfill all logistics criteria before clearing dispatch.");
      return;
    }
    if (isOverloaded) {
      alert("Safety Halt: Total payload weight exceeds targeted vehicle axle capacity.");
      return;
    }

    const tripPayload = {
      vehicleId: selectedVehicleId,
      driverId: selectedDriverId,
      destination,
      deliveryOrders: selectedOrdersData.map(o => o.orderNumber)
    };

    try {
      const response = await API.post('/trips', tripPayload);
      if (response.data.success) {
        alert(`Trip successfully dispatched!`);
        
        setSelectedOrderIds([]);
        setSelectedVehicleId('');
        setSelectedDriverId('');
        setDestination('');
        
        setOrders(prev => prev.filter(o => !selectedOrderIds.includes(o._id)));
        setVehicles(prev => prev.filter(v => v._id !== selectedVehicleId));
        setDrivers(prev => prev.filter(d => d._id !== selectedDriverId));
      }
    } catch (err) {
      alert("Logistics breakdown: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-600 font-medium">
        Accessing secure yard logs...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-8 font-sans">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Central Dispatch & Allocation Board</h1>
        <p className="text-sm text-slate-500 mt-1">Consolidate production line outputs into multi-order shipping manifests.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Pending Orders Queue" value={orders.length} borderColor="border-blue-500" />
        <MetricCard 
          label="Selected Cargo Weight" 
          value={`${totalCargoWeight.toLocaleString()} kg`} 
          borderColor={isOverloaded ? "border-red-500 text-red-600" : "border-emerald-500"} 
        />
        <MetricCard 
          label="Truck Capacity Limit" 
          value={targetVehicle ? `${targetVehicle.maxCapacityKg.toLocaleString()} kg` : 'Unassigned'} 
          borderColor="border-slate-400" 
        />
      </div>

      <form onSubmit={handleCreateTrip} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
            <h3 className="text-base font-semibold text-slate-800 mb-4">1. Select Factory Orders for Manifest</h3>
            <div className="flex flex-col gap-3">
              {orders.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">No pending items waiting at dispatch bays.</p>
              ) : (
                orders.map(order => {
                  const isChecked = selectedOrderIds.includes(order._id);
                  return (
                    <label 
                      key={order._id} 
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                        isChecked ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => handleToggleOrder(order._id)}
                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mr-4"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-slate-800 text-sm sm:text-base">{order.orderNumber} — <span className="text-slate-600 font-normal">{order.clientName}</span></div>
                        <div className="text-xs text-slate-500 mt-0.5">Material: {order.materialDescription}</div>
                      </div>
                      <div className="font-bold text-slate-700 whitespace-nowrap ml-4">{order.weightKg.toLocaleString()} kg</div>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
            <h3 className="text-base font-semibold text-slate-800 mb-4">2. Assign Available Yard Asset</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicles.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center col-span-2">All trucks currently deployed on transport operations.</p>
              ) : (
                vehicles.map(vehicle => {
                  const isSelected = selectedVehicleId === vehicle._id;
                  return (
                    <label 
                      key={vehicle._id} 
                      className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                        isSelected ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="fleetSelect" 
                        value={vehicle._id}
                        checked={isSelected}
                        onChange={() => setSelectedVehicleId(vehicle._id)}
                        className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 mt-1 mr-3"
                      />
                      <div>
                        <span className="font-bold text-slate-800 block text-sm sm:text-base">{vehicle.vehicleNumber}</span>
                        <span className="text-xs text-slate-500 block mt-1 leading-relaxed">
                          Class: {vehicle.type} <br />
                          Max Capacity: {vehicle.maxCapacityKg.toLocaleString()} kg
                        </span>
                      </div>
                    </label>
                  );
                })
              )}
            </div>
          </div>

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 h-fit sticky top-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">3. Finalize Manifest Documentation</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">Assigned Operator (Driver)</label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                required
              >
                <option value="">-- Choose Operator --</option>
                {drivers.map(driver => (
                  <option key={driver._id} value={driver._id}>
                    {driver.fullName} ({driver.licenseClass})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">Delivery Destination Yard</label>
              <input 
                type="text" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Receiving Plant C" 
                className="w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {isOverloaded && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-xs leading-relaxed flex items-start gap-2">
                <span className="font-bold text-sm leading-none">⚠️</span>
                <div>
                  <strong>Axle Stress Threshold Exceeded:</strong> Combined batch weight violates safe transportation restrictions mapped to this asset.
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isOverloaded || selectedOrderIds.length === 0 || !selectedVehicleId || !selectedDriverId}
              className={`w-full py-3 px-4 rounded-md font-semibold text-sm text-center tracking-wide shadow-sm transition-all duration-150 ${
                isOverloaded || selectedOrderIds.length === 0 || !selectedVehicleId || !selectedDriverId
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:translate-y-px'
              }`}
            >
              Authorize Gate Pass & Dispatch
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default DispatchBoard;