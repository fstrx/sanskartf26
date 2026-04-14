# ⚙️ Agent Execution Brief — Peace & Global Harmony Website

## 🧠 Objective

Build a **high-quality, production-ready frontend website** based on the provided vision.

This is a **Next.js (App Router) project** focused on:

- Strong UI/UX
- Smooth animations
- Modular architecture
- Content-driven structure

---

## ⚠️ Constraints

- PRIORITIZE:
  - Clean UI
  - Smooth animations
  - Readable content layout

- AVOID:
  - Overengineering backend
  - Heavy or laggy 3D
  - Complex state unless necessary

---

## 🏗️ Tech Stack (MANDATORY)

- Next.js 15 (App Router)
- React
- Tailwind CSS
- Framer Motion
- Optional: @react-three/fiber (ONLY for hero)

---

## 📁 Required Folder Structure

```
/app
  page.tsx
  layout.tsx

/components
  /layout
    Navbar.tsx
    Footer.tsx

  /sections
    Hero.tsx
    Chaos.tsx
    Understanding.tsx
    Interactive.tsx
    Global.tsx
    Data.tsx
    CTA.tsx

  /ui
    Card.tsx
    Button.tsx
    SectionWrapper.tsx
    AnimatedText.tsx

/lib
  content.ts
  animations.ts
```

---

## 🧩 Page Composition (IMPORTANT)

The homepage (`page.tsx`) must include sections in this exact order:

1. `<Hero />`
2. `<Chaos />`
3. `<Understanding />`
4. `<Interactive />`
5. `<Global />`
6. `<Data />`
7. `<CTA />`

---

## 🎨 Design System

### Colors

- Base: Dark background
- Accent: Soft gradients (blue, purple, green)
- Transition: Warmer tones → calm tones

---

### Typography

- Large bold headings
- Clean sans-serif font
- Good spacing between sections

---

### Spacing

- Each section: `min-h-screen`
- Generous padding
- Clear separation

---

## 🎬 Animation Requirements

Use **Framer Motion**:

### Global

- Fade + slide-up on scroll
- Staggered children animations

---

### Hero

- Subtle motion (particles OR gradient)
- CTA button hover effects

---

### Chaos Section

- Cards animate in staggered grid
- Slight motion for emphasis

---

### Understanding

- Step-by-step reveal animation

---

### Data Section

- Count-up numbers
- Graph-like animations (simple)

---

## 🧠 Content System (CRITICAL)

ALL content must be stored in:

```
/lib/content.ts
```

Example:

```ts
export const chaosContent = [
  {
    title: "Conflict",
    description: "Content here...",
  },
];
```

Sections must dynamically render content using `.map()`.

---

## 🧩 Section Requirements

### Hero

- Fullscreen
- Title + subtitle + CTA
- Optional 3D background

---

### Chaos

- Grid of cards
- Each card = topic

---

### Understanding

- Timeline or steps layout

---

### Interactive (IMPORTANT)

Implement ONE of:

- Floating message particles (simplified)
- OR interactive cards with hover effects

Must feel interactive.

---

### Global

- Tabs or accordion
- Region-based content

---

### Data

- Stats with animated numbers

---

### CTA

- Centered text + button/input

---

## ⚡ Performance Requirements

- Use dynamic imports for heavy components
- Avoid unnecessary re-renders
- Keep animations smooth (60fps target)

---

## 🧼 Code Quality

- Functional components only
- Clean naming
- Reusable UI components
- No inline messy logic

---

## 🚀 Output Expectation

Generate:

- Full working Next.js project structure
- All components implemented
- Tailwind styling included
- Animations working
- Dummy content placeholders included

---

## 🧠 Priority Order

1. UI/UX quality
2. Smooth animations
3. Clean structure
4. Content rendering
5. Optional 3D

---

## ❗ Final Instruction

Do NOT explain.

Just generate clean, structured, production-ready code.
