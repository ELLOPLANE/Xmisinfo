// ============================================================
// MOCK DATA — posts, users, quizzes, community notes, trending
// ============================================================

export const CURRENT_USER = {
  id: 'u0',
  name: 'Alex Rivera',
  handle: '@alex_rivera',
  points: 34,
  tier: 2,
  avatar: { animal: '🦊', hat: null, outfit: null },
};

export const USERS = {
  u1: { id: 'u1', name: 'Sarah Chen', handle: '@sarahchen', points: 82, tier: 4, avatar: { animal: '🐯', hat: '🎩', outfit: '👗' } },
  u2: { id: 'u2', name: 'Marcus Johnson', handle: '@marcus_j', points: 5, tier: 1, avatar: null },
  u3: { id: 'u3', name: 'Priya Sharma', handle: '@priyasharma', points: 55, tier: 3, avatar: { animal: '🦁', hat: '🧢', outfit: null } },
  u4: { id: 'u4', name: 'Dave Kim', handle: '@davekim', points: 22, tier: 2, avatar: { animal: '🐺', hat: null, outfit: null } },
  u5: { id: 'u5', name: 'Luna Tan', handle: '@luna_tan', points: 67, tier: 3, avatar: { animal: '🦋', hat: '👒', outfit: null } },
};

export const POSTS = [
  {
    id: 'p1',
    userId: 'u1',
    content: 'Singapore will implement a mandatory 4-day work week starting from June 2025 — this is official government policy!',
    timestamp: '2h ago',
    likes: 1204,
    reposts: 342,
    replies: 89,
    views: '48.2K',
    factCheck: {
      verdict: 'misleading',
      label: '⚠️ This post might contain misinformation',
      color: 'amber',
      report: {
        claim: 'Singapore will implement a mandatory 4-day work week starting from June 2025',
        verdict: 'Misleading',
        verdictColor: 'amber',
        theFacts: "Singapore's Ministry of Manpower (MOM) introduced Tripartite Guidelines on Flexible Work Arrangements (FWAs) in December 2024. These guidelines encourage employers to fairly consider requests for flexible work — including compressed schedules — but they do not mandate a 4-day work week. Employers are not required to implement any specific schedule.",
        whyFlawed: "The claim conflates voluntary guidelines with mandatory legislation. No law, bill, or official government circular mandating a 4-day work week has been passed or announced. The original MOM circular specifically states that the decision remains at employers' discretion.",
        whatExplains: "The confusion likely stems from international media coverage of countries like Iceland, Belgium, and Japan trialling 4-day weeks, combined with Singapore's separate FWA guidelines. Several viral WhatsApp messages incorrectly merged these two distinct developments.",
        sources: [
          { title: 'MOM: Tripartite Guidelines on FWAs (Dec 2024)', url: 'https://www.mom.gov.sg' },
          { title: 'CNA: What the new FWA guidelines actually say', url: 'https://www.channelnewsasia.com' },
          { title: 'gov.sg: Flexible Work Arrangements FAQ', url: 'https://www.gov.sg' },
        ],
      },
    },
    quiz: {
      question: 'Where can you find the most reliable information about Singapore government employment policies?',
      options: ['gov.sg / MOM.gov.sg', 'Reddit r/singapore', 'WhatsApp forwards'],
      correctIndex: 0,
      explanation: 'The correct answer is gov.sg / MOM.gov.sg — official government portals are the authoritative source for Singapore policy, not social media or messaging apps.',
    },
    communityNotes: [
      { id: 'cn1', userId: 'u4', text: 'MOM guidelines encourage flexible work arrangements but do NOT mandate a 4-day work week. Employers retain full discretion.', upvotes: 7, approved: true },
    ],
  },
  {
    id: 'p2',
    userId: 'u2',
    content: 'The WHO has officially declared COVID-19 a "permanently endemic disease" and lifted all global health monitoring protocols as of January 2025.',
    timestamp: '4h ago',
    likes: 879,
    reposts: 501,
    replies: 203,
    views: '89.1K',
    factCheck: {
      verdict: 'false',
      label: '⚠️ This post might contain misinformation',
      color: 'amber',
      report: {
        claim: 'The WHO declared COVID-19 a "permanently endemic disease" and lifted all monitoring protocols as of January 2025',
        verdict: 'False',
        verdictColor: 'red',
        theFacts: 'The World Health Organization (WHO) declared COVID-19 no longer a Public Health Emergency of International Concern (PHEIC) in May 2023. However, this did not mean the disease was declared "permanently endemic" or that global monitoring ended. As of early 2025, WHO continues active surveillance through its SARS-CoV-2 Virus Evolution Working Group and issues regular situation reports.',
        whyFlawed: 'Ending a PHEIC declaration is a formal procedural step, not a declaration that a disease is permanently endemic or harmless. The post inaccurately merges the 2023 PHEIC end with fabricated claims about "lifting all protocols" — language WHO has never used.',
        whatExplains: 'COVID-19 fatigue and misinformation about the disease\'s reduced danger have led to repeated false claims that global health bodies have "closed the book" on COVID. In reality, monitoring continues because new variants still emerge and pose risks — particularly to immunocompromised populations.',
        sources: [
          { title: 'WHO Statement on COVID-19 PHEIC End (May 2023)', url: 'https://www.who.int' },
          { title: 'Reuters Fact Check: WHO COVID monitoring', url: 'https://www.reuters.com/fact-check' },
          { title: 'AP News: COVID status 2025 update', url: 'https://apnews.com' },
        ],
      },
    },
    quiz: {
      question: 'Which organisation is responsible for declaring global health emergencies?',
      options: ['WHO (World Health Organization)', 'UN Security Council', 'Red Cross'],
      correctIndex: 0,
      explanation: 'The correct answer is the WHO — it is the UN agency responsible for international public health, including declaring PHEICs (Public Health Emergencies of International Concern).',
    },
    communityNotes: [
      { id: 'cn2', userId: 'u3', text: 'WHO ended the PHEIC status in May 2023, but has not declared COVID "permanently endemic" nor stopped monitoring. This is a mischaracterisation.', upvotes: 12, approved: true },
    ],
  },
  {
    id: 'p3',
    userId: 'u3',
    content: 'Scientists at MIT have confirmed water has been found on Mars in liquid form, with high-confidence evidence of microbial life detected by the Perseverance rover. This is HUGE.',
    timestamp: '6h ago',
    likes: 23041,
    reposts: 8902,
    replies: 1489,
    views: '1.2M',
    factCheck: {
      verdict: 'misleading',
      label: '⚠️ This post might contain misinformation',
      color: 'amber',
      report: {
        claim: 'MIT scientists confirmed liquid water and microbial life on Mars detected by Perseverance',
        verdict: 'Misleading',
        verdictColor: 'amber',
        theFacts: 'NASA\'s Perseverance rover has detected organic molecules and geological features consistent with past water activity on Mars. However, as of January 2025, no confirmed liquid water in stable surface form has been discovered, and microbial life has not been detected. NASA and MIT have made no such announcement.',
        whyFlawed: 'Organic molecules are necessary but not sufficient for life. The existence of past water activity does not equal present liquid water. No peer-reviewed paper or official NASA/MIT press release supports the specific claims in this post — the claim fabricates a confirmation that does not exist.',
        whatExplains: 'Space exploration generates enormous public interest, which bad actors exploit by exaggerating or fabricating discoveries. Genuine Mars findings are reported via NASA\'s official channels and peer-reviewed journals before mainstream media.',
        sources: [
          { title: 'NASA Perseverance Mission Updates', url: 'https://www.nasa.gov/perseverance' },
          { title: 'BBC Science: What Perseverance has actually found', url: 'https://www.bbc.com/science' },
          { title: 'Reuters: No evidence of life on Mars — scientists', url: 'https://www.reuters.com' },
        ],
      },
    },
    quiz: {
      question: 'What is the most reliable source for updates on NASA Mars missions?',
      options: ['NASA.gov official site', 'Viral social media posts', 'YouTube conspiracy channels'],
      correctIndex: 0,
      explanation: 'The correct answer is NASA.gov — official agency websites provide verified, peer-reviewed mission data, unlike unverified social media claims.',
    },
    communityNotes: [],
  },
  {
    id: 'p4',
    userId: 'u4',
    content: "Singapore's national vaccination rate for COVID-19 is one of the highest in the world, exceeding 90% for the primary series. This remains a public health success story.",
    timestamp: '8h ago',
    likes: 4210,
    reposts: 1023,
    replies: 78,
    views: '31.5K',
    factCheck: {
      verdict: 'verified',
      label: '✅ Verified as factually correct',
      color: 'green',
      report: {
        claim: "Singapore's COVID-19 vaccination rate exceeded 90% for the primary series",
        verdict: 'Verified',
        verdictColor: 'green',
        theFacts: 'According to the Ministry of Health (MOH) Singapore and WHO data, Singapore achieved over 92% primary series vaccination coverage by late 2022 and maintained high rates through 2024 — among the highest globally. This was confirmed by multiple independent health organisations.',
        whyFlawed: 'This claim is accurate — no flaw to address. The statistic is consistent across government, WHO, and independent sources.',
        whatExplains: "Singapore's high vaccination rate is attributed to the national vaccination programme, effective public health communication, and the Vaccine Injury Financial Assistance Programme (VIFAP) which addressed hesitancy concerns.",
        sources: [
          { title: 'MOH Singapore: Vaccination Statistics', url: 'https://www.moh.gov.sg' },
          { title: 'WHO: Singapore COVID-19 vaccination coverage', url: 'https://www.who.int' },
          { title: 'Our World in Data: Vaccination rates by country', url: 'https://ourworldindata.org' },
        ],
      },
    },
    quiz: {
      question: 'Which Singapore government body oversees national vaccination programmes?',
      options: ['HPB (Health Promotion Board)', 'Ministry of Finance', 'NEA (National Environment Agency)'],
      correctIndex: 0,
      explanation: 'The correct answer is HPB (Health Promotion Board), which operates under MOH and coordinates national vaccination programmes in Singapore.',
    },
    communityNotes: [
      { id: 'cn4', userId: 'u5', text: 'Confirmed by MOH data — over 92% primary series completion. Singapore ranked among top 5 globally for vaccination coverage.', upvotes: 9, approved: true },
    ],
  },
  {
    id: 'p5',
    userId: 'u5',
    content: 'New study proves that eating chocolate every day reduces the risk of heart disease by 75%. Cardiologists are recommending daily chocolate consumption!',
    timestamp: '12h ago',
    likes: 15200,
    reposts: 7800,
    replies: 940,
    views: '428K',
    factCheck: {
      verdict: 'false',
      label: '⚠️ This post might contain misinformation',
      color: 'amber',
      report: {
        claim: 'A new study proves daily chocolate consumption reduces heart disease risk by 75%, endorsed by cardiologists',
        verdict: 'False',
        verdictColor: 'red',
        theFacts: 'Some observational studies suggest that moderate dark chocolate consumption (rich in flavonoids) may be associated with modest cardiovascular benefits. However, no credible study demonstrates a 75% risk reduction, and no mainstream cardiology association recommends daily chocolate consumption as medical advice.',
        whyFlawed: 'The 75% figure is unsupported by any published research. The claim confuses association with causation and exaggerates findings. Chocolate is high in sugar and saturated fat — recommending daily consumption without caveats contradicts established dietary medicine.',
        whatExplains: 'Health misinformation often latches onto real (but narrow) scientific findings and amplifies them dramatically. Chocolate studies receive heavy press coverage, which bad actors exploit to spread exaggerated health claims.',
        sources: [
          { title: 'British Heart Foundation: Chocolate and heart health', url: 'https://www.bhf.org.uk' },
          { title: 'Reuters Health Check: Chocolate claims debunked', url: 'https://www.reuters.com' },
          { title: 'Harvard Health Publishing: What research actually says', url: 'https://www.health.harvard.edu' },
        ],
      },
    },
    quiz: {
      question: 'How should you evaluate health claims shared on social media?',
      options: ['Check peer-reviewed journals and trusted health bodies', 'Accept it if it has lots of likes', 'Share immediately if it sounds beneficial'],
      correctIndex: 0,
      explanation: 'The correct answer is to check peer-reviewed journals and trusted health bodies — likes and shares do not validate medical claims. Always verify through authoritative sources.',
    },
    communityNotes: [],
  },
];

