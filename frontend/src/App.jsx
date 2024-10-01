import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
  )
}

export default App
