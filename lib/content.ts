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
    title: 'When "Us" and "Them" Take Over',
    description: 'Peace starts slipping when people are taught to fear the very neighbors they once knew.',
    icon: 'standard',
    stat: '54 countries saw rising nationalist violence in 2023.',
    pathForward: 'Teach pride in who we are without turning others into a threat.',
  },
  {
    id: 2,
    title: 'When Daily Needs Become a Fight',
    description: 'When water, food, land, or power feel scarce, fear can grow faster than fairness.',
    icon: 'resource',
    stat: '40% of armed conflicts involve natural resources.',
    pathForward: 'Share what people need early, before survival feels like a fight.',
  },
  {
    id: 3,
    title: 'Old Hurt That Never Healed',
    description: 'Pain from the past does not disappear on its own. It often returns in the lives of children and grandchildren.',
    icon: 'justice',
    stat: '80+ territorial disputes trace back to colonial borders.',
    pathForward: 'Honest truth-telling and fair steps to make things right help stop old hurt from returning.',
  },
  {
    id: 4,
    title: 'Lies That Travel Faster Than Trust',
    description: 'When false stories spread quickly, people stop listening and start reacting in fear.',
    icon: 'signal',
    stat: '3.6B people live amid severe information disorder.',
    pathForward: 'Slow things down with careful listening, good teaching, and trusted facts.',
  },
  {
    id: 5,
    title: 'Feeling Left Behind',
    description: 'When families feel unseen, unsafe, or shut out, anger can take root and spread.',
    icon: 'inequality',
    stat: 'The top 1% holds 45.6% of global wealth.',
    pathForward: 'Make room for safety, fairness, and a real voice for ordinary people.',
  },
  {
    id: 6,
    title: 'Too Many Weapons, Too Little Time',
    description: 'The more a world is armed for panic, the faster fear can turn into grief.',
    icon: 'arms',
    stat: '$2.2T was spent on the military globally in 2023.',
    pathForward: 'Choose restraint, patient talks, and safety that does not depend on more fear.',
  },
]

export const understandingSteps: Step[] = [
  {
    step: 1,
    title: 'Stay and Listen',
    description: 'Healing often begins when people do not walk away from each other at the first hard moment.',
    quote:
      'If you want to make peace with your enemy, you have to work with your enemy. Then he becomes your partner.',
    author: 'Nelson Mandela',
  },
  {
    step: 2,
    title: 'See the Person, Not the Label',
    description: 'It is harder to be cruel when we remember every side includes parents, children, and ordinary lives.',
  },
  {
    step: 3,
    title: 'Teach What Fear Tries to Hide',
    description: 'Good teaching helps people question hate before it settles into the heart.',
  },
  {
    step: 4,
    title: 'Build Everyday Trust',
    description: 'Peace lasts longer when schools, leaders, and neighbors make room for fairness and cooperation every day.',
    quote: 'The United Nations was created not to bring us to heaven, but to save us from hell.',
    author: 'Dag Hammarskjold',
  },
  {
    step: 5,
    title: 'Name the Hurt and Make It Right',
    description: 'Healing becomes believable when harm is named honestly and people work to make things right.',
    quote: 'Peace without justice is an illusion.',
    author: 'Pope Paul VI',
  },
]

