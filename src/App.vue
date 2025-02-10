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
    <button v-if="showTable" class="btn btn-secondary" @click="scrollToTop" style="position: fixed; bottom: 20px; right: 20px;">
      ⬆️ Go to Top
    </button>

    <AddDataForm v-if="showAddForm" @addData="addNewData" @cancelAdd="showAddForm = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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

// 🔹 Η applyFilters πρέπει να δηλωθεί πριν από το onMounted!
const applyFilters = () => {
  // Έλεγχος αν οι ημερομηνίες είναι σωστά επιλεγμένες
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    dateError.value = "Please select dates!";
    filteredData.value = [];
    return;
  }

  const [start, end] = dateRange.value.map(date => {
    let formattedDate;
    
    // Έλεγχος αν η ημερομηνία είναι ήδη αντικείμενο Date
    if (date instanceof Date) {
      formattedDate = dayjs(date); // Αν είναι Date, απλά το μετατρέπουμε
    } else {
      formattedDate = dayjs(date, "YYYY-MM-DD"); // Αν είναι string, το μετατρέπουμε στη σωστή μορφή
    }

    console.log("Formatted Date:", formattedDate.format("YYYY-MM-DD"));  // Εκτύπωση για επιβεβαίωση της μορφής
    return formattedDate;
  });

  console.log("Filtering from", start.format("YYYY-MM-DD"), "to", end.format("YYYY-MM-DD"));

  // Έλεγχος αν οι ημερομηνίες είναι έγκυρες
  if (!start.isValid() || !end.isValid()) {
    dateError.value = "Invalid date format!";
    filteredData.value = [];
    return;
  }

  if (start.isAfter(end)) {
    dateError.value = "The start date cannot be greater than the end date!";
    filteredData.value = [];
    return;
  }

  dateError.value = null;

  // Ανάγνωση δεδομένων από το JSON αρχείο
  fetch('/data/timeseries.json')  // Σωστή διαδρομή για το αρχείο
    .then(response => response.json())
    .then(jsonData => {
      // Φιλτράρισμα των δεδομένων
      filteredData.value = jsonData.filter(row => {
        const rowDate = dayjs(row.DateTime.split("T")[0], "YYYY-MM-DD");

        console.log("Row Date:", rowDate.format("YYYY-MM-DD"));  // Εκτύπωση του rowDate

        // Έλεγχος αν η ημερομηνία της γραμμής είναι έγκυρη
        if (!rowDate.isValid()) {
          console.warn("Invalid row date:", row.DateTime);  // Ειδοποίηση για μη έγκυρη ημερομηνία
        }

        return rowDate.isSameOrAfter(start) && rowDate.isSameOrBefore(end);
      });

      console.log("Filtered Data:", filteredData.value);

      // Ενημέρωση αν δεν βρεθούν δεδομένα
      if (filteredData.value.length === 0) {
        dateError.value = "No data available for the selected date range. If you want to add data, please click 'Add New Data'.";
      }
    })
    .catch(error => {
      console.error("Error loading the data:", error);
      dateError.value = "There was an error loading the data.";
      filteredData.value = [];
    });
};


onMounted(async () => {
  const response = await fetch("/data/timeseries.json");
  const data = await response.json();

  console.log("Fetched data:", data);

  if (data.length === 0) {
    console.error("No data found in JSON!");
    return;
  }

  timeSeriesData.value = data;
  filteredData.value = [...timeSeriesData.value];

  // Ταξινόμηση δεδομένων
  const sortedData = [...data].sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));
  const firstDate = dayjs(sortedData[0].DateTime.split("T")[0]).format("YYYY-MM-DD");
  const lastDate = dayjs(sortedData[sortedData.length - 1].DateTime.split("T")[0]).format("YYYY-MM-DD");

  console.log("First Date:", firstDate, "Last Date:", lastDate);

  dateRange.value = [firstDate, lastDate];

  applyFilters(); // 🔹 Τώρα καλείται μετά την αρχικοποίηση της
});

// Παρακολούθηση αλλαγών στο dateRange
watch(dateRange, applyFilters);
</script>


<style>
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