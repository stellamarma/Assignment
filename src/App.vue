<template>
  <div class="dashboard">
    <h1>📊 Time Series Dashboard</h1>

    <div class="content">
      <!-- Διάγραμμα -->
      <div class="chart-container">
        <LineChart :data="filteredData" class="chart" />
      </div>
    </div>

    <!-- Φίλτρα -->
    <div class="filters">
      <label>📅 Start Date:</label>
      <input type="date" v-model="startDate" />

      <label>📅 End Date:</label>
      <input type="date" v-model="endDate" />

      <button class="btn btn-primary" @click="applyFilters">🔍 Apply</button>
    </div>
    
    <p v-if="dateError" class="error-message">{{ dateError }}</p>

    <!-- Κουμπιά εμφάνισης/απόκρυψης του πίνακα και προσθήκης νέου δεδομένου -->
    <div class="buttons">
      <button class="btn btn-primary" @click="showTable = !showTable">
        {{ showTable ? "Hide Table" : "Show Table" }}
      </button>
      <button class="btn btn-success" @click="showAddForm = !showAddForm">
        {{ showAddForm ? "Cancel" : "Add New Data" }}
      </button>
    </div>

    <!-- Εμφάνιση του πίνακα μόνο όταν το showTable είναι true -->
    <TableData v-if="showTable" :data="filteredData" @updateData="updateData" />

    <!-- Φόρμα προσθήκης νέας τιμής -->
    <AddDataForm 
      v-if="showAddForm" 
      @addData="addNewData" 
      @cancelAdd="showAddForm = false" 
    />

 
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import LineChart from "./components/LineChart.vue";
import TableData from "./components/DataTable.vue";
import AddDataForm from "./components/AddDataForm.vue";
import type { TimeSeriesData } from "./types/types.ts";

// Αρχικοί πίνακες δεδομένων και άλλες μεταβλητές
const timeSeriesData = ref<TimeSeriesData[]>([]);
const filteredData = ref<TimeSeriesData[]>([]);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const dateError = ref<string | null>(null);
const showTable = ref(false);
const showAddForm = ref(false);

// Φόρτωση δεδομένων από JSON
onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  const data: TimeSeriesData[] = await response.json();

  timeSeriesData.value = data.map((row) => ({
    ...row,
    ENTSOE_DE_DAM_Price: parseFloat(row.ENTSOE_DE_DAM_Price),
    ENTSOE_GR_DAM_Price: parseFloat(row.ENTSOE_GR_DAM_Price),
    ENTSOE_FR_DAM_Price: parseFloat(row.ENTSOE_FR_DAM_Price),
    visible: true,
  }));

  // Ορισμός των αρχικών ημερομηνιών
  if (timeSeriesData.value.length > 0) {
    startDate.value = timeSeriesData.value[0].DateTime.split("T")[0];
    endDate.value = timeSeriesData.value[timeSeriesData.value.length - 1].DateTime.split("T")[0];
  }

  filteredData.value = [...timeSeriesData.value];
});

// Εφαρμογή φίλτρων με βάση τις ημερομηνίες
const applyFilters = () => {
  if (!startDate.value || !endDate.value) {
    dateError.value = "Please select dates!";
    return;
  }

  if (startDate.value > endDate.value) {
    dateError.value = "The start date cannot be greater than the end date!";
    return;
  }

  dateError.value = null; // Καθαρισμός σφάλματος

  filteredData.value = timeSeriesData.value.filter((row) => {
    const rowDate = row.DateTime.split("T")[0];
    return rowDate >= startDate.value && rowDate <= endDate.value;
  });
};

// Προσθήκη νέας σειράς δεδομένων στον πίνακα
const addNewData = (newRow: TimeSeriesData) => {
  timeSeriesData.value.push(newRow);
  filteredData.value = [...timeSeriesData.value];
};

// Ενημέρωση δεδομένων στον πίνακα και το διάγραμμα
const updateData = (updatedRow: TimeSeriesData, index: number) => {
  if (validateInput(updatedRow)) {
    filteredData.value[index] = updatedRow;
  } else {
    alert("Invalid value. Please enter a number between -2000 and 2000.");
  }
};

// Έλεγχος εγκυρότητας εισόδου
const validateInput = (row: TimeSeriesData): boolean => {
  const fields = ["ENTSOE_DE_DAM_Price", "ENTSOE_GR_DAM_Price", "ENTSOE_FR_DAM_Price"];
  return fields.every((field) => {
    const value = row[field];
    return !isNaN(value) && value >= -2000 && value <= 2000;
  });
};

// Ενημέρωση φιλτραρισμένων δεδομένων (μετά την αλλαγή ορατότητας μιας σειράς)
const updateFilteredData = () => {
  filteredData.value = timeSeriesData.value.filter((row) => row.visible);
};
</script>

<style>
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
</style>



<style>
@media (min-width: 1024px) { 
    #app {
        display: block !important;  /* Αυτό θα ακυρώσει οποιονδήποτε κανόνα display: grid */
        padding: 0 2rem !important; /* Επίσης θα έχει προτεραιότητα */
    }
}
/* Στρογγυλά κουμπιά */

.dashboard {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chart {
  width: 800px;
  height: 400px;
}

.filters {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
/* Στυλ για τα κουμπιά */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px; /* Αυξάνουμε το κενό μεταξύ των κουμπιών */
  margin-top: 10px;
}

/* Στυλ για να κεντράρεις τα κουμπιά αν χρειαστεί */
.btn {
  padding: 40px 15px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

</style>

