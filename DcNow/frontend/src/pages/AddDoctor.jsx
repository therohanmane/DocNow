import axios from "../api/axios";
import { useState } from "react";

export default function AddDoctor() {
  const [doctor, setDoctor] = useState({});

  const addDoctor = async () => {
    try {
      await axios.post("/doctor", doctor);
      alert("Doctor Added");
      setDoctor({});
    } catch (err) {
      console.error(err);
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 640 }}>
        <h3>Add Doctor</h3>
        <input className="form-input" placeholder="Name" value={doctor.name || ''} onChange={e => setDoctor({ ...doctor, name: e.target.value })} />
        <input className="form-input" placeholder="Specialization" value={doctor.specialization || ''} onChange={e => setDoctor({ ...doctor, specialization: e.target.value })} />
        <input className="form-input" placeholder="Experience (years)" value={doctor.experience || ''} onChange={e => setDoctor({ ...doctor, experience: e.target.value })} />
        <button className="form-btn" onClick={addDoctor}>Add Doctor</button>
      </div>
    </div>
  );
}
