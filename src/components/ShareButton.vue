<script setup>
import { useShare } from '../composables/useShare'

const props = defineProps({
  resultData: {
    type: Object,
    required: true
  }
})

const { isCopied, copyLink } = useShare()

const handleShare = async () => {
  // 유형명 전달
  await copyLink(props.resultData.title)
}
</script>

<template>
  <button class="share-button" @click="handleShare">
    <span class="button-icon">{{ isCopied ? '✓' : '🔗' }}</span>
    <span class="button-text">
      {{ isCopied ? '복사 완료!' : '링크 복사' }}
    </span>
  </button>
</template>

<style scoped>
.share-button {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  color: white;
  border-radius: 50px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.3);
  transition: all 0.3s ease;
}

.share-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(255, 107, 157, 0.4);
}

.share-button:active {
  transform: translateY(0);
}

.button-icon {
  font-size: 20px;
}

.button-text {
  font-size: 16px;
}

@media (max-width: 480px) {
  .share-button {
    padding: 16px;
  }

  .button-text {
    font-size: 15px;
  }
}
</style>