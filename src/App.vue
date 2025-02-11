<template>
  <div class="dashboard">
    <h1>📊 Time Series Dashboard</h1>

    <div class="content">
      <div class="chart-container">
        <LineChart :data="filteredData" class="chart" />
      </div>
    </div>

    <!-- Φίλτρα -->
    <div class="filters">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="DD-MM-YYYY"
        @change="applyFilters"
      />
    </div>

    <p v-if="dateError" class="error-message">{{ dateError }}</p>
    <p v-if="filteredData.length === 0 && !dateError" class="error-message">
      No data available for the selected date range. If you want to add data, please click "Add New Data".
    </p>

    <div class="buttons">
      <button class="btn btn-primary" @click="showTable = !showTable">
        {{ showTable ? "Hide Table" : "Show Table" }}
      </button>
      <button class="btn btn-success" @click="showAddForm = !showAddForm">
        {{ showAddForm ? "Cancel" : "Add New Data" }}
      </button>
    </div>

    <TableData v-if="showTable" :data="filteredData" @updateData="updateData" />
    <AddDataForm v-if="showAddForm" @addData="addNewData" @cancelAdd="showAddForm = false" />

    <!-- Go to Top Button -->
    <button v-if="showGoTop" class="btn btn-secondary go-top" @click="scrollToTop">
      ⬆️ Go to Top
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import dayjs from "dayjs";
import LineChart from "./components/LineChart.vue";
import TableData from "./components/DataTable.vue";
import AddDataForm from "./components/AddDataForm.vue";

const timeSeriesData = ref([]);
const filteredData = ref([]);
const dateRange = ref([null, null]);
const dateError = ref(null);
const showTable = ref(false);
const showAddForm = ref(false);
const showGoTop = ref(false);

const applyFilters = () => {
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    dateError.value = "Please select dates!";
    filteredData.value = [];
    return;
  }

  const [start, end] = dateRange.value.map(date => dayjs(date instanceof Date ? date : dayjs(date, "YYYY-MM-DD")));

  if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
    dateError.value = "Invalid date range!";
    filteredData.value = [];
    return;
  }

  dateError.value = null;
  fetch('/data/timeseries.json')
    .then(response => response.json())
    .then(jsonData => {
      filteredData.value = jsonData.filter(row => {
        const rowDate = dayjs(row.DateTime.split("T")[0], "YYYY-MM-DD");
        return rowDate.isSameOrAfter(start) && rowDate.isSameOrBefore(end);
      });
      if (filteredData.value.length === 0) {
        dateError.value = "No data available for the selected date range.";
      }
    })
    .catch(error => {
      console.error("Error loading the data:", error);
      dateError.value = "There was an error loading the data.";
    });
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  const response = await fetch("/data/timeseries.json");
  const data = await response.json();

  if (data.length === 0) return;

  timeSeriesData.value = data;
  filteredData.value = [...data];
  dateRange.value = [dayjs(data[0].DateTime.split("T")[0]), dayjs(data[data.length - 1].DateTime.split("T")[0])];
  applyFilters();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  showGoTop.value = window.scrollY > 200;
};

watch(dateRange, applyFilters);
</script>

<style>
.go-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
@media (min-width: 1024px) { 
    #app {
        display: block !important;  /* Αυτό θα ακυρώσει οποιονδήποτε κανόνα display: grid */
        padding: 0 2rem !important; /* Επίσης θα έχει προτεραιότητα */
    }
}
/* Στρογγυλά κουμπιά */

.dashboard {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chart {
  width: 800px;
  height: 400px;
}

.filters {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
/* Στυλ για τα κουμπιά */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px; /* Αυξάνουμε το κενό μεταξύ των κουμπιών */
  margin-top: 10px;
}

/* Στυλ για να κεντράρεις τα κουμπιά αν χρειαστεί */
.btn {
  padding: 40px 15px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

</style>