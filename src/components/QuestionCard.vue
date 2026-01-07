<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  },
  selectedChoiceId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['select'])

const handleSelect = (choiceId) => {
  emit('select', choiceId)
}
</script>

<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.text }}</h2>
    
    <div class="choices-container">
      <ChoiceButton
        v-for="(choice, index) in question.choices"
        :key="choice.id"
        :choice="choice"
        :displayNumber="index + 1"
        :isSelected="selectedChoiceId === choice.id"
        @select="handleSelect(choice.id)"
      />
    </div>
  </div>
</template>

<script>
import ChoiceButton from './ChoiceButton.vue'

export default {
  components: {
    ChoiceButton
  }
}
</script>

<style scoped>
.question-card {
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 32px 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.question-text {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  color: #2d2d2d;
  margin-bottom: 28px;
  word-break: keep-all;
}

.choices-container {
  display: flex;
  flex-direction: column;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .question-card {
    padding: 28px 24px;
  }

  .question-text {
    font-size: 18px;
    margin-bottom: 24px;
  }
}
</style>