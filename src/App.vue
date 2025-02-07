<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";
import type { TimeSeriesData } from "./types/types.ts";

const timeSeriesData = ref<TimeSeriesData[]>([]);
const showTable = ref(false); // Έλεγχος εμφάνισης πίνακα

// Φόρτωση δεδομένων
onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  timeSeriesData.value = await response.json();
});

// Scroll προς την κορυφή
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="dashboard">
    <h1>📊 Time Series Dashboard</h1>

    <LineChart :data="timeSeriesData" />

    <div class="button-container">
      <button @click="showTable = !showTable">
        {{ showTable ? "📉 Hide Data Table" : "📈 Show Data Table" }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="showTable" class="table-container">
        <DataTable :data="timeSeriesData" />

        <!-- Κουμπί για scroll στην κορυφή -->
        <button class="scroll-top" @click="scrollToTop">🔝 Back to Top</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Βασικό Styling */
.dashboard {
  max-width: 900px;
  margin: auto;
  text-align: center;
  font-family: "Arial", sans-serif;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

/* Κουμπί εμφάνισης πίνακα */
.button-container {
  margin: 20px 0;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #003d82);
  transform: scale(1.05);
}

/* Στυλ του πίνακα */
.table-container {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Κουμπί "Back to Top" */
.scroll-top {
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 14px;
  background: #00ade6;
  border-radius: 20px;
}

.scroll-top:hover {
  background: #00ade6;
}

/* Εφέ εμφάνισης (fade-in) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
