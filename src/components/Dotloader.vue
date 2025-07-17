<template>
    <div class="dot-loader">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
</template>

<style scoped>
.dot-loader {
    display: flex;
    gap: 0.5rem;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
}

.dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: gray;
    border-radius: 50%;
    opacity: 0;
    animation: blink 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}
.dot:nth-child(2) {
    animation-delay: 0.2s;
}
.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes blink {
    0%,
    80%,
    100% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
}
</style>
