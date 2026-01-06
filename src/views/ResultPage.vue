<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTest } from '../composables/useTest'
import ResultCard from '../components/ResultCard.vue'
import ResultSection from '../components/ResultSection.vue'
import ShareButton from '../components/ShareButton.vue'
import CaptureGuide from '../components/CaptureGuide.vue'

const route = useRoute()
const router = useRouter()
const { getResultData, resetTest } = useTest()

const resultType = ref(null)
const resultData = ref(null)

onMounted(() => {
  const typeFromQuery = route.query.type
  
  if (!typeFromQuery) {
    router.push('/')
    return
  }

  const validTypes = ['STABLE', 'ANXIOUS', 'AVOIDANT', 'DISORG']
  if (!validTypes.includes(typeFromQuery)) {
    router.push('/')
    return
  }

  resultType.value = typeFromQuery
  resultData.value = getResultData(typeFromQuery)

  if (!resultData.value) {
    router.push('/')
    return
  }
})

const handleRetry = () => {
  resetTest()
  router.push('/')
}

const sectionIcons = {
  pattern: '🔍',
  why: '💭',
  tips: '💡'
}
</script>

<template>
  <div class="result-container" v-if="resultData">
    <!-- 결과 카드 (캡처용) -->
    <div class="result-card-wrapper slide-up">
      <ResultCard :resultData="resultData" />
    </div>

    <!-- 캡처 안내 -->
    <CaptureGuide />

    <!-- 공유 버튼 -->
    <div class="share-wrapper fade-in">
      <ShareButton :resultData="resultData" />
    </div>

    <!-- 구분선 -->
    <div class="divider"></div>

    <!-- 패턴 요약 섹션 -->
    <div class="section-wrapper fade-in">
      <ResultSection
        title="이런 패턴이 있어요"
        :items="resultData.pattern"
        :icon="sectionIcons.pattern"
      />
    </div>

    <!-- 왜 힘든지 섹션 -->
    <div class="section-wrapper fade-in">
      <ResultSection
        title="왜 힘들까요?"
        :items="resultData.why"
        :icon="sectionIcons.why"
      />
    </div>

    <!-- 실천 팁 섹션 -->
    <div class="section-wrapper fade-in">
      <ResultSection
        title="도움이 되는 연애 연습"
        :items="resultData.tips"
        :icon="sectionIcons.tips"
      />
    </div>

    <!-- 하단 안내 -->
    <div class="footer-note">
      <p>이 테스트는 성인 애착 이론을 기반으로, 일상적인 연애 상황에 맞게 재구성한 자기이해용 콘텐츠입니다.</p>
    </div>

    <!-- 다시하기 버튼 -->
    <div class="retry-wrapper">
      <button class="retry-button" @click="handleRetry">
        🔄 다시 테스트하기
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.result-card-wrapper {
  margin-bottom: 20px;
}

.share-wrapper {
  margin-bottom: 32px;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 32px 0;
}

.section-wrapper {
  margin-bottom: 16px;
}

.footer-note {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 20px;
  margin: 32px 0;
  text-align: center;
  backdrop-filter: blur(10px);
}

.footer-note p {
  font-size: 13px;
  line-height: 1.7;
  color: #666;
  word-break: keep-all;
}

.retry-wrapper {
  margin-top: 24px;
  margin-bottom: 40px;
}

.retry-button {
  width: 100%;
  padding: 16px;
  background: white;
  color: #666;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.section-wrapper:nth-child(5) {
  animation-delay: 0.1s;
}

.section-wrapper:nth-child(6) {
  animation-delay: 0.2s;
}

.section-wrapper:nth-child(7) {
  animation-delay: 0.3s;
}

@media (max-width: 480px) {
  .result-container {
    padding: 32px 16px;
  }

  .divider {
    margin: 24px 0;
  }

  .footer-note {
    padding: 16px;
    margin: 24px 0;
  }
}
</style>