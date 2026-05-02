import React, { useEffect, useState } from 'react';


function getApiBase() {
  let codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (!codespace) {
    const match = window.location.hostname.match(/^([^-]+)-8000\.app\.github\.dev$/);
    if (match) {
      codespace = match[1];
    }
  }
  return codespace ? `https://${codespace}-8000.app.github.dev` : '';
}

const API_BASE = getApiBase();

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE}/api/leaderboard/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
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
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((l, i) => (
                <tr key={l.id || i}>
                  <th scope="row">{i + 1}</th>
                  <td>{l.user}</td>
                  <td>{l.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
