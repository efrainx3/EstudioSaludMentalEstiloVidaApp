<template>
  <section>
    <h1>Gráfica 3</h1>
    <p>Ejercicio vs Fatiga</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Ejercicio vs Fatiga"
      subtitle="Relación entre actividad física y cansancio"
    >
      <div class="chart-box">
        <ExerciseFatigueScatter :points="dashboard.grafica3_exerciseFatigueScatter" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import ExerciseFatigueScatter from '../components/charts/ExerciseFatigueScatter.vue'

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
