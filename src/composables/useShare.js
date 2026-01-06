import { ref } from 'vue'

export function useShare() {
  const isCopied = ref(false)

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInAppBrowser = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes('kakaotalk')
  }

  // 링크 복사
  const copyLink = async (resultTitle = '') => {
    const homeUrl = window.location.origin + '/'
    
    // 카톡이면 텍스트 추가
    let textToCopy = homeUrl
    if (isKakaoInAppBrowser()) {
      const message = resultTitle 
        ? `나는 '${resultTitle}'이었어! 너도 해봐!`
        : '나도 애착유형 테스트 해봤는데 신기하더라!'
      textToCopy = `${message}\n\n${homeUrl}`
    }
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      isCopied.value = true
      
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
      
      return true
    } catch (error) {
      console.error('링크 복사 실패:', error)
      
      // 폴백: 구형 브라우저 대응
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      
      try {
        document.execCommand('copy')
        document.body.removeChild(textArea)
        isCopied.value = true
        setTimeout(() => {
          isCopied.value = false
        }, 2000)
        return true
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    }
  }

  return {
    isCopied,
    copyLink
  }
}