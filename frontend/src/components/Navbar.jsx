export default function Navbar() {
  return (
    <div className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      
      <h2 className="text-lg font-semibold text-gray-800">
        Transport Management System
      </h2>

      <div className="flex items-center gap-4">
        
        <input
          type="text"
          placeholder="Search vehicles..."
          className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
        />

        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>

      </div>
    </div>
  );
}