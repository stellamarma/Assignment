<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from "vue";
  import { Line } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, TimeScale } from "chart.js";
  import type { TimeSeriesData } from "../types";
  
  // Εγγραφή των απαραίτητων modules
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, TimeScale);
  
  // Δεδομένα από το App.vue
  const props = defineProps<{ data: TimeSeriesData[] }>();
  
  // Συνάρτηση για μορφοποίηση της ημερομηνίας
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Μετατροπή δεδομένων για το διάγραμμα
  const chartData = computed(() => {
    return {
      labels: props.data.map((d) => formatDate(d.DateTime)), // Μορφοποιημένες ημερομηνίες
      datasets: [
        { label: "Price-De", data: props.data.map((d) => d.ENTSOE_DE_DAM_Price), borderColor: "red" },
        { label: "Price-Gr", data: props.data.map((d) => d.ENTSOE_GR_DAM_Price), borderColor: "blue" },
        { label: "Price-Fr", data: props.data.map((d) => d.ENTSOE_FR_DAM_Price), borderColor: "green" }
      ]
    };
  });
  
  // Επιλογές διαγράμματος με προσαρμοσμένο format στον άξονα Χ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (value: any, index: number) {  // Ο τύπος του `index` είναι τώρα `number`
            return formatDate(props.data[index]?.DateTime || "");
          }
        }
      }
    }
  };
  </script>
  