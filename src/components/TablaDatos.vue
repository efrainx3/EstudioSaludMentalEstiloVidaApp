<template>
  <section class="table-card">
    <div class="table-header">
      <div>
        <h2>Tabla de datos</h2>
        <p class="subtitle">Visualización completa de los registros cargados</p>
      </div>
      <span class="badge">Mostrando: {{ filteredRows.length }} / {{ rows.length }}</span>
    </div>

    <div class="search-bar">
      <label class="search-label" for="search-id">Buscar por ID</label>
      <input
        id="search-id"
        v-model.trim="searchId"
        class="search-input"
        type="text"
        placeholder="Escribe un ID para filtrar"
      />
    </div>

    <div v-if="filteredRows.length" class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Horas sueño</th>
            <th>Tiempo en pantalla</th>
            <th>Minutos ejercicio físico</th>
            <th>Número tareas pendientes</th>
            <th>Número interrupciones para completar tareas</th>
            <th>Nivel fatiga</th>
            <th>Horas sociales</th>
            <th>Tazas café</th>
            <th>Calidad de alimentación</th>
            <th>Clima</th>
            <th>Mood score</th>
            <th>Nivel estrés</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredRows" :key="row.id">
            <td>{{ formatValue(row.id) }}</td>
            <td>{{ formatValue(row.horas_sueño) }}</td>
            <td>{{ formatValue(row.tiempo_en_pantalla) }}</td>
            <td>{{ formatValue(row.minutos_ejercicio_fisico) }}</td>
            <td>{{ formatValue(row.número_tareas_pendientes) }}</td>
            <td>{{ formatValue(row.número_interrupciones_para_completar_tareas) }}</td>
            <td>{{ formatValue(row.nivel_fatiga) }}</td>
            <td>{{ formatValue(row.horas_sociales) }}</td>
            <td>{{ formatValue(row.tazas_cafe) }}</td>
            <td>{{ formatValue(row.calidad_de_alimentación) }}</td>
            <td>{{ formatValue(row.clima) }}</td>
            <td>{{ formatValue(row.mood_score) }}</td>
            <td>{{ formatValue(row.nivel_estres) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="empty-state">
      {{ rows.length ? 'No se encontraron registros para ese ID.' : 'No hay datos disponibles para mostrar.' }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MentalHealthRecord } from '../types/dashboard'

const props = defineProps<{
  rows: MentalHealthRecord[]
}>()

const searchId = ref('')

const filteredRows = computed(() => {
  const term = searchId.value.toLowerCase()

  if (!term) {
    return props.rows
  }

  return props.rows.filter((row) => row.id.toLowerCase().includes(term))
})

function formatValue(value: string | number | null): string | number {
  if (value === null || value === undefined || value === '') {
    return '-'
  }
  return value
}
</script>

<style scoped>
.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.subtitle {
  margin: 4px 0 0;
  color: #5f6368;
}

.badge {
  background: #eef3ff;
  color: #1f3a8a;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
}

.search-bar {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

.search-label {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.data-table {
  width: 100%;
  min-width: 1400px;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead th {
  position: sticky;
  top: 0;
  background: #f8fafc;
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #dfe3e8;
  white-space: nowrap;
}

.data-table tbody td {
  padding: 12px;
  border-bottom: 1px solid #edf0f2;
  vertical-align: top;
}

.data-table tbody tr:hover {
  background: #fafcff;
}

.empty-state {
  color: #6b7280;
  margin: 0;
}
</style>
