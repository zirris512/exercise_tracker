import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;