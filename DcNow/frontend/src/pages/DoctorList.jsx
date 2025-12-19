import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DoctorList() {
  const { hospitalId } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`/doctor/${hospitalId}`).then(res => setDoctors(res.data));
  }, []);

  return (
    <div>
      {doctors.map(d => (
        <div key={d._id}>
          <h3>{d.name}</h3>
          <p>{d.specialization}</p>
        </div>
      ))}
    </div>
  );
}
