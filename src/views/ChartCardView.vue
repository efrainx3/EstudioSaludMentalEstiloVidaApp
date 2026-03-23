<template>
  <main class="container">
    <header class="header">
      <h1>Dashboard Salud Mental y Estilo de Vida</h1>
      <p v-if="dashboard">Registros analizados: {{ dashboard.totalRegistros }}</p>
      <p v-if="loading">Cargando datos...</p>
      <p v-if="error" class="error">{{ error }}</p>
    </header>

    <section v-if="dashboard" class="grid">
      <ChartCard
        title="1. Horas de sueño vs Mood Score"
        subtitle="Dispersión entre descanso y estado de ánimo"
      >
        <div class="chart-box">
          <SleepMoodScatter :points="dashboard.grafica1_sleepMoodScatter" />
        </div>
      </ChartCard>

      <ChartCard
        title="2. Tiempo en pantalla por clima"
        subtitle="Promedio de horas por condición climática"
      >
        <div class="chart-box">
          <ScreenTimeByWeatherBar :rows="dashboard.grafica2_screenTimeByWeatherBar" />
        </div>
      </ChartCard>

      <ChartCard
        title="3. Ejercicio vs Fatiga"
        subtitle="Relación entre actividad física y cansancio"
      >
        <div class="chart-box">
          <ExerciseFatigueScatter :points="dashboard.grafica3_exerciseFatigueScatter" />
        </div>
      </ChartCard>

      <ChartCard
        title="4. Tareas pendientes e interrupciones"
        subtitle="Promedios generales de carga y fragmentación"
      >
        <div class="chart-box">
          <TasksInterruptionsBar :stats="dashboard.grafica4_tasksInterruptionsBar" />
        </div>
      </ChartCard>

      <ChartCard
        title="5. Vida social, mood y café"
        subtitle="Burbuja: x=horas sociales, y=mood, tamaño=café"
      >
        <div class="chart-box">
          <SocialCoffeeBubble :points="dashboard.grafica5_socialCoffeeBubble" />
        </div>
      </ChartCard>

      <ChartCard title="6. Radar de bienestar" subtitle="Promedios consolidados de variables clave">
        <div class="chart-box">
          <WellnessRadar :payload="dashboard.grafica6_wellnessRadar" />
        </div>
      </ChartCard>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { obtenerRegistrosEstudioSalud } from '../services/firebase'
import type { DashboardResponse } from '../types/dashboard'

import ChartCard from '../components/ChartCard.vue'
import SleepMoodScatter from '../components/charts/SleepMoodScatter.vue'
import ScreenTimeByWeatherBar from '../components/charts/ScreenTimeByWeatherBar.vue'
import ExerciseFatigueScatter from '../components/charts/ExerciseFatigueScatter.vue'
import TasksInterruptionsBar from '../components/charts/TasksInterruptionsBar.vue'
import SocialCoffeeBubble from '../components/charts/SocialCoffeeBubble.vue'
import WellnessRadar from '../components/charts/WellnessRadar.vue'
//import { request } from 'http'

const dashboard = ref<DashboardResponse | null>(null)
const loading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
  try {
    loading.value = true
    dashboard.value = await obtenerRegistrosEstudioSalud()
    console.log('Dashboard data:', dashboard.value)
  } catch (e: unknown) {
    console.error('Error fetching dashboard data:', e)
    error.value = e instanceof Error ? e.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: #f5f7fb;
  min-height: 100vh;
}
.header {
  margin-bottom: 24px;
}
.error {
  color: #b00020;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.chart-box {
  height: 320px;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