export const TRENDING = [
  { id: 't1', category: 'Fact-Check · Trending', topic: '#TruthCheck', posts: '84.2K posts' },
  { id: 't2', category: 'Health · Trending', topic: 'WHO Guidelines', posts: '32.1K posts' },
  { id: 't3', category: 'Singapore · Trending', topic: '#SGPolicyWatch', posts: '21.7K posts' },
  { id: 't4', category: 'Science · Trending', topic: 'Mars Discovery', posts: '199K posts' },
  { id: 't5', category: 'Education · Trending', topic: '#MediaLiteracy', posts: '15.4K posts' },
];

export const TIER_CONFIG = [
  { tier: 1, label: 'Truth Seeker', minPoints: 0, maxPoints: 10, color: '#71767b', emoji: '🔍', badge: null },
  { tier: 2, label: 'Fact Finder', minPoints: 11, maxPoints: 40, color: '#3b82f6', emoji: '📋', badge: '🐾' },
  { tier: 3, label: 'Verified Voice', minPoints: 41, maxPoints: 70, color: '#8b5cf6', emoji: '🎖️', badge: '🎩' },
  { tier: 4, label: 'Credibility Champion', minPoints: 71, maxPoints: Infinity, color: '#f59e0b', emoji: '🏆', badge: '👑' },
];

export const AVATAR_OPTIONS = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦋', '🐺', '🦝', '🦄', '🐲'],
  hats: ['🎩', '🧢', '👒', '⛑️', '🛡️', '🪖', '👑', '🎓', '🤠', '🪅'],
  outfits: ['👔', '👗', '🥻', '🩱', '👘', '🥷', '🦸', '🧙', '👮', '🧑‍🚀'],
};
