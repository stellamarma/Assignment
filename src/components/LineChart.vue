<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import type { TimeSeriesData } from "../types/types";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{ data: TimeSeriesData[] }>();

const chartData = computed(() => {
  return {
    labels: props.data.map((d) => {
      // Μετατρέπουμε το DateTime σε αντικείμενο Date και το εμφανίζουμε ως ημερομηνία
      const date = new Date(d.DateTime); 
      return date.toLocaleDateString(); // Επιστρέφουμε την ημερομηνία σε μορφή "MM/DD/YYYY"
    }),
    datasets: [
      { label: "Price-De", data: props.data.map((d) => d.ENTSOE_DE_DAM_Price), borderColor: "red" },
      { label: "Price-Gr", data: props.data.map((d) => d.ENTSOE_GR_DAM_Price), borderColor: "blue" },
      { label: "Price-Fr", data: props.data.map((d) => d.ENTSOE_FR_DAM_Price), borderColor: "green" }
    ]
  };
});
</script>

<template>
  <Line :data="chartData" />
</template>

