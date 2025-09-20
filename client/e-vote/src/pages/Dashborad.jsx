import React from "react";
import { FaUsers, FaVoteYea, FaCheckCircle } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">E-Voting</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-blue-600 px-3 py-2 rounded-lg">
            Dashboard
          </a>
          <a href="#" className="hover:bg-blue-600 px-3 py-2 rounded-lg">
            Elections
          </a>
          <a href="#" className="hover:bg-blue-600 px-3 py-2 rounded-lg">
            Voters
          </a>
          <a href="#" className="hover:bg-blue-600 px-3 py-2 rounded-lg">
            Results
          </a>
          <a href="#" className="hover:bg-blue-600 px-3 py-2 rounded-lg">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <FaUsers className="text-4xl text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Total Voters</h3>
              <p className="text-2xl font-bold">12,340</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <MdHowToVote className="text-4xl text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Active Elections</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <FaCheckCircle className="text-4xl text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold">Completed</h3>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </section>

        {/* Elections List */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Ongoing Elections</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Election Name</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Lok Sabha Elections</td>
                  <td className="p-3">20 Sept 2025</td>
                  <td className="p-3">25 Sept 2025</td>
                  <td className="p-3 text-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Vote
                    </button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">State Assembly</td>
                  <td className="p-3">22 Sept 2025</td>
                  <td className="p-3">28 Sept 2025</td>
                  <td className="p-3 text-center">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      View Results
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
