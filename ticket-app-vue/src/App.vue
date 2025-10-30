<template>
  <div id="app">
    <component 
      :is="currentComponent" 
      @navigate="handleNavigate"
      @login="handleLogin"
      @signup="handleSignup"
      @logout="handleLogout"
      :mode="mode"
      :user="user"
      :tickets="tickets"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import LandingPage from './components/LandingPage.vue';
import AuthPage from './components/AuthPage.vue';
import Dashboard from './components/Dashboard.vue';
import TicketManagement from './components/TicketManagement.vue';

// State
const route = ref('/');
const user = ref(null);
const tickets = ref([]);

// Check for existing session
onMounted(() => {
  const session = localStorage.getItem('ticketapp_session');
  if (session) {
    try {
      user.value = JSON.parse(session);
    } catch (e) {
      localStorage.removeItem('ticketapp_session');
    }
  }

  const savedTickets = localStorage.getItem('tickets');
  if (savedTickets) {
    tickets.value = JSON.parse(savedTickets);
  }
});

// Watch for protected route access
watch([route, user], ([newRoute, newUser]) => {
  const protectedRoutes = ['/dashboard', '/tickets'];
  if (protectedRoutes.includes(newRoute) && !newUser) {
    route.value = '/login';
  }
});

// Computed mode for auth page
const mode = computed(() => {
  if (route.value === '/login') return 'login';
  if (route.value === '/signup') return 'signup';
  return null;
});

// Current component based on route
const currentComponent = computed(() => {
  switch (route.value) {
    case '/login':
    case '/signup':
      return AuthPage;
    case '/dashboard':
      return Dashboard;
    case '/tickets':
      return TicketManagement;
    default:
      return LandingPage;
  }
});

// Navigation handler
const handleNavigate = (path) => {
  route.value = path;
};

// Auth handlers
const handleLogin = (email, password) => {
  if (email && password.length >= 6) {
    const userData = { email, token: Math.random().toString(36) };
    localStorage.setItem('ticketapp_session', JSON.stringify(userData));
    user.value = userData;
    route.value = '/dashboard';
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials. Password must be at least 6 characters.' };
};

const handleSignup = (email, password) => {
  if (email && password.length >= 6) {
    const userData = { email, token: Math.random().toString(36) };
    localStorage.setItem('ticketapp_session', JSON.stringify(userData));
    user.value = userData;
    route.value = '/dashboard';
    return { success: true };
  }
  return { success: false, error: 'Invalid input. Please check your details.' };
};

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session');
  user.value = null;
  route.value = '/';
};
</script>

<style>
@import './style.css';
</style>