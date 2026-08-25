import { Chapter, TopicLessonData, QuizQuestion } from '../types';

export const LAWS_OF_MOTION_CHAPTER: Chapter = {
  id: 'laws-of-motion',
  number: 1,
  title: {
    en: 'Laws of Motion',
    mr: 'गतीचे नियम (Laws of Motion)',
    hi: 'गति के नियम (Laws of Motion)',
  },
  description: {
    en: 'Understand what causes motion, inertia, relationship between force and acceleration, and action-reaction pairs according to Sir Isaac Newton.',
    mr: 'गतीचे कारण, जडत्व (Inertia), बल आणि प्रवेग यांमधील संबंध आणि न्यूटनचे गतीविषयक तीन मूलभूत नियम समजावून घ्या.',
    hi: 'गति के कारण, जड़त्व (Inertia), बल और त्वरण के बीच संबंध और न्यूटन के गति के तीन नियमों को विस्तार से समझें।',
  },
  boardReference: 'Maharashtra State Board Science Class 9 (Chapter 1) & NCERT Class 9 Science (Chapter 9)',
  topics: [
    {
      id: 'force',
      number: 1,
      title: {
        en: '1. Force & Types of Forces',
        mr: '१. बल आणि बलाचे प्रकार (Force & Types)',
        hi: '1. बल और बल के प्रकार (Force & Types)',
      },
      description: {
        en: 'What is force? Balanced vs unbalanced forces, contact and non-contact forces, SI units.',
        mr: 'बल म्हणजे काय? संतुलित व असंतुलित बले, संपर्क आणि असंपर्क बले, एकके.',
        hi: 'बल क्या है? संतुलित और असंतुलित बल, संपर्क और गैर-संपर्क बल, मात्रक।',
      },
      estimatedMinutes: 8,
    },
    {
      id: 'newtons-first-law',
      number: 2,
      title: {
        en: "2. Newton's First Law & Inertia",
        mr: '२. न्यूटनचा पहिला नियम व जडत्व (First Law & Inertia)',
        hi: '2. न्यूटन का पहला नियम और जड़त्व (First Law & Inertia)',
      },
      description: {
        en: 'Inertia of rest, motion, and direction. Why objects resist change without unbalanced external force.',
        mr: 'विरामावस्थेचे, गतीचे आणि दिशेचे जडत्व. बाह्य असंतुलित बलाशिवाय वस्तू स्थितीत बदल का करत नाही.',
        hi: 'विराम, गति और दिशा का जड़त्व। वस्तुएं बाहरी असंतुलित बल के बिना बदलाव का विरोध क्यों करती हैं।',
      },
      estimatedMinutes: 10,
    },
    {
      id: 'newtons-second-law',
      number: 3,
      title: {
        en: "3. Newton's Second Law & Momentum",
        mr: '३. न्यूटनचा दुसरा नियम व संवेग (Second Law & Momentum)',
        hi: '3. न्यूटन का दूसरा नियम और संवेग (Second Law & Momentum)',
      },
      description: {
        en: 'Rate of change of momentum, mathematical derivation of F = m × a, and SI units (Newton, dyne).',
        mr: 'संवेग परिवर्तनाचा दर, F = m × a हे सूत्र आणि SI एकक (न्यूटन व डाइन).',
        hi: 'संवेग परिवर्तन की दर, गणितीय सूत्र F = m × a और SI मात्रक (न्यूटन एवं डाइन)।',
      },
      estimatedMinutes: 12,
    },
    {
      id: 'newtons-third-law',
      number: 4,
      title: {
        en: "4. Newton's Third Law & Conservation of Momentum",
        mr: '४. न्यूटनचा तिसरा नियम (Third Law: Action & Reaction)',
        hi: '4. न्यूटन का तीसरा नियम (Third Law: Action & Reaction)',
      },
      description: {
        en: 'Action and reaction forces occur in pairs, act on different bodies simultaneously. Applications in rockets and swimming.',
        mr: 'क्रिया बल आणि प्रतिक्रिया बल नेहमी जोडीने असतात. रॉकेट उड्डाण आणि पोहणे यातील उपयोग.',
        hi: 'क्रिया और प्रतिक्रिया बल सदैव युग्म (जोड़ों) में होते हैं और अलग-अलग वस्तुओं पर कार्य करते हैं।',
      },
      estimatedMinutes: 10,
    },
  ],
};

