
const LogisticsTable = ({ headers, data, renderRow }) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left font-sans text-sm">
          <thead>
            <tr className="bg-slate-900 text-slate-200 border-b border-slate-800">
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 font-semibold text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={headers.length} 
                  className="px-6 py-12 text-center text-slate-400 bg-slate-50/50"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xl">📋</span>
                    <p className="font-medium">No active logistics records located in this sector.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr 
                  key={item._id || index} 
                  className={`transition-colors duration-150 ease-in-out hover:bg-slate-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
                >
                  {renderRow(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogisticsTable;