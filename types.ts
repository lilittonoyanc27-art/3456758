export type TopicId =
  | 'generos_literarios'
  | 'lenguaje_literario'
  | 'literatura_popular_culta'
  | 'cuento_leyenda_mito'
  | 'romance_metrica'
  | 'teatro'
  | 'figuras_literarias'
  | 'analisis_textos';

export interface TopicInfo {
  id: TopicId;
  titleEs: string;
  titleHy: string;
  descriptionEs: string;
  descriptionHy: string;
  icon: string;
  questionCount: number;
  color: string;
}

export interface QuestionOption {
  id: string; // constant unique ID
  textEs: string;
  textHy: string;
}

export interface ShuffledOption extends QuestionOption {
  letter: 'A' | 'B' | 'C' | 'D';
}

export interface Question {
  id: string;
  topicId: TopicId;
  topicNameEs: string;
  topicNameHy: string;
  textEs: string;
  textHy: string;
  passageEs?: string;
  passageHy?: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanationEs: string;
  explanationHy: string;
  whyEs: string;
  whyHy: string;
  exampleEs?: string;
  exampleHy?: string;
}

export interface ShuffledQuestion extends Question {
  shuffledOptions: ShuffledOption[];
}

export type ExamMode = 'all' | 'topic' | 'quick' | 'errors';

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  byTopic: Record<TopicId, { answered: number; correct: number }>;
  mistakes: string[]; // Question IDs that were answered incorrectly
  completedExamsCount: number;
}

export interface ExamResult {
  date: string;
  mode: ExamMode;
  topicId?: TopicId;
  totalQuestions: number;
  correctAnswers: number;
  scoreOutOfTen: number;
  timeSpentSeconds: number;
  questionIds: string[];
  userAnswers: Record<string, string>;
}
