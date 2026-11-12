import { QUESTIONS_CHUNK_1 } from './questionsChunk1';
import { QUESTIONS_CHUNK_2 } from './questionsChunk2';
import { QUESTIONS_CHUNK_3 } from './questionsChunk3';
import { Question, ShuffledOption, ShuffledQuestion, TopicId, TopicInfo } from './types';

export const ALL_QUESTIONS: Question[] = [
  ...QUESTIONS_CHUNK_1,
  ...QUESTIONS_CHUNK_2,
  ...QUESTIONS_CHUNK_3,
];

export const TOPICS: TopicInfo[] = [
  {
    id: 'generos_literarios',
    titleEs: 'Los géneros literarios',
    titleHy: 'Գրական սեռեր և ժանրեր',
    descriptionEs: 'Lírica, narrativa y teatro. Tipos de narrador, personajes, tiempo y estructura.',
    descriptionHy: 'Քնարերգություն, պատմողական սեռ և թատրոն։ Պատմիչի տեսակներ, կերպարներ, ժամանակ և կառուցվածք։',
    icon: 'BookOpen',
    questionCount: 15,
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'lenguaje_literario',
    titleEs: 'El lenguaje literario, verso y prosa',
    titleHy: 'Գրական լեզու, չափածո և արձակ',
    descriptionEs: 'Finalidad estética, sentido figurado, verso, estrofa, musicalidad y ritmo.',
    descriptionHy: 'Գեղագիտական նպատակ, փոխաբերական իմաստ, տող, տուն, երաժշտականություն և ռիթմ։',
    icon: 'Feather',
    questionCount: 10,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'literatura_popular_culta',
    titleEs: 'Literatura popular y culta',
    titleHy: 'Ժողովրդական և հեղինակային գրականություն',
    descriptionEs: 'Tradición oral, autor anónimo vs. conocido, canciones, nanas, villancicos y coplas.',
    descriptionHy: 'Բանավոր ավանդույթ, անանուն հեղինակ vs. հայտնի, ժողովրդական երգեր, օրորոցայիններ, կոպլաներ։',
    icon: 'Music',
    questionCount: 15,
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'cuento_leyenda_mito',
    titleEs: 'Cuento, leyenda y mito',
    titleHy: 'Հեքիաթ / պատմվածք, լեգենդ և առասպել',
    descriptionEs: 'Dioses y héroes, explicaciones sagradas, misterios locales y cuentos con moraleja.',
    descriptionHy: 'Աստվածներ և հերոսներ, սրբազան բացատրություններ, տեղական առեղծվածներ և խրատական հեքիաթներ։',
    icon: 'Sparkles',
    questionCount: 15,
    color: 'from-purple-600 to-violet-800',
  },
  {
    id: 'romance_metrica',
    titleEs: 'El romance y la métrica',
    titleHy: 'Ռոմանս և չափագիտություն (մետրիկա)',
    descriptionEs: 'Octosílabos, rima asonante 8− 8a, sinalefa, palabras agudas (+1), llanas y esdrújulas (-1).',
    descriptionHy: 'Ութվանկ տողեր, ասոնանս հանգ 8− 8a, սինալեֆա, վերջաշեշտ (+1), հարթ և նախաշեշտ (-1) բառեր։',
    icon: 'Scroll',
    questionCount: 30,
    color: 'from-rose-600 to-red-700',
  },
  {
    id: 'teatro',
    titleEs: 'El teatro',
    titleHy: 'Թատրոն',
    descriptionEs: 'Acotaciones, atrezo vs. decorado, diálogo, monólogo, aparte, actos y escenas.',
    descriptionHy: 'Ռեմարկներ, ատրեցո (ռեկվիզիտ) vs. դեկորացիա, երկխոսություն, մենախոսություն, ապարտե, գործողություններ։',
    icon: 'Drama',
    questionCount: 25,
    color: 'from-cyan-600 to-blue-800',
  },
  {
    id: 'figuras_literarias',
    titleEs: 'Las figuras literarias',
    titleHy: 'Գեղարվեստական պատկերավորման միջոցներ (ոճաֆիգուրներ)',
    descriptionEs: 'Nivel fónico (aliteración), morfosintáctico (hipérbaton, anáfora) y semántico (metáfora).',
    descriptionHy: 'Հնչյունական (ալիտերացիա), շարահյուսական (հիպերբատոն, անաֆորա) և իմաստային (փոխաբերություն) մակարդակներ։',
    icon: 'Wand2',
    questionCount: 30,
    color: 'from-amber-600 to-yellow-600',
  },
  {
    id: 'analisis_textos',
    titleEs: 'Análisis de textos mixtos',
    titleHy: 'Խառը տեքստերի համալիր վերլուծություն',
    descriptionEs: 'Lectura de poemas, escenas teatrales y relatos con preguntas globales de comprensión.',
    descriptionHy: 'Բանաստեղծությունների, թատերական տեսարանների և պատմվածքների վերլուծություն։',
    icon: 'Layers',
    questionCount: 10,
    color: 'from-fuchsia-600 to-pink-700',
  },
];

/**
 * Robust Fisher-Yates shuffle that returns a new array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Prepares a question for an exam session by shuffling its 4 options
 * and assigning letters A, B, C, D strictly after the shuffle.
 * The answer verification is always based on the option's immutable ID.
 */
export function prepareShuffledQuestion(q: Question): ShuffledQuestion {
  const shuffledRawOptions = shuffleArray(q.options);
  const letters: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  const shuffledOptions: ShuffledOption[] = shuffledRawOptions.map((opt, index) => ({
    ...opt,
    letter: letters[index],
  }));

  return {
    ...q,
    shuffledOptions,
  };
}

/**
 * Prepares a list of questions for a specific exam mode with independent shuffling.
 */
export function prepareExamQuestions(
  mode: 'all' | 'topic' | 'quick' | 'errors',
  topicId?: TopicId,
  mistakeIds: string[] = []
): ShuffledQuestion[] {
  let selectedQuestions: Question[] = [];

  if (mode === 'all') {
    selectedQuestions = shuffleArray(ALL_QUESTIONS);
  } else if (mode === 'topic' && topicId) {
    const topicPool = ALL_QUESTIONS.filter((q) => q.topicId === topicId);
    selectedQuestions = shuffleArray(topicPool);
  } else if (mode === 'quick') {
    // Pick 20 balanced random questions across all topics
    const shuffledAll = shuffleArray(ALL_QUESTIONS);
    selectedQuestions = shuffledAll.slice(0, 20);
  } else if (mode === 'errors') {
    if (mistakeIds.length === 0) {
      return [];
    }
    const errorQuestions = ALL_QUESTIONS.filter((q) => mistakeIds.includes(q.id));
    selectedQuestions = shuffleArray(errorQuestions);
  }

  // Shuffle options for each selected question
  return selectedQuestions.map(prepareShuffledQuestion);
}
