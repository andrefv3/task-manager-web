<p align="center">
  <img src="./public/assets/logo-kynetic.svg" width="160" alt="Kynetic Logo" />
</p>

<h1 align="center">Kynetic</h1>
<p align="center">
  <strong>The Intelligence Layer for High-Velocity Execution</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Vitest-testing-6E9F18?style=flat-square" />
</p>

<p align="center">
  Kynetic is not just a task manager; it's a <strong>priority engine</strong>. 
  By synthesizing <i>Impact vs. Effort</i> metrics through a proprietary scoring algorithm, 
  Kynetic eliminates decision fatigue and focuses your cognitive load where it matters most.
</p>

---

## Overview

Kynetic provides a streamlined environment for organizing and tracking tasks efficiently. The application prioritizes clarity, responsiveness, and predictable behavior, ensuring a consistent experience across different usage scenarios.

The codebase is structured to support long-term evolution, making it easy to extend features, refactor components, and maintain high development velocity.

---

## 🏗️ Architecture & Engineering

Designed with a **domain-driven approach**, the codebase prioritizes modularity and predictable state transitions.

### Engineering Principles
-   **Atomic Design Implementation** — Reusable, testable UI components.
-   **Static Type Safety** — End-to-end type integrity with TypeScript.
-   **Asynchronous Excellence** — Optimized data fetching with React Query.
-   **Zero-Lag UI** — Optimistic updates for a fluid, "local-first" feel.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 (Concurrent Mode), Tailwind CSS |
| **State** | Zustand (Store Sharding), React Query v5 |
| **Backend** | NestJS, Prisma ORM, PostgreSQL |
| **Quality** | Vitest, Testing Library, ESLint (Strict) |
---

## Features

- Task creation, editing, and deletion  
- Responsive and accessible interface  
- Consistent state handling and UI feedback  
- Error and loading state management  
- Modular and reusable component system  

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v25+ (Latest features)
- **pnpm** or **npm** v11+

---

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test        # Unit & Integration
npm run test:ui     # Visual Test Runner
```
---

## 🎨 Design Approach

The interface is designed to be minimal yet functional, avoiding unnecessary complexity while maintaining flexibility. Each component is built to be composable, reusable, and easy to reason about, supporting long-term maintainability.

---

## 🔮 Roadmap: The Evolution to Autonomous Flow

- [ ] **Kynetic AI Integration**: Natural Language Processing for automatic task scoring.
- [ ] **Predictive Scheduling**: Machine learning to suggest focus blocks based on historical velocity.
- [ ] **WebSockets Sync**: Real-time collaborative "war rooms" for team-level execution.
---

## Future Direction

- Introduce more advanced state management patterns as the application grows in complexity  
- Strengthen accessibility compliance (a11y) to ensure a more inclusive user experience  
- Optimize rendering performance for larger datasets and more dynamic interactions  
- Expand functionality to support more complex task management workflows  

---

## Author

**Andrés Felipe Vega** – Developer  
[GitHub](https://www.github.com/andrefv3) | [LinkedIn](https://www.linkedin.com/in/andrefv3)