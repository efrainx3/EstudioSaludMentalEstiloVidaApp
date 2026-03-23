<template>
  <section>
    <h1>Gráfica 1</h1>
    <p>Horas de sueño vs Mood Score</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Horas de sueño vs Mood Score"
      subtitle="Dispersión entre descanso y estado de ánimo"
    >
      <div class="chart-box">
        <SleepMoodScatter :points="dashboard.grafica1_sleepMoodScatter" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import SleepMoodScatter from '../components/charts/SleepMoodScatter.vue'

const { dashboard, loading, error, loadData } = useDashboardData()

onMounted(loadData)
</script>

<style scoped>
.chart-box {
  height: 420px;
}
.error {
  color: #b00020;
}
</style>