export const globalRegions: Region[] = [
  {
    id: 'africa',
    name: 'Africa',
    title: 'Healing by Remembering We Belong to One Another',
    description: 'Across Africa, many peace efforts begin by helping whole communities regain dignity together, not by thinking only about punishment.',
    efforts: [
      'African Union mediation and peace frameworks under Agenda 2063',
      'Rwanda community reconciliation after genocide',
    ],
    glyph: 'africa',
    color: '#f59e0b',
    lesson: 'Trust grows when healing is shared and no family is treated as disposable.',
  },
  {
    id: 'asia',
    name: 'Asia',
    title: 'Keeping Connection Alive in Hard Times',
    description: 'Across Asia, dialogue, trade, and people-to-people ties often help keep deep tension from becoming permanent loss.',
    efforts: [
      'ASEAN regional dialogue frameworks',
      'Citizen diplomacy between India and Pakistan',
    ],
    glyph: 'asia',
    color: '#06b6d4',
    lesson: 'Peace has a better chance when staying connected matters more than winning an argument.',
  },
  {
    id: 'europe',
    name: 'Europe',
    title: 'Former Enemies Can Learn to Live Side by Side',
    description: 'Europe shows that even after terrible war, former enemies can build habits of trust strong enough to outlast fear.',
    efforts: [
      'European integration after two world wars',
      'OSCE diplomacy and democratic monitoring',
    ],
    glyph: 'europe',
    color: '#6366f1',
    lesson: 'Peace grows stronger when cooperation becomes part of ordinary life.',
  },
  {
    id: 'americas',
    name: 'Americas',
    title: 'Speaking Honestly So Trust Can Return',
    description: 'Across the Americas, healing often begins when people tell the truth about harm and make space for trust to come back.',
    efforts: [
      'Colombia’s 2016 peace accord and transitional justice',
      'Truth and reconciliation efforts with Indigenous communities in Canada',
    ],
    glyph: 'americas',
    color: '#10b981',
    lesson: 'Trust returns more fully when truth and a path forward are held together.',
  },
  {
    id: 'mideast',
    name: 'Middle East',
    title: 'Hope Carried by Ordinary People',
    description: 'In the Middle East, many grassroots efforts show that courage between people can survive even when politics remain stuck.',
    efforts: [
      'Seeds of Peace dialogue across conflict lines',
      'UN-mediated ceasefire and humanitarian negotiations',
    ],
    glyph: 'mideast',
    color: '#f97316',
    lesson: 'Sometimes trust survives in families and communities before leaders are ready to follow.',
  },
]

const cfrConflictSources: ConflictSource[] = [
  { label: 'CFR Global Conflict Tracker', href: 'https://www.cfr.org/global-conflict-tracker' },
  { label: 'CFR Methodology', href: 'https://www.cfr.org/global-conflict-tracker/methodology' },
]

