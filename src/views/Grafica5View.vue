<template>
  <section>
    <h1>Gráfica 5</h1>
    <p>Vida social, mood y café</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ChartCard
      v-if="dashboard"
      title="Vida social, mood y café"
      subtitle="Burbuja: x=horas sociales, y=mood, tamaño=café"
    >
      <div class="chart-box">
        <SocialCoffeeBubble :points="dashboard.grafica5_socialCoffeeBubble" />
      </div>
    </ChartCard>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import ChartCard from '../components/ChartCard.vue'
import SocialCoffeeBubble from '../components/charts/SocialCoffeeBubble.vue'

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
