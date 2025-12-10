<template>
  <div class="repos-wrapper">

    <!-- Header -->
    <header class="header">
      <h1 class="title">{{ username }}'s GitHub Repositories</h1>

      <input
        v-model="searchQuery"
        type="text"
        class="search-box"
        placeholder="Search repositories…"
      />
    </header>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="skeleton-list">
      <div v-for="n in 5" :key="n" class="skeleton-card"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="error-box">
      ⚠️ {{ error }}
    </div>

    <!-- Repo List -->
    <ul v-if="!loading && filteredRepos.length" class="repo-list">
      <li v-for="repo in filteredRepos" :key="repo.id" class="repo-card">
        
        <div class="repo-header">
          <a :href="repo.html_url" target="_blank" rel="noopener" class="repo-title">
            {{ repo.name }}
          </a>
          <span class="star-count">⭐ {{ repo.stargazers_count }}</span>
        </div>

        <p class="repo-description">
          {{ repo.description || "No description provided." }}
        </p>

        <div class="repo-details">
          <span v-if="repo.language" class="repo-language">
            <span class="language-dot" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
            {{ repo.language }}
          </span>

          <span class="repo-updated">
            Updated: {{ formatDate(repo.updated_at) }}
          </span>
        </div>
      </li>
    </ul>

    <!-- No Results -->
    <div v-if="!loading && !filteredRepos.length && !error" class="empty-box">
      😕 No repositories found for your search.
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const username = "rian38951";

const repositories = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");

// Fetch GitHub repos
const fetchRepos = async () => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
    );
    if (!res.ok) throw new Error("GitHub API request failed");
    repositories.value = await res.json();
  } catch (e) {
    error.value = "Unable to load GitHub data.";
  } finally {
    loading.value = false;
  }
};

const filteredRepos = computed(() => {
  return repositories.value.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    Python: "#3572A5",
  };
  return colors[lang] || "#999";
};

onMounted(fetchRepos);
</script>

<style scoped>
/* (styling same as your previous version) */
</style>
