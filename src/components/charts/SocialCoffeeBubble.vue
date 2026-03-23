<template>
  <Bubble :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Bubble } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { BubblePoint } from '../../types/dashboard'

const props = defineProps<{
  points: BubblePoint[]
}>()

const chartData = computed<ChartData<'bubble'>>(() => ({
  datasets: [
    {
      label: 'Horas sociales / Mood / Café',
      data: props.points,
    },
  ],
}))

const chartOptions: ChartOptions<'bubble'> = {
  responsive: true,
  maintainAspectRatio: false,
  parsing: false,
  scales: {
    x: { title: { display: true, text: 'Horas sociales' } },
    y: { title: { display: true, text: 'Mood score' } },
  },
}
</script>
