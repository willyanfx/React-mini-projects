<script setup lang="ts">
// import jobData from '@/jobs.json'
import { onMounted, reactive, ref } from 'vue'
import JobListening from './JobListing.vue'
import { RouterLink } from 'vue-router'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const jobs = ref([])

const state = reactive({
  jobs: [],
  isLoading: true,
})

onMounted(async () => {
  try {
    const request = await fetch('/api/jobs')
    const data = await request.json()
    // jobs.value = data
    state.jobs = data
  } catch (error) {
    console.error('ERROR:::', error)
  } finally {
    state.isLoading = false
  }
})

defineProps({
  limit: Number,
  showButton: { type: Boolean, default: false },
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 text-center">Browse Jobs</h2>
      <div v-if="state.isLoading" class="text-center text-gray-500">
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListening
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
