
<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";
import type { TimeSeriesData } from "./types/types.ts";


const timeSeriesData = ref<TimeSeriesData[]>([]);

onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  timeSeriesData.value = await response.json();
});
</script>

<template>
  <div class="container">
    <h1>Time Series Dashboard</h1>
    <DataTable :data="timeSeriesData" />
    <LineChart :data="timeSeriesData" />
  </div>
</template>
