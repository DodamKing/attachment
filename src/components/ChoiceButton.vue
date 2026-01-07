<script setup>
defineProps({
  choice: {
    type: Object,
    required: true
  },
  displayNumber: {
    type: Number,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select')
}
</script>

<template>
  <button 
    class="choice-button"
    :class="{ selected: isSelected }"
    @click="handleClick"
  >
    <span class="choice-number">{{ displayNumber }}</span>
    <span class="choice-text">{{ choice.text }}</span>
  </button>
</template>

<style scoped>
.choice-button {
  width: 100%;
  padding: 18px 20px;
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.choice-button:hover {
  border-color: #FF6B9D;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.15);
}

.choice-button:active {
  transform: translateX(2px);
}

.choice-button.selected {
  border-color: #FF6B9D;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(199, 125, 255, 0.1) 100%);
}

.choice-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.choice-button.selected .choice-number {
  background: linear-gradient(135deg, #C77DFF 0%, #FF6B9D 100%);
}

.choice-text {
  flex: 1;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
  font-weight: 500;
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .choice-button {
    padding: 16px 18px;
  }

  .choice-text {
    font-size: 14px;
  }
}
</style>