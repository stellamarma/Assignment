<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapsed"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- Show Table -->
        <el-menu-item index="1" @click="toggleShowTable">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ showTable ? "Hide Table" : "Show Table" }}</template>
        </el-menu-item>
  
        <!-- Add New Data -->
        <el-menu-item index="2" @click="toggleShowAddForm">
          <el-icon><Plus /></el-icon>
          <template #title>{{ showAddForm ? "Cancel" : "Add New Data" }}</template>
        </el-menu-item>
  
</el-menu></div>
  </template>
  
  <script lang="ts" setup>
  // Εισαγωγές
  import { ref, onMounted, onUnmounted } from 'vue';
  import { DeleteFilled, Edit, Plus, Menu as IconMenu } from '@element-plus/icons-vue';  // Εισάγουμε τα icons
  
  const props = defineProps({
    showTable: {
      type: Boolean,
      required: true
    },
    showAddForm: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['updateShowTable', 'updateShowAddForm']);
  
  const isCollapsed = ref(window.innerWidth < 768);
  
  const handleResize = () => {
    isCollapsed.value = window.innerWidth < 768;
  };
  
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  
  const toggleShowTable = () => {
    emit('updateShowTable', !props.showTable);
  };
  
  const toggleShowAddForm = () => {
    emit('updateShowAddForm', !props.showAddForm);
  };
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 200px;
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding-top: 20px;
    transition: width 0.3s ease-in-out;
  }
  
  .sidebar.collapsed {
    width: 64px; /* Στενό sidebar για κινητά */
  }
  
  .el-menu-vertical-demo {
    width: 100%;
    min-height: 100vh;
  }
  
  .el-menu-item {
    font-size: 16px;
    font-weight: bold;
  }
  
  .el-menu-vertical-demo .el-menu-item {
    padding: 15px 20px;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 64px; /* Όταν η οθόνη είναι μικρή */
    }
  }
  </style>
  