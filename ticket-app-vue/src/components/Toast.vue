<template>
  <div 
    :class="[
      'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white',
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    ]"
  >
    <div class="flex items-center gap-2">
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="hover:opacity-80">
        <X :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  message: String,
  type: String
});

const emit = defineEmits(['close']);

onMounted(() => {
  setTimeout(() => emit('close'), 3000);
});
</script>