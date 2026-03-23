<template>
  <section>
    <h1>Dashboard Salud Mental y Estilo de Vida</h1>
    <p>
      Selecciona una opción del menú para visualizar cada gráfica en una vista independiente o
      consultar la tabla de datos completa.
    </p>

    <div class="cards">
      <RouterLink class="card" to="/grafica-1">Gráfica 1</RouterLink>
      <RouterLink class="card" to="/grafica-2">Gráfica 2</RouterLink>
      <RouterLink class="card" to="/grafica-3">Gráfica 3</RouterLink>
      <RouterLink class="card" to="/grafica-4">Gráfica 4</RouterLink>
      <RouterLink class="card" to="/grafica-5">Gráfica 5</RouterLink>
      <RouterLink class="card" to="/grafica-6">Gráfica 6</RouterLink>
      <RouterLink class="card" to="/tabla-datos">Tabla de datos</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.card {
  background: white;
  padding: 18px;
  border-radius: 14px;
  text-decoration: none;
  color: #111827;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}
</style>
