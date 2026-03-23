<template>
  <section>
    <h1>Tabla de datos</h1>
    <p>Visualización completa de los registros cargados</p>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <TablaDatos v-if="rawRows.length" :rows="rawRows" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import TablaDatos from '../components/TablaDatos.vue'

const { rawRows, loading, error, loadData } = useDashboardData()

onMounted(loadData)
</script>

<style scoped>
.error {
  color: #b00020;
}
</style>
