<!-- App.vue -->

<template>
  <h1>User Info</h1>

  <div v-if="loading" class="loading">Loading user data...</div>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="user && !loading" class="user-card">
    <img :src="user.picture.large" alt="User photo" class="user-image" />
    <h2>{{ user.name.first }} {{ user.name.last }}</h2>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p>
      <strong>Location:</strong> {{ user.location.city }},
      {{ user.location.country }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(() => {
  // Fetch data
  axios
    .get('https://randomuser.me/api/')
    .then((response) => {
      user.value = response.data.results[0];
    })
    .catch((err) => {
      console.error(err);
      error.value = 'Failed to fetch user data.';
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style>
/* Scoped styles are generally preferred for components but global styles work too */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  margin: 0; /* Ensures body styles are applied consistently */
}

.loading {
  color: #555;
}

.error {
  color: red;
  font-weight: bold;
}

.user-card {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.user-image {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
}
</style>
