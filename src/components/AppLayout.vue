<script setup>
defineProps({
  showBack: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['back'])
</script>

<template>
  <div class="app-layout">
    <!-- 상단 헤더 (뒤로가기 버튼) -->
    <header v-if="showBack" class="header">
      <button class="back-button" @click="emit('back')">
        ← 이전
      </button>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 20px;
}

.back-button {
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.back-button:hover {
  background: white;
  transform: translateX(-4px);
}

.main-content {
  flex: 1;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .header {
    padding: 16px;
  }

  .main-content {
    padding: 0 16px 32px;
  }
}
</style>