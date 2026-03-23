<template>
  <Scatter :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Scatter } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { ScatterPoint } from '../../types/dashboard'

const props = defineProps<{
  points: ScatterPoint[]
}>()

const chartData = computed<ChartData<'scatter'>>(() => ({
  datasets: [
    {
      label: 'Ejercicio vs fatiga',
      data: props.points,
    },
  ],
}))

const chartOptions: ChartOptions<'scatter'> = {
  responsive: true,
  maintainAspectRatio: false,
  parsing: false,
  scales: {
    x: { title: { display: true, text: 'Minutos de ejercicio' } },
    y: { title: { display: true, text: 'Nivel de fatiga' } },
  },
}
</script>
