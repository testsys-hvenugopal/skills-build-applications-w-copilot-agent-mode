import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', minHeight: '40vh' }}>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="React Logo" style={{ height: '200px', margin: '40px 0 0 40px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <div className="card shadow mb-4 mt-4" style={{ width: '80%', maxWidth: '900px' }}>
          <div className="card-body text-center">
            <h1 className="display-4 mb-3" style={{ fontWeight: 400 }}>
              Welcome to <span style={{ color: '#1a7fd1', fontWeight: 500 }}>OctoFit Tracker</span>!
            </h1>
            <p className="lead" style={{ color: '#444' }}>Track your fitness, join teams, and compete on the leaderboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
