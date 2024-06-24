import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import { AuthRoute, NonAuthRoute } from './routes';
import AdminLogin from './components/AdminLogin';
import CodePage from './pages/CodePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<NonAuthRoute />}>
          <Route path="/login" element={<AdminLogin />} />
        </Route>
        <Route path="/" element={<CodePage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