export const conflictCases: ConflictCase[] = [
  {
    id: 'northern-triangle',
    name: 'Instability in the Northern Triangle',
    region: 'Americas',
    location: 'El Salvador, Guatemala, Honduras',
    status: 'active',
    severity: 'High',
    mapX: 21,
    mapY: 48,
    summary: 'CFR tracks rising insecurity, organized crime, and weak public trust across the Northern Triangle.',
    humanitarianNote: 'Many families live with fear, extortion, unsafe neighborhoods, and pressure to leave home.',
    repairLesson: 'Healing depends on safer neighborhoods, honest public leadership, and real economic hope.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'haiti',
    name: 'Criminal Violence in Haiti',
    region: 'Americas',
    location: 'Haiti',
    status: 'active',
    severity: 'High',
    mapX: 29,
    mapY: 52,
    summary: 'CFR identifies Haiti as a worsening crisis where criminal violence and political breakdown are tearing daily life apart.',
    humanitarianNote: 'Families struggle to reach food, health care, school, and even safe roads because of the violence.',
    repairLesson: 'Lasting healing will need safety, trusted leadership, and support that reaches neighborhoods directly.',
    sources: cfrConflictSources,
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
    summary: 'War between rival armed forces has shattered daily life in Sudan and brought devastating harm to civilians.',
    humanitarianNote: 'Families have been forced to leave home, hunger is spreading, and many people remain in grave danger.',
    repairLesson: 'Healing cannot begin without civilian protection, safe aid access, and a stronger voice for ordinary people.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'sahel',
    name: 'Violent Extremism in the Sahel',
    region: 'Africa',
    location: 'Burkina Faso, Chad, Mali, Niger, Nigeria',
    status: 'active',
    severity: 'High',
    mapX: 47,
    mapY: 51,
    summary: 'CFR tracks spreading extremist violence and fragile public order across the central Sahel.',
    humanitarianNote: 'Families are displaced, children lose school, food pressure rises, and attacks spill across borders.',
    repairLesson: 'People need safety, dependable local leadership, and real protection for rural communities.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'taiwan',
    name: 'Confrontation Over Taiwan',
    region: 'Asia',
    location: 'Taiwan Strait',
    status: 'active',
    severity: 'Extreme',
    mapX: 78,
    mapY: 43,
    summary: 'CFR lists a Taiwan confrontation as a major crisis risk that could spread far beyond one place.',
    humanitarianNote: 'Any escalation would put families, trade, and regional stability under severe pressure.',
    repairLesson: 'The safest path is steady communication, restraint, and avoiding deadly miscalculation.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'ethiopia',
    name: 'Conflict in Ethiopia',
    region: 'Africa',
    location: 'Ethiopia',
    status: 'active',
    severity: 'High',
    mapX: 56,
    mapY: 58,
    summary: 'CFR tracks continuing instability and conflict risk in Ethiopia.',
    humanitarianNote: 'Many communities still face insecurity, displacement, and deep uncertainty about the future.',
    repairLesson: 'Healing needs local safety, broader political inclusion, and accountability for abuse.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'iran-israel-us',
    name: 'Iran’s War With Israel and the United States',
    region: 'Middle East',
    location: 'Iran, Israel, United States',
    status: 'active',
    severity: 'Extreme',
    mapX: 60,
    mapY: 43,
    summary: 'CFR identifies direct confrontation involving Iran, Israel, and the United States as a critical danger for the region.',
    humanitarianNote: 'A wider war could damage homes, hospitals, and essential infrastructure across several countries.',
    repairLesson: 'Reducing danger depends on de-escalation, steady diplomacy, and stronger protections against wider war.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'venezuela-us',
    name: 'U.S. Confrontation With Venezuela',
    region: 'Americas',
    location: 'Venezuela',
    status: 'active',
    severity: 'Extreme',
    mapX: 25,
    mapY: 56,
    summary: 'CFR tracks confrontation involving Venezuela and the United States as a serious regional crisis.',
    humanitarianNote: 'Families across the region feel the effects through migration, economic strain, and political tension.',
    repairLesson: 'A steadier future will require credible talks, stronger public trust, and room for humanitarian relief.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'yemen-red-sea',
    name: 'Conflict in Yemen and the Red Sea',
    region: 'Middle East',
    location: 'Yemen and Red Sea',
    status: 'active',
    severity: 'High',
    mapX: 58,
    mapY: 55,
    summary: 'CFR tracks violence in Yemen and the Red Sea as a continuing threat to lives and regional stability.',
    humanitarianNote: 'Families continue to face hunger, lost income, damaged health care, and repeated displacement.',
    repairLesson: 'Healing requires ceasefires that hold, livelihoods that return, and local trust rebuilt over time.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'india-pakistan',
    name: 'Conflict Between India and Pakistan',
    region: 'Asia',
    location: 'India and Pakistan',
    status: 'active',
    severity: 'High',
    mapX: 66,
    mapY: 45,
    summary: 'CFR tracks India-Pakistan tensions as a major risk with consequences far beyond the border.',
    humanitarianNote: 'Border communities live with recurring fear, and any escalation could harm millions more.',
    repairLesson: 'Steady talks, reliable crisis channels, and patient diplomacy help keep families safer.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'libya',
    name: 'Civil Conflict in Libya',
    region: 'Middle East',
    location: 'Libya',
    status: 'active',
    severity: 'Turbulent',
    mapX: 51,
    mapY: 47,
    summary: 'CFR tracks Libya as a country still struggling with civil conflict and broken public authority.',
    humanitarianNote: 'Families face militia pressure, displacement, detention abuse, and fragile basic services.',
    repairLesson: 'Healing will take more trusted public institutions, fewer armed groups, and fairer use of resources.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'somalia-al-shabaab',
    name: 'Conflict With Al-Shabaab in Somalia',
    region: 'Africa',
    location: 'Somalia',
    status: 'active',
    severity: 'Turbulent',
    mapX: 57,
    mapY: 61,
    summary: 'CFR tracks Somalia’s conflict with al-Shabaab as an ongoing danger to civilians and local stability.',
    humanitarianNote: 'People face attacks, drought pressure, displacement, and weak local services.',
    repairLesson: 'Safety efforts work better when families can also rely on trusted local leadership and basic services.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'israeli-palestinian',
    name: 'Israeli-Palestinian Conflict',
    region: 'Middle East',
    location: 'Israel, Gaza, West Bank',
    status: 'active',
    severity: 'High',
    mapX: 55,
    mapY: 46,
    summary: 'CFR tracks the Israeli-Palestinian conflict as a major territorial and humanitarian crisis.',
    humanitarianNote: 'Families face death, trauma, displacement, blocked aid, and long-lasting fear.',
    repairLesson: 'Any real healing must protect lives, respect rights, and rebuild trust with accountability.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'mexico',
    name: 'Criminal Violence in Mexico',
    region: 'Americas',
    location: 'Mexico',
    status: 'active',
    severity: 'High',
    mapX: 18,
    mapY: 45,
    summary: 'CFR tracks criminal violence in Mexico as a worsening threat to public safety.',
    humanitarianNote: 'Families, journalists, migrants, and local communities all carry the burden of the violence.',
    repairLesson: 'People need trustworthy law enforcement, less corruption, and stronger community protection.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'turkey-kurdish',
    name: 'Conflict Between Turkey and Armed Kurdish Groups',
    region: 'Middle East',
    location: 'Turkey, Iraq, Syria',
    status: 'active',
    severity: 'Turbulent',
    mapX: 56,
    mapY: 40,
    summary: 'CFR tracks Turkey’s conflict with armed Kurdish groups as a continuing territorial and political struggle.',
    humanitarianNote: 'Families in affected areas can be harmed by fighting, displacement, and political repression.',
    repairLesson: 'A calmer future needs political inclusion, local safety, and fewer reasons for fear to grow.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'iraq',
    name: 'Instability in Iraq',
    region: 'Middle East',
    location: 'Iraq',
    status: 'active',
    severity: 'Turbulent',
    mapX: 58,
    mapY: 43,
    summary: 'CFR tracks Iraq as a country under continuing strain from political instability and armed pressure.',
    humanitarianNote: 'Families are affected by militia competition, weak services, and uncertainty about who keeps them safe.',
    repairLesson: 'Healing depends on trusted public institutions, reliable services, and restraint by armed actors.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'south-sudan',
    name: 'Instability in South Sudan',
    region: 'Africa',
    location: 'South Sudan',
    status: 'active',
    severity: 'High',
    mapX: 54,
    mapY: 58,
    summary: 'CFR tracks South Sudan as a country where instability still threatens daily life.',
    humanitarianNote: 'Families continue to face hunger, local violence, and repeated displacement.',
    repairLesson: 'Peace promises must reach villages and towns through safety, shared power, and fairness.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'ukraine',
    name: 'War in Ukraine',
    region: 'Europe',
    location: 'Ukraine and Russia',
    status: 'active',
    severity: 'Extreme',
    mapX: 56,
    mapY: 35,
    summary: 'CFR tracks the war in Ukraine as a major interstate conflict with immense human and regional consequences.',
    humanitarianNote: 'Homes, schools, energy systems, and communities have been damaged, and many families remain far from home.',
    repairLesson: 'Healing will take safety, accountability, and rebuilding that helps communities truly live again.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'north-korea',
    name: 'North Korea Crisis',
    region: 'Asia',
    location: 'North Korea',
    status: 'active',
    severity: 'Extreme',
    mapX: 79,
    mapY: 39,
    summary: 'CFR tracks the North Korea crisis as a dangerous interstate risk in Northeast Asia.',
    humanitarianNote: 'A military escalation could place millions of families in immediate danger.',
    repairLesson: 'Careful communication and reducing nuclear risk are essential to keeping fear from becoming catastrophe.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'myanmar',
    name: 'Civil War in Myanmar',
    region: 'Asia',
    location: 'Myanmar',
    status: 'active',
    severity: 'High',
    mapX: 72,
    mapY: 53,
    summary: 'CFR tracks Myanmar as a civil war marked by widespread violence and deep instability.',
    humanitarianNote: 'Families face airstrikes, blocked services, displacement, and constant danger.',
    repairLesson: 'Healing depends on protecting civilians, widening inclusion, and holding violence to account.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'south-china-sea',
    name: 'Territorial Disputes in the South China Sea',
    region: 'Asia',
    location: 'South China Sea',
    status: 'active',
    severity: 'Extreme',
    mapX: 75,
    mapY: 55,
    summary: 'CFR tracks South China Sea disputes as a serious territorial conflict risk.',
    humanitarianNote: 'Escalation could affect coastal families, trade routes, and regional stability.',
    repairLesson: 'Peace is more likely when rules are respected and crisis channels stay open.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'dr-congo',
    name: 'Conflict in the Democratic Republic of Congo',
    region: 'Africa',
    location: 'Democratic Republic of Congo',
    status: 'active',
    severity: 'High',
    mapX: 52,
    mapY: 65,
    summary: 'CFR tracks conflict in the Democratic Republic of Congo as a worsening crisis with repeated local violence.',
    humanitarianNote: 'Families are forced to leave home again and again while insecurity strains aid and daily survival.',
    repairLesson: 'Healing needs local protection, regional diplomacy, and fair handling of land and resources.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'central-african-republic',
    name: 'Conflict in the Central African Republic',
    region: 'Africa',
    location: 'Central African Republic',
    status: 'active',
    severity: 'Turbulent',
    mapX: 52,
    mapY: 58,
    summary: 'CFR tracks the Central African Republic as a civil war that continues to weigh on everyday life.',
    humanitarianNote: 'Communities live with armed groups, displacement, and very weak public services.',
    repairLesson: 'Trust returns more easily when people are protected locally and security forces answer to the public.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'hezbollah-lebanon',
    name: 'Conflict With Hezbollah in Lebanon',
    region: 'Middle East',
    location: 'Lebanon',
    status: 'active',
    severity: 'High',
    mapX: 56,
    mapY: 44,
    summary: 'CFR tracks conflict involving Hezbollah in Lebanon as a worsening regional danger.',
    humanitarianNote: 'Border communities, displaced families, and already fragile public services remain under strain.',
    repairLesson: 'Keeping families safe requires restraint, calmer borders, and protection for civilians.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'syria',
    name: 'Conflict in Syria',
    region: 'Middle East',
    location: 'Syria',
    status: 'active',
    severity: 'Turbulent',
    mapX: 57,
    mapY: 43,
    summary: 'CFR tracks Syria as a country still carrying the weight of civil war and foreign intervention.',
    humanitarianNote: 'Families continue to live with displacement, detention, damaged homes, and divided local control.',
    repairLesson: 'Healing will require rights protections, safe returns, and local leadership people can trust.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'afghanistan',
    name: 'Instability in Afghanistan',
    region: 'Asia',
    location: 'Afghanistan',
    status: 'active',
    severity: 'High',
    mapX: 63,
    mapY: 44,
    summary: 'CFR tracks Afghanistan as a country facing deep instability and shrinking hope for many people.',
    humanitarianNote: 'Daily life is shaped by economic collapse, restricted rights, insecurity, and dependence on aid.',
    repairLesson: 'A better future needs humanitarian access, basic rights, and room for people to take part in public life.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'pakistan-instability',
    name: 'Instability in Pakistan',
    region: 'Asia',
    location: 'Pakistan',
    status: 'active',
    severity: 'High',
    mapX: 65,
    mapY: 46,
    summary: 'CFR tracks instability in Pakistan as a worsening concern tied to violence and political strain.',
    humanitarianNote: 'Families feel the impact through insecurity, fear, and pressure on everyday life.',
    repairLesson: 'Trust is more likely to grow with steady civilian leadership, calmer regional relations, and dependable public institutions.',
    sources: cfrConflictSources,
    lastReviewed: 'April 23, 2026',
  },
  {
    id: 'armenia-azerbaijan',
    name: 'Tensions Between Armenia and Azerbaijan',
    region: 'Europe',
    location: 'Armenia and Azerbaijan',
    status: 'active',
    severity: 'Turbulent',
    mapX: 58,
    mapY: 39,
    summary: 'CFR tracks Armenia-Azerbaijan tensions as an unresolved territorial conflict even after some improvement.',
    humanitarianNote: 'Families still carry the burden of displacement, border fear, and deep mistrust.',
    repairLesson: 'Healing needs safer borders, protected rights, and practical steps that make peace worth keeping.',
    sources: cfrConflictSources,
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
    summary: 'Colombia’s 2016 peace accord remains an important example of choosing negotiation over endless war.',
    humanitarianNote: 'There are still gaps and local violence, but families also have spaces for truth, memory, and repair.',
    repairLesson: 'Peace lasts longer when truth, reintegration, rural reform, and care for victims continue.',
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
    summary: 'The 1998 Good Friday Agreement shows how patient talks can help end long cycles of political violence.',
    humanitarianNote: 'The pain did not disappear, but families gained more room to live without everyday violence.',
    repairLesson: 'Healing takes patient dialogue, shared rules, and steady work to keep trust alive.',
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
    summary: 'Liberia moved from civil war toward elections, peacekeeping transition, and long recovery.',
    humanitarianNote: 'Rebuilding trust after war took years of work from families, leaders, and communities.',
    repairLesson: 'Women-led pressure, peacekeeping, and democratic transition can help a country breathe again.',
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
    summary: 'The 2005 Helsinki agreement helped end separatist war in Aceh through autonomy and disarmament.',
    humanitarianNote: 'Families rebuilt while also recovering from the tsunami, making healing both political and deeply personal.',
    repairLesson: 'Violence can fall when former enemies are given a believable political path and outside monitoring.',
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
    summary: 'Rwanda remains a difficult but important example of rebuilding after genocide.',
    humanitarianNote: 'The memory of mass violence still shapes families, making truth, trauma care, and trust essential.',
    repairLesson: 'After atrocity, healing must hold remembrance, safety, justice, and human dignity together.',
    sources: [
      { label: 'Crisis Group', href: 'https://www.crisisgroup.org/crisiswatch' },
      { label: 'ACLED', href: 'https://acleddata.com/conflict-index/' },
    ],
    lastReviewed: 'April 23, 2026',
  },
]

