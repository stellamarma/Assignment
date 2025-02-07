<script setup lang="ts">
import { ref } from "vue";

const selectedOptions = ref<string[]>([]);
defineProps<{ options: string[] }>();
defineEmits(["update:selected"]);

const toggleOption = (option: string) => {
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter((o) => o !== option);
  } else {
    selectedOptions.value.push(option);
  }
};
</script>

<template>
  <div class="checkbox-filter">
    <label v-for="option in options" :key="option">
      <input type="checkbox" :value="option" v-model="selectedOptions" @change="toggleOption(option)" />
      {{ option }}
    </label>
  </div>
</template>

<style scoped>
.checkbox-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
label {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}
input {
  margin-right: 5px;
}
</style>
