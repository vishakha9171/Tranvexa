import  { useState } from "react";

const TripPage = () => {
  const [trips] = useState([
    {
      id: 1,
      from: "Bhopal",
      to: "Indore",
      driver: "Ravi Sharma",
      vehicle: "Truck A1",
      status: "Ongoing",
    },
    {
      id: 2,
      from: "Delhi",
      to: "Jaipur",
      driver: "Amit Verma",
      vehicle: "Van B2",
      status: "Scheduled",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trip Management</h1>

      <div className="grid gap-4">
        {trips.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {t.from} ➝ {t.to}
              </p>
              <p className="text-sm text-gray-600">
                Driver: {t.driver} | Vehicle: {t.vehicle}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded text-white text-xs ${
                t.status === "Ongoing"
                  ? "bg-blue-500"
                  : t.status === "Scheduled"
                  ? "bg-yellow-500"
                  : "bg-green-600"
              }`}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripPage;