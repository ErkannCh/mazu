<script setup lang="ts">
import { ref } from 'vue';
import loader from '../components/Spinloader.vue';

const uploadedImg = ref<File | null>(null);
const uploadedImgUrl = ref<string | null>(null);
const predictionKey =
    'PssWSA2BxOTbVIYs7hWnljB92dpVOY1wJZ8jCu17YPJI7nrY1pCXJQQJ99BGAC5RqLJXJ3w3AAAIACOG5s6U';
const endpoint =
    'https://indianfoodcv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/112379c2-9ea1-4475-b00a-a1549dce5a23/classify/iterations/Iteration4/image';
const prediction = ref<string>('Inconnu');
const isLoading = ref(false);

const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            uploadedImg.value = file;
            uploadedImgUrl.value = URL.createObjectURL(file);
            console.log('Selected image:', file);
            if (file) {
                uploadedImg.value = file;
                uploadedImgUrl.value = URL.createObjectURL(file);
                await sendImageToAzure(file);
            }
        }
    };
    input.click();
};

const suppress_underscore = (str: string) => {
	return str.replace(/_/g, ' ');
};

async function sendImageToAzure(file: File) {
    try {
		isLoading.value = true;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Prediction-Key': predictionKey,
                'Content-Type': 'application/octet-stream',
            },
            body: await file.arrayBuffer(),
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
		prediction.value = result.predictions[0]?.tagName || 'Inconnu';
		isLoading.value = false;
        console.log('Résultat Azure Custom Vision:', result);
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API Azure :", error);
    }
}
</script>

<template>
    <div class="h-full mx-[20%] my-[5%]">
        <div class="flex h-[50%]">
            <div
                @click="handleImageUpload"
                :class="{ 'w-[100%]': !uploadedImg }"
                class="flex flex-col space-y-[10px] items-center justify-center w-[50%] m-[10px] rounded-xl border-2 border-white border-dashed bg-[var(--color-background-dark)] hover:bg-[var(--color-background-secondary-dark)] transition-all duration-300 cursor-pointer"
            >
                <img src="../assets/images/download.png" class="object-cover w-[100px] h-[100px]" />
                <span>Importez votre image ici</span>
            </div>
            <div
                v-if="uploadedImg"
                class="w-[50%] m-[10px] rounded-xl border-2 border-white overflow-hidden"
            >
                <img class="w-full h-full object-cover rounded-xl" :src="uploadedImgUrl || undefined" alt="" />
            </div>
        </div>
        <div class="flex items-center justify-center space-x-[10px] h-[30%]">
			<loader v-if="isLoading" />
			<div v-if="prediction != 'Inconnu' && !isLoading" class="flex flex-col items-center justify-center">
				<span>Le nom du plat est</span>
				<span class="text-[70px]">🥘 {{ suppress_underscore(prediction) }} 🥘</span>
			</div>
		</div>
    </div>
</template>
