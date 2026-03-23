<template>
  <section class="chart-card">
    <h2>{{ title }}</h2>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <div class="chart-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.chart-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}
.subtitle {
  color: #555;
  margin-top: -4px;
  margin-bottom: 12px;
}
.chart-content {
  min-height: 320px;
}
</style>
