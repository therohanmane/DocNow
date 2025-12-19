import axios from "../api/axios";
import { useState } from "react";

export default function AddDoctor() {
  const [doctor, setDoctor] = useState({});

  const addDoctor = async () => {
    await axios.post("/doctor", doctor);
    alert("Doctor Added");
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <input placeholder="Name" onChange={e => setDoctor({ ...doctor, name: e.target.value })} />
      <input placeholder="Specialization" onChange={e => setDoctor({ ...doctor, specialization: e.target.value })} />
      <input placeholder="Experience" onChange={e => setDoctor({ ...doctor, experience: e.target.value })} />
      <button onClick={addDoctor}>Add Doctor</button>
    </div>
  );
}
