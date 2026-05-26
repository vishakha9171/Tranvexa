export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      
      <h3 className="text-lg font-semibold text-gray-800">
        {vehicle.vehicleNumber}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Type: {vehicle.type}
      </p>

      <p className="text-sm text-gray-500">
        Capacity: {vehicle.capacity} kg
      </p>

      <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full 
        ${vehicle.status === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {vehicle.status}
      </span>

    </div>
  );
}