import React, { useState } from 'react';

function HouseKeeping() {
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  const tableData = [
    { room: 1, status: "Clean", priority: "High", floor: 1 },
    { room: 2, status: "Dirty", priority: "Normal", floor: 1 },
    { room: 3, status: "Cleaning", priority: "Low", floor: 1 },
    { room: 4, status: "Out Of Service", priority: "High", floor: 1 },
    { room: 5, status: "Clean", priority: "Normal", floor: 1 },
    { room: 6, status: "Dirty", priority: "Low", floor: 2 },
    { room: 7, status: "Cleaning", priority: "High", floor: 2 },
    { room: 8, status: "Out Of Service", priority: "Normal", floor: 2 },
    { room: 9, status: "Clean", priority: "Low", floor: 2 },
    { room: 10, status: "Clean", priority: "Normal", floor: 2 },
    { room: 11, status: "Clean", priority: "High", floor: 2 },
    { room: 12, status: "Dirty", priority: "Low", floor: 2 },
    { room: 13, status: "Out Of Service", priority: "High", floor: 3 },
    { room: 14, status: "Clean", priority: "Low", floor: 3 },
    { room: 15, status: "Clean", priority: "Normal", floor: 3 },
    { room: 16, status: "Dirty", priority: "Low", floor: 3 },
    { room: 17, status: "Clean", priority: "High", floor: 3 },
    { room: 18, status: "Clean", priority: "Low", floor: 3 },
    { room: 19, status: "Clean", priority: "Normal", floor: 4 },
    { room: 20, status: "Clean", priority: "High", floor: 4 },
    { room: 21, status: "Dirty", priority: "Low", floor: 4 },
    { room: 22, status: "Clean", priority: "High", floor: 4 },
    { room: 23, status: "Dirty", priority: "Normal", floor: 4 },
    { room: 24, status: "Clean", priority: "Low", floor: 4 },
    { room: 25, status: "Clean", priority: "High", floor: 4 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = tableData.filter((item) => {
    return (
      (statusFilter === "" || item.status === statusFilter) &&
      (priorityFilter === "" || item.priority === priorityFilter)
    );
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">House Keeping</h2>
      </header>
      <div className="p-3">
        {/* Filter Options */}
        <div className="flex justify-between mb-4">
          <div>
            <label className="mr-2">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded p-2"
            >
              <option value="">All</option>
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Out Of Service">Out Of Service</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Filter by Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-slate-300 rounded p-2"
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Room</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">House Keeping Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Priority</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Floor</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Comment and notes</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">{item.room}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <select defaultValue={item.status}>
                        <option value="Clean">Clean</option>
                        <option value="Dirty">Dirty</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Out Of Service">Out Of Service</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-emerald-500">
                      <select defaultValue={item.priority}>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{item.floor}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500">
                      <form>
                        <textarea
                          className="w-full p-2 border border-slate-300 rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                          value={textarea}
                          onChange={handleChange}
                          placeholder="Enter your comments and notes here"
                        />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HouseKeeping;
