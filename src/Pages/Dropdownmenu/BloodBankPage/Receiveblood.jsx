import React, { useState } from 'react';

const Receiveblood = () => {
  const [bloodType, setBloodType] = useState(null);
  const [gender, setGender] = useState(null);
  const [relation, setRelation] = useState(null);
  const [age, setAge] = useState(18);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    if (bloodType && gender && relation && age) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } else {
      alert('Please select all fields before sending the request.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100" style={{ backgroundColor: "#FA4848" }}>
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="bg-red-500 text-white p-4 rounded-t-2xl flex items-center justify-center">
          <h2 className="text-lg font-semibold">Needed Blood</h2>
        </div>

        {/* Patient Blood Type */}
        <div className="mt-4">
          <p className="font-semibold">Patient Blood Type</p>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <button
                key={type}
                onClick={() => setBloodType(type)}
                className={`border rounded-lg px-4 py-2 text-center transition-all duration-300 ${bloodType === type ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Gender */}
        <div className="mt-4">
          <p className="font-semibold">Patient Gender</p>
          <div className="flex gap-4 mt-2">
            {['Male', 'Female'].map((gen) => (
              <button 
                key={gen} 
                onClick={() => setGender(gen)} 
                className={`border rounded-lg px-4 py-2 w-full transition-all duration-300 ${gender === gen ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}
              >
                {gen}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Relation */}
        <div className="mt-4">
          <p className="font-semibold">Patient Relation</p>
          <div className="flex gap-2 mt-2">
            {['Family', 'Friend', 'Other'].map((rel) => (
              <button
                key={rel}
                onClick={() => setRelation(rel)}
                className={`border rounded-lg px-4 py-2 flex-1 transition-all duration-300 ${relation === rel ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Age */}
        <div className="mt-4">
          <p className="font-semibold">Patient Age</p>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-lg px-4 py-2 mt-2 w-full cursor-pointer"
          >
            {[...Array(83).keys()].map((num) => (
              <option key={num + 18} value={num + 18}>{num + 18}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button 
            onClick={handleSubmit} 
            className="w-full bg-red-500 text-white py-3 rounded-lg text-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Send Request
          </button>
        </div>

        {/* Popup Notification */}
        {showPopup && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            Request sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Receiveblood;