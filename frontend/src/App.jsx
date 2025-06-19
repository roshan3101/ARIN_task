import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CampaignList from './components/CampaignList';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/campaigns" element={
            <PrivateRoute>
              <CampaignList />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/campaigns" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
