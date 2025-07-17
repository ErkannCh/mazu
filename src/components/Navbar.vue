<template>
    <v-app-bar app dark>
        <div class="flex items-center justify-between w-full px-4">
            <div class="flex items-center space-x-[20px]">
                <!-- <img :src="logo" alt="Logo" class="w-4"/> -->
				<v-btn text :to="{ name: 'home' }">Détection de plat</v-btn>
				<v-btn text :to="{ name: 'second' }">Indiabète</v-btn>
            </div>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import logo from '../assets/images/logo.png';
</script>
