import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import TicketManagement from './components/TicketManagement';

function App() {
  const [route, setRoute] = useState('/');
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  // Check for existing session
  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem('ticketapp_session');
      }
    }

    const savedTickets = localStorage.getItem('tickets');
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  // Watch for protected route access
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/tickets'];
    if (protectedRoutes.includes(route) && !user) {
      setRoute('/login');
    }
  }, [route, user]);

  // Auth handlers
  const handleLogin = (email, password) => {
    if (email && password.length >= 6) {
      const userData = { email, token: Math.random().toString(36) };
      localStorage.setItem('ticketapp_session', JSON.stringify(userData));
      setUser(userData);
      setRoute('/dashboard');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Password must be at least 6 characters.' };
  };

  const handleSignup = (email, password) => {
    if (email && password.length >= 6) {
      const userData = { email, token: Math.random().toString(36) };
      localStorage.setItem('ticketapp_session', JSON.stringify(userData));
      setUser(userData);
      setRoute('/dashboard');
      return { success: true };
    }
    return { success: false, error: 'Invalid input. Please check your details.' };
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    setUser(null);
    setRoute('/');
  };

  // Render appropriate component based on route
  if (route === '/login') {
    return <AuthPage mode="login" onNavigate={setRoute} onLogin={handleLogin} />;
  }

  if (route === '/signup') {
    return <AuthPage mode="signup" onNavigate={setRoute} onSignup={handleSignup} />;
  }

  if (route === '/dashboard') {
    return <Dashboard onNavigate={setRoute} onLogout={handleLogout} tickets={tickets} />;
  }

  if (route === '/tickets') {
    return <TicketManagement onNavigate={setRoute} onLogout={handleLogout} />;
  }

  return <LandingPage onNavigate={setRoute} />;
}

export default App;