export const TOPIC_LESSONS: Record<string, TopicLessonData> = {
  force: {
    id: 'force',
    title: {
      en: 'Force and Types of Forces',
      mr: 'बल आणि बलाचे प्रकार',
      hi: 'बल और बल के प्रकार',
    },
    shortDesc: {
      en: 'Force is an interaction that, when unopposed, changes the motion or shape of an object.',
      mr: 'बल ही अशी आंतरक्रिया आहे जी वस्तूची गतीची अवस्था किंवा आकार बदलते.',
      hi: 'बल वह धक्का या खिंचाव है जो किसी वस्तु की गति की अवस्था या आकार को बदल सकता है।',
    },
    keyConcepts: ['Push and Pull', 'Balanced Force', 'Unbalanced Force', 'SI Unit: Newton (N)', 'Contact vs Non-Contact'],
    simpleExplanation: {
      en: 'Think of force as a push or a pull acting upon an object. When you kick a football, push a heavy bench, or pull open a door, you are applying force. A force can make a stationary object move, stop a moving object, change its speed or direction, or even deform its shape (like squeezing dough or stretching a rubber band). When two equal forces act in opposite directions, they cancel each other out (Balanced Force, Net Force = 0). When one force is greater, the object accelerates in that direction (Unbalanced Force).',
      mr: 'बल म्हणजे साध्या भाषेत एखाद्या वस्तूवर दिलेला धक्का किंवा ओढणे होय. जेव्हा तुम्ही फुटबॉलला लाथ मारता, बेंच ढकलतात किंवा दरवाजा ओढतात, तेव्हा तुम्ही बल लावत असता. बल स्थिर वस्तूला गतिमान करू शकते, चालणाऱ्या वस्तूला थांबवू शकते, वेग आणि दिशा बदलू शकते किंवा आकार बदलू शकते (जसे की कणकेचा गोळा दाबणे). जेव्हा दोन्ही बाजूने समान बल लागते, तेव्हा वस्तू हलत नाही (संतुलित बल). जेव्हा एका बाजूचे बल जास्त असते, तेव्हा वस्तू त्या दिशेने सरकते (असंतुलित बल).',
      hi: 'बल को सरल शब्दों में किसी वस्तु पर लगने वाला धक्का (Push) या खिंचाव (Pull) कह सकते हैं। जब आप फुटबॉल को किक करते हैं या दरवाजे को खींचते हैं, तो आप बल लगाते हैं। बल किसी स्थिर वस्तु को गतिशील कर सकता है, चलती वस्तु को रोक सकता है, गति की दिशा बदल सकता है, या आकार बदल सकता है (जैसे रबर खींचना)। जब दो बराबर बल विपरीत दिशा में लगते हैं, तो परिणामी बल शून्य होता है (संतुलित बल)। जब एक दिशा का बल अधिक होता है, तो वस्तु उस दिशा में त्वरित होती है (असंतुलित बल)।',
    },
    keyDefinitions: [
      {
        term: { en: 'Force (F)', mr: 'बल (Force)', hi: 'बल (Force)' },
        definition: {
          en: 'A physical influence (push or pull) that can alter the state of rest, uniform motion, or shape of a body. SI Unit: Newton (N).',
          mr: 'वस्तूच्या विरामावस्थेत किंवा सरळ रेषेतील एकसमान गतीत बदल घडवून आणणारी राशी. SI एकक: न्यूटन (N).',
          hi: 'वह भौतिक कारण जो किसी वस्तु की विराम अवस्था, एकसमान गति या आकार में परिवर्तन करता है। SI मात्रक: न्यूटन (N)।',
        },
      },
      {
        term: { en: 'Balanced vs Unbalanced Force', mr: 'संतुलित वि. असंतुलित बल', hi: 'संतुलित बनाम असंतुलित बल' },
        definition: {
          en: 'Balanced forces have a resultant of zero and cause no change in motion. Unbalanced forces have a non-zero resultant and cause acceleration.',
          mr: 'संतुलित बलांचा परिणामी प्रभाव शून्य असतो व गती बदलत नाही. असंतुलित बलांचा परिणामी प्रभाव शून्येतर असतो आणि प्रवेग निर्माण करतो.',
          hi: 'संतुलित बलों का परिणामी बल शून्य होता है जिससे गति में बदलाव नहीं होता। असंतुलित बलों का परिणामी बल शून्य नहीं होता और यह त्वरण उत्पन्न करता है।',
        },
      },
    ],
    dailyLifeExamples: [
      {
        title: { en: 'Tug of War Game', mr: 'रस्सीखेच खेळ (Tug of War)', hi: 'रस्साकशी का खेल (Tug of War)' },
        description: {
          en: 'When both school teams pull with equal strength (say 500 N each), the knot stays in the middle (Balanced Force). The moment Team A pulls with 600 N, the knot accelerates toward Team A (Unbalanced Force).',
          mr: 'जेव्हा दोन्ही संघ समान ताकदीने दोरी ओढतात, तेव्हा मध्य गाठ हालत नाही (संतुलित बल). एका संघाने जास्त ताकद लावल्यास गाठ तिकडे सरकते (असंतुलित बल).',
          hi: 'जब दोनों टीमें बराबर ताकत से रस्सी खींचती हैं, तो गांठ स्थिर रहती है (संतुलित बल)। जैसे ही एक टीम ज्यादा बल लगाती है, गांठ उस ओर बढ़ जाती है (असंतुलित बल)।',
        },
        iconName: 'Users',
      },
      {
        title: { en: 'Squeezing a Lemon / Clay', mr: 'लिंबू पिळणे किंवा मातीचा गोळा', hi: 'नींबू निचोड़ना या गीली मिट्टी' },
        description: {
          en: 'Muscular force changes the physical shape without necessarily moving the object across the room.',
          mr: 'स्नायू बलामुळे वस्तू पुढे न जाताही तिचा आकार बदलतो.',
          hi: 'पेशीय बल लगाने से वस्तु स्थान बदले बिना अपना आकार बदल लेती है।',
        },
        iconName: 'Hand',
      },
    ],
    workedExample: {
      problem: {
        en: 'Two students, Rohan and Amit, push a heavy wooden box on a smooth floor. Rohan pushes to the right with 40 N, and Amit pushes to the left with 25 N. Find the magnitude and direction of the net force.',
        mr: 'रोहन आणि अमित एका लाकडी पेटीवर बल लावतात. रोहन उजवीकडे ४० N बल लावतो, तर अमित डावीकडे २५ N बल लावतो. परिणामी बल व दिशा शोधा.',
        hi: 'रोहन और अमित एक भारी बक्से पर बल लगाते हैं। रोहन दाईं ओर 40 N और अमित बाईं ओर 25 N का बल लगाता है। परिणामी बल का मान और दिशा ज्ञात कीजिए।',
      },
      given: {
        en: 'Force by Rohan (F₁) = +40 N (Right), Force by Amit (F₂) = -25 N (Left)',
        mr: 'रोहनचे बल (F₁) = +४० N (उजवीकडे), अमितचे बल (F₂) = -२५ N (डावीकडे)',
        hi: 'रोहन का बल (F₁) = +40 N (दाएं), अमित का बल (F₂) = -25 N (बाएं)',
      },
      formula: 'F_net = F_1 - F_2',
      steps: [
        {
          en: 'Step 1: Identify opposite directions. Take Right as positive (+), Left as negative (-).',
          mr: 'पायरी १: विरुद्ध दिशा ओळखा. उजवी दिशा धन (+) आणि डावी दिशा ऋण (-) माना.',
          hi: 'चरण 1: विपरीत दिशाओं को पहचानें। दाईं ओर धनात्मक (+) और बाईं ओर ऋणात्मक (-) मानें।',
        },
        {
          en: 'Step 2: Calculate net resultant force = 40 N - 25 N = 15 N.',
          mr: 'पायरी २: परिणामी बल = ४० N - २५ N = १५ N.',
          hi: 'चरण 2: परिणामी बल की गणना करें = 40 N - 25 N = 15 N.',
        },
      ],
      answer: {
        en: 'Net Force = 15 N towards the Right (Unbalanced force, box moves right).',
        mr: 'परिणामी बल = १५ N उजवीकडे (असंतुलित बल, पेटी उजवीकडे सरकेल).',
        hi: 'परिणामी बल = 15 N दाईं ओर (असंतुलित बल, बक्सा दाईं ओर खिसकेगा)।',
      },
    },
    commonMistakes: [
      {
        myth: {
          en: 'A continuous force is required to keep an object moving at a constant speed.',
          mr: 'वस्तूला सतत चालत ठेवण्यासाठी सतत बाह्य बल लागत राहते.',
          hi: 'किसी वस्तु को स्थिर चाल से चलाने के लिए निरंतर बल की आवश्यकता होती है।',
        },
        reality: {
          en: 'In a frictionless environment, an object moves forever at constant velocity with ZERO net force (Galileo / Newton 1st Law). On Earth, we push continuously only to overcome opposing friction!',
          mr: 'घर्षण नसलेल्या जागेत वस्तू शून्य बलावरही कायम चालत राहते. पृथ्वीवर केवळ घर्षण बलाचा विरोध करण्यासाठी आपल्याला सतत ढकलावे लागते!',
          hi: 'घर्षण रहित स्थान पर बिना किसी बल के भी वस्तु निरंतर चलती रहेगी। पृथ्वी पर हमें केवल घर्षण का सामना करने के लिए बल लगाना पड़ता है!',
        },
        why: {
          en: 'Students confuse "overcoming friction" with the fundamental requirement for motion.',
          mr: 'विद्यार्थी घर्षण विरोध आणि गतीचे मूळ नियम यात गल्लत करतात.',
          hi: 'छात्र घर्षण बल और गति की मूल अवस्था में भ्रमित हो जाते हैं।',
        },
      },
    ],
    recapPoints: [
      { en: 'Force is a vector quantity (has magnitude and direction).', mr: 'बल ही सदिश राशी आहे (परिमाण आणि दिशा दोन्ही असतात).', hi: 'बल एक सदिश राशि है (परिमाण और दिशा दोनों होते हैं)।' },
      { en: 'Balanced forces maintain state of rest or uniform velocity.', mr: 'संतुलित बलांमुळे गतीची स्थिती बदलत नाही.', hi: 'संतुलित बल वस्तु की अवस्था में परिवर्तन नहीं करते।' },
      { en: 'Unbalanced forces produce acceleration.', mr: 'असंतुलित बलांमुळे प्रवेग निर्माण होतो.', hi: 'असंतुलित बल त्वरण उत्पन्न करते हैं।' },
      { en: '1 Newton = 1 kg × 1 m/s² = 10⁵ dyne.', mr: '१ न्यूटन = १ किग्रॅ × १ मी/से² = १०⁵ डाइन.', hi: '1 न्यूटन = 1 kg × 1 m/s² = 10⁵ डाइन।' },
    ],
    diagramType: 'force_vectors',
    interactiveSimHint: {
      en: 'Drag the left and right force sliders below to see balanced vs unbalanced force effects on the wooden cart in real-time!',
      mr: 'खालील स्लाइडर्स वापरून लाकडी गाडीवर संतुलित व असंतुलित बलांचा प्रत्यक्ष परिणाम अनुभवा!',
      hi: 'नीचे दिए गए स्लाइडर्स से लकड़ी की गाड़ी पर संतुलित और असंतुलित बल का सीधा प्रभाव देखें!',
    },
  },

  'newtons-first-law': {
    id: 'newtons-first-law',
    title: {
      en: "Newton's First Law of Motion (Law of Inertia)",
      mr: 'न्यूटनचा पहिला गतीविषयक नियम (जडत्वाचा नियम)',
      hi: 'न्यूटन का प्रथम गति नियम (जड़त्व का नियम)',
    },
    shortDesc: {
      en: 'An object remains in a state of rest or uniform motion unless acted upon by an external unbalanced force.',
      mr: 'जर वस्तूवर कोणतेही बाह्य असंतुलित बल कार्यरत नसेल, तर ती विराम किंवा एकसमान गतीत कायम राहते.',
      hi: 'कोई वस्तु तब तक अपनी विराम या एकसमान गति की अवस्था में रहती है जब तक उस पर कोई बाहरी असंतुलित बल न लगे।',
    },
    keyConcepts: ['Inertia of Rest', 'Inertia of Motion', 'Inertia of Direction', 'Mass as Measure of Inertia'],
    simpleExplanation: {
      en: "Newton's First Law tells us that objects are 'lazy'—they resist any change to their current state! This natural resistance to change is called Inertia. There are 3 types of inertia:\n1. Inertia of Rest: A book on a table won't move until you push it.\n2. Inertia of Motion: When a bus suddenly brakes, your body jerks forward because your upper body wants to keep moving at the same speed!\n3. Inertia of Direction: When a car takes a sharp turn to the left, passengers lean to the right because their bodies want to keep moving straight.\n\nHeavier objects have greater inertia because Mass is the quantitative measure of inertia.",
      mr: 'न्यूटनचा पहिला नियम सांगतो की सर्व वस्तूंमध्ये स्वतःच्या मूळ स्थितीत टिकून राहण्याची नैसर्गिक प्रवृत्ती असते, यालाच "जडत्व" (Inertia) म्हणतात. जडत्वाचे ३ प्रकार आहेत:\n१. विरामावस्थेचे जडत्व: टेबलवरील पुस्तक जोपर्यंत तुम्ही हलवत नाही तोपर्यंत हलणार नाही.\n२. गतीचे जडत्व: धावणारी बस अचानक थांबल्यास प्रवाशांचा वरचा भाग पुढे झुकतो कारण शरीर पुढे जाण्याचा प्रयत्न करते!\n३. दिशेचे जडत्व: गाडीने अचानक डावीकडे वळण घेतल्यास प्रवासी उजवीकडे झुकतात.\n\nवस्तूचे वस्तुमान (Mass) जेवढे जास्त, तेवढे तिचे जडत्व जास्त असते.',
      hi: 'न्यूटन का पहला नियम बताता है कि प्रत्येक वस्तु अपनी वर्तमान अवस्था में बने रहने का प्रयास करती है। इस स्वाभाविक गुण को "जड़त्व" (Inertia) कहते हैं। जड़त्व 3 प्रकार का होता है:\n1. विराम का जड़त्व: मेज पर रखी किताब बिना छुए नहीं हिलेगी।\n2. गति का जड़त्व: चलती बस के अचानक रुकने पर हमारा शरीर आगे की ओर झुकता है।\n3. दिशा का जड़त्व: गाड़ी के अचानक मुड़ने पर हमारा शरीर विपरीत दिशा में झुकता है।\n\nद्रव्यमान (Mass) जड़त्व की माप है। जिस वस्तु का द्रव्यमान जितना अधिक, उसका जड़त्व उतना ही अधिक होगा।',
    },
    keyDefinitions: [
      {
        term: { en: "Newton's First Law", mr: 'न्यूटनचा पहिला नियम', hi: 'न्यूटन का प्रथम नियम' },
        definition: {
          en: 'Every body continues in its state of rest or of uniform motion in a straight line unless compelled to change that state by an applied external unbalanced force.',
          mr: 'एखाद्या वस्तूवर कोणतेही बाह्य असंतुलित बल कार्य करत नसेल, तर तिच्या विरामावस्थेत किंवा सरळ रेषेतील एकसमान गतीत सातत्य राहते.',
          hi: 'प्रत्येक वस्तु अपनी विराम अवस्था अथवा सरल रेखा में एकसमान गति की अवस्था में तब तक बनी रहती है जब तक उस पर कोई बाह्य असंतुलित बल न लगे।',
        },
      },
      {
        term: { en: 'Inertia', mr: 'जडत्व (Inertia)', hi: 'जड़त्व (Inertia)' },
        definition: {
          en: 'The inherent property of a body to resist any change in its state of rest or uniform motion. Mass is the measure of inertia.',
          mr: 'वस्तूच्या गतीच्या मूळ स्थितीत होणाऱ्या बदलास विरोध करण्याच्या स्वाभाविक प्रवृत्तीला जडत्व म्हणतात. वस्तुमान हे जडत्वाचे माप आहे.',
          hi: 'किसी वस्तु का वह अंतर्निहित गुण जिसके कारण वह अपनी विराम या गति की अवस्था में परिवर्तन का विरोध करती है।',
        },
      },
    ],
    dailyLifeExamples: [
      {
        title: { en: 'Sudden Bus Braking & Seatbelts', mr: 'बसचा अचानक ब्रेक आणि सीटबेल्ट', hi: 'बस का अचानक ब्रेक और सीटबेल्ट' },
        description: {
          en: 'When a moving bus stops abruptly, our feet stop with the floor due to friction, but our upper torso continues moving forward due to inertia of motion. Seatbelts apply an external force to safely halt our upper body!',
          mr: 'धावत्या बसने अचानक ब्रेक लावल्यास प्रवाशांचा वरचा भाग गतीच्या जडत्वामुळे पुढे फेकला जातो. सीटबेल्ट आपल्याला सुरक्षित ठेवतात.',
          hi: 'चलती बस के रुकने पर शरीर का ऊपरी हिस्सा गति के जड़त्व के कारण आगे की ओर झुकता है। सीटबेल्ट हमें सुरक्षित रोकती है।',
        },
        iconName: 'ShieldAlert',
      },
      {
        title: { en: 'Coin on Cardboard Experiment', mr: 'ग्लासवरील पुठ्ठा आणि नाण्याचे प्रात्यक्षिक', hi: 'गिलास पर कार्डबोर्ड और सिक्के का प्रयोग' },
        description: {
          en: 'Place a coin on a smooth card covering a glass. Flick the card quickly. The card shoots away, but the coin drops straight into the glass because of inertia of rest!',
          mr: 'ग्लासवर पुठ्ठा ठेवून त्यावर नाणे ठेवा. पुठ्ठ्याला टिचकी मारल्यास पुठ्ठा उडून जातो पण नाणे विरामाच्या जडत्वामुळे थेट ग्लासात पडते!',
          hi: 'गिलास पर रखे कार्डबोर्ड को तेजी से उंगली से झटका देने पर कार्ड उड़ जाता है और सिक्का विराम के जड़त्व के कारण सीधे गिलास में गिरता है!',
        },
        iconName: 'CircleDollarSign',
      },
    ],
    workedExample: {
      problem: {
        en: 'A cricket ball (mass 0.16 kg) and a heavy iron shotput (mass 5 kg) are resting on grass. Which one has greater inertia and requires more force to set in motion with the same acceleration?',
        mr: 'एक क्रिकेटचा चेंडू (वस्तुमान ०.१६ किग्रॅ) आणि गोळाफेकीचा लोखंडी गोळा (वस्तुमान ५ किग्रॅ) गवतावर ठेवले आहेत. कोणाचे जडत्व जास्त आहे?',
        hi: 'एक क्रिकेट की गेंद (द्रव्यमान 0.16 kg) और एक लोहे का गोला (द्रव्यमान 5 kg) घास पर रखे हैं। किसका जड़त्व अधिक होगा?',
      },
      given: {
        en: 'Mass of cricket ball (m₁) = 0.16 kg, Mass of shotput (m₂) = 5.0 kg',
        mr: 'क्रिकेट चेंडू वस्तुमान (m₁) = ०.१६ किग्रॅ, गोळ्याचे वस्तुमान (m₂) = ५.० किग्रॅ',
        hi: 'गेंद का द्रव्यमान (m₁) = 0.16 kg, गोले का द्रव्यमान (m₂) = 5.0 kg',
      },
      formula: 'Inertia \\propto Mass',
      steps: [
        {
          en: 'Step 1: Inertia depends directly on the mass of the object.',
          mr: 'पायरी १: जडत्व हे थेट वस्तूच्या वस्तुमानावर अवलंबून असते.',
          hi: 'चरण 1: जड़त्व सीधे वस्तु के द्रव्यमान पर निर्भर करता है।',
        },
        {
          en: 'Step 2: Since m₂ (5 kg) >> m₁ (0.16 kg), the iron shotput has ~31 times higher inertia.',
          mr: 'पायरी २: ५ किग्रॅ हे ०.१६ किग्रॅ पेक्षा खूप जास्त असल्याने लोखंडी गोळ्याचे जडत्व खूप जास्त आहे.',
          hi: 'चरण 2: 5 kg द्रव्यमान 0.16 kg से अधिक होने के कारण लोहे के गोले का जड़त्व अधिक होगा।',
        },
      ],
      answer: {
        en: 'The 5 kg shotput has much greater inertia and demands a significantly larger force to overcome its inertia of rest.',
        mr: '५ किग्रॅ वस्तुमानाच्या लोखंडी गोळ्याचे जडत्व खूप जास्त आहे, म्हणून त्याला हलवण्यासाठी जास्त बल लागेल.',
        hi: '5 kg के लोहे के गोले का जड़त्व अधिक होगा और इसे गति देने के लिए अधिक बल की आवश्यकता होगी।',
      },
    },
    commonMistakes: [
      {
        myth: {
          en: 'Heavier objects fall faster in a vacuum because they have more inertia.',
          mr: 'वजनदार वस्तू निर्वात पोकळीत लवकर खाली पडतात कारण त्यांचे जडत्व जास्त असते.',
          hi: 'भारी वस्तुएं निर्वात में तेजी से गिरती हैं क्योंकि उनका जड़त्व अधिक होता है।',
        },
        reality: {
          en: 'In a vacuum, gravity pulls heavier objects with more force, but their greater inertia resists acceleration equally! Both fall with exact same acceleration (g = 9.8 m/s²).',
          mr: 'निर्वात पोकळीत वस्तुमान काहीही असले तरी सर्व वस्तू एकाच प्रवेगाने (g = ९.८ मी/से²) खाली पडतात.',
          hi: 'निर्वात में सभी वस्तुएं समान गुरुत्वीय त्वरण (g = 9.8 m/s²) से एक साथ गिरती हैं।',
        },
        why: {
          en: 'Confusing gravitational force with gravitational acceleration.',
          mr: 'गुरुत्वीय बल आणि गुरुत्वीय प्रवेग यातील फरक लक्षात न आल्यामुळे.',
          hi: 'गुरुत्वाकर्षण बल और गुरुत्वीय त्वरण के अंतर को न समझने के कारण।',
        },
      },
    ],
    recapPoints: [
      { en: "Newton's First Law is also known as the Law of Inertia.", mr: 'पहिल्या नियमाला जडत्वाचा नियम (Law of Inertia) म्हणतात.', hi: 'प्रथम नियम को जड़त्व का नियम भी कहा जाता है।' },
      { en: 'Mass is the quantitative measure of inertia.', mr: 'वस्तुमान हे जडत्वाचे परिमाणात्मक माप आहे.', hi: 'द्रव्यमान जड़त्व की माप है।' },
      { en: 'Qualitatively defines force as that which causes a change in inertia.', mr: 'बल म्हणजे जडत्वात बदल घडवणारी गोष्ट, अशी व्याख्या हा नियम देतो.', hi: 'यह नियम बल की गुणात्मक परिभाषा देता है।' },
    ],
    diagramType: 'inertia_bus',
    interactiveSimHint: {
      en: 'Press the "Sudden Brake" and "Sudden Accelerate" buttons in the simulator to see passenger inertia in action!',
      mr: 'सिम्युलेटरमधील "ब्रेक" आणि "स्पीड" बटणे दाबून प्रवाशांच्या जडत्वाचा प्रत्यक्ष अनुभव घ्या!',
      hi: 'सिम्युलेटर में "ब्रेक" और "त्वरण" बटन दबाकर जड़त्व का व्यावहारिक असर देखें!',
    },
  },

  'newtons-second-law': {
    id: 'newtons-second-law',
    title: {
      en: "Newton's Second Law of Motion (Force & Momentum)",
      mr: 'न्यूटनचा दुसरा गतीविषयक नियम (बल आणि संवेग)',
      hi: 'न्यूटन का द्वितीय गति नियम (बल और संवेग)',
    },
    shortDesc: {
      en: 'The rate of change of momentum of an object is proportional to the applied unbalanced force in the direction of the force: F = m × a.',
      mr: 'संवेग परिवर्तनाचा दर प्रयुक्त बलाशी समानुपाती असतो आणि संवेगाचे परिवर्तन बलाच्या दिशेने होते: F = m × a.',
      hi: 'संवेग परिवर्तन की दर लगाए गए असंतुलित बल के समानुपाती होती है और बल की दिशा में होती है: F = m × a।',
    },
    keyConcepts: ['Momentum (p = m × v)', 'Rate of change of momentum', 'F = m × a', 'Units: Newton (N), dyne', 'Impulse & catching a cricket ball'],
    simpleExplanation: {
      en: "While the 1st law defines force qualitatively, the 2nd law gives us the exact mathematical equation to calculate force! First, what is Momentum (p)? It is the 'quantity of motion' = Mass × Velocity (p = m × v). A speeding bullet (small mass, huge velocity) and a slow moving train (huge mass, low velocity) both have massive momentum and are hard to stop!\n\nNewton's Second Law says: Force = Rate of change of momentum = (m(v - u)) / t = m × a. Thus: Force (F) = mass (m) × acceleration (a).",
      mr: 'पहिल्या नियमाने बलाची व्याख्या दिली, तर दुसरा नियम बल मोजण्याचे गणितीय सूत्र देतो! आधी संवेग (Momentum) समजा: संवेग = वस्तुमान × वेग (p = m × v). बंदुकीची वेगाने जाणारी लहान गोळी आणि हळू धावणारी प्रचंड मोठी रेल्वे गाडी दोघांचाही संवेग प्रचंड असतो.\n\nन्यूटनचा दुसरा नियम सांगतो: संवेग परिवर्तनाचा दर प्रयुक्त बलाशी समप्रमाणात असतो. म्हणजेच: बल (F) = वस्तुमान (m) × प्रवेग (a).',
      hi: 'प्रथम नियम बल की परिभाषा देता है, जबकि द्वितीय नियम बल की गणना का गणितीय सूत्र देता है! संवेग (Momentum) = द्रव्यमान × वेग (p = m × v)। तेजी से आती छोटी गोली और धीरे चलती विशाल ट्रेन दोनों का संवेग बहुत अधिक होता है।\n\nन्यूटन का दूसरा नियम: बल = संवेग परिवर्तन की दर = द्रव्यमान (m) × त्वरण (a)। अतः F = m × a।',
    },
    keyDefinitions: [
      {
        term: { en: 'Momentum (p)', mr: 'संवेग (Momentum)', hi: 'संवेग (Momentum)' },
        definition: {
          en: 'The product of mass and velocity of an object: p = m × v. Vector quantity. SI Unit: kg·m/s.',
          mr: 'वस्तूचे वस्तुमान आणि वेग यांच्या गुणाकाराला संवेग म्हणतात: p = m × v. SI एकक: किग्रॅ·मी/से.',
          hi: 'वस्तु के द्रव्यमान और वेग का गुणनफल संवेग कहलाता है: p = m × v। मात्रक: kg·m/s।',
        },
      },
      {
        term: { en: "Newton's Second Law Equation", mr: 'न्यूटनचे दुसरे समीकरण', hi: 'न्यूटन का द्वितीय समीकरण' },
        definition: {
          en: 'Force = mass × acceleration (F = m × a). 1 Newton is the force that produces an acceleration of 1 m/s² in an object of 1 kg mass.',
          mr: 'बल = वस्तुमान × प्रवेग (F = m × a). १ किग्रॅ वस्तुमानाच्या वस्तूत १ मी/से² प्रवेग निर्माण करणाऱ्या बलाला १ न्यूटन म्हणतात.',
          hi: 'बल = द्रव्यमान × त्वरण (F = m × a)। 1 किग्रा द्रव्यमान में 1 m/s² त्वरण उत्पन्न करने वाला बल 1 न्यूटन होता है।',
        },
      },
    ],
    dailyLifeExamples: [
      {
        title: { en: 'Cricket Fielder Pulling Hands Back', mr: 'कॅच पकडताना खेळाडू हात मागे घेणे', hi: 'कैच पकड़ते समय खिलाड़ी का हाथ पीछे खींचना' },
        description: {
          en: 'When catching a fast cricket ball, the fielder moves their hands backward with the ball. This increases the time (t) taken to stop the ball, reducing the rate of change of momentum (F = Δp / Δt), thus protecting the hands from hurting!',
          mr: 'क्रिकेट खेळाडू वेगाने येणारा चेंडू झेलताना हात मागे घेतो. यामुळे चेंडू थांबण्याचा वेळ वाढतो आणि हातावर लागणारे बल खूप कमी होते.',
          hi: 'तेज गेंद पकड़ते समय खिलाड़ी हाथ पीछे की ओर खींचता है जिससे समय (t) बढ़ता है और हाथ पर लगने वाला बल कम हो जाता है।',
        },
        iconName: 'Activity',
      },
      {
        title: { en: 'Car Airbags & Seatbelts', mr: 'गाडीतील एअरबॅग्ज (Airbags)', hi: 'कार के एयरबैग्स (Airbags)' },
        description: {
          en: 'During a collision, airbags inflate to increase the stopping time of the passenger, dramatically reducing the impact force on the chest and head.',
          mr: 'अपघाताच्या वेळी एअरबॅग उघडल्याने प्रवाशाचा वेग शून्य होण्यासाठी मिळणारा वेळ वाढतो व शरीरावर होणारा आघात कमी होतो.',
          hi: 'दुर्घटना के समय एयरबैग खुलने से शरीर को रुकने का अधिक समय मिलता है और चोट का बल कम हो जाता है।',
        },
        iconName: 'Shield',
      },
    ],
    workedExample: {
      problem: {
        en: 'A constant force acts on an object of mass 5 kg for a duration of 2 seconds. It increases the object\'s velocity from 3 m/s to 7 m/s. Find the magnitude of the applied force.',
        mr: '५ किग्रॅ वस्तुमानाच्या वस्तूवर २ सेकंदांसाठी एक बल लावले जाते. त्यामुळे तिचा वेग ३ मी/से वरून ७ मी/से होतो. प्रयुक्त बलाचे मूल्य काढा.',
        hi: '5 kg द्रव्यमान की वस्तु पर 2 सेकंड के लिए एक बल लगता है, जिससे उसका वेग 3 m/s से बढ़कर 7 m/s हो जाता है। लगाए गए बल का मान ज्ञात कीजिए।',
      },
      given: {
        en: 'Mass (m) = 5 kg, Initial velocity (u) = 3 m/s, Final velocity (v) = 7 m/s, Time (t) = 2 s',
        mr: 'वस्तुमान (m) = ५ किग्रॅ, सुरुवातीचा वेग (u) = ३ मी/से, अंतिम वेग (v) = ७ मी/से, वेळ (t) = २ से',
        hi: 'द्रव्यमान (m) = 5 kg, प्रारंभिक वेग (u) = 3 m/s, अंतिम वेग (v) = 7 m/s, समय (t) = 2 s',
      },
      formula: 'a = (v - u) / t  and  F = m * a',
      steps: [
        {
          en: 'Step 1: Calculate acceleration: a = (7 - 3) / 2 = 4 / 2 = 2 m/s².',
          mr: 'पायरी १: प्रवेग काढा: a = (७ - ३) / २ = ४ / २ = २ मी/से².',
          hi: 'चरण 1: त्वरण ज्ञात करें: a = (7 - 3) / 2 = 4 / 2 = 2 m/s²।',
        },
        {
          en: 'Step 2: Calculate force: F = m × a = 5 kg × 2 m/s² = 10 N.',
          mr: 'पायरी २: बल काढा: F = m × a = ५ किग्रॅ × २ मी/से² = १० N.',
          hi: 'चरण 2: बल ज्ञात करें: F = m × a = 5 kg × 2 m/s² = 10 N।',
        },
      ],
      answer: {
        en: 'Applied Force = 10 Newton (N).',
        mr: 'प्रयुक्त बल = १० न्यूटन (N).',
        hi: 'लगाया गया बल = 10 न्यूटन (N)।',
      },
    },
    commonMistakes: [
      {
        myth: {
          en: 'Doubling the mass while keeping force constant doubles the acceleration.',
          mr: 'बल तेच ठेवून वस्तुमान दुप्पट केल्यास प्रवेगही दुप्पट होतो.',
          hi: 'बल समान रखकर द्रव्यमान दोगुना करने पर त्वरण भी दोगुना हो जाता है।',
        },
        reality: {
          en: 'Because a = F / m, acceleration is inversely proportional to mass! Doubling mass HALVES the acceleration.',
          mr: 'a = F / m असल्यामुळे वस्तुमान दुप्पट केल्यास प्रवेग निमूटपणे अर्धा होतो!',
          hi: 'चूंकि a = F / m, द्रव्यमान दोगुना करने पर त्वरण आधा (Half) रह जाता है!',
        },
        why: {
          en: 'Forgetting that mass is in the denominator of the acceleration formula.',
          mr: 'सूत्रात वस्तुमान हे छेदस्थानी असते हे विसरल्यामुळे.',
          hi: 'सूत्र में द्रव्यमान हर (denominator) में होता है, यह भूल जाने के कारण।',
        },
      },
    ],
    recapPoints: [
      { en: 'Force formula: F = m × a = (p₂ - p₁) / t.', mr: 'बलाचे सूत्र: F = m × a = (p₂ - p₁) / t.', hi: 'बल का सूत्र: F = m × a = (p₂ - p₁) / t।' },
      { en: '1 N = 10⁵ dyne in CGS units.', mr: '१ न्यूटन = १०⁵ डाइन (CGS पद्धती).', hi: '1 N = 10⁵ dyne (CGS मात्रक)।' },
      { en: 'Longer impact time reduces stopping impact force.', mr: 'आघाताचा वेळ वाढवल्यास लागणारे बल कमी होते.', hi: 'समय बढ़ाने पर आघात का बल कम हो जाता है।' },
    ],
    diagramType: 'f_ma_calc',
    interactiveSimHint: {
      en: 'Adjust mass (m) and force (F) in the calculator simulator to observe how acceleration responds instantaneously!',
      mr: 'कॅल्क्युलेटर सिम्युलेटरमध्ये वस्तुमान आणि बल बदलून प्रवेगावर होणारा त्वरित परिणाम तपासा!',
      hi: 'कैलकुलेटर सिम्युलेटर में द्रव्यमान और बल बदलकर देखें कि त्वरण पर क्या प्रभाव पड़ता है!',
    },
  },

  'newtons-third-law': {
    id: 'newtons-third-law',
    title: {
      en: "Newton's Third Law of Motion (Action & Reaction)",
      mr: 'न्यूटनचा तिसरा गतीविषयक नियम (क्रिया व प्रतिक्रिया बल)',
      hi: 'न्यूटन का तृतीय गति नियम (क्रिया और प्रतिक्रिया)',
    },
    shortDesc: {
      en: 'To every action, there is always an equal and opposite reaction; they act on two different bodies.',
      mr: 'प्रत्येक क्रिया बलास नेहमी समान परिमाणाचे आणि विरुद्ध दिशेने कार्य करणारे प्रतिक्रिया बल असते.',
      hi: 'प्रत्येक क्रिया के बराबर और विपरीत दिशा में प्रतिक्रिया होती है; ये दो भिन्न वस्तुओं पर कार्य करते हैं।',
    },
    keyConcepts: ['Action-Reaction Pairs', 'Simultaneous Occurrence', 'Act on Different Bodies', 'Rocket Propulsion', 'Recoil of Gun'],
    simpleExplanation: {
      en: "Forces in nature NEVER exist in isolation—they always come in pairs! Newton's Third Law states:\n'To every action, there is an equal and opposite reaction.'\n\nCrucial Rules of 3rd Law:\n1. Action and reaction forces are equal in magnitude.\n2. They are opposite in direction.\n3. THEY ACT ON TWO DIFFERENT OBJECTS SIMULTANEOUSLY! This is why they never cancel each other out to zero motion.\n\nExamples:\n- When a swimmer pushes the water backward (Action on water), the water pushes the swimmer forward (Reaction on swimmer).\n- In a rocket (ISRO Chandrayaan / PSLV), burning gases shoot downwards at high velocity (Action), pushing the rocket upwards into space (Reaction).",
      mr: 'निसर्गात बल कधीही एकटे नसते—ते नेहमी जोडीने असते! न्यूटनचा तिसरा नियम सांगतो:\n"प्रत्येक क्रिया बलास समान परिमाणाचे व विरुद्ध दिशेचे प्रतिक्रिया बल असते."\n\nमहत्त्वाचे नियम:\n१. क्रिया आणि प्रतिक्रिया बल समान ताकदीचे असतात.\n२. त्यांची दिशा एकमेकांच्या विरुद्ध असते.\n३. ते दोन वेगळ्या वस्तूंवर एकाच वेळी कार्य करतात! म्हणूनच ते एकमेकांना शून्य करत नाहीत.\n\nउदाहरणे:\n- पोहताना व्यक्ती पाणी मागे ढकलते (क्रिया), पाणी व्यक्तीला पुढे ढकलते (प्रतिक्रिया).\n- रॉकेटमधून धूर खाली जोराने बाहेर पडतो (क्रिया) आणि रॉकेट अवकाशात वर झेपावते (प्रतिक्रिया).',
      hi: 'प्रकृति में बल कभी अकेले नहीं होते—वे हमेशा जोड़ों में आते हैं! न्यूटन का तीसरा नियम कहता है:\n"प्रत्येक क्रिया के बराबर तथा विपरीत प्रतिक्रिया होती है।"\n\nमहत्वपूर्ण नियम:\n1. दोनों बल परिमाण में बराबर होते हैं।\n2. दिशा में एक-दूसरे के विपरीत होते हैं।\n3. वे दो अलग-अलग वस्तुओं पर एक साथ कार्य करते हैं! इसलिए वे एक-दूसरे को निरस्त (Cancel) नहीं करते।\n\nउदाहरण:\n- तैराक पानी को पीछे धकेलता है (क्रिया), पानी तैराक को आगे धकेलता है (प्रतिक्रिया)।\n- रॉकेट से गैसें नीचे निकलती हैं (क्रिया), जिससे रॉकेट ऊपर उड़ता है (प्रतिक्रिया)।',
    },
    keyDefinitions: [
      {
        term: { en: "Newton's Third Law", mr: 'न्यूटनचा तिसरा नियम', hi: 'न्यूटन का तृतीय नियम' },
        definition: {
          en: 'Whenever one body exerts a force on a second body, the second body exerts an equal and opposite force on the first body.',
          mr: 'जेव्हा एक वस्तू दुसऱ्या वस्तूवर बल लावते, तेव्हा दुसरी वस्तूही पहिल्या वस्तूवर तेवढ्याच परिमाणाचे विरुद्ध दिशेने बल लावते.',
          hi: 'जब एक वस्तु दूसरी वस्तु पर बल लगाती है, तो दूसरी वस्तु भी पहली वस्तु पर उतना ही विपरीत बल लगाती है।',
        },
      },
      {
        term: { en: 'Action-Reaction Pair', mr: 'क्रिया-प्रतिक्रिया जोडी', hi: 'क्रिया-प्रतिक्रिया युग्म' },
        definition: {
          en: 'Two simultaneous, equal and opposite forces acting between two interacting bodies. F_AB = - F_BA.',
          mr: 'दोन वस्तूंमधील परस्पर आंतरक्रियेदरम्यान निर्माण होणारी दोन समान व विरुद्ध दिशेची बले. F_AB = - F_BA.',
          hi: 'दो परस्पर क्रियाशील वस्तुओं के बीच लगने वाले दो समान और विपरीत बल। F_AB = - F_BA।',
        },
      },
    ],
    dailyLifeExamples: [
      {
        title: { en: 'Walking on Ground', mr: 'जमिनीवर चालणे', hi: 'जमीन पर चलना' },
        description: {
          en: 'Your foot pushes the ground backward and downward (Action). The ground pushes your foot forward and upward with equal force (Reaction), allowing you to walk forward.',
          mr: 'चालताना आपला पाय जमिनीला मागे ढकलतो (क्रिया). जमीन आपल्या पायाला तेवढ्याच बलाने पुढे ढकलते (प्रतिक्रिया).',
          hi: 'चलते समय हमारा पैर जमीन को पीछे धकेलता है (क्रिया)। जमीन हमारे पैर को आगे धकेलती है (प्रतिक्रिया)।',
        },
        iconName: 'Footprints',
      },
      {
        title: { en: 'Recoil of a Gun / Rifle', mr: 'बंदुकीचा झटका (Recoil)', hi: 'बंदूक का पीछे झटका मारना (Recoil)' },
        description: {
          en: 'When a bullet is fired forward with high force (Action), the gun pushes backward into the shooter shoulder with equal force (Reaction).',
          mr: 'गोळी वेगाने पुढे निघताना (क्रिया) बंदूक चालवणाऱ्याच्या खांद्यावर मागे झटका बसतो (प्रतिक्रिया).',
          hi: 'गोली तेजी से आगे निकलती है (क्रिया), जिससे बंदूक पीछे की ओर झटका देती है (प्रतिक्रिया)।',
        },
        iconName: 'Target',
      },
    ],
    workedExample: {
      problem: {
        en: 'A person of mass 60 kg stands on a frictionless skateboard and throws a heavy medicine ball of mass 4 kg forward with a force of 120 N. What is the reaction force experienced by the person?',
        mr: '६० किग्रॅ वस्तुमानाची व्यक्ती स्केटबोर्डवर उभी राहून ४ किग्रॅ चा चेंडू १२० N बलाने पुढे फेकते. व्यक्तीवर लागणारे प्रतिक्रिया बल किती असेल?',
        hi: '60 kg का व्यक्ति 4 kg की गेंद को 120 N के बल से आगे फेंकता है। व्यक्ति पर लगने वाला प्रतिक्रिया बल क्या होगा?',
      },
      given: {
        en: 'Action force applied on ball (F_ball) = +120 N (Forward)',
        mr: 'चेंडूवर प्रयुक्त क्रिया बल = +१२० N (पुढे)',
        hi: 'गेंद पर लगाया गया क्रिया बल = +120 N (आगे)',
      },
      formula: 'F_reaction = - F_action  (Newton\'s 3rd Law)',
      steps: [
        {
          en: 'Step 1: According to Newton\'s 3rd Law, Action Force = Reaction Force in magnitude, but opposite in sign.',
          mr: 'पायरी १: न्यूटनच्या ३ ऱ्या नियमानुसार, क्रिया आणि प्रतिक्रिया बलांचे परिमाण तंतोतंत समान असते पण दिशा उलट असते.',
          hi: 'चरण 1: न्यूटन के तीसरे नियम के अनुसार, क्रिया बल और प्रतिक्रिया बल का मान बराबर और दिशा विपरीत होती है।',
        },
        {
          en: 'Step 2: F_person = -120 N (Backward).',
          mr: 'पायरी २: व्यक्तीवरील प्रतिक्रिया बल = -१२० N (मागे).',
          hi: 'चरण 2: व्यक्ति पर प्रतिक्रिया बल = -120 N (पीछे)।',
        },
      ],
      answer: {
        en: 'The person experiences a reaction force of 120 N backwards (moving backwards on the skateboard).',
        mr: 'व्यक्तीला १२० N चे प्रतिक्रिया बल मागच्या दिशेने जाणवेल आणि स्केटबोर्ड मागे सरकेल.',
        hi: 'व्यक्ति को पीछे की ओर 120 N का प्रतिक्रिया बल लगेगा और वह पीछे खिसकेगा।',
      },
    },
    commonMistakes: [
      {
        myth: {
          en: 'Action and reaction forces cancel each other out, so nothing should ever move.',
          mr: 'क्रिया आणि प्रतिक्रिया बले समान व विरुद्ध असल्याने एकमेकांना रद्द करतात आणि कोणतीही वस्तू हलू नये.',
          hi: 'क्रिया और प्रतिक्रिया बल एक-दूसरे को निरस्त कर देते हैं, इसलिए गति नहीं होनी चाहिए।',
        },
        reality: {
          en: 'They act on TWO DIFFERENT BODIES, not on the same body! For cancellation, forces must act on the identical body.',
          mr: 'क्रिया बल आणि प्रतिक्रिया बल हे दोन भिन्न वस्तूंवर लागतात, एकाच वस्तूवर नाही! म्हणून ते एकमेकांना रद्द करत नाहीत.',
          hi: 'वे दो अलग-अलग वस्तुओं पर कार्य करते हैं! निरस्त होने के लिए बलों का एक ही वस्तु पर लगना जरूरी होता है।',
        },
        why: {
          en: 'Failing to draw separate free-body diagrams for the two interacting objects.',
          mr: 'दोन्ही वस्तूंचे स्वतंत्र बल आलेख न काढल्यामुळे हा गैरसमज होतो.',
          hi: 'दोनों वस्तुओं पर अलग-अलग लगने वाले बलों का ध्यान न रखने के कारण।',
        },
      },
    ],
    recapPoints: [
      { en: 'Action and Reaction are always equal in magnitude and opposite in direction.', mr: 'क्रिया आणि प्रतिक्रिया बल नेहमी समान आणि विरुद्ध असतात.', hi: 'क्रिया और प्रतिक्रिया सदैव बराबर और विपरीत होती हैं।' },
      { en: 'Forces always occur in pairs; single isolated force is impossible in nature.', mr: 'निसर्गात बल नेहमी जोडीनेच असते, एकटे बल अस्तित्वात नसते.', hi: 'बल सदैव युग्मों में होते हैं; एकल बल संभव नहीं है।' },
      { en: 'Explains rocket propulsion (conservation of momentum).', mr: 'रॉकेटचे प्रक्षेपण या नियमावर आधारित आहे.', hi: 'रॉकेट प्रक्षेपण इसी सिद्धांत पर कार्य करता है।' },
    ],
    diagramType: 'action_reaction_rocket',
    interactiveSimHint: {
      en: 'Pump up the balloon and release it to see high-speed air exhaust (action) propel the balloon rocket forward (reaction)!',
      mr: 'फुग्यात हवा भरून सोडा आणि बाहेर पडणाऱ्या हवेमुळे फुगा-रॉकेट पुढे कसा झेपावतो ते पहा!',
      hi: 'गुब्बारे में हवा भरकर छोड़ें और देखें कि कैसे हवा का निकास रॉकेट को आगे बढ़ाता है!',
    },
  },
};

