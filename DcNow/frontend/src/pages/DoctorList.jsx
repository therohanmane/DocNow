import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";

export default function DoctorList() {
  const { hospitalId } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`/doctor/${hospitalId}`).then(res => setDoctors(res.data || []));
  }, [hospitalId]);

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <h2>Doctors</h2>
        <div className="muted">Select a doctor to see available slots</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
        {doctors.map(d => (
          <Card key={d._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{d.name}</div>
                <div className="muted">{d.specialization}</div>
              </div>
              <div>
                <Link to={`/slots/${d._id}`} className="form-btn">View Slots</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
