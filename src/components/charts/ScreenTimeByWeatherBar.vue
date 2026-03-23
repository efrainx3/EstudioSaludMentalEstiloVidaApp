<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import '../../chartSetup'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { GroupAverageItem } from '../../types/dashboard'

const props = defineProps<{
  rows: GroupAverageItem[]
}>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.rows.map((r) => r.label),
  datasets: [
    {
      label: 'Promedio tiempo en pantalla',
      data: props.rows.map((r) => r.value),
    },
  ],
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
