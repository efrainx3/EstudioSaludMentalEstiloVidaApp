<template>
  <section>
    <h1>Gráfica 6</h1>
    <p>Radar de bienestar</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Radar de bienestar"
      subtitle="Promedios consolidados de variables clave"
    >
      <div class="chart-box">
        <WellnessRadar :payload="dashboard.grafica6_wellnessRadar" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import WellnessRadar from '../components/charts/WellnessRadar.vue'

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
