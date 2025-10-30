<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-purple-600">TicketFlow</h1>
        <nav class="hidden md:flex gap-4">
          <button @click="$emit('navigate', '/login')" class="px-4 py-2 text-purple-600 hover:text-purple-700">
            Login
          </button>
          <button @click="$emit('navigate', '/signup')" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Get Started
          </button>
        </nav>
        <button class="md:hidden" @click="menuOpen = !menuOpen">
          <Menu :size="24" />
        </button>
      </div>
      <div v-if="menuOpen" class="md:hidden bg-white border-t px-4 py-3">
        <button @click="$emit('navigate', '/login')" class="block w-full text-left py-2">Login</button>
        <button @click="$emit('navigate', '/signup')" class="block w-full text-left py-2">Get Started</button>
      </div>
    </header>

    <!-- Hero Section with Wave -->
    <section class="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
      <div class="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full opacity-20"></div>
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">Manage Your Tickets Effortlessly</h2>
          <p class="text-xl mb-8 text-purple-100">
            Track, organize, and resolve customer support tickets with ease using our intuitive platform
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button 
              @click="$emit('navigate', '/signup')" 
              class="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
            >
              Get Started
            </button>
            <button 
              @click="$emit('navigate', '/login')" 
              class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z" fill="#F9FAFB"/>
      </svg>
    </section>

    <!-- Features Section -->
    <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose TicketFlow?</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(feature, i) in features" 
          :key="i" 
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Check class="text-purple-600" />
          </div>
          <h4 class="text-xl font-semibold mb-2 text-gray-800">{{ feature.title }}</h4>
          <p class="text-gray-600">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, Check } from 'lucide-vue-next';

defineEmits(['navigate']);

const menuOpen = ref(false);

const features = [
  { title: 'Easy Tracking', desc: 'Monitor all tickets in one place with status updates' },
  { title: 'Quick Resolution', desc: 'Streamline your workflow and resolve issues faster' },
  { title: 'Team Collaboration', desc: 'Work together efficiently on customer issues' }
];
</script>