export interface ContentCard {
  id: number
  title: string
  description: string
  icon: string
  stat?: string
  pathForward: string
}

export interface Step {
  step: number
  title: string
  description: string
  quote?: string
  author?: string
}

export interface Region {
  id: string
  name: string
  title: string
  description: string
  efforts: string[]
  flag: string
  color: string
  lesson: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  description: string
  color: string
}

export interface PeaceMessage {
  text: string
  theme: 'dialogue' | 'empathy' | 'justice' | 'unity'
  origin: string
}

export const chaosContent: ContentCard[] = [
  {
    id: 1,
    title: 'Nationalism and Tribalism',
    description:
      'Extreme identity politics turns belonging into exclusion, making neighbors feel like threats and difference feel like danger.',
    icon: '🏴',
    stat: '54 countries saw a rise in nationalist violence in 2023',
    pathForward: 'Counter it with dialogue that protects identity without weaponizing it.',
  },
  {
    id: 2,
    title: 'Resource Scarcity',
    description:
      'Competition over water, land, food, and energy pushes fragile communities toward conflict, especially when climate pressure rises.',
    icon: '💧',
    stat: '40% of armed conflicts involve natural resource disputes',
    pathForward: 'Counter it with cooperation that makes survival a shared project.',
  },
  {
    id: 3,
    title: 'Historical Injustices',
    description:
      'Unresolved colonial borders, ethnic violence, and inherited trauma keep old wounds politically alive across generations.',
    icon: '⚖️',
    stat: 'Over 80 ongoing territorial disputes are rooted in colonial borders',
    pathForward: 'Counter it with truth, accountability, and visible repair.',
  },
  {
    id: 4,
    title: 'Misinformation',
    description:
      'Propaganda spreads faster than trust. False narratives simplify complex realities until empathy is replaced by fear.',
    icon: '📡',
    stat: '3.6 billion people live in countries with severe information disorder',
    pathForward: 'Counter it with education, media literacy, and patient listening.',
  },
  {
    id: 5,
    title: 'Economic Inequality',
    description:
      'When dignity feels unattainable, resentment grows. Vast wealth gaps turn exclusion into instability and instability into violence.',
    icon: '📊',
    stat: 'The top 1% owns 45.6% of global wealth',
    pathForward: 'Counter it with justice-oriented systems that widen opportunity.',
  },
  {
    id: 6,
    title: 'Arms Proliferation',
    description:
      'A world saturated with weapons becomes a world where fear is always one decision away from devastation.',
    icon: '🔫',
    stat: '$2.2 trillion was spent globally on the military in 2023',
    pathForward: 'Counter it with restraint, diplomacy, and shared security frameworks.',
  },
]

export const understandingSteps: Step[] = [
  {
    step: 1,
    title: 'Open Communication',
    description:
      'Peace begins when people are willing to stay in the room. Dialogue does not erase disagreement, but it prevents silence from hardening into permanent distance.',
    quote:
      'If you want to make peace with your enemy, you have to work with your enemy. Then he becomes your partner.',
    author: 'Nelson Mandela',
  },
  {
    step: 2,
    title: 'Empathy and Perspective',
    description:
      'Empathy interrupts dehumanization. It lets us see pain, fear, and hope on the other side of a disagreement without pretending every side is identical.',
    quote: 'You never really understand a person until you consider things from his point of view.',
    author: 'Harper Lee',
  },
  {
    step: 3,
    title: 'Education for Peace',
    description:
      'Critical thinking, conflict resolution, and shared history teach young people how to face difference without converting it into hostility.',
    quote: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    step: 4,
    title: 'International Cooperation',
    description:
      'Lasting peace is rarely local only. It depends on institutions, trade, diplomacy, and common incentives that make cooperation stronger than escalation.',
    quote: 'The United Nations was created not to bring us to heaven, but to save us from hell.',
    author: 'Dag Hammarskjold',
  },
  {
    step: 5,
    title: 'Justice and Accountability',
    description:
      'Peace without repair is fragile. Accountability, truth-telling, and restitution help communities move from survival toward trust.',
    quote: 'Peace without justice is an illusion.',
    author: 'Pope Paul VI',
  },
]

