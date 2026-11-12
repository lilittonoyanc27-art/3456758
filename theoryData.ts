export interface TheorySection {
  id: string;
  topicId: string;
  titleEs: string;
  titleHy: string;
  introEs: string;
  introHy: string;
  subsections: Array<{
    subtitleEs: string;
    subtitleHy: string;
    contentEs: string;
    contentHy: string;
    exampleEs?: string;
    exampleHy?: string;
    tipsEs?: string[];
    tipsHy?: string[];
  }>;
}

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'theory-romance',
    topicId: 'romance_metrica',
    titleEs: '1. El romance y la métrica española',
    titleHy: '1. Ռոմանսը և իսպանական չափագիտությունը (մետրիկա)',
    introEs: 'El romance es la estrofa y composición más característica de la literatura española. Combina narración y lirismo en un ritmo octosílabo inconfundible.',
    introHy: 'Ռոմանսը իսպանական գրականության ամենաբնորոշ բանաստեղծական ձևն է։ Այն միավորում է պատմողականությունն ու քնարականությունը անսխալական ութվանկ ռիթմով։',
    subsections: [
      {
        subtitleEs: 'Estructura canónica del romance',
        subtitleHy: 'Ռոմանսի կանոնիկ կառուցվածքը',
        contentEs: 'Un romance está formado por un número indefinido de versos octosílabos (8 sílabas métricas). Los versos pares riman en asonante, mientras que los versos impares quedan sueltos o libres (sin rima). La fórmula métrica es: 8− 8a 8− 8a 8− 8a...',
        contentHy: 'Ռոմանսը կազմված է ութվանկանի (8 չափական վանկ) տողերի անորոշ քանակից։ Զույգ տողերը հանգավորվում են ասոնանսով, իսկ կենտ տողերը մնում են ազատ (առանց հանգի)։ Չափական բանաձևն է՝ 8− 8a 8− 8a 8− 8a...',
        exampleEs: '«Que por mayo era por mayo, (8−)\ncuando hace la calor, (8a)\ncuando los trigos encañan (8−)\ny están los campos en flor...» (8a)',
        exampleHy: '«Մայիս ամսին էր, մայիսին, (8−)\nերբ տոթ է անում, (8a)\nերբ ցորենն է հասկակալում, (8−)\nև դաշտերը ծաղկում են...» (8a)',
        tipsEs: [
          'El número 8 indica las sílabas del verso (octosílabo).',
          'La letra minúscula «a» significa que rima y es de arte menor (≤ 8 sílabas).',
          'El guion «−» indica que el verso es suelto (sin rima).',
        ],
        tipsHy: [
          '8 թիվը ցույց է տալիս տողի վանկերը (ութվանկ)։',
          'Փոքրատառ «a» տառը նշանակում է, որ այն հանգավորվում է և փոքր չափի է (≤ 8 վանկ)։',
          '«−» գծիկը ցույց է տալիս, որ տողն ազատ է (առանց հանգի)։',
        ],
      },
      {
        subtitleEs: 'La sinalefa: la regla de oro del cómputo métrico',
        subtitleHy: 'Սինալեֆա. չափական հաշվարկի ոսկե կանոնը',
        contentEs: 'Cuando una palabra termina en vocal (o «y») y la siguiente palabra empieza por vocal (o «h» seguida de vocal), ambas se funden en una sola sílaba métrica.',
        contentHy: 'Երբ բառն ավարտվում է ձայնավորով (կամ «y»-ով), իսկ հաջորդ բառը սկսվում է ձայնավորով (կամ համր «h»-ով), դրանք միաձուլվում են մեկ չափական վանկի մեջ։',
        exampleEs: '«Pa-sa des-pa-cio_un ca-ba-llo» -> «cio_un» cuenta como 1 sola sílaba métrica por sinalefa. Total: 8 sílabas métricas.',
        exampleHy: '«Pa-sa des-pa-cio_un ca-ba-llo» -> «cio_un»-ը հաշվվում է որպես 1 չափական վանկ՝ սինալեֆայի շնորհիվ։ Ընդհանուր՝ 8 վանկ։',
        tipsEs: [
          'La letra «h» es muda en español, por lo que NO impide la formación de la sinalefa («de_hierro», «hondo_amor»).',
          'Los signos de puntuación (comas, puntos) en el medio del verso NO impiden la sinalefa.',
        ],
        tipsHy: [
          '«h» տառը իսպաներենում համր է, ուստի ՉԻ խանգարում սինալեֆայի կազմավորմանը («de_hierro»)։',
          'Տողի մեջտեղի կետադրական նշանները ՉԵՆ խանգարում սինալեֆային։',
        ],
      },
      {
        subtitleEs: 'Ley del acento final (Aguda, Llana, Esdrújula)',
        subtitleHy: 'Տողավերջի շեշտի օրենքը (Aguda, Llana, Esdrújula)',
        contentEs: 'La última palabra de cada verso modifica el número de sílabas métricas:\n• Si es AGUDA: se SUMA una sílaba (+1).\n• Si es LLANA: queda IGUAL (no suma ni resta).\n• Si es ESDRÚJULA: se RESTA una sílaba (-1).',
        contentHy: 'Յուրաքանչյուր տողի վերջին բառը փոխում է չափական վանկերի թիվը.\n• Եթե ՎԵՐՋԱՇԵՇՏ Է (aguda)՝ ԳՈՒՄԱՐՎՈՒՄ Է մեկ վանկ (+1)։\n• Եթե ՀԱՐԹ Է (llana)՝ մնում է ՆՈՒՅՆԸ (0)։\n• Եթե ՆԱԽԱՇԵՇՏ Է (esdrújula)՝ ՀԱՆՎՈՒՄ Է մեկ վանկ (-1)։',
        exampleEs: 'Aguda (+1): «Can-ta la voz en el mar» -> 7 sílabas + 1 = 8 sílabas métricas.\nLlana (0): «Por la pla-za va la ni-ña» -> 8 sílabas (queda en 8).\nEsdrújula (-1): «Llo-ran los sau-ces má-gi-cos» -> 8 sílabas - 1 = 7 sílabas métricas.',
        exampleHy: 'Վերջաշեշտ (+1)՝ «Can-ta la voz en el mar» -> 7 վանկ + 1 = 8 չափական վանկ։\nՀարթ (0)՝ «Por la pla-za va la ni-ña» -> 8 վանկ (մնում է 8)։\nՆախաշեշտ (-1)՝ «Llo-ran los sau-ces má-gi-cos» -> 8 վանկ - 1 = 7 չափական վանկ։',
      },
      {
        subtitleEs: 'Rima asonante vs. Rima consonante',
        subtitleHy: 'Ասոնանս հանգ vs. Կոնսոնանս հանգ',
        contentEs: 'La rima es la igualdad o semejanza de sonidos al final de dos o más versos, a partir de la última vocal acentuada (tónica).\n• Rima Asonante: coinciden únicamente las VOCALES.\n• Rima Consonante: coinciden absolutamente TODOS los sonidos (vocales y consonantes).',
        contentHy: 'Հանգը տողավերջի հնչյունների նույնությունն է կամ նմանությունը՝ վերջին շեշտված ձայնավորից սկսած.\n• Ասոնանս հանգ՝ համընկնում են ՄԻԱՅՆ ՁԱՅՆԱՎՈՐՆԵՐԸ։\n• Կոնսոնանս հանգ՝ համընկնում են ԲՈԼՈՐ հնչյունները (ձայնավորներն ու բաղաձայնները)։',
        exampleEs: 'Asonante: g-A-t-O y m-A-n-O (coinciden a-o).\nConsonante: v-I-E-N-T-O y s-I-E-N-T-O (coincide -iento).',
        exampleHy: 'Ասոնանս՝ g-A-t-O և m-A-n-O (համընկնում են a-o)։\nԿոնսոնանս՝ v-I-E-N-T-O և s-I-E-N-T-O (համընկնում է -iento)։',
      },
    ],
  },
  {
    id: 'theory-teatro',
    topicId: 'teatro',
    titleEs: '2. El género teatral (Dramático)',
    titleHy: '2. Թատերական (դրամատիկական) սեռ',
    introEs: 'El teatro se escribe para ser representado por actores en un escenario ante un público. No hay narrador: la historia se crea mediante el diálogo y las acciones directas.',
    introHy: 'Թատրոնը գրվում է բեմում դերասանների կողմից հանդիսատեսի առջև ներկայացվելու համար։ Չկա պատմիչ. պատմությունը կերտվում է երկխոսությունների և անմիջական գործողությունների միջոցով։',
    subsections: [
      {
        subtitleEs: 'Acotaciones escénicas',
        subtitleHy: 'Բեմական ռեմարկներ (acotaciones)',
        contentEs: 'Son las indicaciones que el dramaturgo (autor) escribe entre paréntesis y en cursiva. Informan sobre gestos, movimientos, tono de voz de los actores, así como sobre la iluminación, sonido y decorado. Los actores NO las pronuncian en voz alta.',
        contentHy: 'Հեղինակի կողմից փակագծերում շեղատառով գրված ցուցումներն են։ Դրանք տեղեկացնում են դերասանների ժեստերի, շարժումների, ձայնի տոնի, ինչպես նաև լուսավորության, ձայնի և դեկորացիայի մասին։ Դերասանները դրանք ԲԱՐՁՐԱՁԱՅՆ ՉԵՆ ԱՐՏԱՍԱՆՈՒՄ։',
        exampleEs: '«PABLO: (Gritando con desesperación, arroja la copa al suelo) ¡Todo está perdido!»',
        exampleHy: '«ՊԱԲԼՈ. (Հուսահատությամբ գոռալով, գավաթը հատակին է նետում) Ամեն ինչ կորած է։»',
      },
      {
        subtitleEs: 'Atrezo (utilería) vs. Decorado vs. Vestuario',
        subtitleHy: 'Ատրեցո (ռեկվիզիտ) vs. Դեկորացիա vs. Հանդերձանք',
        contentEs: '• Atrezo (utilería): objetos móviles que los actores manejan directamente con sus manos (espadas, llaves, cartas, copas, maletas).\n• Decorado: elementos físicos fijos que ambientan el lugar de la escena (paredes, puertas, telones pintados, ventanas).\n• Vestuario: la ropa, sombreros, calzado y complementos que llevan puestos los personajes.',
        contentHy: '• Ատրեցո (utilería / ռեկվիզիտ)՝ շարժական առարկաներ, որոնք դերասաններն օգտագործում են ձեռքերով (թրեր, բանալիներ, նամակներ, գավաթներ)։\n• Դեկորացիա՝ բեմի միջավայրը կազմող անշարժ տարրեր (պատեր, դռներ, նկարազարդ ֆոն)։\n• Հանդերձանք (vestuario)՝ հագուստը, գլխարկները, կոշիկները, որոնք հագել են կերպարները։',
      },
      {
        subtitleEs: 'Formas de elocución teatral: Diálogo, Monólogo y Aparte',
        subtitleHy: 'Թատերական խոսքի ձևեր՝ Երկխոսություն, Մենախոսություն և Ապարտե',
        contentEs: '• Diálogo: conversación directa entre dos o más personajes que hace avanzar la trama.\n• Monólogo (soliloquio): parlamento largo en el que un personaje habla solo en escena reflexionando en voz alta ante los espectadores.\n• Aparte: palabras que un personaje dice al público o a sí mismo fingiendo que los demás personajes en escena no lo escuchan.',
        contentHy: '• Երկխոսություն (diálogo)՝ երկու կամ ավելի կերպարների միջև զրույց, որն առաջ է մղում սյուժեն։\n• Մենախոսություն (monólogo)՝ երկարատև խոսք, երբ կերպարը բեմում մենակ խորհրդածում է բարձրաձայն։\n• Ապարտե (aparte)՝ խոսքեր, որոնք կերպարն ասում է հանդիսատեսին՝ ձևացնելով, թե բեմում գտնվող մյուսները չեն լսում։',
      },
      {
        subtitleEs: 'Estructura: Acto, Escena y Cuadro',
        subtitleHy: 'Կառուցվածք՝ Գործողություն, Տեսարան և Պատկեր',
        contentEs: '• Acto: división mayor de la obra marcada habitualmente por la caída del telón o un descanso.\n• Escena: división menor determinada por la entrada o salida de personajes del escenario.\n• Cuadro: división marcada por un cambio completo de decorado o ambientación visual.',
        contentHy: '• Գործողություն (acto)՝ պիեսի մեծ մասը, որը բաժանվում է վարագույրի իջեցմամբ կամ ընդմիջումով։\n• Տեսարան (escena)՝ փոքր մաս, որը որոշվում է բեմ կերպարների մուտքով կամ ելքով։\n• Պատկեր (cuadro)՝ մաս, որը հատկանշվում է դեկորացիայի կամ միջավայրի փոփոխությամբ։',
      },
    ],
  },
  {
    id: 'theory-figuras',
    topicId: 'figuras_literarias',
    titleEs: '3. Las figuras literarias (Recursos retóricos)',
    titleHy: '3. Գեղարվեստական պատկերավորման միջոցներ (ոճաֆիգուրներ)',
    introEs: 'Las figuras literarias son procedimientos expresivos que los autores utilizan para embellecer el texto, sorprender al lector y potenciar el significado estético del lenguaje.',
    introHy: 'Գեղարվեստական պատկերավորման միջոցներն արտահայտչական հնարքներ են, որոնցով հեղինակները գեղեցկացնում են տեքստը, զարմացնում ընթերցողին և հզորացնում լեզվի գեղագիտական իմաստը։',
    subsections: [
      {
        subtitleEs: 'Nivel Fónico (El sonido de las palabras)',
        subtitleHy: 'Հնչյունական մակարդակ (բառերի հնչողությունը)',
        contentEs: '• Aliteración: repetición intencionada de un mismo sonido consonántico («El susurro suave del sauce»).\n• Onomatopeya: palabra que imita un sonido de la naturaleza o de un objeto («tic-tac», «guau», «bum»).\n• Paronomasia: juego sonoro entre palabras parecidas en pronunciación pero de significados diferentes («entre el clavel y la rosa, su majestad escoja» / es coja).\n• Epanadiplosis: comenzar y terminar el mismo verso con la misma palabra («Verde que te quiero verde»).',
        contentHy: '• Ալիտերացիա (բաղաձայնույթ)՝ նույն բաղաձայն հնչյունի միտումնավոր կրկնություն («El susurro suave del sauce»)։\n• Բնաձայնություն (onomatopeya)՝ բառ, որն ընդօրինակում է բնության կամ առարկայի ձայնը («tic-tac»)։\n• Պարոնոմազիա (հարանունություն)՝ նմանահունչ, բայց տարբեր իմաստ ունեցող բառերի խաղ։\n• Էպանադիպլոզիս՝ նույն տողը նույն բառով սկսելը և ավարտելը («Verde que te quiero verde»)։',
      },
      {
        subtitleEs: 'Nivel Morfosintáctico (El orden y estructura de las oraciones)',
        subtitleHy: 'Շարահյուսական մակարդակ (նախադասությունների կարգն ու կառուցվածքը)',
        contentEs: '• Anáfora: repetición de una o más palabras al comienzo de versos u oraciones consecutivas («Quiero cantar. Quiero vivir. Quiero soñar»).\n• Hipérbaton: alteración del orden sintáctico habitual de las palabras («Volverán del amor en tus oídos las palabras ardientes a sonar»).\n• Asíndeton: supresión de conjunciones («Corre, salta, vuela, ríe») para dar velocidad y agilidad.\n• Polisíndeton: repetición innecesaria de conjunciones («Y sueña y ríe y llora») para dar lentitud y solemnidad.\n• Pleonasmo: uso de palabras redundantes para añadir énfasis («Lo vi con mis propios ojos»).\n• Enumeración: acumulación sucesiva de términos afines («Rosas, claveles, jazmines y azucenas»).',
        contentHy: '• Անաֆորա (համասկիզբ)՝ բառերի կրկնություն հաջորդական տողերի սկզբում։\n• Հիպերբատոն (շրջադասություն)՝ բառերի բնական շարահյուսական կարգի խախտում։\n• Ասինդետոն (անշաղկապություն)՝ շաղկապների բացթողում արագության համար («Corre, salta, vuela»)։\n• Պոլիսինդետոն (բազմաշաղկապություն)՝ շաղկապների կրկնություն դանդաղության և ծանրության համար («Y sueña y ríe y llora»)։\n• Պլեոնազմ (ավելաբանություն)՝ ավելորդ բառերի օգտագործում շեշտադրման համար («Իմ սեփական աչքերով տեսա»)։\n• Թվարկում (enumeración)՝ հարակից անդամների հաջորդական շարք։',
      },
      {
        subtitleEs: 'Nivel Semántico (El significado y la imagen poética)',
        subtitleHy: 'Իմաստային մակարդակ (իմաստը և բանաստեղծական պատկերը)',
        contentEs: '• Metáfora: identificación poética entre un término real (A) y un término imaginario (B) por su semejanza.\n  - Fórmula A es B: «Tus ojos son dos luceros».\n  - Fórmula pura (solo B): «Los luceros de tu rostro brillan».\n  - Fórmula A de B / B de A: «Tus cabellos de oro».\n• Comparación o Símil: relación de semejanza entre dos elementos con un nexo explícito («como», «cual», «parece»): «Tus ojos son como luceros».\n• Personificación: atribuir cualidades o acciones humanas a animales o cosas inanimadas («El viento susurra entre las ramas»).\n• Hipérbole: exageración intencionada de la realidad («Te he esperado un millón de años»).\n• Antítesis: contraposición de dos términos o ideas opuestas («Es tan corto el amor y tan largo el olvido»).',
        contentHy: '• Փոխաբերություն (metáfora)՝ իրական անդամի (A) և պատկերավոր անդամի (B) նույնացում ըստ նմանության (A-ն B է, մաքուր B, A de B)։\n• Համեմատություն (símil)՝ երկու տարրերի նմանեցում «como» (ինչպես) բացահայտ շաղկապով։\n• Անձնավորում (personificación)՝ անշունչ առարկաներին կամ կենդանիներին մարդկային հատկանիշներ վերագրելը։\n• Հիպերբոլ (չափազանցություն)՝ իրականության միտումնավոր չափազանցում («Միլիոն տարի սպասել եմ քեզ»)։\n• Անտիթեզ (հակադրություն)՝ հակադիր գաղափարների կամ բառերի բախում («Այնքան կարճ է սերը, և այնքան երկար՝ մոռացումը»)։',
      },
    ],
  },
  {
    id: 'theory-popular-culta',
    topicId: 'literatura_popular_culta',
    titleEs: '4. Literatura popular y culta',
    titleHy: '4. Ժողովրդական և հեղինակային գրականություն',
    introEs: 'A lo largo de los siglos han convivido dos grandes vertientes literarias: la voz anónima del pueblo y la creación culta de autores individuales.',
    introHy: 'Դարերի ընթացքում կողք կողքի գոյակցել են գրական երկու մեծ ուղղություններ՝ ժողովրդի անանուն ձայնը և առանձին հեղինակների ստեղծագործությունը։',
    subsections: [
      {
        subtitleEs: 'Tabla comparativa esencial',
        subtitleHy: 'Հիմնական համեմատական աղյուսակ',
        contentEs: '• Literatura Popular: Autor anónimo; transmisión oral de viva voz; presenta múltiples variantes; lenguaje sencillo y emotivo; incluye canciones, nanas, villancicos, coplas y romances viejos.\n• Literatura Culta: Autor conocido e individual; fijada por escrito en libros impresos; texto definitivo que no cambia; lenguaje elaborado y reflexivo; incluye novelas, poemarios y tragedias de autor.',
        contentHy: '• Ժողովրդական գրականություն՝ անանուն հեղինակ, բանավոր փոխանցում, բազմաթիվ տարբերակներ, պարզ և հուզական լեզու (երգեր, օրորոցայիններ, կոպլաներ, հին ռոմանսներ)։\n• Հեղինակային գրականություն՝ հայտնի անհատ հեղինակ, գրավոր ամրագրված, անփոփոխ կայուն տեքստ, մշակված և խոհական լեզու (վեպեր, բանաստեղծական ժողովածուներ, ողբերգություններ)։',
      },
    ],
  },
  {
    id: 'theory-cuento-mito',
    topicId: 'cuento_leyenda_mito',
    titleEs: '5. Cuento, leyenda y mito',
    titleHy: '5. Հեքիաթ / պատմվածք, լեգենդ և առասպել',
    introEs: 'Tres de las formas narrativas más antiguas de la humanidad que responden a la necesidad de explicar el mundo, recordar el pasado e imaginar aventuras.',
    introHy: 'Մարդկության ամենահին պատմողական երեք ձևերը, որոնք պատասխանում են աշխարհը բացատրելու, անցյալը հիշելու և արկածներ երևակայելու կարիքին։',
    subsections: [
      {
        subtitleEs: 'Distinción clara entre las tres formas',
        subtitleHy: 'Երեք ձևերի հստակ տարբերակումը',
        contentEs: '• Mito: relato sagrado protagonizado por dioses o semidioses que explica el origen del cosmos, los seres humanos o los fenómenos naturales (intemporal y universal).\n• Leyenda: relato tradicional ligado a un lugar geográfico y momento histórico concreto que incorpora hechos sobrenaturales o misteriosos transmitidos como ciertos.\n• Cuento: narración breve de ficción con personajes arquetípicos y trama lineal (planteamiento, nudo, desenlace), con fórmulas de inicio («Había una vez») y a menudo con enseñanza o moraleja.',
        contentHy: '• Առասպել (mito)՝ աստվածների մասին սրբազան պատմություն, որը բացատրում է տիեզերքի, մարդու կամ բնության ծագումը (տիեզերական, դուրս ժամանակից)։\n• Լեգենդ (leyenda)՝ տեղական աշխարհագրական վայրի և պատմական պահի հետ կապված պատմություն, որը պարունակում է գերբնական կամ խորհրդավոր տարրեր։\n• Հեքիաթ / պատմվածք (cuento)՝ հորինվածքային կարճ պատմություն՝ տիպական կերպարներով, գծային սյուժեով (սկիզբ, զարգացում, ավարտ) և հաճախ խրատական իմաստով։',
      },
    ],
  },
];
