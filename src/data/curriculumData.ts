import { MultilingualText } from '../types';

export interface CurriculumSubject {
  id: string;
  name: MultilingualText;
  code: string;
  category: 'core_science' | 'mathematics' | 'social_science' | 'languages';
  chaptersCount: number;
  iconName: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
  overview: MultilingualText;
  hasInteractiveUnits: boolean;
  activeUnitPath?: string;
  chapters: {
    id: string;
    number: number;
    title: MultilingualText;
    topicsCount: number;
    description: MultilingualText;
    isInteractive: boolean;
    path?: string;
  }[];
}

export const CLASS_9_CURRICULUM: CurriculumSubject[] = [
  {
    id: 'science-and-technology',
    name: {
      en: 'Science & Technology',
      mr: 'विज्ञान आणि तंत्रज्ञान',
      hi: 'विज्ञान एवं प्रौद्योगिकी',
    },
    code: 'SCI-09',
    category: 'core_science',
    chaptersCount: 18,
    iconName: 'Atom',
    colorScheme: {
      bg: 'bg-purple-50',
      text: 'text-[#6C3BEF]',
      border: 'border-purple-200',
      gradient: 'from-[#3F207C] to-[#6C3BEF]',
    },
    overview: {
      en: 'Physics, Chemistry, and Biology fundamentals with diagnostic pre-tests, physics simulators, and error analytics.',
      mr: 'भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्र यांच्या मूलभूत संकल्पना, परस्परसंवादी सिम्युलेटर आणि त्रुटी विश्लेषण.',
      hi: 'भौतिक, रसायन और जीव विज्ञान की बुनियादी अवधारणाएं, सिमुलेटर और त्रुटि विश्लेषण।',
    },
    hasInteractiveUnits: true,
    activeUnitPath: '/chapters/laws-of-motion',
    chapters: [
      {
        id: 'laws-of-motion',
        number: 1,
        title: {
          en: 'Laws of Motion',
          mr: 'गतीचे नियम (Laws of Motion)',
          hi: 'गति के नियम (Laws of Motion)',
        },
        topicsCount: 4,
        description: {
          en: 'Force, Inertia, Momentum, and Newton’s Three Fundamental Laws of Motion with real-time vector simulations.',
          mr: 'बल, जडत्व, संवेग आणि न्यूटनचे तीन मूलभूत गतीचे नियम.',
          hi: 'बल, जड़त्व, संवेग और न्यूटन के तीनों नियम।',
        },
        isInteractive: true,
        path: '/chapters/laws-of-motion',
      },
      {
        id: 'work-and-energy',
        number: 2,
        title: {
          en: 'Work and Energy',
          mr: 'कार्य आणि ऊर्जा',
          hi: 'कार्य और ऊर्जा',
        },
        topicsCount: 5,
        description: {
          en: 'Work done by constant force, Kinetic & Potential energy, and the Law of Conservation of Energy.',
          mr: 'स्थिर बलाने केलेले कार्य, गतिज व स्थितिज ऊर्जा, ऊर्जा संवर्धन नियम.',
          hi: 'कार्य, गतिज व स्थितिज ऊर्जा, ऊर्जा संरक्षण का नियम।',
        },
        isInteractive: false,
      },
      {
        id: 'current-electricity',
        number: 3,
        title: {
          en: 'Current Electricity',
          mr: 'धाराविद्युत',
          hi: 'विद्युत धारा',
        },
        topicsCount: 4,
        description: {
          en: 'Potential difference, Ohm’s Law, electrical resistance, and series/parallel circuit configurations.',
          mr: 'विभवांतर, ओहमचा नियम, रोधांची एकसर व समांतर जोडणी.',
          hi: 'विभवांतर, ओम का नियम, प्रतिरोधों का श्रेणी व समांतर संयोजन।',
        },
        isInteractive: false,
      },
      {
        id: 'measurement-of-matter',
        number: 4,
        title: {
          en: 'Measurement of Matter',
          mr: 'द्रव्याचे मोजमाप',
          hi: 'पदार्थ का मापन',
        },
        topicsCount: 4,
        description: {
          en: 'Laws of Chemical Combination, Atomic mass, Molecular mass, Valency, and Radicals.',
          mr: 'रासायनिक संयोगाचे नियम, अणुचे वस्तुमान, संयुजा आणि मूलके.',
          hi: 'रासायनिक संयोजन के नियम, परमाणु द्रव्यमान, संयोजकता।',
        },
        isInteractive: false,
      },
    ],
  },
  {
    id: 'mathematics',
    name: {
      en: 'Mathematics (Part I & II)',
      mr: 'गणित (भाग १ व २)',
      hi: 'गणित (भाग 1 और 2)',
    },
    code: 'MATH-09',
    category: 'mathematics',
    chaptersCount: 16,
    iconName: 'Calculator',
    colorScheme: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-700 to-indigo-600',
    },
    overview: {
      en: 'Algebra (Sets, Polynomials, Linear Equations) and Geometry (Lines, Triangles, Quadrilaterals, Coordinate Geometry).',
      mr: 'बीजगणित (संच, वास्तव संख्या, बहुपदी, रेषीय समीकरणे) आणि भूमिती (त्रिकोण, चौकोन, वर्तुळ).',
      hi: 'बीजगणित (समुच्चय, बहुपद, रैखिक समीकरण) और ज्यामिति (रेखाएं, त्रिभुज, चतुर्भुज)।',
    },
    hasInteractiveUnits: false,
    chapters: [
      {
        id: 'sets',
        number: 1,
        title: {
          en: 'Sets',
          mr: 'संच',
          hi: 'समुच्चय',
        },
        topicsCount: 4,
        description: {
          en: 'Set representation, Types of sets, Venn diagrams, Equal sets, and Operations on sets.',
          mr: 'संच लिहिण्याच्या पद्धती, संचांचे प्रकार, व्हेन चित्रे आणि संचांवरील क्रिया.',
          hi: 'समुच्चय के प्रकार, वेन आरेख और समुच्चयों पर संक्रियाएँ।',
        },
        isInteractive: false,
      },
      {
        id: 'real-numbers',
        number: 2,
        title: {
          en: 'Real Numbers',
          mr: 'वास्तव संख्या',
          hi: 'वास्तविक संख्याएँ',
        },
        topicsCount: 5,
        description: {
          en: 'Rational & Irrational numbers, Surds, Comparison of quadratic surds, and Operations on surds.',
          mr: 'परिमेय व अपरिमेय संख्या, करणी आणि करणींवरील क्रिया.',
          hi: 'परिमेय एवं अपरिमेय संख्याएँ, करणी और उनका सरलीकरण।',
        },
        isInteractive: false,
      },
      {
        id: 'polynomials',
        number: 3,
        title: {
          en: 'Polynomials',
          mr: 'बहुपदी',
          hi: 'बहुपद',
        },
        topicsCount: 4,
        description: {
          en: 'Degree of polynomials, Operations on polynomials, Synthetic division, and Remainder theorem.',
          mr: 'बहुपदींची कोटी, बहुपदींवरील क्रिया, संश्लेषक भागाकार आणि शेष सिद्धांत.',
          hi: 'बहुपद की घात, संश्लेषित विभाजन और शेषफल प्रमेय।',
        },
        isInteractive: false,
      },
      {
        id: 'basic-geometry',
        number: 4,
        title: {
          en: 'Basic Concepts in Geometry',
          mr: 'भूमितीतील मूलभूत संबोध',
          hi: 'ज्यामिति की मूलभूत अवधारणाएँ',
        },
        topicsCount: 3,
        description: {
          en: 'Points, Lines, Planes, Coordinates of points, Distance, and Betweenness.',
          mr: 'बिंदू, रेषा, प्रतल, बिंदूंचे निर्देशक आणि अंतर.',
          hi: 'बिंदु, रेखा, समतल, निर्देशांक और दूरी।',
        },
        isInteractive: false,
      },
    ],
  },
  {
    id: 'social-sciences',
    name: {
      en: 'Social Sciences',
      mr: 'सामाजिक शास्त्रे (इतिहास, राज्यशास्त्र व भूगोल)',
      hi: 'सामाजिक विज्ञान',
    },
    code: 'SOC-09',
    category: 'social_science',
    chaptersCount: 22,
    iconName: 'Globe',
    colorScheme: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      gradient: 'from-emerald-800 to-teal-600',
    },
    overview: {
      en: 'History (Post-Independence India), Political Science (India’s Foreign Policy & Defense), and Physical Geography.',
      mr: 'इतिहास (स्वातंत्र्योत्तर भारत), राज्यशास्त्र (भारताचे परराष्ट्र धोरण व संरक्षण व्यवस्था) आणि प्राकृतिक भूगोल.',
      hi: 'इतिहास, राजनीति विज्ञान (विदेश नीति व सुरक्षा व्यवस्था) और भूगोल।',
    },
    hasInteractiveUnits: false,
    chapters: [
      {
        id: 'sources-of-history',
        number: 1,
        title: {
          en: 'Sources of History',
          mr: 'इतिहासाची साधने',
          hi: 'इतिहास के साधन',
        },
        topicsCount: 3,
        description: {
          en: 'Written sources, Material sources, Oral sources, and Audio-visual records of modern India.',
          mr: 'लिखित साधने, भौतिक साधने, मौखिक साधने आणि दृकश्राव्य साधने.',
          hi: 'लिखित, भौतिक, मौखिक और दृश्य-श्रव्य साधन।',
        },
        isInteractive: false,
      },
      {
        id: 'endogenetic-movements',
        number: 2,
        title: {
          en: 'Endogenetic Movements (Geography)',
          mr: 'भू-हालचाली (भूगोल)',
          hi: 'भू-संचलन (भूगोल)',
        },
        topicsCount: 4,
        description: {
          en: 'Slow movements, Sudden movements, Earthquakes, Volcanoes, and Fold Mountains formation.',
          mr: 'मंद हालचाली, शीघ्र हालचाली, भूकंप आणि ज्वालामुखी.',
          hi: 'मंद संचलन, तीव्र संचलन, भूकंप और ज्वालामुखी।',
        },
        isInteractive: false,
      },
      {
        id: 'post-war-political-developments',
        number: 3,
        title: {
          en: 'Post World War Political Developments',
          mr: 'महायुद्धोत्तर राजकीय घडामोडी',
          hi: 'विश्वयुद्धोत्तर राजनीतिक घटनाक्रम',
        },
        topicsCount: 4,
        description: {
          en: 'Cold War, Non-Aligned Movement (NAM), End of Cold War, and Globalization.',
          mr: 'शीतयुद्ध, अलिप्ततावादी चळवळ आणि जागतिकीकरण.',
          hi: 'शीतयुद्ध, गुटनिरपेक्ष आंदोलन और वैश्वीकरण।',
        },
        isInteractive: false,
      },
    ],
  },
  {
    id: 'english-language',
    name: {
      en: 'English (Kumarbharati)',
      mr: 'इंग्रजी (English Kumarbharati)',
      hi: 'अंग्रेज़ी (English Kumarbharati)',
    },
    code: 'ENG-09',
    category: 'languages',
    chaptersCount: 16,
    iconName: 'BookMarked',
    colorScheme: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      gradient: 'from-amber-700 to-orange-600',
    },
    overview: {
      en: 'Prose comprehension, Poetry analysis, Grammar synthesis, Vocabulary, and Formal Writing Skills.',
      mr: 'गद्य आकलन, पद्य विश्लेषण, व्याकरण आणि लेखन कौशल्ये.',
      hi: 'गद्य, पद्य विश्लेषण, व्याकरण और लेखन कौशल।',
    },
    hasInteractiveUnits: false,
    chapters: [
      {
        id: 'the-fun-they-had',
        number: 1,
        title: {
          en: 'The Fun They Had & Life',
          mr: 'The Fun They Had',
          hi: 'The Fun They Had',
        },
        topicsCount: 3,
        description: {
          en: 'Textual analysis, Themes of automated learning, Parts of Speech, and Complex sentence formation.',
          mr: 'पाठाचे विश्लेषण, शब्दभेद आणि वाक्यरचना.',
          hi: 'पाठ विश्लेषण और व्याकरण।',
        },
        isInteractive: false,
      },
      {
        id: 'hope-is-the-thing-with-feathers',
        number: 2,
        title: {
          en: 'Hope is the thing with feathers (Poem)',
          mr: 'Hope is the thing with feathers (कविता)',
          hi: 'Hope is the thing with feathers (कविता)',
        },
        topicsCount: 3,
        description: {
          en: 'Poetic devices, Metaphor, Rhyme scheme, and Critical appreciation.',
          mr: 'काव्य सौंदर्य, रूपक अलंकार आणि रसग्रहण.',
          hi: 'काव्य सौंदर्य और अलंकार।',
        },
        isInteractive: false,
      },
    ],
  },
  {
    id: 'marathi-language',
    name: {
      en: 'Marathi (अक्षरभारती / कुमारभारती)',
      mr: 'मराठी (अक्षरभारती / कुमारभारती)',
      hi: 'मराठी (अक्षरभारती / कुमारभारती)',
    },
    code: 'MAR-09',
    category: 'languages',
    chaptersCount: 16,
    iconName: 'Languages',
    colorScheme: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      gradient: 'from-rose-800 to-pink-600',
    },
    overview: {
      en: 'मराठी गद्य, पद्य, स्थूलवाचन, भाषाभ्यास (संधी, समास, वाक्प्रचार) व उपयोजित लेखन.',
      mr: 'मराठी गद्य, पद्य, स्थूलवाचन, भाषाभ्यास (संधी, समास, वाक्प्रचार) व उपयोजित लेखन.',
      hi: 'मराठी गद्य, पद्य और व्यावहारिक व्याकरण।',
    },
    hasInteractiveUnits: false,
    chapters: [
      {
        id: 'sarva-vishwatmaka',
        number: 1,
        title: {
          en: 'सर्व विश्वात्मके (प्रार्थना)',
          mr: 'सर्व विश्वात्मके (प्रार्थना)',
          hi: 'सर्व विश्वात्मके (प्रार्थना)',
        },
        topicsCount: 2,
        description: {
          en: 'भावार्थ, शब्दार्थ आणि संदर्भासहित स्पष्टीकरण.',
          mr: 'भावार्थ, शब्दार्थ आणि संदर्भासहित स्पष्टीकरण.',
          hi: 'भावार्थ और संदर्भ स्पष्टीकरण।',
        },
        isInteractive: false,
      },
      {
        id: 'santkrupa-zhali',
        number: 2,
        title: {
          en: 'संतकृपा झाली (अभंग)',
          mr: 'संतकृपा झाली (अभंग)',
          hi: 'संतकृपा झाली (अभंग)',
        },
        topicsCount: 3,
        description: {
          en: 'संत बहिणाबाईंचा अभंग, विचार सौंदर्य व भाषिक वैशिष्ट्ये.',
          mr: 'संत बहिणाबाईंचा अभंग, विचार सौंदर्य व भाषिक वैशिष्ट्ये.',
          hi: 'संत बहिणाबाई का अभंग और काव्य सौंदर्य।',
        },
        isInteractive: false,
      },
    ],
  },
];
