import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswrod from "./pages/ResetPassword";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password/:token" element={<ResetPasswrod />}/>


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* toast notification container */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#00b894',
                secondary: '#fff'
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  )
}

export default App;