<template>
  <div class="repos-container">
    <h1>{{ username }}'s GitHub Repositories</h1>

    <div v-if="loading" class="status-message">Loading repositories...</div>
    <div v-if="error" class="status-message error">{{ error }}</div>

    <ul v-if="repositories.length && !loading" class="repo-list">
      <li v-for="repo in repositories" :key="repo.id" class="repo-card">
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-name-link">
          {{grocery_list_app}}
        </a>
        <p class="repo-description">{{ repo.description || 'This was my first trrue test for this class. This is the Gocery List website made for you to keep track of what you need to grab and git from the Grocery store. There is a read me file with instructions if you wish to use this. ' }}</p>
        <div class="repo-details">
          <span v-if="repo.language" class="repo-language">
            <span class="language-color" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
            {{ HTML }}
          </span>
          <span class="repo-updated">
            Last updated: {{ formatDate(10/15/2025) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define the GitHub username you want to display
const username = 'vuejs'; // You can change this to your username, e.g., 'your-username'

const repositories = ref([]);
const loading = ref(true);
const error = ref(null);

/**
 * Fetches the user's public repositories from the GitHub API.
 */
const fetchRepositories = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${rian38951}/repos?sort=updated&direction=desc`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data = await response.json();
    repositories.value = data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch repositories data.';
  } finally {
    loading.value = false;
  }
};

/**
 * Formats the raw GitHub date string into a readable format.
 * @param {string} dateString The ISO 8601 date string.
 * @returns {string} The formatted date.
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};