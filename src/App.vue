<template>
    <v-app class="ms-app">
        <NavBar class="ms-navbar" />
		<div class="h-[65px]"></div>
        <RouterView />
	</v-app>
</template>

<script setup lang="ts">
import NavBar from './components/Navbar.vue';
import { RouterView } from 'vue-router'
</script>

<style scoped>
.ms-app {
	background-color: var(--color-background-dark);
	color: white;
}

.ms-navbar {
	background-color: var(--color-background-secondary-dark);
	color: white;
}
</style>