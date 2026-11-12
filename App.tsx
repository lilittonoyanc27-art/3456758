import React, { useState, useEffect } from 'react';
import {
  ExamMode,
  ExamResult,
  ShuffledQuestion,
  TopicId,
  UserStats,
} from './types';
import { prepareExamQuestions } from './questionsData';
import {
  loadUserStats,
  recordQuestionAnswer,
  saveCompletedExamResult,
  loadExamResults,
  saveActiveExam,
  loadActiveExam,
  SavedExamSession,
  resetAllProgress,
} from './storage';
import { isSoundEnabled, setSoundEnabled } from './sound';
import { Header } from './Header';
import { HomeScreen } from './HomeScreen';
import { ExamScreen } from './ExamScreen';
import { ResultsScreen } from './ResultsScreen';
import { TheoryScreen } from './TheoryScreen';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'exam' | 'results' | 'theory'>('home');
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [globalTranslate, setGlobalTranslate] = useState<boolean>(false);
  const [savedSession, setSavedSession] = useState<SavedExamSession | null>(null);
  const [soundEnabled, setSoundState] = useState<boolean>(isSoundEnabled);

  // Active exam state
  const [examMode, setExamMode] = useState<ExamMode>('all');
  const [activeTopicId, setActiveTopicId] = useState<TopicId | undefined>(undefined);
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Last exam result for Results screen
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);

  // Load saved session on initial mount
  useEffect(() => {
    const session = loadActiveExam();
    if (session && session.questions.length > 0) {
      setSavedSession(session);
    }
  }, []);

  // Timer effect during active exam
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (screen === 'exam' && isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [screen, isTimerRunning]);

  // Persist session on step/answer changes during exam
  useEffect(() => {
    if (screen === 'exam' && questions.length > 0) {
      const session: SavedExamSession = {
        mode: examMode,
        topicId: activeTopicId,
        questions,
        currentIndex,
        userAnswers,
        confirmedQuestions,
        startTime: Date.now() - timerSeconds * 1000,
        elapsedSeconds: timerSeconds,
      };
      saveActiveExam(session);
      setSavedSession(session);
    }
  }, [screen, examMode, activeTopicId, questions, currentIndex, userAnswers, confirmedQuestions, timerSeconds]);

  // Toggle sound
  const handleToggleSound = () => {
    setSoundState((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      return next;
    });
  };

  // Start a new exam
  const handleStartExam = (mode: ExamMode, topicId?: TopicId) => {
    const freshQuestions = prepareExamQuestions(mode, topicId, stats.mistakes);

    if (freshQuestions.length === 0) {
      if (mode === 'errors') {
        alert('¡No tienes errores registrados! Puedes practicar por temas o realizar un examen completo.');
      }
      return;
    }

    setExamMode(mode);
    setActiveTopicId(topicId);
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setConfirmedQuestions({});
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setScreen('exam');
  };

  // Resume interrupted exam
  const handleResumeExam = () => {
    if (savedSession) {
      setExamMode(savedSession.mode);
      setActiveTopicId(savedSession.topicId);
      setQuestions(savedSession.questions);
      setCurrentIndex(savedSession.currentIndex);
      setUserAnswers(savedSession.userAnswers);
      setConfirmedQuestions(savedSession.confirmedQuestions);
      setTimerSeconds(savedSession.elapsedSeconds || 0);
      setIsTimerRunning(true);
      setScreen('exam');
    }
  };

  // Select an option for current question
  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Confirm answer for current question
  const handleConfirmAnswer = (questionId: string) => {
    const q = questions.find((item) => item.id === questionId);
    if (!q) return;

    const chosenOptionId = userAnswers[questionId];
    if (!chosenOptionId) return;

    const isCorrect = chosenOptionId === q.correctOptionId;

    // Mark as confirmed
    setConfirmedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    // Record in global stats & update state
    const updatedStats = recordQuestionAnswer(questionId, q.topicId, isCorrect);
    setStats(updatedStats);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Previous Question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Finish exam and calculate score
  const handleFinishExam = () => {
    setIsTimerRunning(false);

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        correctCount += 1;
      }
    });

    const total = questions.length;
    const scoreOutOfTen = total > 0 ? Number(((correctCount / total) * 10).toFixed(1)) : 0;

    const result: ExamResult = {
      date: new Date().toISOString(),
      mode: examMode,
      topicId: activeTopicId,
      totalQuestions: total,
      correctAnswers: correctCount,
      scoreOutOfTen,
      timeSpentSeconds: timerSeconds,
      questionIds: questions.map((q) => q.id),
      userAnswers,
    };

    saveCompletedExamResult(result);
    setLatestResult(result);

    // Clear active session from localStorage
    saveActiveExam(null);
    setSavedSession(null);

    setScreen('results');
  };

  // Global reset progress (Сброс)
  const handleResetProgress = () => {
    resetAllProgress();
    setStats(loadUserStats());
    saveActiveExam(null);
    setSavedSession(null);
    setLatestResult(null);
    setScreen('home');
  };

  // View past results screen
  const handleOpenResults = () => {
    if (!latestResult) {
      const pastResults = loadExamResults();
      if (pastResults.length > 0) {
        setLatestResult(pastResults[0]);
        setScreen('results');
        return;
      }
      alert('Aún no has completado ningún examen. ¡Empieza uno para ver tus notas escolares!');
      return;
    }
    setScreen('results');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      {/* Top Header with Sound toggle and Reset button */}
      <Header
        currentScreen={screen}
        onNavigateHome={() => setScreen('home')}
        onNavigateTheory={() => setScreen('theory')}
        onResetProgress={handleResetProgress}
        mistakesCount={stats.mistakes.length}
        onNavigateErrors={() => handleStartExam('errors')}
        timerSeconds={timerSeconds}
        showTimer={true}
        globalTranslateOpen={globalTranslate}
        onToggleGlobalTranslate={() => setGlobalTranslate((prev) => !prev)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {screen === 'home' && (
          <HomeScreen
            onStartExam={handleStartExam}
            onOpenTheory={() => setScreen('theory')}
            onOpenResults={handleOpenResults}
            onResetProgress={handleResetProgress}
            stats={stats}
            hasSavedExam={Boolean(savedSession)}
            onResumeExam={handleResumeExam}
            globalTranslate={globalTranslate}
          />
        )}

        {screen === 'exam' && (
          <ExamScreen
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            confirmedQuestions={confirmedQuestions}
            onSelectOption={handleSelectOption}
            onConfirmAnswer={handleConfirmAnswer}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            onFinishExam={handleFinishExam}
            onExitToMenu={() => setScreen('home')}
            globalTranslate={globalTranslate}
            onToggleGlobalTranslate={() => setGlobalTranslate((prev) => !prev)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onResetProgress={handleResetProgress}
          />
        )}

        {screen === 'results' && latestResult && (
          <ResultsScreen
            result={latestResult}
            onRestartExam={() => handleStartExam(latestResult.mode, latestResult.topicId)}
            onReviewErrors={() => handleStartExam('errors')}
            onOpenTheory={() => setScreen('theory')}
            onBackToHome={() => setScreen('home')}
            globalTranslate={globalTranslate}
          />
        )}

        {screen === 'theory' && (
          <TheoryScreen
            onBackToHome={() => setScreen('home')}
            onPracticeTopic={(tId) => handleStartExam('topic', tId)}
            globalTranslate={globalTranslate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-800 bg-slate-950 py-6 text-center text-xs sm:text-sm text-slate-400 space-y-1">
        <div>
          El Gran Examen de Lengua Castellana y Literatura • 7.º Curso ESO
        </div>
        <div className="font-hy text-slate-400 text-xs">
          150 քննական հարցեր, հայերեն թարգմանություններ և մանրամասն բացատրություններ
        </div>
      </footer>
    </div>
  );
}
