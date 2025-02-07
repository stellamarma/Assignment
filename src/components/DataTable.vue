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
        <th>Price-De</th>
        <th>Price-Gr</th>
        <th>Price-Fr</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.DateTime">
        <td>{{ row.DateTime }}</td>
        <td>{{ row.ENTSOE_DE_DAM_Price}}</td>
        <td>{{ row.ENTSOE_GR_DAM_Price }}</td>
        <td>{{ row.ENTSOE_FR_DAM_Price}}</td>
      </tr>
    </tbody>
  </table>
</template>
