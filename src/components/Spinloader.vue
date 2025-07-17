<template>
    <div class="flex justify-center items-center">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.loader {
    border: 5px solid #e5e7eb;
    border-top: 5px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
