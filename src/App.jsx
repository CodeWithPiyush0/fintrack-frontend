import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { BudgetProvider } from "./context/BudgetContext";
import { GoalsProvider } from "./context/GoalsContext";
import { ReportsProvider } from "./context/ReportsContext";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <BudgetProvider>
          <GoalsProvider>
            <ReportsProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<AuthPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/transactions"
                    element={
                      <ProtectedRoute>
                        <Transaction />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/budget"
                    element={
                      <ProtectedRoute>
                        <Budget />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/goals"
                    element={
                      <ProtectedRoute>
                        <Goals />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
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
                      background: "#333",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    success: {
                      iconTheme: {
                        primary: "#00b894",
                        secondary: "#fff",
                      },
                    },
                  }}
                />
              </Router>
            </ReportsProvider>
          </GoalsProvider>
        </BudgetProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
