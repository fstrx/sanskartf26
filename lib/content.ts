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

export type ConflictStatus = 'active' | 'repair'
export type ConflictRegion = 'Africa' | 'Middle East' | 'Europe' | 'Asia' | 'Americas'
export type ConflictSeverity = 'Extreme' | 'High' | 'Turbulent' | 'Repairing'

export interface ConflictSource {
  label: string
  href: string
}

export interface ConflictCase {
  id: string
  name: string
  region: ConflictRegion
  location: string
  status: ConflictStatus
  severity: ConflictSeverity
  mapX: number
  mapY: number
  summary: string
  humanitarianNote: string
  repairLesson: string
  sources: ConflictSource[]
  lastReviewed: string
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

export const conflictCases: ConflictCase[] = [
  {
    id: 'ukraine',
    name: 'Russia-Ukraine War',
    region: 'Europe',
    location: 'Ukraine',
    status: 'active',
    severity: 'Extreme',
    mapX: 56,
    mapY: 35,
    summary: 'A full-scale interstate war continues to reshape European security and civilian life in Ukraine.',
    humanitarianNote: 'Civilian infrastructure damage, displacement, and reconstruction needs remain severe.',
    repairLesson: 'Durable repair will require security guarantees, accountability, and rebuilding that restores local agency.',
    sources: [
      { label: 'CFR Global Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'sudan',
    name: 'Civil War in Sudan',
    region: 'Africa',
    location: 'Sudan',
    status: 'active',
    severity: 'Extreme',
    mapX: 54,
    mapY: 54,
    summary: 'War between rival armed forces has fragmented the state and driven mass civilian harm.',
    humanitarianNote: 'Displacement, hunger, and atrocity risks are central concerns across Sudan and neighboring areas.',
    repairLesson: 'Protection, humanitarian access, and inclusive civilian governance have to precede credible repair.',
    sources: [
      { label: 'CFR Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
      { label: 'ACLED Conflict Index', href: 'https://acleddata.com/conflict-index/' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'gaza-israel-palestine',
    name: 'Israel-Palestine War',
    region: 'Middle East',
    location: 'Gaza, Israel, West Bank',
    status: 'active',
    severity: 'Extreme',
    mapX: 55,
    mapY: 46,
    summary: 'A protracted conflict has escalated through war, hostage and detainee crises, and regional spillover risk.',
    humanitarianNote: 'Civilian protection, aid access, displacement, and trauma are urgent humanitarian concerns.',
    repairLesson: 'Any path forward has to hold security, rights, accountability, and political dignity together.',
    sources: [
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'CFR Global Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'myanmar',
    name: 'Myanmar Civil War',
    region: 'Asia',
    location: 'Myanmar',
    status: 'active',
    severity: 'High',
    mapX: 72,
    mapY: 53,
    summary: 'Fighting among the military, resistance forces, and ethnic armed groups continues across the country.',
    humanitarianNote: 'Airstrikes, displacement, blocked services, and protection risks affect many communities.',
    repairLesson: 'Repair depends on civilian protection, federal inclusion, and accountability for military violence.',
    sources: [
      { label: 'ACLED Conflict Index', href: 'https://acleddata.com/conflict-index/' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'yemen',
    name: 'Conflict in Yemen',
    region: 'Middle East',
    location: 'Yemen',
    status: 'active',
    severity: 'High',
    mapX: 58,
    mapY: 55,
    summary: 'Yemen remains fragile after years of war, fractured authority, and regionalized escalation.',
    humanitarianNote: 'Food insecurity, economic collapse, displacement, and damaged health systems remain widespread.',
    repairLesson: 'Ceasefire maintenance must connect to governance, livelihoods, and local reconciliation.',
    sources: [
      { label: 'CFR Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'haiti',
    name: 'Haiti Gang Violence',
    region: 'Americas',
    location: 'Haiti',
    status: 'active',
    severity: 'High',
    mapX: 29,
    mapY: 52,
    summary: 'Armed groups, political breakdown, and institutional weakness continue to endanger civilian life.',
    humanitarianNote: 'Access to food, health care, education, and safe movement is constrained by violence.',
    repairLesson: 'Security support has to be paired with legitimate governance and community-level trust repair.',
    sources: [
      { label: 'CFR Conflicts to Watch', href: 'https://www.cfr.org/reports/conflicts-watch-2026' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'dr-congo',
    name: 'Eastern DR Congo',
    region: 'Africa',
    location: 'Democratic Republic of Congo',
    status: 'active',
    severity: 'High',
    mapX: 52,
    mapY: 65,
    summary: 'Armed groups and regional tensions continue to drive violence in eastern provinces.',
    humanitarianNote: 'Repeated displacement, insecurity, and pressure on aid systems define the crisis.',
    repairLesson: 'Local protection, regional diplomacy, and land/resource accountability have to move together.',
    sources: [
      { label: 'ACLED Conflict Index', href: 'https://acleddata.com/conflict-index/' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'sahel',
    name: 'Central Sahel Insurgencies',
    region: 'Africa',
    location: 'Mali, Burkina Faso, Niger',
    status: 'active',
    severity: 'High',
    mapX: 47,
    mapY: 51,
    summary: 'Militant violence, military rule, and community self-defense dynamics keep the central Sahel unstable.',
    humanitarianNote: 'Civilians face displacement, school closures, food pressure, and attacks across borders.',
    repairLesson: 'Security gains will not hold without accountable governance and protection for rural communities.',
    sources: [
      { label: 'ACLED Conflict Index', href: 'https://acleddata.com/conflict-index/' },
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'colombia',
    name: 'Colombia Peace Accord',
    region: 'Americas',
    location: 'Colombia',
    status: 'repair',
    severity: 'Repairing',
    mapX: 25,
    mapY: 61,
    summary: 'The 2016 peace accord remains a major case of negotiated demobilization and transitional justice.',
    humanitarianNote: 'Implementation gaps and local violence remain, but institutions for truth and repair exist.',
    repairLesson: 'Peace survives when truth, reintegration, rural reform, and victim recognition keep moving.',
    sources: [
      { label: 'CrisisWatch', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'CFR Global Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'northern-ireland',
    name: 'Good Friday Agreement',
    region: 'Europe',
    location: 'Northern Ireland',
    status: 'repair',
    severity: 'Repairing',
    mapX: 45,
    mapY: 32,
    summary: 'The 1998 agreement shows how power-sharing, consent, and demilitarization can reduce political violence.',
    humanitarianNote: 'The social memory of violence remains, but institutions created space for nonviolent politics.',
    repairLesson: 'Conflict repair needs constitutional design, patient dialogue, and rituals of shared legitimacy.',
    sources: [
      { label: 'Crisis Group', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'CFR Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'liberia',
    name: 'Liberia Post-War Peacebuilding',
    region: 'Africa',
    location: 'Liberia',
    status: 'repair',
    severity: 'Repairing',
    mapX: 45,
    mapY: 60,
    summary: 'Liberia moved from civil war toward elections, peacekeeping transition, and long-term recovery.',
    humanitarianNote: 'Rebuilding institutions and trust after civil war remained a generational task.',
    repairLesson: 'Peacekeeping, women-led civic pressure, and democratic transition can reinforce each other.',
    sources: [
      { label: 'Crisis Group', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'ACLED', href: 'https://acleddata.com/conflict-index/' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'aceh',
    name: 'Aceh Peace Agreement',
    region: 'Asia',
    location: 'Aceh, Indonesia',
    status: 'repair',
    severity: 'Repairing',
    mapX: 70,
    mapY: 61,
    summary: 'The 2005 Helsinki agreement helped end separatist war through autonomy, demobilization, and monitoring.',
    humanitarianNote: 'Post-conflict recovery was shaped by both the peace deal and tsunami reconstruction.',
    repairLesson: 'Autonomy can reduce violence when former enemies gain a credible political path.',
    sources: [
      { label: 'Crisis Group', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'CFR', href: 'https://www.cfr.org/global-conflict-tracker' },
    ],
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'rwanda',
    name: 'Rwanda Reconciliation',
    region: 'Africa',
    location: 'Rwanda',
    status: 'repair',
    severity: 'Repairing',
    mapX: 54,
    mapY: 64,
    summary: 'Rwanda is a difficult but important case of post-genocide reconstruction, memory, and state-led reconciliation.',
    humanitarianNote: 'The legacy of mass violence makes truth, trauma care, and civic trust central concerns.',
    repairLesson: 'Repair after atrocity has to hold remembrance, justice, safety, and dignity in public life.',
    sources: [
      { label: 'Crisis Group', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'ACLED', href: 'https://acleddata.com/conflict-index/' },
    ],
    lastReviewed: 'April 23, 2026',
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
