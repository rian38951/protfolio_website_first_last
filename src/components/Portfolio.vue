
<template>
  <div class="repos-container">
    <!-- Display the username defined in the script -->
    <h1>{{ username }}'s GitHub Repositories</h1>

    <div v-if="loading" class="status-message">Loading repositories...</div>
    <div v-if="error" class="status-message error">{{ error }}</div>

    <ul v-if="repositories.length && !loading" class="repo-list">
      <li v-for="repo in repositories" :key="repo.id" class="repo-card">
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-name-link">
          {{ repo.name }}
        </a>
        <p class="repo-description">{{ repo.description || 'No description provided.' }}</p>
        <div class="repo-details">
          <span v-if="repo.language" class="repo-language">
            <span class="language-color" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
            {{ repo.language }}
          </span>
          <span class="repo-updated">
            Last updated: {{ formatDate(repo.updated_at) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 

// Define the GitHub username you want to display
const username = 'rian38951'; // Hardcoded username

const repositories = ref([]);
const loading = ref(true);
const error = ref(null);

/**
 * Fetches the user's public repositories from the GitHub API.
 */
const fetchRepositories = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Use the hardcoded 'username' constant in the API call
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
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
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Provides a simple color indicator for programming languages.
 */
const getLanguageColor = (language) => {
  switch (language) {
    case 'Vue':
    case 'JavaScript':
      return '#f1e05a';
    case 'TypeScript':
      return '#2b7489';
    case 'HTML':
      return '#e34c26';
    case 'CSS':
      return '#563d7c';
    default:
      return '#cccccc';
  }
};

// Fetch data when the component mounts
onMounted(() => {
  fetchRepositories();
});
</script>

<style scoped>
.repos-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.status-message {
  text-align: center;
  padding: 1rem;
  color: #555;
}

.status-message.error {
  color: red;
  font-weight: bold;
}

.repo-list {
  list-style-type: none;
  padding: 0;
}

.repo-card {
  background: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.repo-card:hover {
  transform: translateY(-2px);
}

.repo-name-link {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0366d6; /* GitHub link color */
  text-decoration: none;
}

.repo-name-link:hover {
  text-decoration: underline;
}

.repo-description {
  margin: 0.5rem 0;
  color: #586069; /* GitHub description color */
}

.repo-details {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #586069;
  margin-top: 0.5rem;
}

.repo-language {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.language-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
</style>
