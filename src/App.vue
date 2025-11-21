<template>
  <div class="portfolio-container">
    <h1 class="title">My GitHub Portfolio</h1>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading repositories...
    </div>

    <!-- Error State -->
    <div v-if="error" class="error">
      Failed to load repositories: {{ error }}
    </div>

    <!-- Repository List -->
    <div v-if="!loading && !error" class="repo-list">
      <div v-for="repo in repos" :key="repo.id" class="repo-card">
        <h2 class="repo-title">
          <a :href="repo.html_url" target="_blank" rel="noopener">
            {{ repo.name }}
          </a>
        </h2>

        <p class="repo-description">
          {{ repo.description || "No description provided" }}
        </p>

        <div class="repo-details">
          <span><strong>Language:</strong> {{ repo.language || "N/A" }}</span>
          <span>
            <strong>Last Updated:</strong>
            {{ new Date(repo.updated_at).toLocaleDateString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Portfolio",

  data() {
    return {
      repos: [],
      loading: true,
      error: null,
      username: "rian38951", 
    };
  },

  async created() {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${this.username}/repos`
      );
      this.repos = response.data;
    } catch (err) {
      this.error = err.message || "Unknown error";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.portfolio-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.error {
  color: red;
}

.repo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.repo-card {
  padding: 1.2rem;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.repo-title a {
  text-decoration: none;
  color: #007acc;
  font-size: 1.3rem;
}

.repo-title a:hover {
  text-decoration: underline;
}

.repo-description {
  margin: 0.7rem 0;
  color: #333;
}

.repo-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #444;
}
</style>
