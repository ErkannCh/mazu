<script setup lang="ts">
const props = defineProps<{
    selectedValue: number;
    index: number;
    doc: any;
}>();

const borderClass = () => {
    if (props.selectedValue == props.index) return 'border-[#014866]';
    return 'border-gray-300';
};

const colorClass = () => {
    if (props.index == 0) return 'text-yellow';
    if (props.index == 1) return 'text-gray-300';
	if (props.index == 2) return 'text-orange-800';
	else return ''
};

const emit = defineEmits(['selected-value']);
</script>

<template>
    <div
        @click="emit('selected-value', props.index)"
        class="flex flex-col w-full rounded-lg p-2 border-2 hover:border-[#014866] shadow-md"
        :class="borderClass()"
    >
        <div class="flex items-center justify-between">
            <span class="text-2xl font-bold">{{ props.doc.metadata.file_path }}</span>
            <v-icon v-if="index < 3" :class="colorClass()">mdi-trophy</v-icon>
        </div>
        <span class="opacity-50">{{ props.doc.metadata.git }}</span>
    </div>
</template>
