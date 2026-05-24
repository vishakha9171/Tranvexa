export default function Dashboard() {
  const stats = [
    {
      title: 'Total Vehicles',
      value: '48',
      change: '+6%',
      icon: '🚚',
    },
    {
      title: 'Active Trips',
      value: '16',
      change: '+12%',
      icon: '📦',
    },
    {
      title: 'Delivered Orders',
      value: '128',
      change: '+18%',
      icon: '✅',
    },
    {
      title: 'Drivers Available',
      value: '22',
      change: '+4%',
      icon: '👨‍✈️',
    },
  ];

  const trips = [
    {
      tripId: 'TRIP-482931',
      vehicle: 'MP09AB1234',
      driver: 'Rahul Sharma',
      destination: 'Indore',
      status: 'In Transit',
    },
    {
      tripId: 'TRIP-482845',
      vehicle: 'MP04XY8891',
      driver: 'Ankit Verma',
      destination: 'Bhopal',
      status: 'Pending',
    },
    {
      tripId: 'TRIP-482701',
      vehicle: 'MP13CD4521',
      driver: 'Rohit Singh',
      destination: 'Nagpur',
      status: 'Delivered',
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 p-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Fleetora</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manufacturing Transport System
          </p>
        </div>

        <nav className="space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-black text-white font-medium shadow-sm">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium transition">
            Vehicles
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium transition">
            Drivers
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium transition">
            Trips
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium transition">
            Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Transport Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Monitor logistics, deliveries and fleet operations.
            </p>
          </div>

          <button className="bg-black text-white px-5 py-3 rounded-xl font-medium shadow hover:opacity-90 transition">
            + Create Trip
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{item.icon}</span>

                <span className="text-sm font-semibold text-green-600">
                  {item.change}
                </span>
              </div>

              <h3 className="text-gray-500 text-sm">{item.title}</h3>

              <p className="text-3xl font-bold text-gray-800 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Trips Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Trips
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Latest transport and delivery activity
              </p>
            </div>

            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Trip ID
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Driver
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Destination
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {trips.map((trip, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {trip.tripId}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {trip.vehicle}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {trip.driver}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {trip.destination}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          trip.status
                        )}`}
                      >
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
