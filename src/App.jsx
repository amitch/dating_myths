import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/results">Results</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  );
}

export default App;