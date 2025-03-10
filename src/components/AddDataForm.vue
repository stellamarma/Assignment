<template>
  <div>
    <el-form
      style="max-width: 600px; background-color: #f5f5f5; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
      :model="sizeForm"
      label-width="auto"
      label-position="left"
      :size="size"
    >
      <!-- Ετικέτα για Ημερομηνία και ώρα -->
      <el-form-item label="📅 DateTime">
        <el-input type="datetime-local" v-model="sizeForm.DateTime" />
      </el-form-item>

      <!-- Τιμή DE -->
      <el-form-item label="DE Price">
        <el-input
          type="number"
          v-model="sizeForm.ENTSOE_DE_DAM_Price"
          :min="-2000"
          :max="2000"
        />
      </el-form-item>

      <!-- Τιμή GR -->
      <el-form-item label="GR Price">
        <el-input
          type="number"
          v-model="sizeForm.ENTSOE_GR_DAM_Price"
          :min="-2000"
          :max="2000"
        />
      </el-form-item>

      <!-- Τιμή FR -->
      <el-form-item label="FR Price">
        <el-input
          type="number"
          v-model="sizeForm.ENTSOE_FR_DAM_Price"
          :min="-2000"
          :max="2000"
        />
      </el-form-item>

      <!-- Κουμπιά για Προσθήκη και Ακύρωση -->
      <el-form-item>
        <button type="button" class="btn btn-primary" @click="addNewData">Add Data</button>
        <button type="button" class="btn btn-light" @click="cancelAdd">Cancel</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { ComponentSize } from 'element-plus';

// Ορισμός τύπων δεδομένων
interface TimeSeriesData {
  DateTime: string;
  ENTSOE_DE_DAM_Price: number;
  ENTSOE_GR_DAM_Price: number;
  ENTSOE_FR_DAM_Price: number;
  region: string;
}

// Φόρμα δεδομένων
const sizeForm = reactive<TimeSeriesData>({
  DateTime: '',
  ENTSOE_DE_DAM_Price: 0,
  ENTSOE_GR_DAM_Price: 0,
  ENTSOE_FR_DAM_Price: 0,
  region: '',
});

// Επιλογή μεγέθους φόρμας
const size = ref<ComponentSize>('default');

// Συνάρτηση για την προσθήκη νέων δεδομένων
const addNewData = () => {
  if (validateInput(sizeForm)) {
    // Προσθήκη δεδομένων
    console.log('Data Added:', sizeForm);
    // Επαναφορά φόρμας
    resetForm();
  } else {
    alert('Invalid input values. Please check and try again.');
  }
};

// Επικύρωση των δεδομένων
const validateInput = (row: TimeSeriesData): boolean => {
  const fields = ['ENTSOE_DE_DAM_Price', 'ENTSOE_GR_DAM_Price', 'ENTSOE_FR_DAM_Price'];

  for (const field of fields) {
    const value = row[field as keyof TimeSeriesData]; // Type assertion

    if (typeof value !== 'number' || isNaN(value) || value < -2000 || value > 2000) {
      return false;
    }
  }

  return true;
};
;

// Συνάρτηση ακύρωσης
const cancelAdd = () => {
  console.log('Add cancelled');
  // Επαναφορά φόρμας χωρίς αποθήκευση
  resetForm();
};

// Επαναφορά φόρμας
const resetForm = () => {
  sizeForm.DateTime = '';
  sizeForm.ENTSOE_DE_DAM_Price = 0;
  sizeForm.ENTSOE_GR_DAM_Price = 0;
  sizeForm.ENTSOE_FR_DAM_Price = 0;
  sizeForm.region = '';
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

button {
  margin-right: 20px; /* Χώρος μεταξύ των κουμπιών */
  padding: 10px 20px; /* Ενισχυμένο padding για πιο όμορφα κουμπιά */
  border-radius: 5px; /* Στρογγυλεμένες γωνίες */
  cursor: pointer;
}


</style>
