import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MainPanel from './pages/AdminPanel/MainPanel/MainPanel';
import Authentication from './pages/Auth/Authentication';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/admin-panel/*" element={<MainPanel />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
  )
}

export default App
