<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import HomeCards from '@/components/HomeCards.vue'
import JobListings from '@/components/JobListings.vue'
</script>

<template>
  <main>
    <HeroBanner />
    <HomeCards />
    <JobListings :limit="3" :show-button="true" />
  </main>
</template>
