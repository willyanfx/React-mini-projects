<script setup lang="ts">
defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100',
  },
})
</script>

<template>
  <div :class="`p-6 rounded-lg shadow-md ${bg}`">
    <slot></slot>
  </div>
</template>
