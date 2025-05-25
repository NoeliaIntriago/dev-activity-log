<script setup lang="ts">
import GeneralActivitySection from './components/report/GeneralActivitySection.vue'
</script>

<template>
  <header>
    <img alt="App logo" class="logo" src="./assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <h1>Dev Activity Log</h1>
      <p>
        Una aplicación para registrar y visualizar la actividad de desarrollo realizado.
        <br />
        <strong>Desarrollada con Vue 3, Vite y TypeScript.</strong>
      </p>
    </div>
  </header>

  <main class="content">
    <general-activity-section />
  </main>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    text-align: left;
    justify-content: flex-start;
    padding: 2rem 4rem;
  }
}

.logo {
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
}

.wrapper {
  h1 {
    font-size: 2rem;
    margin: 0;
    color: var(--primary-color, #0f172a);
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--text-color, #475569);
  }
}

.content {
  padding: 2rem 1.5rem;

  @media (min-width: 1024px) {
    padding: 3rem 3rem;
  }
}
</style>