export const dataStats: Stat[] = [
  {
    label: 'Wars and Armed Conflicts',
    value: 183,
    suffix: '',
    description: 'Armed conflicts recorded worldwide in 2023, each one affecting real families and communities.',
    color: '#c0392b',
  },
  {
    label: 'Families Forced From Home',
    value: 117,
    suffix: 'M',
    description: 'People uprooted by conflict, a record-high number that means millions of homes suddenly lost.',
    color: '#e67e22',
  },
  {
    label: 'Money Lost to Violence',
    value: 17,
    suffix: 'T',
    description: 'Estimated yearly global cost of violence in U.S. dollars, money that could have supported safer lives.',
    color: '#8e44ad',
  },
  {
    label: 'UN Peacekeepers',
    value: 87,
    suffix: 'K+',
    description: 'Personnel serving in fragile places where even a small break in peace can cost lives.',
    color: '#2980b9',
  },
  {
    label: 'Peace Agreements',
    value: 34,
    suffix: '',
    description: 'Peace agreements signed over the last decade, reminders that stopping violence is possible.',
    color: '#27ae60',
  },
  {
    label: 'Groups Helping Communities Heal',
    value: 2400,
    suffix: '+',
    description: 'Civil society groups quietly helping neighbors calm conflict, rebuild trust, and care for one another.',
    color: '#16a085',
  },
]

