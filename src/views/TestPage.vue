<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTest } from '../composables/useTest'
import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'

const router = useRouter()

const {
  currentQuestion,
  currentQuestionIndex,
  progress,
  isLastQuestion,
  initTest,
  saveAnswer,
  nextQuestion,
  prevQuestion,
  getSelectedChoice,
  calculateResult
} = useTest()

// 섞인 선택지 저장
const shuffledQuestion = ref(null)

// 선택지 섞기 함수
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 질문이 바뀔 때마다 선택지 섞기
const updateShuffledQuestion = () => {
  if (currentQuestion.value) {
    shuffledQuestion.value = {
      ...currentQuestion.value,
      choices: shuffleArray(currentQuestion.value.choices)
    }
  }
}

// 초기화
onMounted(() => {
  initTest()
  updateShuffledQuestion()
})

// 질문 인덱스 변경 감지
watch(currentQuestionIndex, () => {
  updateShuffledQuestion()
})

// 선택 처리
const handleSelect = (choiceId) => {
  saveAnswer(choiceId)
  
  setTimeout(() => {
    if (isLastQuestion.value) {
      goToResult()
    } else {
      nextQuestion()
    }
  }, 150)
}

// 이전 버튼
const handleBack = () => {
  if (currentQuestionIndex.value === 0) {
    router.push('/')
  } else {
    prevQuestion()
  }
}

// 결과 페이지로 이동
const goToResult = () => {
  const result = calculateResult()
  
  if (!result) {
    alert('결과 계산에 실패했습니다. 다시 시도해주세요.')
    return
  }
  
  router.push(`/result?type=${result.type}`)
}

// 현재 문항의 선택된 답변
const selectedChoiceId = () => {
  return getSelectedChoice(currentQuestion.value?.id)
}
</script>

<template>
  <div class="test-container">
    <!-- 상단 헤더 -->
    <header class="test-header">
      <button class="back-button" @click="handleBack">
        ← {{ currentQuestionIndex === 0 ? '처음으로' : '이전' }}
      </button>
    </header>

    <!-- 진행률 -->
    <div class="progress-wrapper">
      <ProgressBar :progress="progress" />
    </div>

    <!-- 문항 카드 -->
    <div class="question-wrapper fade-in" :key="currentQuestionIndex">
      <QuestionCard
        v-if="shuffledQuestion"
        :question="shuffledQuestion"
        :selectedChoiceId="selectedChoiceId()"
        @select="handleSelect"
      />
    </div>

    <!-- 문항 번호 표시 -->
    <div class="question-counter">
      {{ currentQuestionIndex + 1 }} / {{ 16 }}
    </div>
  </div>
</template>

<style scoped>
.test-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.test-header {
  margin-bottom: 20px;
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

.progress-wrapper {
  margin-bottom: 24px;
}

.question-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

.question-counter {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.4);
}

/* 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .test-container {
    padding: 16px;
  }

  .test-header {
    margin-bottom: 16px;
  }

  .back-button {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>