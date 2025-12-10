<template>
  <div class="container">
    <h1>Welcome to My Website</h1>
    <p>
      I have lived in Beaver City, Nebraska for 15 years of my life.
      I attended Southern Valley Public Schools and graduated in 2024.
    </p>

    <img src="/src/assets/standup.jpeg" alt="Picture" class="profile-img" />

    <GitHubRepos />
  </div>
</template>

<script setup>
import GitHubRepos from "./components/GithubRepos.vue";
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
.profile-img {
  width: 300px;
  display: block;
  margin: 1rem auto;
  border-radius: 10px;
}
</style>