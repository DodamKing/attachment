<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const participantCount = ref(0)

// 참여자 수 카운트 애니메이션
onMounted(() => {
  const target = 15234
  const duration = 2000
  const increment = target / (duration / 16)
  
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      participantCount.value = target
      clearInterval(timer)
    } else {
      participantCount.value = Math.floor(current)
    }
  }, 16)
})

const startTest = () => {
  localStorage.removeItem('attachment-test-answers')
  localStorage.removeItem('attachment-test-current')
  router.push('/test')
}
</script>

<template>
  <div class="landing-container">
    <!-- 떠다니는 하트들 (배경) -->
    <div class="floating-hearts">
      <svg class="heart heart-1" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      <svg class="heart heart-2" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      <svg class="heart heart-3" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      <svg class="heart heart-4" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      <svg class="heart heart-5" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
    </div>

    <!-- 메인 카드 -->
    <div class="landing-card">
      <!-- 깨진 하트 → 하트 변환 아이콘 -->
      <div class="icon-container">
        <svg class="broken-heart" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="url(#gradient1)"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#C77DFF;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
        <div class="crack"></div>
      </div>

      <!-- 타이틀 -->
      <h1 class="title title-animate">
        내 연애는<br />왜 항상 힘들까?
      </h1>

      <!-- 서브 캐치프레이즈 -->
      <p class="catchphrase catchphrase-animate">
        나만 힘든 줄 알았는데, 이유가 있었어요
      </p>

      <!-- 정보 -->
      <div class="info info-animate">
        <span class="info-badge">✨ 16문항</span>
        <span class="info-badge">⏱️ 2분</span>
        <span class="info-badge">💯 정확함</span>
      </div>

      <!-- 참여자 수 -->
      <!-- <p class="participants participants-animate">
        이미 <strong>{{ participantCount.toLocaleString() }}명</strong>이 테스트했어요
      </p> -->

      <!-- 시작 버튼 -->
      <button class="start-button button-animate" @click="startTest">
        <span class="button-text">테스트 시작하기</span>
        <svg class="button-heart" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="white"/>
        </svg>
      </button>

      <!-- 하단 안내 -->
      <p class="disclaimer disclaimer-animate">
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
  position: relative;
  overflow: hidden;
}

/* 떠다니는 하트 배경 */
.floating-hearts {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.heart {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.15;
  fill: url(#gradient1);
  animation: float 15s infinite ease-in-out;
}

.heart-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 12s;
}

.heart-2 {
  top: 60%;
  left: 80%;
  animation-delay: 2s;
  animation-duration: 15s;
}

.heart-3 {
  top: 30%;
  left: 70%;
  animation-delay: 4s;
  animation-duration: 13s;
}

.heart-4 {
  top: 80%;
  left: 20%;
  animation-delay: 1s;
  animation-duration: 14s;
}

.heart-5 {
  top: 50%;
  left: 50%;
  animation-delay: 3s;
  animation-duration: 16s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-20px) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg) scale(0.9);
  }
  75% {
    transform: translateY(-30px) rotate(3deg) scale(1.05);
  }
}

/* 메인 카드 */
.landing-card {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: 32px;
  padding: 60px 36px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

/* 깨진 하트 아이콘 */
.icon-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 32px;
}

.broken-heart {
  width: 100%;
  height: 100%;
  animation: heartbeat 2s infinite ease-in-out;
}

.crack {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 80%;
  background: white;
  transform: translate(-50%, -50%) rotate(-15deg);
  animation: crack-fade 3s infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20%, 40% {
    transform: scale(1);
  }
}

@keyframes crack-fade {
  0%, 50%, 100% {
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
}

/* 타이틀 */
.title {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.title-animate {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 캐치프레이즈 */
.catchphrase {
  font-size: 17px;
  color: #666;
  margin-bottom: 32px;
  font-weight: 500;
  line-height: 1.6;
}

.catchphrase-animate {
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

/* 정보 뱃지 */
.info {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.info-animate {
  animation: slideUp 0.8s ease-out 0.4s backwards;
}

.info-badge {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(199, 125, 255, 0.1) 100%);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #FF6B9D;
}

/* 참여자 수 */
.participants {
  font-size: 15px;
  color: #888;
  margin-bottom: 32px;
}

.participants strong {
  color: #FF6B9D;
  font-weight: 700;
}

.participants-animate {
  animation: slideUp 0.8s ease-out 0.6s backwards;
}

/* 시작 버튼 */
.start-button {
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C77DFF 100%);
  color: white;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  box-shadow: 0 8px 30px rgba(255, 107, 157, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.button-animate {
  animation: pulse 2s infinite, slideUp 0.8s ease-out 0.8s backwards;
}

.start-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.start-button:hover::before {
  width: 300px;
  height: 300px;
}

.start-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(255, 107, 157, 0.5);
}

.start-button:active {
  transform: translateY(-2px);
}

.button-text {
  position: relative;
  z-index: 1;
}

.button-heart {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
  animation: heartPop 1s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 8px 30px rgba(255, 107, 157, 0.4);
  }
  50% {
    box-shadow: 0 8px 40px rgba(255, 107, 157, 0.6);
  }
}

@keyframes heartPop {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* 하단 안내 */
.disclaimer {
  margin-top: 24px;
  font-size: 13px;
  color: #bbb;
  line-height: 1.5;
}

.disclaimer-animate {
  animation: fadeIn 1s ease-out 1s backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 모바일 반응형 */
@media (max-width: 480px) {
  .landing-card {
    padding: 48px 28px;
    border-radius: 24px;
  }

  .title {
    font-size: 30px;
  }

  .catchphrase {
    font-size: 15px;
  }

  .start-button {
    font-size: 17px;
    padding: 18px;
  }

  .icon-container {
    width: 80px;
    height: 80px;
  }
}
</style>