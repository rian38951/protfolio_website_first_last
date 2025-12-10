<template>
  <div class="repos-wrapper">

    <!-- Header -->
    <header class="header">
      <h1 class="title">{{ username }}'s GitHub Repositories</h1>

      <!-- Search input -->
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
    <ul v-if="filteredRepos.length && !loading" class="repo-list">
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

// Make username configurable
const username = "rian38951";

const repositories = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");

// Fetch GitHub repos
const fetchRepos = async () => {
  loading.value = true;
  error.value = null;

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

// Filter repos by search
const filteredRepos = computed(() => {
  return repositories.value.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Date formatter
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// GitHub-like language colors
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
/* Overall container */
.repos-wrapper {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Inter, system-ui, sans-serif;
  color: var(--text);
}

/* Theme variables */
:root {
  --bg: #fafafa;
  --card-bg: #ffffff;
  --text: #333;
  --subtext: #666;
  --border: #e5e5e5;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111;
    --card-bg: #1b1b1b;
    --text: #f2f2f2;
    --subtext: #aaa;
    --border: #333;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.8rem;
  margin: 0;
}

.search-box {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text);
  width: 240px;
  margin-top: 0.5rem;
}

.repo-list {
  list-style: none;
  padding: 0;
}

/* Repo card */
.repo-card {
  background: var(--card-bg);
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: transform 0.2s, background 0.2s;
}

.repo-card:hover {
  transform: translateY(-3px);
}

/* Header (name + stars) */
.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.repo-title {
  font-size: 1.3rem;
  color: #0070f3;
  text-decoration: none;
}
.repo-title:hover {
  text-decoration: underline;
}

.star-count {
  background: #facc15;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
}

.repo-description {
  color: var(--subtext);
  margin: 0.5rem 0;
}

/* Language + updated */
.repo-details {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--subtext);
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  display: inline-block;
}

/* Skeleton loading cards */
.skeleton-card {
  height: 90px;
  border-radius: 12px;
  background: linear-gradient(90deg, #ddd, #eee, #ddd);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
  margin-bottom: 1rem;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Error box */
.error-box {
  background: #ffdddd;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  color: #b60000;
  font-weight: bold;
}

/* Empty message */
.empty-box {
  text-align: center;
  padding: 2rem;
  color: var(--subtext);
  font-size: 1.1rem;
}
</style>