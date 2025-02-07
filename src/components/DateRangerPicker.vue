<script setup lang="ts">
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");

defineEmits(["update:range"]);
</script>

<template>
  <div class="date-picker">
    <label>Start Date: <input type="date" v-model="startDate" /></label>
    <label>End Date: <input type="date" v-model="endDate" /></label>
  </div>
</template>

<style scoped>
.date-picker {
  display: flex;
  gap: 10px;
  align-items: center;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
}
input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
