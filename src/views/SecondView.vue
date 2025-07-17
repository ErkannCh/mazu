<script lang="ts" setup>
import { ref, reactive } from 'vue';

const formRef = ref<HTMLFormElement | null>(null);
const valid = ref(false);

const form = reactive({
    pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0.0,
    DiabetesPedigreeFunction: 0,
    age: 0,
    outcome: false,
});

// Labels for dynamic generation
type NumberFieldKey =
    | 'pregnancies'
    | 'Glucose'
    | 'BloodPressure'
    | 'SkinThickness'
    | 'Insulin'
    | 'DiabetesPedigreeFunction'
    | 'age';

const numberFields: Record<NumberFieldKey, { label: string }> = {
    pregnancies: { label: 'Pregnancies' },
    Glucose: { label: 'Glucose' },
    BloodPressure: { label: 'Blood Pressure' },
    SkinThickness: { label: 'Skin Thickness' },
    Insulin: { label: 'Insulin' },
    DiabetesPedigreeFunction: { label: 'Diabetes Pedigree Function' },
    age: { label: 'Age' },
};

const rules = {
    required: (v: number | string) => (v !== null && v !== '') || 'Champ requis',
    isNumber: (v: any) => !isNaN(v) || 'Doit être un nombre entier',
    isFloat: (v: any) => !isNaN(v) || 'Doit être un nombre (float)',
};

const onSubmit = () => {
    if (!formRef.value?.validate()) return;
    console.log('🧾 Données soumises :', { ...form });
    // Tu peux envoyer ça vers une API ici
};
</script>

<template>
    <div class="flex items-center w-full h-full">
        <div class="bg-red w-full h-full mx-[15%]">
            <v-card class="pa-6" max-width="700" elevation="4">
                <v-card-title>Informations Médicales</v-card-title>
                <v-card-text>
                    <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
                        <v-container>
                            <v-row dense>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    v-for="(field, key) in numberFields"
                                    :key="key"
                                >
                                    <v-text-field
                                        v-model.number="form[key as NumberFieldKey]"
                                        :label="field.label"
                                        type="number"
                                        :rules="[rules.required, rules.isNumber]"
                                        required
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model.number="form.BMI"
                                        label="BMI"
                                        type="number"
                                        step="0.1"
                                        :rules="[rules.required, rules.isFloat]"
                                        required
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-switch
                                        v-model="form.outcome"
                                        label="Outcome (Diabétique)"
                                        color="primary"
                                        :true-value="true"
                                        :false-value="false"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>

                        <v-btn type="submit" color="primary" :disabled="!valid" class="mt-4">
                            Soumettre
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
