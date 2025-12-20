import api from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/hospital/list')
      .then(res => setHospitals(res.data || []))
      .catch(err => setError(err?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <h2>Hospitals</h2>
        <div className="muted">Select a hospital to view doctors and available slots</div>
      </div>

      {loading && <Card>Loading hospitals…</Card>}
      {error && <Card>{error}</Card>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
        {hospitals.length === 0 && !loading && (
          <Card>No hospitals available right now. Please check back later.</Card>
        )}

        {hospitals.map(h => (
          <Card key={h._id} className="">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{h.name}</div>
                <div className="muted">{h.city}</div>
              </div>
              <div>
                <Link to={`/doctors/${h._id}`} className="form-btn">View Doctors</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
