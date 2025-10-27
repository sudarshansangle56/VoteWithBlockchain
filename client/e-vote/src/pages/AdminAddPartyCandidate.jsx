import React, { useState } from "react";

const AdminAddPartyCandidate = () => {
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [partyName, setPartyName] = useState("");
  const [partyLeader, setPartyLeader] = useState("");
  const [partySymbol, setPartySymbol] = useState("");

  const [candidateName, setCandidateName] = useState("");
  const [selectedParty, setSelectedParty] = useState("");

  // Add party
  const handleAddParty = (e) => {
    e.preventDefault();
    if (!partyName || !partyLeader) return;
    const newParty = {
      id: parties.length + 1,
      name: partyName,
      leader: partyLeader,
      symbol: partySymbol || "🏛️",
    };
    setParties([...parties, newParty]);
    setPartyName("");
    setPartyLeader("");
    setPartySymbol("");
  };

  // Add candidate
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candidateName || !selectedParty) return;
    const newCandidate = {
      id: candidates.length + 1,
      name: candidateName,
      party: selectedParty,
    };
    setCandidates([...candidates, newCandidate]);
    setCandidateName("");
    setSelectedParty("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Admin Panel</h1>

      {/* Party Form */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Party</h2>
        <form onSubmit={handleAddParty} className="space-y-3">
          <input
            type="text"
            placeholder="Party Name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          />
          <input
            type="text"
            placeholder="Leader Name"
            value={partyLeader}
            onChange={(e) => setPartyLeader(e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          />
          <input
            type="text"
            placeholder="Symbol (optional)"
            value={partySymbol}
            onChange={(e) => setPartySymbol(e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Add Party
          </button>
        </form>

        {/* Display Parties */}
        {parties.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Existing Parties:</h3>
            <ul className="list-disc list-inside">
              {parties.map((p) => (
                <li key={p.id}>
                  {p.name} - Leader: {p.leader} {p.symbol}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Candidate Form */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add Candidate</h2>
        <form onSubmit={handleAddCandidate} className="space-y-3">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          />
          <select
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Select Party</option>
            {parties.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            Add Candidate
          </button>
        </form>

        {/* Display Candidates */}
        {candidates.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Existing Candidates:</h3>
            <ul className="list-disc list-inside">
              {candidates.map((c) => (
                <li key={c.id}>
                  {c.name} - Party: {c.party}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddPartyCandidate;
