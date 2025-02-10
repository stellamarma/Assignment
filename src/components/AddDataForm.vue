<template>
    <div class="add-form">
      <h3>Add New Data</h3>
      <div class="form-group">
        <label>📅 DateTime:</label>
        <input type="datetime-local" v-model="newRow.DateTime" class="input-field"/>
      </div>
    
      <div class="form-group">
        <label>DE Price:</label>
        <input type="number" v-model="newRow.ENTSOE_DE_DAM_Price" :min="-2000" :max="2000" class="input-field"/>
      </div>
    
      <div class="form-group">
        <label>GR Price:</label>
        <input type="number" v-model="newRow.ENTSOE_GR_DAM_Price" :min="-2000" :max="2000" class="input-field"/>
      </div>
    
      <div class="form-group">
        <label>FR Price:</label>
        <input type="number" v-model="newRow.ENTSOE_FR_DAM_Price" :min="-2000" :max="2000" class="input-field"/>
      </div>
    
      <div class="form-actions">
        <button class="btn btn-primary" @click="addNewData">Add Data</button>
        <button class="btn btn-secondary" @click="cancelAdd">Cancel</button>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, defineEmits } from "vue";
  import type { TimeSeriesData } from "../types/types.ts";
  
  const emit = defineEmits();
  
  const newRow = ref<TimeSeriesData>({
    DateTime: '',
    ENTSOE_DE_DAM_Price: 0,
    ENTSOE_GR_DAM_Price: 0,
    ENTSOE_FR_DAM_Price: 0
  });
  
  const addNewData = () => {
    if (validateInput(newRow.value)) {
      emit("addData", { ...newRow.value });
      newRow.value = { DateTime: '', ENTSOE_DE_DAM_Price: 0, ENTSOE_GR_DAM_Price: 0, ENTSOE_FR_DAM_Price: 0 }; // Reset the form
    } else {
      alert("Invalid input values. Please check and try again.");
    }
  };
  
  const validateInput = (row: TimeSeriesData): boolean => {
    const fields = ["ENTSOE_DE_DAM_Price", "ENTSOE_GR_DAM_Price", "ENTSOE_FR_DAM_Price"];
    for (const field of fields) {
      const value = row[field];
      if (isNaN(value) || value < -2000 || value > 2000) {
        return false;
      }
    }
    return true;
  };
  
  const cancelAdd = () => {
    emit("cancelAdd");
  };
  </script>
  <style>
  .add-form {
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .input-field {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .input-field:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #f8f9fa;
    color: #495057;
    border: 1px solid #ccc;
  }
  
  .btn-secondary:hover {
    background-color: #e2e6ea;
  }
</style>