<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  icon: {
    type: String,
    default: '📌'
  }
})
</script>

<template>
  <div class="result-section">
    <h3 class="section-title">
      <span class="section-icon">{{ icon }}</span>
      {{ title }}
    </h3>
    <div class="section-content">
      <p v-for="(item, index) in items" :key="index" class="section-item">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.result-section {
  background: white;
  border-radius: 20px;
  padding: 28px 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 20px;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-item {
  font-size: 15px;
  line-height: 1.7;
  color: #555;
  padding-left: 20px;
  position: relative;
  word-break: keep-all;
}

.section-item::before {
  content: '•';
  position: absolute;
  left: 6px;
  color: #FF6B9D;
  font-weight: 700;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .result-section {
    padding: 24px 20px;
  }

  .section-title {
    font-size: 17px;
  }

  .section-item {
    font-size: 14px;
  }
}
</style>