import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import MainPanel from './pages/AdminPanel/MainPanel/MainPanel';
import Authentication from './pages/Auth/Authentication';
import ProtectedRoute from './protectedRoute.jsx';
import PublicRoute from './publicRoute.jsx';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<PublicRoute element={Authentication} />} />
      <Route path="/auth/*" element={<PublicRoute element={Authentication} />} />
      <Route path="/admin-panel/*" element={<ProtectedRoute element={<MainPanel />} />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
  )
}

export default App
