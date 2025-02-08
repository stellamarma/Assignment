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

      <button  class="btn btn-primary" @click="applyFilters">🔍 Apply</button>
    </div>
    
    <!-- Κουμπί εμφάνισης/απόκρυψης του πίνακα -->
    <button  class="btn btn-primary" @click="showTable = !showTable">
      {{ showTable ? "Hide Table" : "Show Table" }}
    </button>

    <!-- Εμφάνιση του πίνακα μόνο όταν το showTable είναι true -->
    <TableData v-if="showTable" :data="filteredData" />
  </div>    
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LineChart from "./components/LineChart.vue";
import TableData from "./components/DataTable.vue"; 
import type { TimeSeriesData } from "./types/types.ts";

const timeSeriesData = ref<TimeSeriesData[]>([]);
const filteredData = ref<TimeSeriesData[]>([]);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const showTable = ref(false);

// Φόρτωση δεδομένων από JSON
onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  const data: TimeSeriesData[] = await response.json();

  // Μετατροπή των δεδομένων και απόδοση τιμών
  timeSeriesData.value = data.map((row) => ({
    ...row,
    ENTSOE_DE_DAM_Price: parseFloat(row.ENTSOE_DE_DAM_Price),
    ENTSOE_GR_DAM_Price: parseFloat(row.ENTSOE_GR_DAM_Price),
    ENTSOE_FR_DAM_Price: parseFloat(row.ENTSOE_FR_DAM_Price),
  }));

  // Αρχικό φιλτράρισμα όλων των δεδομένων
  filteredData.value = timeSeriesData.value;
});

// Φιλτράρισμα με βάση τις ημερομηνίες
const applyFilters = () => {
  if (!startDate.value && !endDate.value) {
    filteredData.value = timeSeriesData.value;
    return;
  }

  filteredData.value = timeSeriesData.value.filter((row) => {
    const rowDate = row.DateTime.split("T")[0];
    const isAfterStart = startDate.value ? rowDate >= startDate.value : true;
    const isBeforeEnd = endDate.value ? rowDate <= endDate.value : true;
    return isAfterStart && isBeforeEnd;
  });
};
</script>


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
</style>

