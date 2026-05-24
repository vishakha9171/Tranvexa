import  { useState } from "react";

const DriverPage = () => {
  const [drivers] = useState([
    {
      id: 1,
      name: "Ravi Sharma",
      phone: "9876543210",
      license: "MP04AB1234",
      status: "Active",
      vehicle: "Truck A1",
    },
    {
      id: 2,
      name: "Amit Verma",
      phone: "9123456780",
      license: "MP04XY5678",
      status: "Inactive",
      vehicle: "Van B2",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Management</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>Phone</th>
              <th>License</th>
              <th>Vehicle</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-3">{d.name}</td>
                <td>{d.phone}</td>
                <td>{d.license}</td>
                <td>{d.vehicle}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      d.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverPage;