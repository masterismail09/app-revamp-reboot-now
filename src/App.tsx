
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { useEffect } from "react";
import { exchangeCodeForTokens, handleAuthTokens, isAuthenticated } from "./utils/auth";
import MainLayout from "./components/layout/MainLayout";

// Import all page components
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Wallet from "./pages/Wallet";
import Goals from "./pages/Goals";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const AuthHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      
      if (code && location.pathname === '/dashboard') {
        try {
          const tokens = await exchangeCodeForTokens(code);
          handleAuthTokens(tokens);
          window.location.href = '/app/dashboard';
        } catch (error) {
          console.error('Authentication error:', error);
          window.location.href = '/';
        }
      }
    };

    handleAuth();
  }, [location]);

  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthHandler />
            <Routes>
              <Route path="/" element={isAuthenticated() ? <Navigate to="/app/dashboard" /> : <LandingPage />} />
              <Route path="/dashboard" element={<AuthHandler />} /> {/* Handle Cognito callback */}
              <Route path="/app" element={isAuthenticated() ? <MainLayout /> : <Navigate to="/" />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-expense" element={<AddExpense />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="goals" element={<Goals />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
