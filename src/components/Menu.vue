<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapsed"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <template #title>Show Table</template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Plus /></el-icon>
          <template #title>Add New Data</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Edit /></el-icon>
          <template #title>Edit Data</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><DeleteFilled /></el-icon>
          <template #title>Delete zeroes</template>
        </el-menu-item>
      </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { DeleteFilled, Edit, Plus, Menu as IconMenu } from '@element-plus/icons-vue';
  
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
  </script>
  
  <style>
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
  
  @media (max-width: 768px) {
    .sidebar {
      width: 64px; /* Όταν η οθόνη είναι μικρή */
    }
  }
  </style>
  