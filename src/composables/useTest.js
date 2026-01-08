import { ref, computed } from "vue";
import questionsData from "../data/questions.json";
import resultsData from "../data/results.json";

export function useTest() {
  // ===== 상태 =====
  const answers = ref([]); // 사용자 답변 저장 [{questionId, choiceId, scores}, ...]
  const currentQuestionIndex = ref(0);

  // ===== localStorage 키 =====
  const STORAGE_KEYS = {
    ANSWERS: "attachment-test-answers",
    CURRENT: "attachment-test-current",
  };

  // ===== Computed =====
  const totalQuestions = computed(() => questionsData.questions.length);
  const currentQuestion = computed(
    () => questionsData.questions[currentQuestionIndex.value]
  );
  // 진행률: 답변 개수 기준
  const progress = computed(
    () => (answers.value.length / totalQuestions.value) * 100
  );
  const isLastQuestion = computed(
    () => currentQuestionIndex.value === totalQuestions.value - 1
  );

  // ===== 초기화 (localStorage에서 복원) =====
  const initTest = () => {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    const savedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT);

    if (savedAnswers) {
      answers.value = JSON.parse(savedAnswers);
    }
    if (savedCurrent) {
      currentQuestionIndex.value = parseInt(savedCurrent);
    }
  };

  // ===== 답변 저장 =====
  const saveAnswer = (choiceId) => {
    const question = currentQuestion.value;
    const choice = question.choices.find((c) => c.id === choiceId);

    if (!choice) return;

    answers.value = answers.value.filter((a) => a.questionId !== question.id);

    answers.value.push({
      questionId: question.id,
      choiceId: choice.id,
      scores: choice.score,
    });

    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers.value));
  };

  // ===== 다음 문항으로 이동 =====
  const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      localStorage.setItem(STORAGE_KEYS.CURRENT, currentQuestionIndex.value);
    }
  };

  // ===== 이전 문항으로 이동 =====
  const prevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
      localStorage.setItem(STORAGE_KEYS.CURRENT, currentQuestionIndex.value);
    }
  };

  // ===== 선택된 답변 가져오기 =====
  const getSelectedChoice = (questionId) => {
    const answer = answers.value.find((a) => a.questionId === questionId);
    return answer ? answer.choiceId : null;
  };

  // ===== 점수 계산 =====
  const calculateResult = () => {
    if (answers.value.length === 0) {
      return null;
    }

    const typeScores = {
      STABLE: 0,
      ANXIOUS: 0,
      AVOIDANT: 0,
      DISORG: 0,
    };

    // 점수 계산
    answers.value.forEach((answer) => {
      const { scores } = answer;

      Object.keys(scores).forEach((type) => {
        typeScores[type] += scores[type];
      });
    });

    const totalScore = Object.values(typeScores).reduce(
      (sum, score) => sum + score,
      0
    );

    if (totalScore === 0) {
      return null;
    }

    // 유형 판정
    let resultType;
    const anxiousRatio = typeScores.ANXIOUS / totalScore;
    const avoidantRatio = typeScores.AVOIDANT / totalScore;
    const disorgRatio = typeScores.DISORG / totalScore;

    // DISORG: 불안+회피 둘 다 25% 이상 + DISORG 점수 15% 이상
    if (anxiousRatio >= 0.25 && avoidantRatio >= 0.25 && disorgRatio >= 0.15) {
      resultType = "DISORG";
    } else {
      // 4가지 중 최고점
      resultType = Object.keys(typeScores).reduce((a, b) =>
        typeScores[a] >= typeScores[b] ? a : b
      );
    }

    const percentage = Math.round((typeScores[resultType] / totalScore) * 100);

    return {
      type: resultType,
      percentage,
      scores: typeScores,
      totalScore,
    };
  };

  // ===== 결과 데이터 가져오기 =====
  const getResultData = (type) => {
    return resultsData.results[type] || null;
  };

  // ===== 테스트 초기화 (다시하기) =====
  const resetTest = () => {
    answers.value = [];
    currentQuestionIndex.value = 0;
    localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT);
  };

  // ===== 테스트 완료 여부 =====
  const isTestComplete = computed(
    () => answers.value.length === totalQuestions.value
  );

  return {
    // 상태
    answers,
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    isTestComplete,

    // 메서드
    initTest,
    saveAnswer,
    nextQuestion,
    prevQuestion,
    getSelectedChoice,
    calculateResult,
    getResultData,
    resetTest,
  };
}
