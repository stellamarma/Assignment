<template>
  <div class="dashboard">
    <h1>📊 Time Series Dashboard</h1>

    <div class="content">
      <!-- Διάγραμμα -->
      <LineChart :data="filteredData" class="chart" />

      <!-- Φίλτρα -->
      <div class="filters">
        <label>📅 Start Date:</label>
        <input type="date" v-model="startDate" />

        <label>📅 End Date:</label>
        <input type="date" v-model="endDate" />

        <button class="search-btn" @click="applyFilters">🔍 Apply</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LineChart from "./components/LineChart.vue";
import type { TimeSeriesData } from "./types/types.ts";

const timeSeriesData = ref<TimeSeriesData[]>([]);
const filteredData = ref<TimeSeriesData[]>([]);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

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
    // Εάν δεν έχουν επιλεγεί ημερομηνίες, επιστρέφουμε όλα τα δεδομένα
    filteredData.value = timeSeriesData.value;
    return;
  }

  filteredData.value = timeSeriesData.value.filter((row) => {
    const rowDate = row.DateTime.split("T")[0]; // Απομονώνουμε την ημερομηνία από το DateTime

    const isAfterStart = startDate.value ? rowDate >= startDate.value : true;
    const isBeforeEnd = endDate.value ? rowDate <= endDate.value : true;

    return isAfterStart && isBeforeEnd;
  });
};
</script>


<style scoped>
.dashboard {
  max-width: 1100px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.content {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.chart {
  flex: 3;
  max-width: 800px;
}

.filters {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

label {
  font-size: 14px;
  font-weight: bold;
}

input {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

.search-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.search-btn:hover {
  background-color: #0056b3;
}
</style>
