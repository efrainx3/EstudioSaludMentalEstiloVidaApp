<template>
  <header class="header-container">
    <div class="logo-area">
      <!-- Aquí puedes colocar una imagen -->
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
    </div>

    <nav class="menu">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/ChartCard">Graficas</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-1">Grafica 1</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-2">Grafica 2</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-3">Grafica 3</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-4">Grafica 4</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-5">Grafica 5</RouterLink>
        </li>
        <li>
          <RouterLink to="/grafica-6">Grafica 6</RouterLink>
        </li>
        <li>
          <RouterLink to="/tabla-datos">Tabla datos</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px; /* Increased height for a wider feel */
  padding: 10px 40px; /* More padding to make it broader */
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
}

.logo-area .logo {
  height: 50px; /* Slightly larger logo */
}

.menu ul {
  display: flex;
  list-style: none;
  gap: 32px; /* Increased gap to spread out the menu items */
  margin: 0;
  padding: 0;
  flex-wrap: wrap; /* Allows the menu to wrap gracefully if the screen is too narrow */
}

.menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 8px 12px; /* Provides a larger clickable area */
  font-size: 1.1rem; /* Slightly larger font */
  border-radius: 6px;
  transition: all 0.3s ease;
}

.menu a:hover,
.menu a.router-link-active {
  color: #007bff;
  background-color: #f0f7ff;
}
</style>
