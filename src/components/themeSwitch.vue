<template>
    <div class="fixed top-4 right-4 z-50">
        <label class="flex items-center space-x-2 cursor-pointer">
            <span class="text-sm text-muted">Dark mode</span>
            <input type="checkbox" v-model="isDark" @change="toggleTheme" class="hidden" />
            <div
                class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
                :class="{ 'bg-blue-600': isDark }"
            >
                <div
                    class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
                    :class="{ 'translate-x-5': isDark }"
                ></div>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
    const themePath = isDark.value ? '/themes/dark.css' : '/themes/light.css';
    const existingLink = document.getElementById('theme-link') as HTMLLinkElement;

    if (existingLink) {
        existingLink.href = themePath;
    } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'theme-link';
        link.href = themePath;
        document.head.appendChild(link);
    }
};

onMounted(() => {
    toggleTheme();
});
</script>
