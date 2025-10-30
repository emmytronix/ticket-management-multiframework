<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
    
    <header class="bg-white shadow-sm">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-purple-600">TicketFlow</h1>
          <div class="flex gap-4">
            <button 
              @click="$emit('navigate', '/dashboard')" 
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Dashboard
            </button>
            <button 
              @click="$emit('logout')" 
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut :size="20" />
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Ticket Management</h2>
        <button
          @click="showForm = true"
          class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
        >
          <Plus :size="20" />
          New Ticket
        </button>
      </div>

      <div v-if="showForm" class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          {{ editingId ? 'Edit' : 'Create' }} Ticket
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Enter ticket title"
            />
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="formData.description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              rows="3"
              placeholder="Enter ticket description"
            />
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                v-model="formData.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                v-model="formData.priority"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button 
              @click="handleSubmit" 
              class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {{ editingId ? 'Update' : 'Create' }} Ticket
            </button>
            <button 
              @click="resetForm" 
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div 
          v-if="tickets.length === 0" 
          class="bg-white rounded-xl shadow-md p-12 text-center"
        >
          <div class="max-w-md mx-auto">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus class="text-purple-600" :size="32" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">No tickets yet</h3>
            <p class="text-gray-500 mb-4">Create your first ticket to get started.</p>
            <button
              @click="showForm = true"
              class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Plus :size="20" />
              Create Ticket
            </button>
          </div>
        </div>
        
        <div 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ ticket.title }}</h3>
              <p class="text-gray-600 mb-3">{{ ticket.description || 'No description' }}</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    statusColors[ticket.status]
                  ]"
                >
                  {{ ticket.status.replace('_', ' ') }}
                </span>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {{ ticket.priority }}
                </span>
              </div>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button 
                @click="handleEdit(ticket)" 
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Edit ticket"
              >
                <Edit2 :size="20" />
              </button>
              <button 
                @click="handleDelete(ticket.id)" 
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete ticket"
              >
                <Trash2 :size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm md:text-base">&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-vue-next';
import Toast from './Toast.vue';

defineEmits(['navigate', 'logout']);

const tickets = ref([]);
const showForm = ref(false);
const editingId = ref(null);
const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
});
const errors = ref({});
const toast = ref(null);

const statusColors = {
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-amber-100 text-amber-800',
  closed: 'bg-gray-100 text-gray-800'
};

onMounted(() => {
  const saved = localStorage.getItem('tickets');
  if (saved) tickets.value = JSON.parse(saved);
});

const saveTickets = (newTickets) => {
  tickets.value = newTickets;
  localStorage.setItem('tickets', JSON.stringify(newTickets));
};

const validate = () => {
  const newErrors = {};
  if (!formData.value.title.trim()) newErrors.title = 'Title is required';
  if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
    newErrors.status = 'Status must be: open, in_progress, or closed';
  }
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  if (editingId.value) {
    const updated = tickets.value.map(t => 
      t.id === editingId.value ? { ...formData.value, id: editingId.value } : t
    );
    saveTickets(updated);
    toast.value = { message: 'Ticket updated successfully', type: 'success' };
  } else {
    const newTicket = { ...formData.value, id: Date.now() };
    saveTickets([...tickets.value, newTicket]);
    toast.value = { message: 'Ticket created successfully', type: 'success' };
  }
  resetForm();
};

const resetForm = () => {
  formData.value = { title: '', description: '', status: 'open', priority: 'medium' };
  showForm.value = false;
  editingId.value = null;
  errors.value = {};
};

const handleEdit = (ticket) => {
  formData.value = { ...ticket };
  editingId.value = ticket.id;
  showForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    saveTickets(tickets.value.filter(t => t.id !== id));
    toast.value = { message: 'Ticket deleted successfully', type: 'success' };
  }
};
</script>