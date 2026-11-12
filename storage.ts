import { ExamMode, ExamResult, ShuffledQuestion, TopicId, UserStats } from './types';

const STATS_KEY = 'gran_examen_stats_v1';
const RESULTS_KEY = 'gran_examen_results_v1';
const SAVED_EXAM_KEY = 'gran_examen_saved_exam_v1';
const SETTINGS_KEY = 'gran_examen_settings_v1';

export interface SavedExamSession {
  mode: ExamMode;
  topicId?: TopicId;
  questions: ShuffledQuestion[];
  currentIndex: number;
  userAnswers: Record<string, string>; // questionId -> optionId
  confirmedQuestions: Record<string, boolean>; // questionId -> boolean
  startTime: number;
  elapsedSeconds: number;
}

export interface AppSettings {
  showTimer: boolean;
  autoOpenTranslations: boolean;
}

const defaultStats: UserStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  byTopic: {
    generos_literarios: { answered: 0, correct: 0 },
    lenguaje_literario: { answered: 0, correct: 0 },
    literatura_popular_culta: { answered: 0, correct: 0 },
    cuento_leyenda_mito: { answered: 0, correct: 0 },
    romance_metrica: { answered: 0, correct: 0 },
    teatro: { answered: 0, correct: 0 },
    figuras_literarias: { answered: 0, correct: 0 },
    analisis_textos: { answered: 0, correct: 0 },
  },
  mistakes: [],
  completedExamsCount: 0,
};

const defaultSettings: AppSettings = {
  showTimer: true,
  autoOpenTranslations: false,
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
      byTopic: {
        ...defaultStats.byTopic,
        ...(parsed.byTopic || {}),
      },
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
    };
  } catch (err) {
    console.error('Failed to load user stats from localStorage', err);
    return defaultStats;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save user stats', err);
  }
}

export function recordQuestionAnswer(
  questionId: string,
  topicId: TopicId,
  isCorrect: boolean
): UserStats {
  const current = loadUserStats();
  current.totalAnswered += 1;
  if (isCorrect) {
    current.totalCorrect += 1;
    // If it was in mistakes, remove it because now it's mastered
    current.mistakes = current.mistakes.filter((id) => id !== questionId);
  } else {
    current.totalIncorrect += 1;
    if (!current.mistakes.includes(questionId)) {
      current.mistakes.push(questionId);
    }
  }

  if (!current.byTopic[topicId]) {
    current.byTopic[topicId] = { answered: 0, correct: 0 };
  }
  current.byTopic[topicId].answered += 1;
  if (isCorrect) {
    current.byTopic[topicId].correct += 1;
  }

  saveUserStats(current);
  return current;
}

export function saveCompletedExamResult(result: ExamResult): void {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    const results: ExamResult[] = raw ? JSON.parse(raw) : [];
    results.unshift(result);
    // Keep last 30 exam results
    const trimmed = results.slice(0, 30);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));

    // Update completed count in stats
    const stats = loadUserStats();
    stats.completedExamsCount += 1;
    saveUserStats(stats);
  } catch (err) {
    console.error('Failed to save exam result', err);
  }
}

export function loadExamResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveActiveExam(session: SavedExamSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(SAVED_EXAM_KEY);
    } else {
      localStorage.setItem(SAVED_EXAM_KEY, JSON.stringify(session));
    }
  } catch (err) {
    console.error('Failed to save active exam', err);
  }
}

export function loadActiveExam(): SavedExamSession | null {
  try {
    const raw = localStorage.getItem(SAVED_EXAM_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

/**
 * Completely resets all progress: stats, mistakes, results and active sessions.
 */
export function resetAllProgress(): void {
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(RESULTS_KEY);
    localStorage.removeItem(SAVED_EXAM_KEY);
  } catch (err) {
    console.error('Failed to reset all progress', err);
  }
}
