import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalVehicles: 0,
    activeTrips: 0,
    deliveredOrders: 0,
    driversAvailable: 0
  });

  const refreshGlobalData = async () => {
    try {
      const [vehiclesRes, tripsRes, driversRes] = await Promise.all([
        API.get('/vehicles'),
        API.get('/trips'),
        API.get('/drivers')
      ]);

      const allVehicles = vehiclesRes.data?.data || [];
      const allTrips = tripsRes.data?.data || [];
      const allDrivers = driversRes.data?.data || [];

      setVehicles(allVehicles);
      setTrips(allTrips);
      setDrivers(allDrivers);

      setMetrics({
        totalVehicles: allVehicles.length,
        activeTrips: allTrips.filter(t => t.status === 'In Transit' || t.status === 'Scheduled').length,
        deliveredOrders: allTrips.filter(t => t.status === 'Delivered').length,
        driversAvailable: allDrivers.filter(d => d.status === 'Available').length
      });
    } catch (err) {
      console.error("Global state sync breakdown:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeDataPipeline = async () => {
      setLoading(true);
      await refreshGlobalData();
    };
    initializeDataPipeline();
  }, []);

  const dispatchTrip = async (payload) => {
    try {
      const response = await API.post('/trips', payload);
      await refreshGlobalData();
      return { success: true, data: response.data?.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to dispatch transport manifest" 
      };
    }
  };

  const updateTrip = async (id, status) => {
    try {
      await API.patch(`/trips/${id}`, { status });
      await refreshGlobalData();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Status change failed" 
      };
    }
  };

  return (
    <StoreContext.Provider value={{
      vehicles,
      drivers,
      trips,
      metrics,
      loading,
      refreshGlobalData,
      dispatchTrip,
      updateTrip
    }}>
      {children}
    </StoreContext.Provider>
  );
}
