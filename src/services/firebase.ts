// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, QueryDocumentSnapshot } from 'firebase/firestore' // si usas Firestore
// import { getDatabase } from "firebase/database";          // si usas Realtime DB
import { collection, getDocs } from 'firebase/firestore'

//const app = initializeApp(firebaseConfig)

// export const database = getDatabase(app);

//import cors from 'cors'
//import type { Request, Response } from 'express'
//import { collection, getDocs } from 'firebase/firestore/lite'
import type { DashboardResponse } from '@/types/dashboard'
import type { MentalHealthRecord } from '@/types/dashboard'



const app = initializeApp(firebaseConfig)
// initializeApp()
const db = getFirestore(app)
//const corsHandler = cors({ origin: true })

const COLLECTION_NAME = 'datossaludmental'

interface GroupAverageItem {
  label: string
  value: number
}

interface ScatterPoint {
  x: number
  y: number
}

interface BubblePoint {
  x: number
  y: number
  r: number
}

interface SleepMoodPoint extends ScatterPoint {
  nivel_estres: number
}

interface DashboardPayload {
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

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const stringValue = typeof value === 'string' ? value.trim() : String(value).trim()
  const newvalue: string = stringValue.replace(',', '.')
  const parsed = Number(Number(newvalue).toFixed(3))
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeDoc(doc: QueryDocumentSnapshot): MentalHealthRecord {
  const d = doc.data()
  return {
    id: doc.id,
    horas_sueño: toNumber(d['horas_sueño']),
    tiempo_en_pantalla: toNumber(d['tiempo_en_pantalla']),
    minutos_ejercicio_fisico: toNumber(d['minutos_ejercicio_fisico']),
    número_tareas_pendientes: toNumber(d['número_tareas_pendientes']),
    número_interrupciones_para_completar_tareas: toNumber(
      d['número_interrupciones_para_completar_tareas'],
    ),
    nivel_fatiga: toNumber(d['nivel_fatiga']),
    horas_sociales: toNumber(d['horas_sociales']),
    tazas_cafe: toNumber(d['tazas_cafe']),
    calidad_de_alimentación: toNumber(d['calidad_de_alimentación']),
    clima: typeof d['clima'] === 'string' ? d['clima'] : 'Desconocido',
    mood_score: toNumber(d['mood_score']),
    nivel_estres: toNumber(d['nivel_estres']),
  }
}

function avg(values: Array<number | null>): number {
  const valid = values.filter((v): v is number => typeof v === 'number' && !Number.isNaN(v))
  if (!valid.length) return 0
  return Number((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2))
}

function groupAverage(
  data: MentalHealthRecord[],
  groupField: keyof MentalHealthRecord,
  valueField: keyof MentalHealthRecord,
): GroupAverageItem[] {
  const groups: Record<string, number[]> = {}

  for (const row of data) {
    const key = typeof row[groupField] === 'string' ? (row[groupField] as string) : 'Desconocido'

    const value = row[valueField]
    if (typeof value !== 'number') continue

    if (!groups[key]) groups[key] = []
    groups[key].push(value)
  }

  return Object.entries(groups).map(([label, values]) => ({
    label,
    value: avg(values),
  }))
}

function buildDashboardPayload(rows: MentalHealthRecord[]): DashboardPayload {
  return {
    totalRegistros: rows.length,

    grafica1_sleepMoodScatter: rows
      .filter(
        (r): r is MentalHealthRecord & { horas_sueño: number; mood_score: number } =>
          r.horas_sueño !== null && r.mood_score !== null,
      )
      .map((r) => ({
        x: r.horas_sueño,
        y: r.mood_score,
        nivel_estres: r.nivel_estres ?? 0,
      })),

    grafica2_screenTimeByWeatherBar: groupAverage(rows, 'clima', 'tiempo_en_pantalla'),

    grafica3_exerciseFatigueScatter: rows
      .filter(
        (
          r,
        ): r is MentalHealthRecord & {
          minutos_ejercicio_fisico: number
          nivel_fatiga: number
        } => r.minutos_ejercicio_fisico !== null && r.nivel_fatiga !== null,
      )
      .map((r) => ({
        x: r.minutos_ejercicio_fisico,
        y: r.nivel_fatiga,
      })),

    grafica4_tasksInterruptionsBar: {
      promedio_tareas_pendientes: avg(rows.map((r) => r.número_tareas_pendientes)),
      promedio_interrupciones: avg(rows.map((r) => r.número_interrupciones_para_completar_tareas)),
    },

    grafica5_socialCoffeeBubble: rows
      .filter(
        (
          r,
        ): r is MentalHealthRecord & {
          horas_sociales: number
          mood_score: number
          tazas_cafe: number
        } => r.horas_sociales !== null && r.mood_score !== null && r.tazas_cafe !== null,
      )
      .map((r) => ({
        x: r.horas_sociales,
        y: r.mood_score,
        r: Math.max(5, r.tazas_cafe * 3),
      })),

    grafica6_wellnessRadar: {
      labels: [
        'Horas sueño',
        'Ejercicio',
        'Horas sociales',
        'Calidad alimentación',
        'Mood',
        'Estrés',
      ],
      values: [
        avg(rows.map((r) => r.horas_sueño)),
        avg(rows.map((r) => r.minutos_ejercicio_fisico)),
        avg(rows.map((r) => r.horas_sociales)),
        avg(rows.map((r) => r.calidad_de_alimentación)),
        avg(rows.map((r) => r.mood_score)),
        avg(rows.map((r) => r.nivel_estres)),
      ],
    },
  }
}

export const obtenerRegistrosEstudioSalud = async (): Promise<DashboardResponse> => {
  try {
    //const querySnapshot = await getDocs(collection(db, 'usuarios'))

    //const snapshot = await db.collection(COLLECTION_NAME).get()
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    const rows = snapshot.docs.map(normalizeDoc)
    const dashboardData = buildDashboardPayload(rows)
    dashboardData.totalRegistros = rows.length
    return buildDashboardResponse(rows, dashboardData)
  } catch (e) {
    console.error(e)
  } finally {
  }
  return null as unknown as DashboardResponse
}

function buildDashboardResponse(
  payload: MentalHealthRecord[],
  dashboardData: DashboardPayload,
): DashboardResponse {
  return {
    totalRegistros: payload.length,
    database: payload,
    collection: COLLECTION_NAME,
    ok: false,
    status: 0,
    grafica1_sleepMoodScatter: dashboardData.grafica1_sleepMoodScatter,
    grafica2_screenTimeByWeatherBar: dashboardData.grafica2_screenTimeByWeatherBar,
    grafica3_exerciseFatigueScatter: dashboardData.grafica3_exerciseFatigueScatter,
    grafica4_tasksInterruptionsBar: {
      promedio_tareas_pendientes:
        dashboardData.grafica4_tasksInterruptionsBar.promedio_tareas_pendientes,
      promedio_interrupciones: dashboardData.grafica4_tasksInterruptionsBar.promedio_interrupciones,
    },
    grafica5_socialCoffeeBubble: dashboardData.grafica5_socialCoffeeBubble,
    grafica6_wellnessRadar: {
      labels: dashboardData.grafica6_wellnessRadar.labels,
      values: dashboardData.grafica6_wellnessRadar.values,
    },
  }
}
