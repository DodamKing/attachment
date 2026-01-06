<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startTest = () => {
  // localStorage 초기화 (새로 시작)
  localStorage.removeItem('attachment-test-answers')
  localStorage.removeItem('attachment-test-current')
  router.push('/test')
}
</script>

<template>
  <div class="landing-container">
    <div class="landing-card fade-in">
      <!-- 타이틀 -->
      <h1 class="title">
        내 연애는<br />왜 항상 힘들까?
      </h1>

      <!-- 서브타이틀 -->
      <p class="subtitle">
        16문항 · 2~3분 · 생각보다 정확함
      </p>

      <!-- 시작 버튼 -->
      <button class="start-button slide-up" @click="startTest">
        테스트 시작하기
      </button>

      <!-- 하단 안내 -->
      <p class="disclaimer">
        의학적 진단이 아닌 자기이해용 콘텐츠입니다
      </p>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.landing-card {
  background: white;
  border-radius: 24px;
  padding: 60px 32px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  color: #2d2d2d;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 16px;
  color: #888;
  margin-bottom: 40px;
  font-weight: 500;
}

.start-button {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  color: white;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.3);
  transition: all 0.3s ease;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(255, 107, 157, 0.4);
}

.start-button:active {
  transform: translateY(0);
}

.disclaimer {
  margin-top: 24px;
  font-size: 13px;
  color: #aaa;
  line-height: 1.5;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .landing-card {
    padding: 48px 24px;
  }

  .title {
    font-size: 28px;
  }

  .start-button {
    font-size: 16px;
    padding: 16px;
  }
}
</style>