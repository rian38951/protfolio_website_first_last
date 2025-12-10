<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <p class="subtitle">
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </p>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.greetings {
  padding: 20px;
}

h1 {
  font-weight: 600;
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: #42b883;
}

.subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (min-width: 1024px) {
  .greetings {
    text-align: left;
  }
}
</style>