<template>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Price-De</th>
          <th>Price-Gr</th>
          <th>Price-Fr</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in props.data" :key="row.DateTime">
          <td>{{ row.DateTime }}</td>
          <td>{{ row.ENTSOE_DE_DAM_Price }}</td>
          <td>{{ row.ENTSOE_GR_DAM_Price }}</td>
          <td>{{ row.ENTSOE_FR_DAM_Price }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from "vue";
  import type { TimeSeriesData } from "../types/types";
  
  // Ορισμός του prop που παίρνει τα δεδομένα από το parent component
  const props = defineProps<{ data: TimeSeriesData[] }>();
  </script>
  
  <style scoped>
  /* Στυλ για τον πίνακα */
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  </style>
  