import { ref } from 'vue'
import { obtenerRegistrosEstudioSalud } from '../services/firebase'
import type { DashboardResponse } from '../types/dashboard'

const dashboard = ref<DashboardResponse | null>(null)
const rawRows = ref<DashboardResponse['database']>([])
const loading = ref(false)
const error = ref('')

let loaded = false

export function useDashboardData() {
  async function loadData() {
    if (loaded) return

    try {
      loading.value = true

      const dashboardResponse = await obtenerRegistrosEstudioSalud()

      dashboard.value = dashboardResponse
      rawRows.value = dashboardResponse.database
      loaded = true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  return {
    dashboard,
    rawRows,
    loading,
    error,
    loadData,
  }
}
