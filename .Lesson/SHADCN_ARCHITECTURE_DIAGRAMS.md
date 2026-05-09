# shadcn/ui Architecture & Structure Diagrams

Visual diagrams to understand the structural patterns and workflows in shadcn/ui.

---

## Table of Contents

1. [shadcn/ui Architecture](#shadcnui-architecture)
2. [Installation Decision Flow](#installation-decision-flow)
3. [Next.js App Router Structure](#nextjs-app-router-structure)
4. [Next.js Pages Router Structure](#nextjs-pages-router-structure)
5. [React Server Components (RSC) Boundaries](#react-server-components-rsc-boundaries)
6. [Component Dependency Stack](#component-dependency-stack)
7. [File Structure Hierarchy](#file-structure-hierarchy)
8. [Build & Runtime Flow](#build--runtime-flow)

---

## shadcn/ui Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Your Application                      │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Your Custom Components                  │ │
│  │  (Your code - You own 100% of the implementation)    │ │
│  └──────────────────────┬────────────────────────────────┘ │
│                         │                                   │
│                         │ imports                           │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │          shadcn UI Components (Copied Code)          │ │
│  │  - Button, Card, Dialog, Form, Table, etc.          │ │
│  │  - Fully owned and modifiable                       │ │
│  │  - Stored in: src/components/ui/                    │ │
│  └──────────────────────┬────────────────────────────────┘ │
│                         │                                   │
│                         │ built on top of                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Radix UI (Dependency)                   │ │
│  │  - Unstyled component primitives                     │ │
│  │  - Accessibility (ARIA, keyboard nav)               │ │
│  │  - State management & behavior                      │ │
│  │  - Installed as package: @radix-ui/*               │ │
│  └──────────────────────┬────────────────────────────────┘ │
│                         │                                   │
│                         │ styled by                         │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Tailwind CSS (Dependency)               │ │
│  │  - Utility-first CSS framework                       │ │
│  │  - All styling in shadcn components                 │ │
│  │  - Full control to customize                         │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Key Principle

```
┌──────────────────────────────────────────────┐
│  shadcn/ui is NOT a library you install       │
│                                              │
│  It's a CODE GENERATOR & COPY SYSTEM          │
└──────────────────────────────────────────────┘

CLI Command          VS          Traditional Library

npx shadcn init      vs         npm install my-lib
    │                              │
    ▼                              ▼
Copies code to your           Installs to node_modules
src/components/ui/                │
    │                         Locked version
    ▼                              ▼
YOU OWN & CONTROL IT         Dependency on updates

✅ No version lock              ✅ Easier updates
✅ Full customization           ❌ Less control
✅ Zero breaking changes        ❌ Black box
✅ Complete transparency
```

---

## Installation Decision Flow

### Framework & Setup Decision Tree

```
                        START HERE
                            │
                            ▼
                    ┌───────────────┐
                    │ Choose Framework│
                    └───────┬────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
          VITE           CRA (deprecated) NEXT.JS
          │             │                  │
          │             ▼                  │
          │        ⚠️ MIGRATE TO VITE       │
          │             │                  │
          └──────────────┼──────────────────┘
                         │
                         ▼
             ┌───────────────────────┐
             │ Choose Tailwind Version│
             └──────────┬────────────┘
                        │
          ┌─────────────┴──────────────┐
          │                            │
          ▼                            ▼
      TW v4.x                      TW v3.x
      (@import method)          (@tailwind directives)
      │                            │
      └─────────────┬──────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Choose Language       │
         └──────────┬───────────┘
                    │
          ┌─────────┴──────────┐
          │                    │
          ▼                    ▼
      JavaScript           TypeScript
      (.jsx files)         (.tsx files)
          │                    │
          └─────────────┬──────┘
                        │
                        ▼
         ┌─────────────────────────────┐
         │ Run: npx shadcn@latest init  │
         └─────────────────────────────┘
```

---

## Next.js App Router Structure

### Project Structure (App Router)

```
my-next-app/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.ts          ← Tailwind configuration
├── 📄 next.config.mjs              ← Next.js configuration
├── 📄 components.json              ← shadcn CLI config
│
├── 📂 app/                         ← App Router directory
│   │
│   ├── 📄 layout.tsx               ← Root layout (wraps all pages)
│   │   │   ├── Defines <html>, <body>, fonts
│   │   │   ├── Sets up theme provider (if dark mode)
│   │   │   └── NOT a "use client" file (Server Component)
│   │   │
│   ├── 📄 page.tsx                 ← Home page (/route)
│   ├── 📄 globals.css              ← Global styles & CSS variables
│   │   │   ├── Tailwind directives (@tailwind v3)
│   │   │   ├── Custom CSS variables (--color-primary, etc.)
│   │   │   └── Imported in layout.tsx
│   │   │
│   ├── 📂 (routes)/
│   │   ├── 📂 dashboard/           ← /dashboard route
│   │   │   ├── 📄 layout.tsx        ← Dashboard sub-layout
│   │   │   ├── 📄 page.tsx          ← /dashboard page
│   │   │   └── 📂 components/
│   │   │
│   │   └── 📂 api/                 ← API routes
│   │       └── 📂 auth/
│   │           └── 📄 route.ts
│   │
│   └── 📂 components/              ← Page-specific components
│
├── 📂 components/                  ← Shared components
│   │
│   ├── 📂 ui/                      ← ⭐ shadcn components go HERE
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── table.tsx
│   │   └── ... (more shadcn components)
│   │
│   └── 📂 custom/                  ← Your custom components
│       ├── navbar.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
│
├── 📂 lib/                         ← Utilities & helpers
│   ├── 📄 utils.ts                 ← cn() utility from shadcn
│   ├── 📄 api.ts
│   └── 📄 constants.ts
│
├── 📂 hooks/                       ← Custom React hooks
│   ├── 📄 useAuth.ts
│   └── 📄 useDarkMode.ts
│
├── 📂 public/                      ← Static assets
│   ├── images/
│   └── fonts/
│
└── 📂 Req/                         ← Project requirements
    └── README.md
```

---

## Next.js Pages Router Structure

### Project Structure (Pages Router)

```
my-next-app/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
├── 📄 postcss.config.js            ← PostCSS (required for TW v3)
├── 📄 components.json              ← shadcn config with "rsc": false
│
├── 📂 pages/                       ← Pages Router directory
│   │
│   ├── 📄 _app.tsx                 ← App wrapper (layout provider)
│   │   │   ├── Imports global CSS
│   │   │   ├── Sets up theme provider
│   │   │   └── Wraps ALL pages
│   │   │
│   ├── 📄 _document.tsx             ── HTML document wrapper
│   │   │   ├── Defines <Html>, <Head>, <body>
│   │   │   ├── Global dark mode class setup
│   │   │   └── Server-side only
│   │   │
│   ├── 📄 index.tsx                ← Home page (/)
│   │
│   ├── 📂 dashboard/
│   │   ├── 📄 index.tsx             ← /dashboard page
│   │   └── 📄 settings.tsx          ← /dashboard/settings page
│   │
│   ├── 📂 api/                     ← API routes
│   │   ├── 📄 auth.ts
│   │   └── 📄 users.ts
│   │
│   └── 📄 _error.tsx               ← Error boundary
│
├── 📂 components/
│   │
│   ├── 📂 ui/                      ← ⭐ shadcn components go HERE
│   │   ├── button.tsx              ← Has "use client" at top
│   │   ├── card.tsx                ← Has "use client" at top
│   │   ├── dialog.tsx              ← Has "use client" at top
│   │   └── ... (more components)
│   │
│   └── 📂 custom/
│       ├── navbar.tsx
│       └── footer.tsx
│
├── 📂 styles/
│   ├── 📄 globals.css              ← Global styles
│   │   ├── Tailwind directives
│   │   └── CSS variables
│   │
│   └── 📄 variables.css            ← Theme variables
│
├── 📂 lib/
│   ├── 📄 utils.ts                 ← cn() utility
│   └── 📄 api.ts
│
├── 📂 public/
│   └── 📂 images/
│
└── 📂 Req/
    └── README.md
```

---

## React Server Components (RSC) Boundaries

### Server vs Client Component Diagram (App Router)

```
┌──────────────────────────────────────────────────────────────┐
│                    App Router Boundary                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ app/layout.tsx (Server Component by default)           │  │
│  │ • No "use client" directive                            │  │
│  │ • Can access databases, secrets, files                 │  │
│  │ • Cannot use: useState, onClick, browser APIs          │  │
│  │ • Can import shadcn components that are server-safe    │  │
│  │ • Can render child components                          │  │
│  │                                                         │  │
│  │ ┌──────────────────────────────────────────────────┐  │  │
│  │ │ app/page.tsx (Server Component by default)      │  │  │
│  │ │ • Async function - can await database queries    │  │  │
│  │ │ • Cannot use: useState, onClick, effects        │  │  │
│  │ │ • Can import server-safe shadcn components      │  │  │
│  │ │                                                  │  │  │
│  │ │ ┌──────────────────────────────────────────────┐│  │  │
│  │ │ │ components/product-card.tsx (Server-safe)   ││  │  │
│  │ │ │ • Display-only component (no interactivity)  ││  │  │
│  │ │ │ • Uses Card, Badge, Avatar from shadcn      ││  │  │
│  │ │ └──────────────────────────────────────────────┘│  │  │
│  │ │                    ❌ CANNOT                    │  │  │
│  │ │  ┌──────────────────────────────────────────┐  │  │  │
│  │ │  │ @Use "use client" on .tsx               │  │  │  │
│  │ │  │ components/add-to-cart-button.tsx      │  │  │  │
│  │ │  │ • Needs useState for cart state         │  │  │  │
│  │ │  │ • Needs onClick for click handling      │  │  │  │
│  │ │  │ • Uses Button component from shadcn    │  │  │  │
│  │ │  └──────────────────────────────────────────┘  │  │  │
│  │ │                    ✅ YES                      │  │  │
│  │ │  ┌──────────────────────────────────────────┐  │  │  │
│  │ │  │ "use client"                             │  │  │  │
│  │ │  │ components/shopping-modal.tsx            │  │  │  │
│  │ │  │ • Uses Dialog from shadcn                │  │  │  │
│  │ │  │ • Manages open/close state               │  │  │  │
│  │ │  │ • Has onClick handlers                   │  │  │  │
│  │ │  └──────────────────────────────────────────┘  │  │  │
│  │ └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘

KEY RULES:
• By default: Component IS a Server Component
• To use state/onClick/hooks: Wrap with "use client"
• Boundary flows DOWN: Parent can import Client Component
• Boundary flows UP: Server Component cannot import from Client Component
```

### Server-Safe vs Client-Only Components

```
┌─────────────────────────────────────────────────────────────┐
│          shadcn/ui Component Classification                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────────┐
│   ✅ SERVER-SAFE         │  │  ❌ NEEDS "use client"       │
│   (Display only)         │  │  (Has State/Events)          │
├──────────────────────────┤  ├──────────────────────────────┤
│ • Card                   │  │ • Dialog                     │
│ • Badge                  │  │ • DropdownMenu               │
│ • Avatar                 │  │ • Tabs                       │
│ • Separator              │  │ • Accordion                  │
│ • Table                  │  │ • Popover                    │
│ • Alert                  │  │ • Toast                      │
│ • Skeleton               │  │ • Form (with validation)     │
│ • Progress               │  │ • Input                      │
│ • Tooltip                │  │ • Select                     │
│ • (Static components)    │  │ • Checkbox                   │
│                          │  │ • Radio                      │
│ Usage Pattern:           │  │ • Slider                     │
│ ────────────────         │  │ • DatePicker                 │
│ // Server Component      │  │ • Modal/Sheet                │
│ export default async     │  │ • SearchInput                │
│ function Page() {        │  │ • (Interactive components)   │
│   const data = await     │  │                              │
│   fetchData()            │  │ Usage Pattern:               │
│                          │  │ ────────────────             │
│   return (               │  │ "use client"                 │
│     <Card>              │  │                              │
│       <Avatar />        │  │ export function Filter()    │
│       <Badge />         │  │ {                            │
│     </Card>             │  │   const [open, setOpen]      │
│   )                     │  │   = useState(false)          │
│ }                       │  │                              │
│                          │  │   return <Dialog open={open}│
│                          │  │                              │
└──────────────────────────┘  └──────────────────────────────┘
```

---

## Component Dependency Stack

### Import & Dependency Chain

```
┌──────────────────────────────────────────────────────────────┐
│              Component Composition Hierarchy                  │
└──────────────────────────────────────────────────────────────┘

LEVEL 5 (Your Application)
├── pages/dashboard.tsx
│   └── imports
│
LEVEL 4 (Your Custom Components)
├── components/dashboard-header.tsx
├── components/user-profile.tsx
│   │
│   └── imports ───────────────────────┐
│                                      │
LEVEL 3 (shadcn UI Components)        │
├── components/ui/card.tsx            │
├── components/ui/button.tsx           │
├── components/ui/avatar.tsx          │
├── components/ui/dropdown-menu.tsx   │
│   │                                  │
│   └── imports ─────────────┐        │
│                            │         │
LEVEL 2 (Dependencies)       │         │
├── @radix-ui/react-dialog   │         │
├── @radix-ui/react-dropdown-menu
├── @radix-ui/react-primitive│         │
│   │                        │         │
│   └── imports ────┐        │         │
│                   │        │         │
LEVEL 1 (Styling)  │        │         │
├── tailwindcss     │        │         │
├── clsx/cn()       │        │ (all flow upward)
│                   │        │         │
└───────────────────┴────────┴─────────┘

EXAMPLE: Dialog Component Chain
─────────────────────────────────

dashboard.tsx
    ↓
<ShoppingModal /> (your component, "use client")
    ↓
Dialog, DialogTrigger, DialogContent (shadcn)
    ↓
@radix-ui/react-dialog (behavior & accessibility)
    ↓
tailwindcss (styling via classes)
    ↓
HTML Elements <div>, <button>, etc.
```

---

## File Structure Hierarchy

### shadcn Components Installation Pattern

```
After: npx shadcn@latest init

src/
├── components/
│   │
│   ├── ui/                         ← ⭐ TARGET DIRECTORY
│   │   │                              (shadcn CLI copies here)
│   │   │
│   │   ├── button.tsx
│   │   │   │
│   │   │   ├── "use client"        (if interactive)
│   │   │   ├── import Radix        (e.g., @radix-ui/react-primitive)
│   │   │   ├── import utils        (cn() function)
│   │   │   └── Styled with Tailwind classes
│   │   │
│   │   ├── card.tsx
│   │   │   ├── "use client"?       (depends on component type)
│   │   │   ├── import dependencies
│   │   │   └── export Card, CardHeader, CardContent...
│   │   │
│   │   ├── dialog.tsx
│   │   │   ├── "use client"
│   │   │   ├── import @radix-ui/react-dialog
│   │   │   └── export Dialog, DialogTrigger, DialogContent...
│   │   │
│   │   ├── form.tsx
│   │   │   ├── "use client"
│   │   │   ├── import react-hook-form
│   │   │   └── Complex form primitives
│   │   │
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── accordion.tsx
│   │   ├── tabs.tsx
│   │   ├── table.tsx
│   │   ├── pagination.tsx
│   │   │
│   │   └── ... (add more with: npx shadcn@latest add <component>)
│   │
│   └── custom/                     ← Your Components
│       ├── navbar.tsx              (import from ./ui/*)
│       ├── sidebar.tsx             (compose shadcn components)
│       └── hero.tsx
│
└── lib/
    ├── utils.ts                    ← Created during init
    │   │
    │   ├── import { clsx } from "clsx"
    │   ├── import { twMerge } from "tailwind-merge"
    │   └── export function cn(...) (helper for merging Tailwind classes)
    │
    └── 📄 cn() – Class Name Merger
        ├── Problem: Tailwind classes can conflict
        ├── Solution: clsx + twMerge intelligently merges them
        └── Usage: cn("px-2 py-1", "px-4") → "py-1 px-4"
```

### Installation Command Flow

```
Command: npx shadcn@latest add button

┌─────────────────────────────────────────────────────┐
│  CLI parses your components.json                     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Fetches component definition from CDN               │
│  • Source: https://ui.shadcn.com                     │
│  • Includes: button.tsx with all dependencies       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Verifies missing dependencies                       │
│  • Checks if @radix-ui/* is installed               │
│  • Checks if tailwindcss is installed               │
│  • Shows what needs to be npm installed             │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  COPIES code to your project                         │
│  • Target: src/components/ui/button.tsx             │
│  • You now own 100% of this file                     │
│  • Can modify freely                                │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Updates package.json if needed                      │
│  • Adds: @radix-ui/react-primitive                  │
│  • Adds: class-variance-authority (styling)         │
│  • Adds: tailwind-merge (class merging)             │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  ✅ Ready to use!                                    │
│                                                     │
│  import { Button } from "@/components/ui/button"    │
└─────────────────────────────────────────────────────┘
```

---

## Build & Runtime Flow

### Development to Production Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT PHASE                              │
└──────────────────────────────────────────────────────────────────┘

You write code:
┌─────────────────────────────────────────────────────────────────┐
│ src/components/product-card.tsx                                 │
│ ────────────────────────────────────────                        │
│                                                                 │
│ import { Card } from "@/components/ui/card"    ← shadcn import│
│ import { Button } from "@/components/ui/button"← shadcn import│
│                                                                 │
│ export function ProductCard({ product }) {                      │
│   return (                                                      │
│     <Card>                                                      │
│       <h2>{product.name}</h2>                                   │
│       <Button onClick={...}>Add to Cart</Button>               │
│     </Card>                                                     │
│   )                                                            │
│ }                                                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────────┐
│                    BUILD PHASE (npm run build)                    │
└──────────────────────────────────────────────────────────────────┘

Step 1: Parse & Analyze
┌────────────────────────────┐
│ Next.js Compiler           │
│ • Reads all source files   │
│ • Analyzes imports         │
│ • Identifies dependencies  │
└────────────┬───────────────┘
             │
Step 2: Bundle Files
┌────────────────────────────┐
│ Webpack/Turbopack          │
│ • Combines your code       │
│ • Adds shadcn components   │
│ • Includes Radix UI        │
│ • Includes Tailwind CSS    │
└────────────┬───────────────┘
             │
Step 3: Process CSS
┌────────────────────────────┐
│ Tailwind CSS Processing    │
│ • Scans all imports        │
│ • Generates only used CSS  │
│ • Applies PurgeCSS         │
│ • Creates optimized CSS    │
└────────────┬───────────────┘
             │
Step 4: Tree Shake
┌────────────────────────────┐
│ Remove Unused Code         │
│ • Only Button is used      │
│ • Dialog not imported      │
│ • Remove Dialog code       │
│ • Remove unused Radix code │
└────────────┬───────────────┘
             │
Step 5: Minify & Optimize
┌────────────────────────────┐
│ Production Build           │
│ • Minify JavaScript        │
│ • Minify CSS               │
│ • Optimize images          │
│ • Create source maps       │
└────────────┬───────────────┘
             │
             ▼
        .next/
        ├── static/
        │   ├── chunks/
        │   │   └── productCard-abc123.js ← Optimized
        │   └── css/
        │       └── main-def456.css ← Only used styles
        └── server/
            └── pages/
                └── product.js ← Server component


┌──────────────────────────────────────────────────────────────────┐
│                    RUNTIME PHASE (npm run start)                  │
└──────────────────────────────────────────────────────────────────┘

Browser receives:
┌────────────────────────────────────────────────────────────────┐
│ HTTP Request: GET /product                                      │
│                                                                 │
│ ↓ Server processes                                              │
│                                                                 │
│ Server receives request → Renders Server Component              │
│  → Calls database (async) → Returns HTML                        │
│                                                                 │
│ ↓ Client receives HTML + JavaScript                             │
│                                                                 │
│ Browser loads:                                                  │
│ • productCard-abc123.js (8KB minified + gzipped)               │
│ • main-def456.css (12KB minified + gzipped)                    │
│ • HTML structure                                                │
│                                                                 │
│ ↓ Hydration                                                     │
│                                                                 │
│ React takes over:                                               │
│ • Attaches event listeners to <Button>                         │
│ • Enables interactivity                                         │
│ • Matches server HTML to client components                      │
│                                                                 │
│ ✅ Page is interactive!                                         │
└────────────────────────────────────────────────────────────────┘
```

### CSS Variable Resolution Flow

```
┌──────────────────────────────────────────────────────────────────┐
│              CSS Variable (Theme) System                          │
└──────────────────────────────────────────────────────────────────┘

Your Application
│
├─ Light Mode (default)
│  └─ :root { --color-primary: #0f172a; }
│
└─ Dark Mode (when <html class="dark">)
   └─ :root { --color-primary: #3b82f6; }


app/globals.css
───────────────
:root {
  --color-background: 0 0% 100%;
  --color-foreground: 0 0% 3%;
  --color-primary: 0 0% 9%;
  ...more variables...
}

.dark {
  --color-background: 0 0% 3%;
  --color-foreground: 0 0% 98%;
  --color-primary: 0 0% 99%;
  ...more dark variables...
}


button.tsx (shadcn Component)
──────────────────────────────
className="bg-primary text-primary-foreground"

During build → Tailwind processes classes:
"bg-primary" → backgroundColor: hsl(var(--color-primary) / <alpha-value>)

At runtime:
┌─────────────────────────┐
│ <html class="dark">     │ ← Theme toggle
└───────────┬─────────────┘
            │
            ▼
    CSS reads :root variables
    under .dark selector
            │
            ▼
    --color-primary: 209 100% 50% (blue)
            │
            ▼
    Button renders with blue background


EXAMPLE FLOW:
─────────────

1. User clicks theme toggle
2. JavaScript: document.documentElement.classList.toggle('dark')
3. CSS variables switch via .dark selector
4. All components using CSS variables update instantly
5. No page reload needed
6. Smooth transition if CSS includes: transition: background-color 200ms

✨ This is why dark mode is instant & global!
```

---

## Summary: Component Ownership Model

```
┌─────────────────────────────────────────────────────────────┐
│  shadcn/ui Unique Value Proposition                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Traditional Library          vs       shadcn/ui            │
│  ───────────────────                   ──────────           │
│                                                             │
│  npm install my-ui              CLI copies code to you      │
│         ↓                                  ↓                │
│  node_modules/my-ui/            src/components/ui/         │
│  (black box)                     (your code)                │
│         ↓                                  ↓                │
│  Version lock-in                100% ownership              │
│  Hard to customize               Easy to customize          │
│  Breaking changes                No version conflicts       │
│  Dependency hell                 Full transparency          │
│                                                             │
│                                                             │
│  Result: You get the BEST OF BOTH WORLDS                   │
│  • All the benefits of a library (Radix + Tailwind)        │
│  • All the benefits of copy-paste code (full control)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Reference: File Locations

| File/Folder | Purpose | Location |
|-------------|---------|----------|
| **components.json** | shadcn CLI config | Project root |
| **globals.css** | CSS variables & global styles | `app/` or `styles/` |
| **shadcn components** | Copied UI components | `src/components/ui/` |
| **lib/utils.ts** | `cn()` class merger | `src/lib/` |
| **tailwind.config.ts/js** | Tailwind configuration | Project root |
| **Custom components** | Your own components | `src/components/custom/` or `components/` |

---

**Last Updated:** May 2, 2026
