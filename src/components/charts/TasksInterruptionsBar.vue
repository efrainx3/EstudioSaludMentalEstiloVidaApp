<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  stats: {
    promedio_tareas_pendientes: number
    promedio_interrupciones: number
  }
}>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: ['Promedio general'],
  datasets: [
    {
      label: 'Tareas pendientes',
      data: [props.stats.promedio_tareas_pendientes],
    },
    {
      label: 'Interrupciones',
      data: [props.stats.promedio_interrupciones],
    },
  ],
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
