<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <p class="progress-text">{{ Math.round(progress) }}%</p>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  margin-bottom: 24px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF6B9D 0%, #C77DFF 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
}

.progress-text {
  text-align: right;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
}
</style>