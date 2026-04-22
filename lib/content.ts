import type { GlyphName } from '@/lib/glyphs'

export interface ContentCard {
  id: number
  title: string
  description: string
  icon: GlyphName
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
  glyph: GlyphName
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
    title: 'Identity Turned Into Threat',
    description: 'When belonging is weaponized, neighbors begin to look like enemies.',
    icon: 'standard',
    stat: '54 countries saw rising nationalist violence in 2023.',
    pathForward: 'Protect identity without turning it into exclusion.',
  },
  {
    id: 2,
    title: 'Scarcity Under Stress',
    description: 'Pressure over water, land, food, and energy can turn fear into conflict.',
    icon: 'resource',
    stat: '40% of armed conflicts involve natural resources.',
    pathForward: 'Share resources fairly before survival feels zero-sum.',
  },
  {
    id: 3,
    title: 'History Left Unrepaired',
    description: 'Old borders and unhealed injustice keep reopening in the present.',
    icon: 'justice',
    stat: '80+ territorial disputes trace back to colonial borders.',
    pathForward: 'Truth, accountability, and repair interrupt the cycle.',
  },
  {
    id: 4,
    title: 'Lies at Scale',
    description: 'When lies outrun trust, fear begins choosing for us.',
    icon: 'signal',
    stat: '3.6B people live amid severe information disorder.',
    pathForward: 'Rebuild trust with literacy, credible institutions, and listening.',
  },
  {
    id: 5,
    title: 'Inequality That Hardens',
    description: 'When dignity feels unreachable, resentment catches fire.',
    icon: 'inequality',
    stat: 'The top 1% holds 45.6% of global wealth.',
    pathForward: 'Widen access to opportunity, safety, and voice.',
  },
  {
    id: 6,
    title: 'A World Armed for Panic',
    description: 'More weapons leave less distance between tension and tragedy.',
    icon: 'arms',
    stat: '$2.2T was spent on the military globally in 2023.',
    pathForward: 'Choose restraint, diplomacy, and shared security instead.',
  },
]

export const understandingSteps: Step[] = [
  {
    step: 1,
    title: 'Stay in the Room',
    description: 'Dialogue keeps pain from sealing into permanent division.',
    quote:
      'If you want to make peace with your enemy, you have to work with your enemy. Then he becomes your partner.',
    author: 'Nelson Mandela',
  },
  {
    step: 2,
    title: 'See the Human Being',
    description: 'Empathy breaks dehumanization and makes cruelty harder to excuse.',
  },
  {
    step: 3,
    title: 'Teach What Hate Hides',
    description: 'Education helps people question hate before it becomes identity.',
  },
  {
    step: 4,
    title: 'Build for Each Other',
    description: 'Peace lasts when cooperation is built into systems, not left to chance.',
    quote: 'The United Nations was created not to bring us to heaven, but to save us from hell.',
    author: 'Dag Hammarskjold',
  },
  {
    step: 5,
    title: 'Repair What Was Broken',
    description: 'Justice, truth, and accountability make peace believable again.',
    quote: 'Peace without justice is an illusion.',
    author: 'Pope Paul VI',
  },
]

