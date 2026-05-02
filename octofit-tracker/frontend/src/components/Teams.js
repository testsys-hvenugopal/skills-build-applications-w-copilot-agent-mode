import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || window.location.hostname.includes('github.dev')
  ? `https://${window.location.hostname.replace('-3000.', '-8000.')}`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams/`)
      .then(res => res.json())
      .then(data => {
        setTeams(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-4"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger my-4">Error: {error}</div>;

  return (
    <div className="card shadow mb-4">
      <div className="card-header">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={t.id || i}>
                  <th scope="row">{i + 1}</th>
                  <td>{t.name}</td>
                  <td>{t.members?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
