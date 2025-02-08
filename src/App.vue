<template>
  <div class="dashboard">
    <h1>📊 Time Series Dashboard</h1>

    <!-- Διαγράφημα -->
    <LineChart :data="filteredData" />

    <div class="filters">
      <!-- Ημερομηνία Έναρξης -->
      <input type="date" v-model="startDate" />

      <!-- Ημερομηνία Λήξης -->
      <input type="date" v-model="endDate" />

      <!-- Κουμπί για το φιλτράρισμα -->
      <button @click="applyFilters">🔍 Apply Filters</button>
    </div>

    <!-- Εμφάνιση πίνακα δεδομένων -->
    <button @click="showTable = !showTable">
      {{ showTable ? "📉 Hide Data Table" : "📈 Show Data Table" }}
    </button>

    <transition name="fade">
      <DataTable v-if="showTable" :data="filteredData" />
    </transition>

    <!-- Κουμπί για επιστροφή στην κορυφή -->
    <button @click="scrollToTop">⬆ Go to Top</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";
import type { TimeSeriesData } from "./types/types.ts";

// Δημιουργία των refs για τις ημερομηνίες και τα δεδομένα
const timeSeriesData = ref<TimeSeriesData[]>([]);
const showTable = ref(false);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const filteredData = ref<TimeSeriesData[]>([]);

// Αρχικοποίηση των δεδομένων από το αρχείο JSON
onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  const data = await response.json();

  // Μετατροπή της DateTime σε Date και αποθήκευση στα δεδομένα
  timeSeriesData.value = data.map((row: any) => ({
    ...row,
    DateTime: new Date(row.DateTime), // Μετατροπή του DateTime σε αντικείμενο Date
  }));

  // Αρχικοποίηση του filteredData με όλα τα δεδομένα
  filteredData.value = timeSeriesData.value;
});

// Συνάρτηση για την εφαρμογή των φίλτρων
const applyFilters = () => {
  filteredData.value = timeSeriesData.value.filter((row) => {
    const rowDate = new Date(row.DateTime); // Μετατροπή του row.DateTime σε Date

    const isAfterStart = startDate.value ? rowDate >= new Date(startDate.value) : true;
    const isBeforeEnd = endDate.value ? rowDate <= new Date(endDate.value) : true;

    return isAfterStart && isBeforeEnd;
  });
};

// Συνάρτηση για να επιστρέψει τον χρήστη στην κορυφή
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