export const peaceMessages: PeaceMessage[] = [
  { text: 'Peace begins in small choices we make for one another every day.', theme: 'unity', origin: 'Project reflection' },
  { text: 'Shanti speaks of peace inside the heart and peace shared with others.', theme: 'unity', origin: 'Sanskrit' },
  { text: 'The world is my country, and all humankind are my kin.', theme: 'unity', origin: 'Stoic tradition' },
  { text: 'You cannot shake hands with a clenched fist.', theme: 'dialogue', origin: 'Indira Gandhi' },
  { text: 'Without fairness, peace does not feel safe or real.', theme: 'justice', origin: 'Project reflection' },
  { text: 'In diversity there is beauty and there is strength.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'We are more alike than we are unalike.', theme: 'empathy', origin: 'Maya Angelou' },
  { text: 'Listening is often the first quiet step back toward trust.', theme: 'dialogue', origin: 'Project note' },
]

export const interactivePrompts = [
  'Move and notice how quickly calm can turn into strain.',
  'Click and see how one choice can soften the pull.',
  'Scroll and watch trust slowly come back together.',
]

export const suggestionCategories = [
  'Message for peace',
  'Personal memory',
  'Concern to consider',
  'Suggestion for the site',
  'Conflict or community to include',
  'Source or fact to check',
]

export const ctaPrompts = [
  'What is one memory, message, or concern you wish more people would hear?',
  'What would help this website feel more useful, trustworthy, or warm for families and teachers?',
  'Which conflict, community, or act of healing should this project look at next, and why?',
]

export const navLinks = [
  { label: 'Conflict', href: '#chaos' },
  { label: 'Healing', href: '#understanding' },
  { label: 'Choices', href: '#interactive' },
  { label: 'World', href: '#global' },
  { label: 'Cost', href: '#data' },
  { label: 'Share', href: '#cta' },
]
