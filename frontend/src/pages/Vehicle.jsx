import VehicleCard from "../components/VehicleCard";

export default function Vehicles() {

  const vehicles = [
    {
      vehicleNumber: "MP09AB1234",
      type: "Truck",
      capacity: 5000,
      status: "Available",
    },
    {
      vehicleNumber: "MP04XY8891",
      type: "Tempo",
      capacity: 2000,
      status: "On Trip",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Vehicles
        </h1>

        <button className="px-4 py-2 bg-black text-white rounded-lg">
          + Add Vehicle
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((v, i) => (
          <VehicleCard key={i} vehicle={v} />
        ))}
      </div>

    </div>
  );
}