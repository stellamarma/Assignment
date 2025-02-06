<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import type { TimeSeriesData } from "../types/types";


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{ data: TimeSeriesData[] }>();

const chartData = computed(() => {
  return {
    labels: props.data.map((d) => d.DateTime),
    datasets: [
      { label: "Series 1", data: props.data.map((d) => d.ENTSOE_DE_DAM_Price), borderColor: "red" },
      { label: "Series 2", data: props.data.map((d) => d.ENTSOE_GR_DAM_Price), borderColor: "blue" },
      { label: "Series 3", data: props.data.map((d) => d.ENTSOE_FR_DAM_Price), borderColor: "green" }
    ]
  };
});
</script>

<template>
  <Line :data="chartData" />
</template>
