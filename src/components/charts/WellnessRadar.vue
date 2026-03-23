<template>
  <Radar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  payload: {
    labels: string[]
    values: number[]
  }
}>()

const chartData = computed<ChartData<'radar'>>(() => ({
  labels: props.payload.labels,
  datasets: [
    {
      label: 'Promedios generales',
      data: props.payload.values,
    },
  ],
}))

const chartOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
