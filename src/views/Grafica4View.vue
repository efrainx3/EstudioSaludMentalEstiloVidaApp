<template>
  <section>
    <h1>Gráfica 4</h1>
    <p>Tareas pendientes e interrupciones</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Tareas pendientes e interrupciones"
      subtitle="Promedios generales de carga y fragmentación"
    >
      <div class="chart-box">
        <TasksInterruptionsBar :stats="dashboard.grafica4_tasksInterruptionsBar" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import TasksInterruptionsBar from '../components/charts/TasksInterruptionsBar.vue'

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
