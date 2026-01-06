<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const adContainer = ref(null)
const isAdLoaded = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAdLoaded.value) {
          loadAd()
        }
      })
    },
    {
      rootMargin: '200px'
    }
  )

  if (adContainer.value) {
    observer.observe(adContainer.value)
  }
})

onBeforeUnmount(() => {
  if (observer && adContainer.value) {
    observer.unobserve(adContainer.value)
  }
})

const loadAd = () => {
  try {
    if (window.adsbygoogle && !isAdLoaded.value) {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      isAdLoaded.value = true
    }
  } catch (error) {
    console.error('AdSense 로드 실패:', error)
  }
}
</script>

<template>
  <div ref="adContainer" class="adsense-wrapper">
    <div class="adsense-container">
      <ins 
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7892198097991803"
        data-ad-slot="5591683469"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    <!-- "광고" 레이블을 아래로 이동 (더 은은함) -->
    <div class="adsense-label">AD</div>
  </div>
</template>

<style scoped>
.adsense-wrapper {
  margin: 32px 0;
  width: 100%;
  max-width: 100%; /* 추가: 최대 너비 제한 */
}

.adsense-container {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 16px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* 추가: 넘치는 광고 잘라냄 */
  width: 100%;
  max-width: 100%; /* 추가 */
}

.adsbygoogle {
  width: 100%;
  max-width: 100%; /* 추가 */
  display: block; /* 추가 */
}

/* "광고" 레이블 - 아래, 더 작게 */
.adsense-label {
  text-align: center;
  font-size: 10px;
  color: #ccc;
  margin-top: 8px;
  font-weight: 400;
  letter-spacing: 1px;
  opacity: 0.6;
}

/* 모바일 */
@media (max-width: 480px) {
  .adsense-wrapper {
    margin: 24px 0;
  }

  .adsense-container {
    padding: 12px;
    border-radius: 12px;
  }

  .adsense-label {
    font-size: 9px;
    margin-top: 6px;
  }
}
</style>