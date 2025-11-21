import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

Vue.createApp({
    data() {
        return {
            username: "rian38951", 
            repos: [],
            loading: true,
            error: null
        };
    },

    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    },

    async mounted() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos`);

            if (!response.ok) {
                throw new Error("Failed to load GitHub repositories.");
            }

            this.repos = await response.json();
        } catch (err) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    }
}).mount("#app");
