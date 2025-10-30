<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-purple-600">TicketFlow</h1>
        <button 
          @click="$emit('logout')" 
          class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut :size="20" />
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-bold mb-8 text-gray-800">Dashboard</h2>
      
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="(stat, i) in stats" 
          :key="i" 
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div 
            :class="[
              'w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-3',
              stat.color
            ]"
          >
            {{ stat.value }}
          </div>
          <p class="text-gray-600 font-medium">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
        <button
          @click="$emit('navigate', '/tickets')"
          class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition"
        >
          Manage Tickets
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { LogOut } from 'lucide-vue-next';

const props = defineProps({
  tickets: Array
});

defineEmits(['navigate', 'logout']);

const stats = computed(() => [
  { 
    label: 'Total Tickets', 
    value: props.tickets.length, 
    color: 'bg-blue-500' 
  },
  { 
    label: 'Open', 
    value: props.tickets.filter(t => t.status === 'open').length, 
    color: 'bg-green-500' 
  },
  { 
    label: 'In Progress', 
    value: props.tickets.filter(t => t.status === 'in_progress').length, 
    color: 'bg-amber-500' 
  },
  { 
    label: 'Closed', 
    value: props.tickets.filter(t => t.status === 'closed').length, 
    color: 'bg-gray-500' 
  }
]);
</script>