export const PRE_TEST_QUESTIONS: Record<string, QuizQuestion[]> = {
  force: [
    {
      id: 'pre-force-1',
      topicId: 'force',
      conceptKey: 'push_pull_definition',
      question: {
        en: 'What is the most basic definition of force in physics?',
        mr: 'भौतिकशास्त्रात बलाची सर्वात मूलभूत व्याख्या कोणती आहे?',
        hi: 'भौतिक विज्ञान में बल की सबसे बुनियादी परिभाषा क्या है?',
      },
      options: {
        en: ['Only the speed of an object', 'A push or a pull acting on an object', 'The total energy stored in a body', 'The temperature change of matter'],
        mr: ['फक्त वस्तूचा वेग', 'वस्तूवर लागणारा धक्का किंवा ओढणे', 'वस्तूतील एकूण ऊर्जा', 'पदार्थाचे तापमान बदलणे'],
        hi: ['केवल वस्तु की गति', 'वस्तु पर लगने वाला धक्का या खिंचाव', 'वस्तु में संचित कुल ऊर्जा', 'पदार्थ का तापमान'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Force is an interaction that represents a push or pull on an object, capable of changing its state of rest, motion, or shape.',
        mr: 'बल ही वस्तूवर होणारी आंतरक्रिया असून ती धक्का किंवा ओढणे या स्वरूपात असते आणि गती किंवा आकार बदलते.',
        hi: 'बल वस्तु पर लगने वाला धक्का या खिंचाव है जो उसकी स्थिति या आकार में बदलाव कर सकता है।',
      },
    },
    {
      id: 'pre-force-2',
      topicId: 'force',
      conceptKey: 'balanced_force',
      question: {
        en: 'When two equal and opposite forces act on a wooden block at rest, what happens?',
        mr: 'विरामावस्थेतील लाकडी ठोकळ्यावर दोन समान आणि विरुद्ध दिशेची बले लावल्यास काय होईल?',
        hi: 'विराम अवस्था में रखे लकड़ी के गुटके पर दो बराबर और विपरीत बल लगाने पर क्या होगा?',
      },
      options: {
        en: ['The block accelerates rapidly', 'The block remains at rest (Net force = 0)', 'The block spins in a circle', 'The block loses mass'],
        mr: ['ठोकळा वेगाने पळू लागेल', 'ठोकळा स्थिरच राहील (परिणामी बल = ०)', 'ठोकळा गोल फिरेल', 'ठोकळ्याचे वस्तुमान कमी होईल'],
        hi: ['गुटका तेजी से चलने लगेगा', 'गुटका स्थिर रहेगा (परिणामी बल = 0)', 'गुटका गोल घूमने लगेगा', 'गुटके का द्रव्यमान कम होगा'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Because the forces are equal in magnitude and opposite in direction, the net resultant force is zero (Balanced force), so the block stays at rest.',
        mr: 'बले समान व विरुद्ध असल्याने परिणामी बल शून्य (संतुलित बल) होते, त्यामुळे ठोकळा स्थिर राहतो.',
        hi: 'बल बराबर और विपरीत होने के कारण परिणामी बल शून्य होता है, इसलिए गुटका स्थिर रहता है।',
      },
    },
    {
      id: 'pre-force-3',
      topicId: 'force',
      conceptKey: 'si_unit_force',
      question: {
        en: 'What is the SI unit of force?',
        mr: 'बलाचे आंतरराष्ट्रीय (SI) पद्धतीतील एकक कोणते?',
        hi: 'बल का SI मात्रक क्या है?',
      },
      options: {
        en: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'],
        mr: ['ज्यूल (J)', 'वॅट (W)', 'न्यूटन (N)', 'पास्कल (Pa)'],
        hi: ['जूल (J)', 'वाट (W)', 'न्यूटन (N)', 'पास्कल (Pa)'],
      },
      correctIndex: 2,
      explanation: {
        en: 'The SI unit of force is Newton (N), named after Sir Isaac Newton. 1 N = 1 kg·m/s².',
        mr: 'बलाचे SI एकक न्यूटन (N) आहे. १ न्यूटन = १ किग्रॅ·मी/से².',
        hi: 'बल का SI मात्रक न्यूटन (N) है। 1 N = 1 kg·m/s²।',
      },
    },
    {
      id: 'pre-force-4',
      topicId: 'force',
      conceptKey: 'unbalanced_effect',
      question: {
        en: 'Which of the following can ONLY be produced by an UNBALANCED force?',
        mr: 'खालीलपैकी कोणती गोष्ट फक्त असंतुलित बलामुळेच निर्माण होऊ शकते?',
        hi: 'निम्न में से क्या केवल असंतुलित बल द्वारा ही उत्पन्न हो सकता है?',
      },
      options: {
        en: ['Acceleration (change in velocity/direction)', 'Maintaining constant speed in space', 'Equal pressure on all sides', 'Stationary position'],
        mr: ['प्रवेग (वेगात किंवा दिशेत बदल)', 'अवकाशात स्थिर वेगाने चालणे', 'सर्व बाजूंनी समान दाब', 'विरामावस्था'],
        hi: ['त्वरण (वेग या दिशा में परिवर्तन)', 'अंतरिक्ष में स्थिर चाल बनाए रखना', 'चारों ओर समान दबाव', 'स्थिर अवस्था'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Acceleration (change in velocity or direction) requires a non-zero net unbalanced force.',
        mr: 'प्रवेग निर्माण करण्यासाठी किंवा वेगाची दिशा बदलण्यासाठी असंतुलित बलाचीच गरज असते.',
        hi: 'त्वरण या दिशा परिवर्तन के लिए असंतुलित बल आवश्यक है।',
      },
    },
    {
      id: 'pre-force-5',
      topicId: 'force',
      conceptKey: 'contact_vs_noncontact',
      question: {
        en: 'Which of the following is an example of a NON-CONTACT force?',
        mr: 'खालीलपैकी कोणते असंपर्क बलाचे (Non-contact force) उदाहरण आहे?',
        hi: 'निम्नलिखित में से कौन सा गैर-संपर्क बल (Non-contact force) का उदाहरण है?',
      },
      options: {
        en: ['Muscular force pushing a cart', 'Frictional force of road on tires', 'Gravitational force pulling an apple down', 'Tension force in a pulled rope'],
        mr: ['गाडी ढकलणारे स्नायू बल', 'रस्त्याचे घर्षण बल', 'सफरचंद खाली खेचणारे गुरुत्वीय बल', 'दोरीतील ताण बल'],
        hi: ['गाड़ी धकेलने वाला पेशीय बल', 'सड़क का घर्षण बल', 'सेब को नीचे खींचने वाला गुरुत्वाकर्षण बल', 'रस्सी का तनाव बल'],
      },
      correctIndex: 2,
      explanation: {
        en: 'Gravitational force acts from a distance without physical contact, making it a non-contact field force.',
        mr: 'गुरुत्वाकर्षण बल प्रत्यक्ष स्पर्श न करताही अंतरावरून कार्य करते, म्हणून ते असंपर्क बल आहे.',
        hi: 'गुरुत्वाकर्षण बल बिना किसी प्रत्यक्ष संपर्क के दूरी से कार्य करता है।',
      },
    },
  ],

  'newtons-first-law': [
    {
      id: 'pre-n1-1',
      topicId: 'newtons-first-law',
      conceptKey: 'inertia_concept',
      question: {
        en: 'What is the natural tendency of an object to resist changes in its state of motion called?',
        mr: 'वस्तूच्या गतीच्या स्थितीत होणाऱ्या बदलास विरोध करण्याच्या नैसर्गिक प्रवृत्तीला काय म्हणतात?',
        hi: 'किसी वस्तु द्वारा अपनी गति की अवस्था में परिवर्तन के विरोध की प्रवृत्ति को क्या कहते हैं?',
      },
      options: {
        en: ['Acceleration', 'Inertia', 'Friction', 'Momentum'],
        mr: ['प्रवेग', 'जडत्व (Inertia)', 'घर्षण', 'संवेग'],
        hi: ['त्वरण', 'जड़त्व (Inertia)', 'घर्षण', 'संवेग'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Inertia is the property of a body by virtue of which it opposes any agency that attempts to put it in motion or change its velocity.',
        mr: 'वस्तूच्या गतीच्या स्थितीत होणाऱ्या बदलास विरोध करण्याच्या गुणाला जडत्व म्हणतात.',
        hi: 'वस्तु के अपनी गति की अवस्था में परिवर्तन के विरोध को जड़त्व कहते हैं।',
      },
    },
    {
      id: 'pre-n1-2',
      topicId: 'newtons-first-law',
      conceptKey: 'mass_inertia_relation',
      question: {
        en: 'Which physical quantity is the direct quantitative measure of a body’s inertia?',
        mr: 'कोणती भौतिक राशी वस्तूच्या जडत्वाचे थेट परिमाणात्मक माप असते?',
        hi: 'कौन सी भौतिक राशि किसी वस्तु के जड़त्व की प्रत्यक्ष माप है?',
      },
      options: {
        en: ['Velocity', 'Volume', 'Mass', 'Density'],
        mr: ['वेग', 'आकारमान', 'वस्तुमान (Mass)', 'घनता'],
        hi: ['वेग', 'आयतन', 'द्रव्यमान (Mass)', 'घनत्व'],
      },
      correctIndex: 2,
      explanation: {
        en: 'Mass is the quantitative measure of inertia. Greater mass means greater inertia.',
        mr: 'वस्तुमान हे जडत्वाचे माप आहे. जास्त वस्तुमान म्हणजे जास्त जडत्व.',
        hi: 'द्रव्यमान जड़त्व की माप है। अधिक द्रव्यमान अर्थात अधिक जड़त्व।',
      },
    },
    {
      id: 'pre-n1-3',
      topicId: 'newtons-first-law',
      conceptKey: 'inertia_of_motion',
      question: {
        en: 'Why do passengers fall forward when a moving bus suddenly applies brakes?',
        mr: 'धावत्या बसने अचानक ब्रेक लावल्यास प्रवासी पुढे का झुकतात?',
        hi: 'चलती बस के अचानक ब्रेक लगाने पर यात्री आगे की ओर क्यों झुकते हैं?',
      },
      options: {
        en: ['Due to Inertia of Motion of the upper body', 'Due to gravitational pull of driver', 'Because air rushes in', 'Due to Inertia of Rest'],
        mr: ['शरीराच्या वरच्या भागाच्या गतीच्या जडत्वामुळे', 'चालकाच्या गुरुत्वाकर्षणामुळे', 'आत हवा आल्यामुळे', 'विरामाच्या जडत्वामुळे'],
        hi: ['शरीर के ऊपरी हिस्से के गति के जड़त्व के कारण', 'गुरुत्वाकर्षण खिंचाव के कारण', 'हवा के दबाव से', 'विराम के जड़त्व के कारण'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The lower body comes to rest with the bus floor, but the upper body continues moving forward due to inertia of motion.',
        mr: 'पायांचा भाग बससोबत थांबतो, परंतु वरचे शरीर गतीच्या जडत्वामुळे पुढे चालू राहण्याचा प्रयत्न करते.',
        hi: 'पैरों का हिस्सा बस के साथ रुकता है, परंतु ऊपरी शरीर गति के जड़त्व के कारण आगे बढ़ता है।',
      },
    },
    {
      id: 'pre-n1-4',
      topicId: 'newtons-first-law',
      conceptKey: 'zero_net_force',
      question: {
        en: 'According to Newton’s 1st Law, if the net external force on a moving spacecraft in deep space is zero, the spacecraft will:',
        mr: 'खोल अवकाशात यानावर बाह्य बल शून्य असल्यास ते यान काय करेल?',
        hi: 'अंतरिक्ष में यदि किसी अंतरिक्ष यान पर बाहरी बल शून्य हो, तो वह यान:',
      },
      options: {
        en: ['Slow down and stop immediately', 'Continue moving at constant velocity in a straight line', 'Speed up exponentially', 'Turn around automatically'],
        mr: ['लगेच हळू होऊन थांबेल', 'सरळ रेषेत स्थिर वेगाने पुढे जात राहील', 'त्याचा वेग खूप वाढेल', 'आपोआप मागे फिरेल'],
        hi: ['तुरंत रुक जाएगा', 'सरल रेखा में एकसमान वेग से चलता रहेगा', 'गति बढ़ जाएगी', 'अपने आप मुड़ जाएगा'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Without an external unbalanced force, an object in uniform motion will keep moving forever at constant velocity.',
        mr: 'बाह्य असंतुलित बलाशिवाय गतिमान वस्तू कायम स्थिर वेगाने पुढे जात राहते.',
        hi: 'बाहरी बल के अभाव में गतिमान वस्तु एकसमान वेग से निरंतर चलती रहेगी।',
      },
    },
    {
      id: 'pre-n1-5',
      topicId: 'newtons-first-law',
      conceptKey: 'inertia_of_rest',
      question: {
        en: 'Dust particles fall off a hanging carpet when beaten with a stick. Why?',
        mr: 'काठीने मारल्यास गालिच्यातील धूळ खाली का पडते?',
        hi: 'लाठी से पीटने पर लटके कालीन से धूल के कण क्यों गिरते हैं?',
      },
      options: {
        en: ['Dust has no weight', 'The carpet moves, but dust stays at rest due to inertia of rest', 'The dust gets magnetized', 'The stick creates vacuum'],
        mr: ['धुळीला वजन नसते', 'गालिचा हलतो पण धूळ विरामाच्या जडत्वामुळे जागेवरच राहून खाली पडते', 'धूळ चुंबक बनते', 'काठीमुळे निर्वात पोकळी बनते'],
        hi: ['धूल का कोई वजन नहीं होता', 'कालीन हिलता है पर धूल विराम के जड़त्व के कारण वहीं रहकर गिर जाती है', 'धूल में चुंबकत्व आ जाता है', 'लाठी वैक्यूम बनाती है'],
      },
      correctIndex: 1,
      explanation: {
        en: 'The carpet moves with the stick blow, but the stationary dust particles resist motion due to inertia of rest and separate.',
        mr: 'काठीमुळे गालिचा हलतो पण धूळ विरामाच्या जडत्वामुळे जागेवरच राहते व वेगळी होते.',
        hi: 'कालीन गति में आ जाता है जबकि धूल के कण विराम के जड़त्व के कारण अलग होकर गिरते हैं।',
      },
    },
  ],

  'newtons-second-law': [
    {
      id: 'pre-n2-1',
      topicId: 'newtons-second-law',
      conceptKey: 'momentum_definition',
      question: {
        en: 'What is Momentum (p) mathematically defined as?',
        mr: 'संवेग (Momentum) चे गणितीय सूत्र कोणते?',
        hi: 'संवेग (Momentum) का गणितीय सूत्र क्या है?',
      },
      options: {
        en: ['p = Mass / Velocity', 'p = Mass × Velocity', 'p = Force × Distance', 'p = Mass × Acceleration'],
        mr: ['p = वस्तुमान / वेग', 'p = वस्तुमान × वेग', 'p = बल × अंतर', 'p = वस्तुमान × प्रवेग'],
        hi: ['p = द्रव्यमान / वेग', 'p = द्रव्यमान × वेग', 'p = बल × दूरी', 'p = द्रव्यमान × त्वरण'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Momentum is the product of mass (m) and velocity (v): p = m × v.',
        mr: 'संवेग म्हणजे वस्तुमान आणि वेग यांचा गुणाकार होय: p = m × v.',
        hi: 'संवेग द्रव्यमान और वेग का गुणनफल है: p = m × v।',
      },
    },
    {
      id: 'pre-n2-2',
      topicId: 'newtons-second-law',
      conceptKey: 'f_equals_ma',
      question: {
        en: 'Which famous formula represents Newton’s Second Law for constant mass?',
        mr: 'न्यूटनच्या दुसऱ्या नियमाचे प्रसिद्ध सूत्र कोणते?',
        hi: 'न्यूटन के द्वितीय नियम का प्रसिद्ध सूत्र कौन सा है?',
      },
      options: {
        en: ['F = m × a', 'F = m / a', 'F = m × v²', 'F = a / m'],
        mr: ['F = m × a', 'F = m / a', 'F = m × v²', 'F = a / m'],
        hi: ['F = m × a', 'F = m / a', 'F = m × v²', 'F = a / m'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Force equals mass multiplied by acceleration (F = m × a).',
        mr: 'बल = वस्तुमान × प्रवेग (F = m × a).',
        hi: 'बल = द्रव्यमान × त्वरण (F = m × a)।',
      },
    },
    {
      id: 'pre-n2-3',
      topicId: 'newtons-second-law',
      conceptKey: 'unit_of_momentum',
      question: {
        en: 'What is the SI unit of momentum?',
        mr: 'संवेगाचे SI एकक काय आहे?',
        hi: 'संवेग का SI मात्रक क्या है?',
      },
      options: {
        en: ['kg·m/s²', 'kg·m/s', 'Newton·meter', 'Joule/second'],
        mr: ['किग्रॅ·मी/से²', 'किग्रॅ·मी/से', 'न्यूटन·मीटर', 'ज्यूल/सेकंद'],
        hi: ['kg·m/s²', 'kg·m/s', 'न्यूटन·मीटर', 'जूल/सेकंड'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Since p = m (kg) × v (m/s), the SI unit is kg·m/s (or N·s).',
        mr: 'p = m (किग्रॅ) × v (मी/से) असल्याने एकक किग्रॅ·मी/से आहे.',
        hi: 'चूंकि p = m (kg) × v (m/s), इसलिए मात्रक kg·m/s है।',
      },
    },
    {
      id: 'pre-n2-4',
      topicId: 'newtons-second-law',
      conceptKey: 'impact_time_force',
      question: {
        en: 'Why does a cricket fielder pull their hands backward while taking a catch?',
        mr: 'क्रिकेट झेल घेताना खेळाडू हात मागे का ओढतो?',
        hi: 'क्रिकेट में कैच लेते समय खिलाड़ी हाथ पीछे क्यों खींचता है?',
      },
      options: {
        en: ['To increase the catch time and decrease the impact force', 'To look stylish', 'To increase the speed of ball', 'To reduce friction of air'],
        mr: ['वेळ वाढवून हातावर लागणारे बल कमी करण्यासाठी', 'स्टाईल करण्यासाठी', 'चेंडूचा वेग वाढवण्यासाठी', 'हवेचे घर्षण कमी करण्यासाठी'],
        hi: ['समय बढ़ाकर हाथ पर लगने वाले बल को कम करने के लिए', 'स्टाइल के लिए', 'गेंद की गति बढ़ाने के लिए', 'वायु का घर्षण कम करने के लिए'],
      },
      correctIndex: 0,
      explanation: {
        en: 'By extending the time taken for momentum to reach zero, the rate of change of momentum (Force) decreases significantly, protecting hands.',
        mr: 'वेळ वाढवल्यामुळे संवेग बदलाचा दर कमी होतो आणि हाताला दुखापत होत नाही.',
        hi: 'समय बढ़ाने से संवेग परिवर्तन की दर (बल) कम हो जाती है जिससे चोट नहीं लगती।',
      },
    },
    {
      id: 'pre-n2-5',
      topicId: 'newtons-second-law',
      conceptKey: 'acceleration_mass_relation',
      question: {
        en: 'If the same force of 20 N is applied to a 2 kg toy car and a 10 kg bowling ball, which has greater acceleration?',
        mr: '२० N चे समान बल २ किग्रॅ खेळण्यातील कार आणि १० किग्रॅ च्या गोळ्यावर लावले, तर कोणाचा प्रवेग जास्त असेल?',
        hi: 'यदि 20 N का समान बल 2 kg की खिलौना कार और 10 kg की गेंद पर लगाया जाए, तो किसका त्वरण अधिक होगा?',
      },
      options: {
        en: ['The 2 kg toy car (a = F/m = 10 m/s²)', 'The 10 kg bowling ball', 'Both have identical acceleration', 'Neither will move'],
        mr: ['२ किग्रॅ ची खेळण्यातील कार (a = २०/२ = १० मी/से²)', '१० किग्रॅ चा गोळा', 'दोन्हींचा प्रवेग समान असेल', 'दोन्ही हलणार नाहीत'],
        hi: ['2 kg की खिलौना कार (a = 20/2 = 10 m/s²)', '10 kg की भारी गेंद', 'दोनों का त्वरण समान होगा', 'कोई नहीं हिलेगा'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Acceleration is inversely proportional to mass (a = F/m). The lighter 2 kg car experiences 10 m/s² vs 2 m/s² for the 10 kg ball.',
        mr: 'प्रवेग हा वस्तुमानाच्या व्यस्त प्रमाणात असतो (a = F/m). कमी वस्तुमानाच्या कारचा प्रवेग १० मी/से² असेल.',
        hi: 'त्वरण द्रव्यमान के व्युत्क्रमानुपाती होता है (a = F/m)। 2 kg की कार का त्वरण 10 m/s² होगा।',
      },
    },
  ],

  'newtons-third-law': [
    {
      id: 'pre-n3-1',
      topicId: 'newtons-third-law',
      conceptKey: 'action_reaction_equality',
      question: {
        en: 'Newton’s Third Law states that every action force has a reaction force that is:',
        mr: 'न्यूटनच्या तिसऱ्या नियमानुसार प्रत्येक क्रिया बलाला मिळणारे प्रतिक्रिया बल कसे असते?',
        hi: 'न्यूटन के तीसरे नियम के अनुसार प्रत्येक क्रिया बल की प्रतिक्रिया कैसी होती है?',
      },
      options: {
        en: ['Equal in magnitude and opposite in direction', 'Greater in magnitude and same direction', 'Smaller in magnitude and opposite direction', 'Zero in magnitude'],
        mr: ['समान परिमाणाचे आणि विरुद्ध दिशेचे', 'जास्त परिमाणाचे व त्याच दिशेचे', 'कमी परिमाणाचे व विरुद्ध दिशेचे', 'शून्य'],
        hi: ['बराबर परिमाण और विपरीत दिशा में', 'अधिक परिमाण और समान दिशा में', 'कम परिमाण और विपरीत दिशा में', 'शून्य'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Action and reaction forces are always equal in magnitude and strictly opposite in direction.',
        mr: 'क्रिया आणि प्रतिक्रिया बल नेहमी परिमाणात समान आणि दिशेत विरुद्ध असतात.',
        hi: 'क्रिया और प्रतिक्रिया बल सदैव बराबर और विपरीत दिशा में होते हैं।',
      },
    },
    {
      id: 'pre-n3-2',
      topicId: 'newtons-third-law',
      conceptKey: 'different_bodies_rule',
      question: {
        en: 'Why do action and reaction forces NOT cancel each other out to cause zero motion?',
        mr: 'क्रिया आणि प्रतिक्रिया बले एकमेकांना रद्द का करत नाहीत?',
        hi: 'क्रिया और प्रतिक्रिया बल एक-दूसरे को निरस्त क्यों नहीं करते?',
      },
      options: {
        en: ['Because they act on two different bodies', 'Because they act at different times', 'Because reaction is always delayed', 'Because one is stronger than the other'],
        mr: ['कारण ते दोन वेगवेगळ्या वस्तूंवर कार्य करतात', 'कारण ते वेगवेगळ्या वेळी घडतात', 'प्रतिक्रिया उशिरा होते म्हणून', 'एक बल मोठे असते म्हणून'],
        hi: ['क्योंकि वे दो अलग-अलग वस्तुओं पर कार्य करते हैं', 'क्योंकि वे अलग-अलग समय पर लगते हैं', 'प्रतिक्रिया देर से होती है', 'एक बल अधिक शक्तिशाली होता है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Cancellation occurs only when equal and opposite forces act on the SAME body. Action and reaction act on TWO DIFFERENT interacting bodies.',
        mr: 'एकाच वस्तूवर विरुद्ध बले असल्यास ती रद्द होतात. क्रिया व प्रतिक्रिया दोन वेगळ्या वस्तूंवर लागतात.',
        hi: 'बलों का निरस्तीकरण तभी होता है जब वे एक ही वस्तु पर लगें। क्रिया-प्रतिक्रिया दो भिन्न वस्तुओं पर लगते हैं।',
      },
    },
    {
      id: 'pre-n3-3',
      topicId: 'newtons-third-law',
      conceptKey: 'rocket_propulsion',
      question: {
        en: 'The propulsion of ISRO’s rockets into space is a direct application of which law?',
        mr: 'इस्रोच्या रॉकेटचे उड्डाण हे कोणत्या नियमाचे थेट उदाहरण आहे?',
        hi: 'इसरो के रॉकेट का अंतरिक्ष में प्रक्षेपण किस नियम का प्रत्यक्ष अनुप्रयोग है?',
      },
      options: {
        en: ["Newton's Third Law (and conservation of momentum)", "Ohm's Law", "Archimedes' Principle", "Boyle's Law"],
        mr: ['न्यूटनचा तिसरा नियम (व संवेग अक्षय्यता)', 'ओहमचा नियम', 'आर्किमिडीजचे तत्त्व', 'बॉईलचा नियम'],
        hi: ['न्यूटन का तृतीय नियम (एवं संवेग संरक्षण)', 'ओम का नियम', 'आर्किमिडीज का सिद्धांत', 'बॉयल का नियम'],
      },
      correctIndex: 0,
      explanation: {
        en: 'High-speed exhaust gas forced downwards (action) produces an equal upward thrust on the rocket body (reaction).',
        mr: 'वायू वेगाने खाली सोडणे (क्रिया) रॉकेटला तेवढ्याच जोराने वर ढकलते (प्रतिक्रिया).',
        hi: 'गैसों का नीचे की ओर निकास (क्रिया) रॉकेट को ऊपर की ओर बल (प्रतिक्रिया) देता है।',
      },
    },
    {
      id: 'pre-n3-4',
      topicId: 'newtons-third-law',
      conceptKey: 'swimming_action',
      question: {
        en: 'When a swimmer pushes water backwards with their hands, what pushes the swimmer forward?',
        mr: 'पोहताना व्यक्ती पाणी मागे ढकलते, तेव्हा व्यक्तीला पुढे कोण ढकलते?',
        hi: 'तैरते समय व्यक्ति पानी को पीछे धकेलता है, तो व्यक्ति को आगे कौन धकेलता है?',
      },
      options: {
        en: ['The reaction force exerted by the water on the swimmer', 'The air above the pool', 'The swimmer’s swimsuit', 'The gravity of the pool floor'],
        mr: ['पाण्याने व्यक्तीवर लावलेले प्रतिक्रिया बल', 'तलावावरील हवा', 'स्विमसूट', 'तळाचे गुरुत्वाकर्षण'],
        hi: ['पानी द्वारा व्यक्ति पर लगाया गया प्रतिक्रिया बल', 'हवा का दबाव', 'स्विमसूट', 'तली का गुरुत्वाकर्षण'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The swimmer applies action force backward on the water; the water applies an equal reaction force forward on the swimmer.',
        mr: 'व्यक्ती पाण्यावर मागे बल लावते, तर पाणी व्यक्तीवर पुढे प्रतिक्रिया बल लावते.',
        hi: 'व्यक्ति पानी पर पीछे बल लगाता है और पानी व्यक्ति पर आगे की ओर प्रतिक्रिया बल लगाता है।',
      },
    },
    {
      id: 'pre-n3-5',
      topicId: 'newtons-third-law',
      conceptKey: 'gun_recoil',
      question: {
        en: 'When a bullet is fired from a rifle, the rifle recoils backward. This is because:',
        mr: 'बंदुकीतून गोळी सुटल्यावर बंदूक मागे झटका का देते?',
        hi: 'बंदूक से गोली छूटने पर बंदूक पीछे की ओर झटका क्यों देती है?',
      },
      options: {
        en: ['The bullet exerts an equal and opposite reaction force on the rifle', 'The gun is damaged', 'The bullet has no mass', 'Air fills the barrel suddenly'],
        mr: ['गोळी बंदुकीवर समान व विरुद्ध दिशेने प्रतिक्रिया बल लावते', 'बंदूक खराब असते', 'गोळीला वस्तुमान नसते', 'नळीत हवा भरते'],
        hi: ['गोली बंदूक पर बराबर और विपरीत प्रतिक्रिया बल लगाती है', 'बंदूक खराब हो जाती है', 'गोली का कोई द्रव्यमान नहीं होता', 'हवा का दबाव बनता है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The expanding gases push the bullet forward (action) and simultaneously push the rifle backward (reaction).',
        mr: 'वायू गोळीला पुढे ढकलतो (क्रिया) आणि तेवढ्याच बलाने बंदुकीला मागे ढकलतो (प्रतिक्रिया).',
        hi: 'गैस गोली को आगे धकेलती है (क्रिया) और बंदूक को पीछे की ओर प्रतिक्रिया बल मिलता है।',
      },
    },
  ],
};

export const POST_TEST_QUESTIONS: Record<string, QuizQuestion[]> = {
  force: [
    {
      id: 'post-force-1',
      topicId: 'force',
      conceptKey: 'net_force_calculation',
      errorType: 'calculation_error',
      question: {
        en: 'A box is pulled to the right with 50 N and to the left with 20 N. What is the net unbalanced force?',
        mr: 'एका पेटीला उजवीकडे ५० N आणि डावीकडे २० N ने ओढले जाते. परिणामी असंतुलित बल किती?',
        hi: 'एक बक्से को दाईं ओर 50 N और बाईं ओर 20 N से खींचा जाता है। परिणामी असंतुलित बल क्या है?',
      },
      options: {
        en: ['70 N to the right', '30 N to the right', '30 N to the left', '1000 N'],
        mr: ['७० N उजवीकडे', '३० N उजवीकडे', '३० N डावीकडे', '१००० N'],
        hi: ['70 N दाईं ओर', '30 N दाईं ओर', '30 N बाईं ओर', '1000 N'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Net Force = 50 N (Right) - 20 N (Left) = 30 N towards the Right.',
        mr: 'परिणामी बल = ५० N (उजवीकडे) - २० N (डावीकडे) = ३० N उजवीकडे.',
        hi: 'परिणामी बल = 50 N - 20 N = 30 N दाईं ओर।',
      },
    },
    {
      id: 'post-force-2',
      topicId: 'force',
      conceptKey: 'balanced_force_state',
      errorType: 'conceptual_error',
      question: {
        en: 'Can a moving car have balanced forces acting upon it?',
        mr: 'चालणाऱ्या कारवर संतुलित बले असू शकतात का?',
        hi: 'क्या चलती हुई कार पर संतुलित बल कार्य कर सकते हैं?',
      },
      options: {
        en: ['No, balanced forces only exist when an object is completely stopped', 'Yes, when the car moves with constant velocity in a straight line', 'Yes, but only during heavy acceleration', 'No, motion always requires net unbalanced force'],
        mr: ['नाही, संतुलित बले फक्त थांबलेल्या वस्तूवरच असतात', 'होय, जेव्हा कार सरळ रेषेत स्थिर वेगाने चालते', 'होय, पण फक्त वेग वाढतानाच', 'नाही, गतीसाठी नेहमी असंतुलित बल लागते'],
        hi: ['नहीं, संतुलित बल केवल रुकी हुई वस्तु पर होते हैं', 'हाँ, जब कार सरल रेखा में स्थिर वेग से चल रही हो', 'हाँ, केवल तेज गति में', 'नहीं, गति के लिए हमेशा असंतुलित बल चाहिए'],
      },
      correctIndex: 1,
      explanation: {
        en: 'When driving force equals total friction and air drag, net force is ZERO, so the car maintains constant speed in a straight line with balanced forces.',
        mr: 'जेव्हा इंजिनचे बल घर्षण बलाएवढेच असते, तेव्हा परिणामी बल शून्य (संतुलित बल) असते व कार स्थिर वेगाने धावते.',
        hi: 'जब इंजन का बल घर्षण के बराबर होता है, तो परिणामी बल शून्य होता है और कार स्थिर वेग से चलती है।',
      },
    },
    {
      id: 'post-force-3',
      topicId: 'force',
      conceptKey: 'dyne_newton_conversion',
      errorType: 'memory_error',
      question: {
        en: '1 Newton is equivalent to how many dynes in CGS units?',
        mr: '१ न्यूटन म्हणजे CGS पद्धतीत किती डाइन?',
        hi: '1 न्यूटन CGS मात्रक में कितने डाइन के बराबर होता है?',
      },
      options: {
        en: ['10³ dyne', '10⁵ dyne', '10⁷ dyne', '100 dyne'],
        mr: ['१०³ डाइन', '१०⁵ डाइन', '१०⁷ डाइन', '१०० डाइन'],
        hi: ['10³ डाइन', '10⁵ डाइन', '10⁷ डाइन', '100 डाइन'],
      },
      correctIndex: 1,
      explanation: {
        en: '1 N = 1 kg × 1 m/s² = 1000 g × 100 cm/s² = 10⁵ dyne.',
        mr: '१ न्यूटन = १००० ग्रॅम × १०० सेमी/से² = १०⁵ डाइन.',
        hi: '1 N = 1000 g × 100 cm/s² = 10⁵ डाइन।',
      },
    },
    {
      id: 'post-force-4',
      topicId: 'force',
      conceptKey: 'force_definition_careless',
      errorType: 'careless_error',
      question: {
        en: 'Which of the following statements about force is INCORRECT?',
        mr: 'बलाविषयी खालीलपैकी कोणते विधान चुकीचे आहे?',
        hi: 'बल के संबंध में निम्नलिखित में से कौन सा कथन गलत है?',
      },
      options: {
        en: ['Force is a scalar quantity having only magnitude and no direction', 'Force can change the direction of motion', 'Force can change the shape of an object', 'Force has SI unit Newton (N)'],
        mr: ['बल ही केवळ परिमाण असलेली आदिश राशी आहे', 'बल गतीची दिशा बदलू शकते', 'बल वस्तूचा आकार बदलू शकते', 'बलाचे SI एकक न्यूटन आहे'],
        hi: ['बल एक अदिश राशि है जिसकी कोई दिशा नहीं होती', 'बल गति की दिशा बदल सकता है', 'बल आकार बदल सकता है', 'बल का SI मात्रक न्यूटन है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Force is a VECTOR quantity, not a scalar quantity. It has both magnitude and direction.',
        mr: 'बल ही सदिश राशी आहे, आदिश राशी नाही. त्याला परिमाण आणि दिशा दोन्ही असतात.',
        hi: 'बल एक सदिश राशि है, अदिश नहीं। इसमें परिमाण और दिशा दोनों होते हैं।',
      },
    },
    {
      id: 'post-force-5',
      topicId: 'force',
      conceptKey: 'types_of_forces_formula',
      errorType: 'formula_error',
      question: {
        en: 'If a constant unbalanced force of 12 N acts on an object of mass 3 kg, what is the acceleration produced?',
        mr: '३ किग्रॅ वस्तुमानाच्या वस्तूवर १२ N चे असंतुलित बल लावल्यास निर्माण होणारा प्रवेग किती?',
        hi: '3 kg द्रव्यमान की वस्तु पर 12 N का असंतुलित बल लगाने पर उत्पन्न त्वरण क्या होगा?',
      },
      options: {
        en: ['36 m/s²', '4 m/s²', '0.25 m/s²', '15 m/s²'],
        mr: ['३६ मी/से²', '४ मी/से²', '०.२५ मी/से²', '१५ मी/से²'],
        hi: ['36 m/s²', '4 m/s²', '0.25 m/s²', '15 m/s²'],
      },
      correctIndex: 1,
      explanation: {
        en: 'Using a = F / m = 12 N / 3 kg = 4 m/s².',
        mr: 'सूत्राप्रमाणे a = F / m = १२ / ३ = ४ मी/से².',
        hi: 'सूत्र a = F / m = 12 / 3 = 4 m/s²।',
      },
    },
  ],

  'newtons-first-law': [
    {
      id: 'post-n1-1',
      topicId: 'newtons-first-law',
      conceptKey: 'inertia_types',
      errorType: 'conceptual_error',
      question: {
        en: 'When a car takes a sudden sharp curve to the right, why do passengers lean towards the left?',
        mr: 'गाडीने उजवीकडे अचानक वळण घेतल्यास प्रवासी डावीकडे का झुकतात?',
        hi: 'कार के दाईं ओर अचानक मुड़ने पर यात्री बाईं ओर क्यों झुकते हैं?',
      },
      options: {
        en: ['Due to Inertia of Direction', 'Due to Inertia of Rest', 'Due to magnetic pull of car doors', 'Due to friction of tires'],
        mr: ['दिशेच्या जडत्वामुळे (Inertia of Direction)', 'विरामाच्या जडत्वामुळे', 'दरवाजाच्या चुंबकत्वामुळे', 'टायरच्या घर्षणामुळे'],
        hi: ['दिशा के जड़त्व के कारण (Inertia of Direction)', 'विराम के जड़त्व के कारण', 'दरवाजे के चुंबकत्व से', 'टायर के घर्षण से'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The passengers’ bodies tend to maintain their original straight-line direction due to inertia of direction.',
        mr: 'शरीर सरळ रेषेत चालू राहण्याचा प्रयत्न करत असल्याने दिशेच्या जडत्वामुळे डावीकडे झुकते.',
        hi: 'शरीर अपनी सीधी दिशा बनाए रखने का प्रयास करता है, इसलिए दिशा के जड़त्व के कारण बाईं ओर झुकता है।',
      },
    },
    {
      id: 'post-n1-2',
      topicId: 'newtons-first-law',
      conceptKey: 'mass_and_inertia_comparison',
      errorType: 'careless_error',
      question: {
        en: 'Which of the following objects has the MAXIMUM inertia?',
        mr: 'खालीलपैकी कोणत्या वस्तूचे जडत्व सर्वात जास्त असेल?',
        hi: 'निम्नलिखित में से किस वस्तु का जड़त्व अधिकतम होगा?',
      },
      options: {
        en: ['A 5-rupee coin (9 grams)', 'A cricket ball (160 grams)', 'A loaded freight truck (15,000 kg)', 'A school bicycle (12 kg)'],
        mr: ['५ रुपयांचे नाणे (९ ग्रॅम)', 'क्रिकेट चेंडू (१६० ग्रॅम)', 'मालवाहू ट्रक (१५,००० किग्रॅ)', 'शाळेची सायकल (१२ किग्रॅ)'],
        hi: ['5 रुपये का सिक्का (9 ग्राम)', 'क्रिकेट की गेंद (160 ग्राम)', 'मालवाहक ट्रक (15,000 किग्रा)', 'स्कूल की साइकिल (12 किग्रा)'],
      },
      correctIndex: 2,
      explanation: {
        en: 'Inertia depends solely on mass. The freight truck has the highest mass (15,000 kg), hence the greatest inertia.',
        mr: 'जडत्व फक्त वस्तुमानावर अवलंबून असते. ट्रकचे वस्तुमान सर्वाधिक असल्याने त्याचे जडत्व सर्वाधिक आहे.',
        hi: 'जड़त्व केवल द्रव्यमान पर निर्भर करता है। ट्रक का द्रव्यमान सबसे अधिक है।',
      },
    },
    {
      id: 'post-n1-3',
      topicId: 'newtons-first-law',
      conceptKey: 'galileo_inclined_plane',
      errorType: 'memory_error',
      question: {
        en: 'Who first performed experiments on inclined planes and deduced that objects move with constant speed in the absence of opposing force?',
        mr: 'उतरत्या फळ्यांचे प्रयोग करून घर्षण नसताना वस्तू स्थिर वेगाने चालते हे सर्वप्रथम कोणी मांडले?',
        hi: 'आनत तल (Inclined plane) पर प्रयोग करके किसने सबसे पहले सिद्ध किया कि घर्षण के अभाव में वस्तु निरंतर चलती है?',
      },
      options: {
        en: ['Galileo Galilei', 'Albert Einstein', 'Thomas Edison', 'Archimedes'],
        mr: ['गॅलिलिओ गॅलिली (Galileo Galilei)', 'अल्बर्ट आइनस्टाईन', 'थॉमस एडिसन', 'आर्किमिडीज'],
        hi: ['गैलीलियो गैलीली (Galileo Galilei)', 'अल्बर्ट आइंस्टीन', 'थॉमस एडिसन', 'आर्किमिडीज'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Galileo Galilei established the concept of inertia through his experiments with double inclined planes.',
        mr: 'गॅलिलिओ गॅलिली यांनी उतरत्या फळ्यांच्या प्रयोगावरून जडत्वाची मूळ संकल्पना मांडली.',
        hi: 'गैलीलियो गैलीली ने आनत तल के प्रयोगों द्वारा जड़त्व की अवधारणा दी।',
      },
    },
    {
      id: 'post-n1-4',
      topicId: 'newtons-first-law',
      conceptKey: 'inertia_of_rest_example',
      errorType: 'conceptual_error',
      question: {
        en: 'When a horse suddenly starts running from rest, the rider tends to fall backwards. Why?',
        mr: 'घोडा अचानक धावू लागल्यास घोडेस्वार मागे का पडतो?',
        hi: 'घोड़े के अचानक दौड़ने पर घुड़सवार पीछे की ओर क्यों गिरता है?',
      },
      options: {
        en: ['Inertia of rest keeps the rider upper body in its stationary position', 'Inertia of motion pulls rider backwards', 'The rider weight becomes zero', 'Air friction pushes him back'],
        mr: ['विरामाच्या जडत्वामुळे घोडेस्वाराचा वरचा भाग स्थिर राहण्याचा प्रयत्न करतो', 'गतीच्या जडत्वामुळे मागे ओढले जाते', 'वजन शून्य होते', 'हवेचे घर्षण मागे ढकलते'],
        hi: ['विराम के जड़त्व के कारण घुड़सवार का ऊपरी हिस्सा स्थिर रहने का प्रयास करता है', 'गति का जड़त्व पीछे खींचता है', 'भार शून्य हो जाता है', 'हवा का घर्षण'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The lower body in contact with the saddle moves forward with the horse, while the upper torso stays at rest due to inertia of rest.',
        mr: 'खालचा भाग घोड्यासोबत पुढे जातो पण वरचा भाग विरामाच्या जडत्वामुळे मागे राहतो.',
        hi: 'निचला हिस्सा घोड़े के साथ आगे बढ़ता है जबकि ऊपरी हिस्सा विराम के जड़त्व से पीछे रह जाता है।',
      },
    },
    {
      id: 'post-n1-5',
      topicId: 'newtons-first-law',
      conceptKey: 'first_law_definition_test',
      errorType: 'formula_error',
      question: {
        en: 'Which of the following conditions is required for Newton’s 1st Law to maintain an object’s uniform motion?',
        mr: 'न्यूटनच्या पहिल्या नियमानुसार वस्तूची एकसमान गती टिकून राहण्यासाठी कोणती अट आवश्यक आहे?',
        hi: 'न्यूटन के प्रथम नियम के अनुसार वस्तु की एकसमान गति बनाए रखने के लिए कौन सी शर्त आवश्यक है?',
      },
      options: {
        en: ['Net external force ΣF = 0', 'Continuous large external push ΣF > 100 N', 'Object must be in pure air', 'Mass must decrease over time'],
        mr: ['एकूण बाह्य बल ΣF = ० असणे', 'सतत १०० N पेक्षा जास्त धक्का लागणे', 'वस्तू हवेत असणे', 'वस्तुमान कमी होत जाणे'],
        hi: ['कुल बाहरी बल ΣF = 0 होना', 'लगातार 100 N से अधिक बल लगना', 'वस्तु का हवा में होना', 'द्रव्यमान का कम होना'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Newton’s First Law requires that the net external force ΣF = 0 for an object to continue in uniform straight-line motion.',
        mr: 'एकसमान गतीत सातत्य राहण्यासाठी निव्वळ बाह्य बल शून्य (ΣF = ०) असणे आवश्यक आहे.',
        hi: 'एकसमान गति के लिए परिणामी बाह्य बल शून्य (ΣF = 0) होना आवश्यक है।',
      },
    },
  ],

  'newtons-second-law': [
    {
      id: 'post-n2-1',
      topicId: 'newtons-second-law',
      conceptKey: 'f_ma_math',
      errorType: 'calculation_error',
      question: {
        en: 'A car of mass 1000 kg accelerates from rest to 20 m/s in 5 seconds. What is the average force exerted by the engine?',
        mr: '१००० किग्रॅ वस्तुमानाची कार विरामावस्थेतून ५ सेकंदात २० मी/से वेग गाठते. इंजिनने लावलेले सरासरी बल किती?',
        hi: '1000 kg की कार विराम से 5 सेकंड में 20 m/s का वेग प्राप्त करती है। इंजन द्वारा लगाया गया औसत बल क्या है?',
      },
      options: {
        en: ['4000 N', '2000 N', '500 N', '20,000 N'],
        mr: ['४००० N', '२००० N', '५०० N', '२०,००० N'],
        hi: ['4000 N', '2000 N', '500 N', '20,000 N'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Acceleration a = (20 - 0) / 5 = 4 m/s². Force F = m × a = 1000 kg × 4 m/s² = 4000 N.',
        mr: 'प्रवेग a = २० / ५ = ४ मी/से². बल F = m × a = १००० × ४ = ४००० N.',
        hi: 'त्वरण a = 20 / 5 = 4 m/s²। बल F = m × a = 1000 × 4 = 4000 N।',
      },
    },
    {
      id: 'post-n2-2',
      topicId: 'newtons-second-law',
      conceptKey: 'momentum_vector_property',
      errorType: 'conceptual_error',
      question: {
        en: 'A 0.5 kg ball moving at 10 m/s bounces straight back off a wall at 10 m/s. What is the magnitude of change in momentum (Δp)?',
        mr: '१० मी/से वेगाने जाणारा ०.५ किग्रॅ चा चेंडू भिंतीवर आदळून १० मी/से वेगाने मागे येतो. संवेगात झालेला बदल (Δp) किती?',
        hi: '10 m/s से जाती 0.5 kg की गेंद दीवार से टकराकर 10 m/s से वापस लौटती है। संवेग में परिवर्तन (Δp) क्या है?',
      },
      options: {
        en: ['10 kg·m/s', '0 kg·m/s', '5 kg·m/s', '20 kg·m/s'],
        mr: ['१० किग्रॅ·मी/से', '० किग्रॅ·मी/से', '५ किग्रॅ·मी/से', '२० किग्रॅ·मी/से'],
        hi: ['10 kg·m/s', '0 kg·m/s', '5 kg·m/s', '20 kg·m/s'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Initial momentum p₁ = + (0.5 × 10) = +5. Final momentum p₂ = - (0.5 × 10) = -5. Change Δp = p₂ - p₁ = -5 - 5 = -10 kg·m/s (Magnitude = 10).',
        mr: 'सुरुवातीचा संवेग = +५, अंतिम संवेग = -५. संवेग बदल = -५ - (+५) = -१० किग्रॅ·मी/से (परिमाण = १०).',
        hi: 'प्रारंभिक संवेग = +5, अंतिम संवेग = -5। संवेग परिवर्तन = -5 - 5 = -10 kg·m/s (परिमाण = 10)।',
      },
    },
    {
      id: 'post-n2-3',
      topicId: 'newtons-second-law',
      conceptKey: 'force_definition_second_law',
      errorType: 'formula_error',
      question: {
        en: 'According to Newton’s 2nd law, Force is directly proportional to:',
        mr: 'न्यूटनच्या दुसऱ्या नियमानुसार बल कशाशी समानुपाती असते?',
        hi: 'न्यूटन के द्वितीय नियम के अनुसार बल किसके समानुपाती होता है?',
      },
      options: {
        en: ['Rate of change of momentum', 'Total distance covered', 'Total energy of the body', 'Velocity divided by mass'],
        mr: ['संवेग परिवर्तनाचा दर (Rate of change of momentum)', 'एकूण कापलेले अंतर', 'एकूण ऊर्जा', 'वेग भागिले वस्तुमान'],
        hi: ['संवेग परिवर्तन की दर', 'कुल तय की गई दूरी', 'कुल ऊर्जा', 'वेग बटा द्रव्यमान'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Newton’s second law states that Force is proportional to the rate of change of momentum: F = dp/dt.',
        mr: 'बल हे संवेग परिवर्तनाच्या दराशी समानुपाती असते: F = (p₂ - p₁) / t.',
        hi: 'बल संवेग परिवर्तन की दर के समानुपाती होता है।',
      },
    },
    {
      id: 'post-n2-4',
      topicId: 'newtons-second-law',
      conceptKey: 'airbag_impulse_physics',
      errorType: 'conceptual_error',
      question: {
        en: 'Why do vehicles have crumple zones and airbags based on Newton’s 2nd Law?',
        mr: 'वाहनांमध्ये क्रम्पल झोन व एअरबॅग्ज का असतात?',
        hi: 'वाहनों में एयरबैग और क्रंपल जोन क्यों बनाए जाते हैं?',
      },
      options: {
        en: ['To increase collision duration (t), reducing impact force (F = Δp / t)', 'To reduce the weight of vehicle', 'To increase the top speed', 'To prevent paint damage'],
        mr: ['आघाताचा वेळ (t) वाढवून शरीरावर येणारे बल (F) कमी करण्यासाठी', 'गाडीचे वजन कमी करण्यासाठी', 'वेग वाढवण्यासाठी', 'रंग वाचवण्यासाठी'],
        hi: ['टक्कर का समय (t) बढ़ाकर बल (F = Δp / t) को कम करने के लिए', 'वजन कम करने के लिए', 'स्पीड बढ़ाने के लिए', 'रंग बचाने के लिए'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Increasing the time (t) taken to bring momentum to zero reduces the average impact force F = Δp / Δt.',
        mr: 'वेळ वाढवल्यामुळे आघाताचे बल खूप कमी होते.',
        hi: 'समय बढ़ाने से प्रभाव बल कम हो जाता है।',
      },
    },
    {
      id: 'post-n2-5',
      topicId: 'newtons-second-law',
      conceptKey: 'mass_force_ratio',
      errorType: 'careless_error',
      question: {
        en: 'If the net force on an object is tripled while its mass remains constant, the acceleration will be:',
        mr: 'वस्तुमान स्थिर असताना वस्तूवरील बल तिप्पट केल्यास प्रवेग किती होईल?',
        hi: 'द्रव्यमान स्थिर रखकर यदि बल को तीन गुना कर दिया जाए, तो त्वरण कितना होगा?',
      },
      options: {
        en: ['Tripled (3 times)', 'One-third (1/3)', 'Nine times (9 times)', 'Unchanged'],
        mr: ['तिप्पट (३ पट)', 'एक तृतीयांश (१/३)', 'नऊ पट', 'बदलणार नाही'],
        hi: ['तीन गुना', 'एक तिहाई (1/3)', 'नौ गुना', 'अपरिवर्तित'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Since a = F / m, acceleration is directly proportional to Force. Tripling force triples acceleration.',
        mr: 'a = F / m असल्याने बल ३ पट केल्यास प्रवेगही ३ पट होतो.',
        hi: 'चूंकि a = F / m, बल 3 गुना होने पर त्वरण भी 3 गुना हो जाएगा।',
      },
    },
  ],

  'newtons-third-law': [
    {
      id: 'post-n3-1',
      topicId: 'newtons-third-law',
      conceptKey: 'action_reaction_objects',
      errorType: 'conceptual_error',
      question: {
        en: 'A person stands on Earth. The Earth pulls the person down with gravitational force W. What is the reaction force?',
        mr: 'व्यक्ती पृथ्वीवर उभी आहे. पृथ्वी व्यक्तीला गुरुत्वीय बलाने खाली खेचते. या बलाचे प्रतिक्रिया बल कोणते?',
        hi: 'पृथ्वी व्यक्ति को गुरुत्वाकर्षण बल W से नीचे खींचती है। इसका प्रतिक्रिया बल क्या है?',
      },
      options: {
        en: ['The gravitational force with which the person pulls the Earth upwards', 'The normal contact force from ground only', 'The air resistance', 'Zero'],
        mr: ['व्यक्तीने पृथ्वीला वर खेचणारे गुरुत्वाकर्षण बल', 'फक्त जमिनीचा सामान्य टेकू', 'हवेचा विरोध', 'शून्य'],
        hi: ['व्यक्ति द्वारा पृथ्वी को ऊपर की ओर खींचने वाला गुरुत्वाकर्षण बल', 'केवल जमीन का सामान्य बल', 'हवा का प्रतिरोध', 'शून्य'],
      },
      correctIndex: 0,
      explanation: {
        en: 'For Earth’s gravitational pull on the person (Action), the exact 3rd-law reaction is the Person’s gravitational pull on the Earth.',
        mr: 'पृथ्वीने व्यक्तीवर लावलेल्या गुरुत्वाकर्षण बलाचे प्रतिक्रिया बल म्हणजे व्यक्तीने पृथ्वीवर लावलेले गुरुत्वाकर्षण बल होय.',
        hi: 'पृथ्वी के गुरुत्वाकर्षण बल की प्रतिक्रिया व्यक्ति द्वारा पृथ्वी पर लगाया गया गुरुत्वाकर्षण बल है।',
      },
    },
    {
      id: 'post-n3-2',
      topicId: 'newtons-third-law',
      conceptKey: 'simultaneous_action_reaction',
      errorType: 'memory_error',
      question: {
        en: 'Which of the following is TRUE regarding the timing of action and reaction forces?',
        mr: 'क्रिया आणि प्रतिक्रिया बलांच्या वेळेबद्दल कोणते विधान खरे आहे?',
        hi: 'क्रिया और प्रतिक्रिया बलों के समय के संदर्भ में कौन सा कथन सत्य है?',
      },
      options: {
        en: ['They occur simultaneously (at the exact same instant)', 'Action occurs first, reaction occurs 1 second later', 'Reaction occurs before action', 'Reaction happens only if body moves'],
        mr: ['ते एकाच क्षणी (एकाच वेळी) निर्माण होतात', 'क्रिया आधी घडते व प्रतिक्रिया १ सेकंदाने घडते', 'प्रतिक्रिया आधी घडते', 'फक्त वस्तू हलल्यासच प्रतिक्रिया होते'],
        hi: ['वे एक ही क्षण (एक साथ) उत्पन्न होते हैं', 'क्रिया पहले होती है और प्रतिक्रिया 1 सेकंड बाद', 'प्रतिक्रिया पहले होती है', 'केवल गति होने पर ही प्रतिक्रिया होती है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Action and reaction forces occur simultaneously at the exact same instant without any time lag.',
        mr: 'क्रिया आणि प्रतिक्रिया बले एकाच क्षणी कोणत्याही विलंबाशिवाय निर्माण होतात.',
        hi: 'क्रिया और प्रतिक्रिया बल बिना किसी समय अंतराल के एक साथ उत्पन्न होते हैं।',
      },
    },
    {
      id: 'post-n3-3',
      topicId: 'newtons-third-law',
      conceptKey: 'boat_stepping_problem',
      errorType: 'careless_error',
      question: {
        en: 'When a boy jumps forward out of a small rowing boat onto the riverbank, why does the boat move backwards?',
        mr: 'लहान बोटीतून मुलगा किनाऱ्यावर पुढे उडी मारतो, तेव्हा बोट मागे का सरकते?',
        hi: 'नाव से किनारे पर आगे कूदने पर नाव पीछे क्यों खिसकती है?',
      },
      options: {
        en: ['The boy pushes the boat backwards with his feet (Action), and the boat pushes him forward (Reaction)', 'The river current pulls the boat', 'The boy weight vanishes', 'The boat has an engine'],
        mr: ['मुलगा पायाने बोटीला मागे ढकलतो (क्रिया) आणि बोट मुलाला पुढे ढकलते (प्रतिक्रिया)', 'नदीचा प्रवाह बोटीला ओढतो', 'मुलाचे वजन शून्य होते', 'बोटीला इंजिन असते'],
        hi: ['लड़का पैरों से नाव को पीछे धकेलता है (क्रिया) और नाव उसे आगे धकेलती है (प्रतिक्रिया)', 'नदी की धारा नाव को खींचती है', 'वजन शून्य हो जाता है', 'नाव में इंजन होता है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'To push himself forward onto the bank, the boy must apply a backward action force on the boat, causing it to push back.',
        mr: 'पुढे उडी मारण्यासाठी मुलगा बोटीला मागे ढकलतो, त्यामुळे बोट मागे सरकते.',
        hi: 'आगे कूदने के लिए लड़का नाव पर पीछे की ओर बल लगाता है जिससे नाव पीछे खिसकती है।',
      },
    },
    {
      id: 'post-n3-4',
      topicId: 'newtons-third-law',
      conceptKey: 'horse_cart_paradox',
      errorType: 'conceptual_error',
      question: {
        en: 'A horse pulls a cart. By Newton’s 3rd Law, the cart pulls the horse back with equal force. How can the system accelerate forward?',
        mr: 'घोडा गाडी ओढतो व गाडी घोड्याला तेवढ्याच बलाने मागे ओढते. तरीही गाडी पुढे कशी धावू शकते?',
        hi: 'घोड़ा गाड़ी को खींचता है और गाड़ी घोड़े को बराबर बल से पीछे खींचती है। फिर भी गाड़ी आगे कैसे बढ़ती है?',
      },
      options: {
        en: ['The horse exerts a backward force on the ground, and the ground exerts a forward reaction force on the horse greater than wheel friction', 'Newton’s 3rd law fails for living animals', 'The cart wheels have zero mass', 'The horse runs faster than the law of physics'],
        mr: ['घोडा जमिनीला मागे ढकलतो आणि जमीन घोड्यावर पुढे प्रतिक्रिया बल लावते जे घर्षणापेक्षा जास्त असते', 'सजीवांसाठी न्यूटनचा नियम लागू होत नाही', 'चाकांचे वस्तुमान शून्य असते', 'घोडा नियमांपेक्षा वेगाने धावतो'],
        hi: ['घोड़ा जमीन को पीछे धकेलता है और जमीन घोड़े पर आगे की ओर प्रतिक्रिया बल लगाती है', 'जीवित प्राणियों पर नियम लागू नहीं होता', 'पहियों का द्रव्यमान शून्य है', 'घोड़ा भौतिकी से तेज है'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Forward motion occurs because the forward reaction force exerted by the ground on the horse’s hooves exceeds the opposing friction on the cart wheels.',
        mr: 'जमीन घोड्याच्या टापांवर पुढे प्रतिक्रिया बल लावते, ज्यामुळे संपूर्ण गाडी पुढे धावते.',
        hi: 'जमीन द्वारा घोड़े पर लगाया गया आगे का प्रतिक्रिया बल पहियों के घर्षण से अधिक होता है।',
      },
    },
    {
      id: 'post-n3-5',
      topicId: 'newtons-third-law',
      conceptKey: 'action_reaction_formula',
      errorType: 'formula_error',
      question: {
        en: 'If Body A exerts a force F_AB on Body B, which vector equation correctly represents Newton’s 3rd Law?',
        mr: 'जर वस्तू A ने वस्तू B वर F_AB बल लावले, तर न्यूटनच्या ३ ऱ्या नियमाचे योग्य सदिश समीकरण कोणते?',
        hi: 'यदि वस्तु A वस्तु B पर F_AB बल लगाती है, तो न्यूटन के तीसरे नियम का सही सदिश समीकरण क्या है?',
      },
      options: {
        en: ['F_AB = - F_BA', 'F_AB = + F_BA', 'F_AB × F_BA = 0', 'F_AB = F_BA / 2'],
        mr: ['F_AB = - F_BA', 'F_AB = + F_BA', 'F_AB × F_BA = ०', 'F_AB = F_BA / २'],
        hi: ['F_AB = - F_BA', 'F_AB = + F_BA', 'F_AB × F_BA = 0', 'F_AB = F_BA / 2'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Vector form: F_AB = - F_BA (equal magnitude, opposite direction sign).',
        mr: 'सदिश रूप: F_AB = - F_BA (समान परिमाण, विरुद्ध दिशा).',
        hi: 'सदिश रूप: F_AB = - F_BA (समान परिमाण, विपरीत दिशा)।',
      },
    },
  ],
};
