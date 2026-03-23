<template>
  <section>
    <h1>Gráfica 2</h1>
    <p>Tiempo en pantalla por clima</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Tiempo en pantalla por clima"
      subtitle="Promedio de horas por condición climática"
    >
      <div class="chart-box">
        <ScreenTimeByWeatherBar :rows="dashboard.grafica2_screenTimeByWeatherBar" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import ScreenTimeByWeatherBar from '../components/charts/ScreenTimeByWeatherBar.vue'

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
