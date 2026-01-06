<script setup>
import { computed } from 'vue'

defineProps({
  resultData: {
    type: Object,
    required: true
  }
})

// 동적 도메인
const domain = computed(() => {
  return window.location.hostname
})
</script>

<template>
  <div class="result-card">
    <div class="result-badge">
      <div class="badge-icon">💖</div>
    </div>

    <h1 class="result-title">{{ resultData.title }}</h1>
    <p class="result-subtitle">{{ resultData.subtitle }}</p>
    <p class="result-oneliner">{{ resultData.oneLiner }}</p>

    <div class="card-lines">
      <p v-for="(line, index) in resultData.cardLines" :key="index" class="card-line">
        {{ line }}
      </p>
    </div>

    <!-- 동적 워터마크 -->
    <p class="watermark">{{ domain }}</p>
  </div>
</template>

<style scoped>
.result-card {
  background: white;
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  position: relative;
}

.result-badge {
  margin: 0 auto 20px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFE5EC 0%, #E5D4F7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon {
  font-size: 40px;
}

.result-title {
  font-size: 28px;
  font-weight: 800;
  color: #2d2d2d;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.result-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
  font-weight: 500;
}

.result-oneliner {
  font-size: 18px;
  font-weight: 600;
  color: #444;
  line-height: 1.6;
  margin-bottom: 28px;
  word-break: keep-all;
}

.card-lines {
  padding: 24px 0;
  border-top: 1px solid #f0f0f0;
}

.card-line {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 8px;
  word-break: keep-all;
}

.card-line:last-child {
  margin-bottom: 0;
}

.watermark {
  margin-top: 24px;
  font-size: 12px;
  color: #ccc;
  font-weight: 500;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .result-card {
    padding: 36px 28px;
  }

  .result-title {
    font-size: 24px;
  }

  .result-oneliner {
    font-size: 16px;
  }
}
</style>