export const globalRegions: Region[] = [
  {
    id: 'africa',
    name: 'Africa',
    title: 'Ubuntu: Peace Through Shared Dignity',
    description: 'Across Africa, peace-building often begins by restoring dignity together, not punishing alone.',
    efforts: [
      'African Union mediation and peace frameworks under Agenda 2063',
      'Rwanda community reconciliation after genocide',
    ],
    glyph: 'africa',
    color: '#f59e0b',
    lesson: 'Repair lasts when dignity is restored together.',
  },
  {
    id: 'asia',
    name: 'Asia',
    title: 'Connection Over Escalation',
    description: 'Asia shows how dialogue, trade, and civic ties can keep deep tension from becoming destiny.',
    efforts: [
      'ASEAN regional dialogue frameworks',
      'Citizen diplomacy between India and Pakistan',
    ],
    glyph: 'asia',
    color: '#06b6d4',
    lesson: 'Peace grows when connection matters more than winning.',
  },
  {
    id: 'europe',
    name: 'Europe',
    title: 'From Rivalry to Union',
    description: 'Europe shows former enemies can build systems strong enough to outlast fear.',
    efforts: [
      'European integration after two world wars',
      'OSCE diplomacy and democratic monitoring',
    ],
    glyph: 'europe',
    color: '#6366f1',
    lesson: 'Peace lasts when cooperation becomes ordinary life.',
  },
  {
    id: 'americas',
    name: 'Americas',
    title: 'Repairing the Past, Rebuilding Trust',
    description: 'Across the Americas, peace-building often means naming harm honestly so trust can return.',
    efforts: [
      'Colombia’s 2016 peace accord and transitional justice',
      'Truth and reconciliation efforts with Indigenous communities in Canada',
    ],
    glyph: 'americas',
    color: '#10b981',
    lesson: 'Peace deepens when truth and forward motion travel together.',
  },
  {
    id: 'mideast',
    name: 'Middle East',
    title: 'Peace Kept Alive Between People',
    description: 'Grassroots efforts here show human courage can outlast political paralysis.',
    efforts: [
      'Seeds of Peace dialogue across conflict lines',
      'UN-mediated ceasefire and humanitarian negotiations',
    ],
    glyph: 'mideast',
    color: '#f97316',
    lesson: 'Peace often survives between people before it reaches policy.',
  },
]

export const dataStats: Stat[] = [
  {
    label: 'Armed Conflicts',
    value: 183,
    suffix: '',
    description: 'Active armed conflicts recorded worldwide in 2023.',
    color: '#c0392b',
  },
  {
    label: 'People Displaced',
    value: 117,
    suffix: 'M',
    description: 'Lives uprooted by conflict, now at a record high.',
    color: '#e67e22',
  },
  {
    label: 'Cost of Violence',
    value: 17,
    suffix: 'T',
    description: 'Estimated yearly global cost of violence in U.S. dollars.',
    color: '#8e44ad',
  },
  {
    label: 'UN Peacekeepers',
    value: 87,
    suffix: 'K+',
    description: 'Personnel standing between fragile ceasefires and collapse.',
    color: '#2980b9',
  },
  {
    label: 'Peace Agreements',
    value: 34,
    suffix: '',
    description: 'Peace agreements signed globally over the last decade.',
    color: '#27ae60',
  },
  {
    label: 'Peacebuilding Orgs',
    value: 2400,
    suffix: '+',
    description: 'Civil-society groups quietly preventing conflict and rebuilding trust.',
    color: '#16a085',
  },
]

export const peaceMessages: PeaceMessage[] = [
  { text: 'Peace is a practice we keep choosing.', theme: 'unity', origin: 'Global reflection' },
  { text: 'Shanti: peace as inner steadiness and shared balance.', theme: 'unity', origin: 'Sanskrit' },
  { text: 'The world is my country, and all humankind are my kin.', theme: 'unity', origin: 'Stoic tradition' },
  { text: 'You cannot shake hands with a clenched fist.', theme: 'dialogue', origin: 'Indira Gandhi' },
  { text: 'Where there is no justice, there can be no peace.', theme: 'justice', origin: 'Collective wisdom' },
  { text: 'In diversity there is beauty and there is strength.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'We are more alike than we are unalike.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'Dialogue begins when fear stops being the only voice in the room.', theme: 'dialogue', origin: 'Project note' },
]

export const interactivePrompts = [
  'Move through the fracture.',
  'Click to change the pull.',
  'Scroll to watch repair take shape.',
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
  'What truth must be faced before repair can begin?',
  'What would make this experience more useful, credible, or human?',
  'Which conflict, community, or act of repair should this project examine next and why?',
]

export const navLinks = [
  { label: 'Conflict', href: '#chaos' },
  { label: 'Repair', href: '#understanding' },
  { label: 'Experience', href: '#interactive' },
  { label: 'World', href: '#global' },
  { label: 'Data', href: '#data' },
  { label: 'Act', href: '#cta' },
]
