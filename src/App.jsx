import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import RerouteToDashboard from './RerouteToDashboard.jsx';

function App() {

  return (

    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<RerouteToDashboard><SignupPage /></RerouteToDashboard>} />
        <Route path="/signup" element={<RerouteToDashboard><SignupPage /></RerouteToDashboard>} />
        <Route path="/login" element={<RerouteToDashboard><LoginPage /></RerouteToDashboard>} />
        <Route path="/dashboard" element={<RerouteToDashboard><SignupPage /></RerouteToDashboard>} />
      </Routes>
    </AuthContextProvider>

  )
}

export default App
