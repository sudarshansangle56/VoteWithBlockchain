import React from "react";

function Home() {
  // Example candidate data (you can replace this with dynamic data later)
  const candidates = [
    {
      id: 1,
      name: "Rahul Sharma",
      party: "Democratic Party",
      symbol: "🟢", // replace with image/logo if needed
    },
    {
      id: 2,
      name: "Priya Verma",
      party: "People’s Alliance",
      symbol: "🌹",
    },
    {
      id: 3,
      name: "Arjun Singh",
      party: "National Front",
      symbol: "🦁",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Welcome to E-Voting System
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Please select your candidate and cast your vote securely.
      </p>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            {/* Party Symbol */}
            <div className="text-6xl mb-4">{candidate.symbol}</div>
            {/* Candidate Name */}
            <h2 className="text-2xl font-bold text-gray-800">{candidate.name}</h2>
            <p className="text-gray-500 mb-6">{candidate.party}</p>
            {/* Vote Button */}
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
