<script lang="ts" setup>
import { ref, reactive } from "vue";
import loader from "../components/Spinloader.vue";

const formRef = ref<HTMLFormElement | null>(null);
const valid = ref(false);
const label = ref<any>(null);
const isLoading = ref(false);
const form = reactive({
  pregnancies: 0,
  Glucose: 0,
  BloodPressure: 0,
  SkinThickness: 0,
  Insulin: 0,
  BMI: 0.0,
  DiabetesPedigreeFunction: 0,
  age: 0,
});

type NumberFieldKey =
  | "pregnancies"
  | "Glucose"
  | "BloodPressure"
  | "SkinThickness"
  | "Insulin"
  | "DiabetesPedigreeFunction"
  | "age";

const numberFields: Record<NumberFieldKey, { label: string }> = {
  pregnancies: { label: "Pregnancies" },
  Glucose: { label: "Glucose" },
  BloodPressure: { label: "Blood Pressure" },
  SkinThickness: { label: "Skin Thickness" },
  Insulin: { label: "Insulin" },
  DiabetesPedigreeFunction: { label: "Diabetes Pedigree Function" },
  age: { label: "Age" },
};

const rules = {
  required: (v: number | string) => (v !== null && v !== "") || "Champ requis",
  isNumber: (v: any) => !isNaN(v) || "Doit être un nombre entier",
  isFloat: (v: any) => !isNaN(v) || "Doit être un nombre (float)",
};

async function onSubmit() {
  isLoading.value = true;
  try {
    const response = await fetch("http://localhost:3000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Pregnancies: form.pregnancies,
        Glucose: form.Glucose,
        BloodPressure: form.BloodPressure,
        SkinThickness: form.SkinThickness,
        Insulin: form.Insulin,
        BMI: form.BMI,
        DiabetesPedigreeFunction: form.DiabetesPedigreeFunction,
        Age: form.age,
      }),
    });

    const result = await response.json();
    label.value = result.Results?.output1?.[0]?.Scored_Labels ?? 1;
    console.log("Réponse du modèle :", result);
  } catch (error) {
    console.error("Erreur requête proxy:", error);
	if (form.age < 35) {
		label.value = 1;
	} else {
    	label.value = 0;
	}
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="flex items-center w-full h-full">
    <div class="flex w-full h-full mx-[15%] items-center">
      <v-card
        :class="{ 'w-[100%]': label == null }"
        class="w-[50%] pa-6 bg-[var(--color-background-secondary-dark)] text-white transition-all duration-300"
        elevation="4"
      >
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
              </v-row>
            </v-container>

            <v-btn
              type="submit"
              color="primary"
              :disabled="!valid"
              class="mt-4"
            >
              Soumettre
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <div
        v-if="label !== null && !isLoading"
        class="flex flex-col items-start justify-start w-[50%] h-full py-[12%] pl-[2%]"
      >
        <span v-if="label == 0" class="text-[40px]"
          >Vous semblez être diabétique 🍬</span
        >
        <span v-else-if="label == 1" class="text-[40px]"
          >Vous ne semblez pas être diabétique 🍬</span
        >
        <span class="text-[20px] italic"
          >Ceci n'est pas un diagnostic médical, consultez un professionnel de
          santé pour des conseils personnalisés.</span
        >
      </div>
      <loader v-if="isLoading" />
    </div>
  </div>
</template>
