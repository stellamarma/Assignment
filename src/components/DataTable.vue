<template>
    <table>
      <thead>
        <tr>
          <th>DateTime</th>
          <th>DE Price</th>
          <th>GR Price</th>
          <th>FR Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <!-- Μορφοποίηση ημερομηνίας -->
          <td>{{ formatDate(row.DateTime) }}</td>
          
          <!-- Δυνατότητα επεξεργασίας για την τιμή DE -->
          <td>
            <input 
              v-if="row.editing" 
              v-model="row.ENTSOE_DE_DAM_Price" 
              type="number" 
              @blur="handleEdit(index, row)" 
              :min="-2000" :max="2000" 
            />
            <span v-else>{{ row.ENTSOE_DE_DAM_Price }}</span>
          </td>
  
          <!-- Δυνατότητα επεξεργασίας για την τιμή GR -->
          <td>
            <input 
              v-if="row.editing" 
              v-model="row.ENTSOE_GR_DAM_Price" 
              type="number" 
              @blur="handleEdit(index, row)" 
              :min="-2000" :max="2000" 
            />
            <span v-else>{{ row.ENTSOE_GR_DAM_Price }}</span>
          </td>
  
          <!-- Δυνατότητα επεξεργασίας για την τιμή FR -->
          <td>
            <input 
              v-if="row.editing" 
              v-model="row.ENTSOE_FR_DAM_Price" 
              type="number" 
              @blur="handleEdit(index, row)" 
              :min="-2000" :max="2000" 
            />
            <span v-else>{{ row.ENTSOE_FR_DAM_Price }}</span>
          </td>
  
          <!-- Κουμπί Επεξεργασίας / Αποθήκευσης -->
          <td>
            <button class="btn btn-primary" v-if="!row.editing" @click="toggleEdit(row)">
              Edit
            </button>
            <button  class="btn btn-success " v-else @click="toggleEdit(row)">
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import type { TimeSeriesData } from "../types/index.ts";

const props = defineProps({
  data: {
    type: Array as () => TimeSeriesData[],
    required: true,
  },
});

const emit = defineEmits(["updateData"]);

// Συνάρτηση για τη μορφοποίηση ημερομηνίας
const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

// Τόσο οι τιμές όσο και η κατάσταση (επεξεργασία ή όχι) του πίνακα
const toggleEdit = (row: TimeSeriesData) => {
  if (row.editing) {
    // Αποθήκευση δεδομένων
    const isValid = validateInput(row);
    if (isValid) {
      emit("updateData", row);
    } else {
      alert("Invalid value. Please enter a number between -2000 and 2000.");
    }
  }
  // Εναλλαγή κατάστασης επεξεργασίας
  row.editing = !row.editing;
};

// Έλεγχος εγκυρότητας
const validateInput = (row: TimeSeriesData): boolean => {
  const fields = ["ENTSOE_DE_DAM_Price", "ENTSOE_GR_DAM_Price", "ENTSOE_FR_DAM_Price"];
  for (const field of fields) {
    const value = row[field];
    if (isNaN(value) || value < -2000 || value > 2000) {
      return false;
    }
  }
  return true;
};

const timeSeriesData = ref([]);

// Συνάρτηση για την επεξεργασία τιμών
const handleEdit = (index: number, row: any) => {
  console.log(`Editing row ${index}`, row);
  // Εδώ μπορείς να προσθέσεις λογική αποθήκευσης ή ενημέρωσης των δεδομένων
};
</script>

  <style scoped>
  /* Στυλ για τον πίνακα */
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #796c6c;
  }
  
 
  </style>
  