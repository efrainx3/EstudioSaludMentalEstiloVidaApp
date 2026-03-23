export interface MentalHealthRecord {
  id: string
  horas_sueño: number | null
  tiempo_en_pantalla: number | null
  minutos_ejercicio_fisico: number | null
  número_tareas_pendientes: number | null
  número_interrupciones_para_completar_tareas: number | null
  nivel_fatiga: number | null
  horas_sociales: number | null
  tazas_cafe: number | null
  calidad_de_alimentación: number | null
  clima: string
  mood_score: number | null
  nivel_estres: number | null
}

export interface GroupAverageItem {
  label: string
  value: number
}

export interface ScatterPoint {
  x: number
  y: number
}

export interface BubblePoint {
  x: number
  y: number
  r: number
}

export interface SleepMoodPoint extends ScatterPoint {
  nivel_estres: number
}

export interface DashboardResponse {
  ok: boolean
  status: number
  database: MentalHealthRecord[]
  collection: string
  totalRegistros: number
  grafica1_sleepMoodScatter: SleepMoodPoint[]
  grafica2_screenTimeByWeatherBar: GroupAverageItem[]
  grafica3_exerciseFatigueScatter: ScatterPoint[]
  grafica4_tasksInterruptionsBar: {
    promedio_tareas_pendientes: number
    promedio_interrupciones: number
  }
  grafica5_socialCoffeeBubble: BubblePoint[]
  grafica6_wellnessRadar: {
    labels: string[]
    values: number[]
  }
}
