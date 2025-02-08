<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from "vue";
  import { Line } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
  import type { TimeSeriesData } from "../types/types";
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  // Δεδομένα από το App.vue
  const props = defineProps<{ data: TimeSeriesData[] }>();
  
  // Μετατροπή δεδομένων για το διάγραμμα
  const chartData = computed(() => {
    return {
      labels: props.data.map((d) => d.DateTime.split("T")[0]), // Μόνο ημερομηνία
      datasets: [
        { label: "Price-De", data: props.data.map((d) => d.ENTSOE_DE_DAM_Price), borderColor: "red" },
        { label: "Price-Gr", data: props.data.map((d) => d.ENTSOE_GR_DAM_Price), borderColor: "blue" },
        { label: "Price-Fr", data: props.data.map((d) => d.ENTSOE_FR_DAM_Price), borderColor: "green" }
      ]
    };
  });
  
  // Επιλογές διαγράμματος
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  </script>
  