export const globalRegions: Region[] = [
  {
    id: 'africa',
    name: 'Africa',
    title: 'Ubuntu: I Am Because We Are',
    description:
      'From truth commissions to community courts, African peace-building often treats healing as something collective rather than merely legal.',
    efforts: [
      'African Union peace and mediation frameworks under Agenda 2063',
      'Rwanda community reconciliation processes after genocide',
      'Regional mediation in South Sudan through neighboring states and IGAD',
    ],
    flag: '🌍',
    color: '#f59e0b',
    lesson: 'Peace can begin when communities rebuild dignity together, not one grievance at a time.',
  },
  {
    id: 'asia',
    name: 'Asia',
    title: 'From Friction to Connectivity',
    description:
      'Asia holds some of the world\'s most complex disputes, but it also shows how interdependence and citizen diplomacy can keep escalation from becoming destiny.',
    efforts: [
      'ASEAN frameworks that prioritize stability and regional dialogue',
      'Citizen diplomacy initiatives between India and Pakistan',
      'Economic cooperation through APEC as a peace-supporting mechanism',
    ],
    flag: '🌏',
    color: '#06b6d4',
    lesson: 'Peace can grow when connection becomes more valuable than victory.',
  },
  {
    id: 'europe',
    name: 'Europe',
    title: 'From Ashes to Union',
    description:
      'Europe demonstrates that former rivals can design institutions strong enough to outlast memory, fear, and repeated crisis.',
    efforts: [
      'European integration as a peace project after two world wars',
      'OSCE monitoring, diplomacy, and democratic institution support',
      'Cross-border legal and economic systems that reduce incentives for war',
    ],
    flag: '🌐',
    color: '#6366f1',
    lesson: 'Peace endures longer when cooperation is built into everyday systems.',
  },
  {
    id: 'americas',
    name: 'Americas',
    title: 'Reconciliation and New Beginnings',
    description:
      'Across the Americas, peace-building often centers on confronting historical harm while making room for Indigenous wisdom, transitional justice, and civic repair.',
    efforts: [
      'Colombia\'s 2016 peace accord and its transitional justice mechanisms',
      'Truth and reconciliation efforts with Indigenous communities in Canada',
      'Regional human-rights monitoring through the Inter-American system',
    ],
    flag: '🌎',
    color: '#10b981',
    lesson: 'Peace deepens when societies name harm honestly and still choose to move forward.',
  },
  {
    id: 'mideast',
    name: 'Middle East',
    title: 'Seeds of Peace in Contested Ground',
    description:
      'In one of the world\'s most disputed regions, grassroots peace-builders keep proving that courage can survive even where politics repeatedly fails.',
    efforts: [
      'Seeds of Peace dialogue programs across conflict lines',
      'Normalization initiatives that reopen diplomatic possibility',
      'UN-mediated ceasefire and humanitarian negotiation efforts',
    ],
    flag: '🕊️',
    color: '#f97316',
    lesson: 'Peace often survives first as a practice between people before it becomes policy.',
  },
]

export const dataStats: Stat[] = [
  {
    label: 'Armed Conflicts',
    value: 183,
    suffix: '',
    description: 'Active armed conflicts recorded globally in 2023.',
    color: '#c0392b',
  },
  {
    label: 'People Displaced',
    value: 117,
    suffix: 'M',
    description: 'Forcibly displaced people worldwide, a record high.',
    color: '#e67e22',
  },
  {
    label: 'Cost of Violence',
    value: 17,
    suffix: 'T',
    description: 'Estimated annual global economic impact of violence in USD.',
    color: '#8e44ad',
  },
  {
    label: 'UN Peacekeepers',
    value: 87,
    suffix: 'K+',
    description: 'Personnel deployed across active UN peacekeeping operations.',
    color: '#2980b9',
  },
  {
    label: 'Peace Agreements',
    value: 34,
    suffix: '',
    description: 'Peace agreements signed globally in the last decade.',
    color: '#27ae60',
  },
  {
    label: 'Peacebuilding Orgs',
    value: 2400,
    suffix: '+',
    description: 'Active civil-society peacebuilding organizations worldwide.',
    color: '#16a085',
  },
]

export const peaceMessages: PeaceMessage[] = [
  { text: 'Peace is a daily practice, not a destination.', theme: 'unity', origin: 'Global reflection' },
  { text: 'Shanti: peace as inner stillness and shared balance.', theme: 'unity', origin: 'Sanskrit' },
  { text: 'The world is my country, and all humankind are my kin.', theme: 'unity', origin: 'Stoic tradition' },
  { text: 'Paz. Paix. Frieden. Mir. Peace sounds different and means the same hope.', theme: 'dialogue', origin: 'Many languages' },
  { text: 'You cannot shake hands with a clenched fist.', theme: 'dialogue', origin: 'Indira Gandhi' },
  { text: 'Imagine all the people living life in peace.', theme: 'unity', origin: 'John Lennon' },
  { text: 'Where there is no justice, there can be no peace.', theme: 'justice', origin: 'Collective wisdom' },
  { text: 'Peace begins with a smile.', theme: 'empathy', origin: 'Mother Teresa' },
  { text: 'Salaam: peace as greeting, blessing, and belonging.', theme: 'dialogue', origin: 'Arabic' },
  { text: 'In diversity there is beauty and there is strength.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'Amani: peace carried through community.', theme: 'unity', origin: 'Swahili' },
  { text: 'Every act of kindness is a stone dropped into the lake of peace.', theme: 'empathy', origin: 'Adapted reflection' },
  { text: 'We are more alike than we are unalike.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'Justice is the first condition of humanity.', theme: 'justice', origin: 'Wole Soyinka' },
  { text: 'Dialogue is how fear stops being the only voice in the room.', theme: 'dialogue', origin: 'Project note' },
]

export const interactivePrompts = [
  'Move through the field to feel division push back.',
  'Click to switch from repelling to attracting the particles.',
  'Scroll to watch chaos align into a shared symbol of peace.',
]

export const suggestionCategories = [
  'Peace message',
  'Storytelling idea',
  'Interactive feature idea',
  'Region or case study',
  'Data or research source',
  'Accessibility improvement',
]

export const ctaPrompts = [
  'What helps people listen across disagreement in your community?',
  'What peace practice deserves more attention here?',
  'What should this experience include next to make it more useful?',
]

export const navLinks = [
  { label: 'Conflict', href: '#chaos' },
  { label: 'Repair', href: '#understanding' },
  { label: 'Experience', href: '#interactive' },
  { label: 'World', href: '#global' },
  { label: 'Data', href: '#data' },
  { label: 'Act', href: '#cta' },
]
