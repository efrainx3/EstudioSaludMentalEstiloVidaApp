<template>
  <Scatter :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Scatter } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { SleepMoodPoint } from '../../types/dashboard'

const props = defineProps<{
  points: SleepMoodPoint[]
}>()

const chartData = computed<ChartData<'scatter'>>(() => ({
  datasets: [
    {
      label: 'Sueño vs Mood',
      data: props.points,
    },
  ],
}))

const chartOptions: ChartOptions<'scatter'> = {
  responsive: true,
  maintainAspectRatio: false,
  parsing: false,
  scales: {
    x: { title: { display: true, text: 'Horas de sueño' } },
    y: { title: { display: true, text: 'Mood score' } },
  },
}
</script>
