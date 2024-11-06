<script setup lang="ts">
import jobData from '@/jobs.json'
import { ref } from 'vue'
import JobListening from './JobListing.vue'

const jobs = ref(jobData)
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 text-center">Browse Jobs</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListening v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>
