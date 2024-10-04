import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import MainPanel from './pages/AdminPanel/MainPanel/MainPanel';
import Authentication from './pages/Auth/Authentication';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/auth/*" element={<Authentication />} />
      <Route path="/admin-panel/*" element={<MainPanel />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
  )
}

export default App
