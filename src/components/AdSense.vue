<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const adContainer = ref(null)
const isAdLoaded = ref(false)
let observer = null

onMounted(() => {
  // Intersection Observer로 Lazy Loading
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAdLoaded.value) {
          loadAd()
        }
      })
    },
    {
      rootMargin: '200px' // 화면에 200px 전에 미리 로드
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
    <div class="adsense-label">광고</div>
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
  </div>
</template>

<style scoped>
.adsense-wrapper {
  margin: 32px 0;
  width: 100%;
}

.adsense-label {
  text-align: center;
  font-size: 11px;
  color: #aaa;
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
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
}

.adsbygoogle {
  background: transparent;
  width: 100%;
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
}
</style>