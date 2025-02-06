<script setup lang="ts">
import { defineProps } from "vue";
import type { TimeSeriesData } from "../types/types";



const props = defineProps<{ data: TimeSeriesData[] }>();
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Series 1</th>
        <th>Series 2</th>
        <th>Series 3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.timestamp">
        <td>{{ row.timestamp }}</td>
        <td>{{ row.series1 }}</td>
        <td>{{ row.series2 }}</td>
        <td>{{ row.series3 }}</td>
      </tr>
    </tbody>
  </table>
</template>
