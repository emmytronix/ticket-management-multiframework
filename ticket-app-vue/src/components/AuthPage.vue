<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
    
    <div class="max-w-md w-full">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">
          {{ mode === 'login' ? 'Welcome Back' : 'Create Account' }}
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              @keypress.enter="handleSubmit"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              @keypress.enter="handleSubmit"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
          
          <button 
            @click="handleSubmit" 
            class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold transition"
          >
            {{ mode === 'login' ? 'Login' : 'Sign Up' }}
          </button>
        </div>
        
        <p class="text-center mt-4 text-gray-600">
          {{ mode === 'login' ? "Don't have an account? " : "Already have an account? " }}
          <button
            @click="$emit('navigate', mode === 'login' ? '/signup' : '/login')"
            class="text-purple-600 hover:underline"
          >
            {{ mode === 'login' ? 'Sign up' : 'Login' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Toast from './Toast.vue';

const props = defineProps({
  mode: String
});

const emit = defineEmits(['navigate', 'login', 'signup']);

const email = ref('');
const password = ref('');
const errors = ref({});
const toast = ref(null);

const validate = () => {
  const newErrors = {};
  if (!email.value) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email.value)) newErrors.email = 'Invalid email format';
  if (!password.value) newErrors.password = 'Password is required';
  else if (password.value.length < 6) newErrors.password = 'Password must be at least 6 characters';
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  const result = props.mode === 'login' 
    ? emit('login', email.value, password.value)
    : emit('signup', email.value, password.value);
  
  if (result && !result.success) {
    toast.value = { message: result.error, type: 'error' };
  }
};
</script>