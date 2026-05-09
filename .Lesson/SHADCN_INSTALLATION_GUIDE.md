# shadcn/ui Complete Installation Guide

A universal guide for installing shadcn/ui covering all project configurations, frameworks, and edge cases.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites Check](#prerequisites-check)
3. [Decision Tree](#decision-tree)
4. [Installation by Framework](#installation-by-framework)
   - [Vite + React](#vite--react)
   - [~~Create React App~~](#create-react-app-deprecated)
   - [Next.js](#nextjs)
     - [App Router](#app-router-nextjs-13)
     - [Pages Router](#pages-router-nextjs-12-and-older-or-opt-out-of-app-router)
     - [React Server Components & shadcn](#react-server-components-rsc--what-you-need-to-know)
     - [Dark Mode with next-themes](#dark-mode-in-nextjs--next-themes)
     - [Toast / Sonner](#toast--sonner-in-nextjs)
     - [Fonts (Geist)](#using-fonts-geist--nextjs-default)
     - [Common Gotchas](#common-nextjs--shadcn-gotchas)
     - [Next.js Checklist](#nextjs-quick-checklist)
     - [Server Actions + Forms](#server-actions--shadcn-forms)
     - [Loading UI / Skeleton](#loading-ui--loadingtsx--shadcn-skeleton)
     - [Error Handling](#error-handling--errortsx--shadcn-alert)
     - [Metadata API](#metadata-api)
     - [Dashboard Layout Pattern](#dashboard-layout-pattern)
     - [Data Table Pattern](#data-table-pattern-nextjs--shadcn)
5. [Configuration by Tailwind Version](#configuration-by-tailwind-version)
   - [Tailwind CSS v4](#tailwind-css-v4)
   - [Tailwind CSS v3](#tailwind-css-v3)
6. [Language Configuration](#language-configuration)
   - [JavaScript Setup](#javascript-setup)
   - [TypeScript Setup](#typescript-setup)
7. [Handling Existing Libraries](#handling-existing-libraries)
   - [With DaisyUI](#with-daisyui)
   - [With Bootstrap](#with-bootstrap)
   - [With Material UI](#with-material-ui)
   - [With Chakra UI](#with-chakra-ui)
8. [Core Installation Steps](#core-installation-steps)
9. [Configuration Files Reference](#configuration-files-reference)
10. [CSS Variables & Theming](#css-variables--theming)
11. [Component Installation](#component-installation)
12. [Dark Mode Setup](#dark-mode-setup)
13. [Usage Examples](#usage-examples)
14. [Customization](#customization)
15. [Troubleshooting](#troubleshooting)
16. [Migration Guide](#migration-guide)
17. [Quick Reference](#quick-reference)

---

## Overview

### What is shadcn/ui?

shadcn/ui is **not** a component library you install as a dependency. Instead, it's a collection of reusable components that you copy into your project. This gives you:

- **Full ownership** of the code
- **Complete customization** control
- **No version lock-in**
- **Tree-shaking** by default (only what you use)

### How It Works

1. You configure your project once
2. Use the CLI to "install" components
3. Components are copied to your `src/components/ui/` folder
4. You own and can modify them freely

### Under the Hood

shadcn/ui is built on top of **[Radix UI](https://www.radix-ui.com/)** — a library of unstyled, accessible component primitives. When you install a shadcn component, you're getting Radix UI behavior + Tailwind CSS styling, all in code you own. This means:

- Accessibility is handled for you (keyboard nav, ARIA, focus trapping)
- The styling is entirely yours to change
- Radix UI is installed as a direct dependency of your project (e.g. `@radix-ui/react-dialog`)

---

## Prerequisites Check

Before starting, verify your setup:

### Required

| Requirement | Check Command | Minimum Version |
|-------------|---------------|-----------------|
| Node.js | `node --version` | 18.0.0+ |
| npm/yarn/pnpm/bun | `npm --version` | npm 9+, yarn 1.22+, pnpm 8+, bun 1+ |
| React | Check `package.json` | 18.0.0+ |
| Tailwind CSS | Check `package.json` | 3.0.0+ or 4.0.0+ |

### Optional (depending on your setup)

| Tool | When Needed |
|------|-------------|
| TypeScript | If using `.tsx` files |
| PostCSS | Tailwind v3 projects |
| Autoprefixer | Tailwind v3 projects |

---

## Decision Tree

Use this to determine your installation path:

```
START
  │
  ├─ What framework?
  │   ├─ Vite ──────────────► Section: Vite + React
  │   ├─ Create React App ──► ⚠️ CRA is deprecated. Migrate to Vite.
  │   └─ Next.js ───────────► Section: Next.js
  │
  ├─ What Tailwind version?
  │   ├─ v4.x (uses @import "tailwindcss") ──► Section: Tailwind CSS v4
  │   └─ v3.x (uses @tailwind directives) ───► Section: Tailwind CSS v3
  │
  ├─ What language?
  │   ├─ JavaScript (.jsx) ──► Section: JavaScript Setup
  │   └─ TypeScript (.tsx) ──► Section: TypeScript Setup
  │
  └─ Existing UI library?
      ├─ DaisyUI ────► Section: With DaisyUI
      ├─ Bootstrap ──► Section: With Bootstrap
      ├─ MUI ────────► Section: With Material UI
      ├─ Chakra ─────► Section: With Chakra UI
      └─ None ───────► Proceed directly
```

---

## Installation by Framework

### Vite + React

#### Starting fresh:

```bash
# Create project
npm create vite@latest my-app -- --template react
cd my-app
npm install

# Install Tailwind CSS v4 (recommended)
npm install tailwindcss @tailwindcss/vite

# OR Install Tailwind CSS v3
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Then initialize shadcn (interactive — handles most config for you):

```bash
npx shadcn@latest init
```

The CLI will ask about your style, base color, CSS file location, and whether to use TypeScript. It sets up `components.json` and your CSS variables automatically.

#### Vite config for path aliases:

**`vite.config.js`** (JavaScript):
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Add this if using Tailwind v4
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Only if using Tailwind v4
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**`vite.config.ts`** (TypeScript):
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

> **Note (TypeScript only):** You'll also need `npm install -D @types/node` for `path` to resolve without errors.

---

### Create React App (Deprecated)

> ⚠️ **Create React App is no longer maintained.** It hasn't had a meaningful release in years, has known security vulnerabilities in its dependencies, and its own documentation now points users elsewhere. **Do not start new projects with CRA.**
>
> **Migrate to Vite instead:**
> ```bash
> npm create vite@latest my-app -- --template react
> ```
>
> The migration is usually straightforward — move your `src/` folder over, update the entry point from `index.js` to `main.jsx`, and adjust environment variable names from `REACT_APP_*` to `VITE_*`.

If you're maintaining a legacy CRA project and cannot migrate yet, path aliases require a workaround since CRA doesn't support them natively.

#### Option A: Use `craco` (Most Common)

```bash
npm install @craco/craco
```

**`craco.config.js`**:
```js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```

Update `package.json` scripts:
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

#### Option B: Use `react-app-rewired`

```bash
npm install react-app-rewired
```

**`config-overrides.js`**:
```js
const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };
  return config;
};
```

---

### Next.js

Next.js has two distinct routing systems that behave differently with shadcn. Read both sections even if you already know which one you're on — the RSC section in particular catches a lot of people off guard.

---

#### App Router (Next.js 13+)

##### 1. Create the project

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
```

The CLI will ask whether to use the App Router — say yes. Path aliases (`@/`) are pre-configured in `tsconfig.json`.

##### 2. Initialize shadcn

```bash
npx shadcn@latest init
```

The CLI will prompt:

```
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Would you like to use CSS variables for colors? › Yes
```

It then auto-detects your framework and configures `components.json`, adds CSS variables to `app/globals.css`, and creates `lib/utils.ts`.

##### 3. Resulting `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

`"rsc": true` tells the CLI to generate components without `"use client"` where possible, keeping them compatible with Server Components.

##### 4. Root layout setup

The `app/layout.tsx` file is the right place to set up fonts, theme provider, and the `html` element's class:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "Built with shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

> `suppressHydrationWarning` on `<html>` is required if you're using `next-themes` for dark mode. Without it, React throws a hydration mismatch warning because the `class` attribute on `<html>` is set by JavaScript after the initial render.

##### 5. File structure after init

```
my-app/
├── app/
│   ├── globals.css        ← CSS variables added here
│   ├── layout.tsx         ← Root layout
│   └── page.tsx
├── components/
│   └── ui/                ← shadcn components go here
├── lib/
│   └── utils.ts           ← cn() utility
├── components.json        ← shadcn config
├── tailwind.config.ts
└── tsconfig.json
```

---

#### Pages Router (Next.js 12 and older, or opt-out of App Router)

##### 1. Create the project

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --no-app
cd my-app
```

##### 2. Initialize shadcn

```bash
npx shadcn@latest init
```

When prompted for the CSS path, point to `styles/globals.css` (or wherever your global CSS lives in the Pages Router project).

##### 3. `components.json` difference

```json
{
  "rsc": false
}
```

This is the key difference. `"rsc": false` tells the CLI not to worry about RSC compatibility — all components are treated as client-side by default, which is correct for Pages Router.

##### 4. `_app.tsx` setup

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

##### 5. `_document.tsx` for dark mode (class-based)

If you're using class-based dark mode, set the initial class here to avoid a flash of unstyled content:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

#### React Server Components (RSC) — What You Need to Know

This is where most Next.js + shadcn confusion happens.

In the App Router, **every component is a Server Component by default**. Server Components run only on the server — they have no access to browser APIs, React state, or event handlers.

shadcn components that use interactivity (state, effects, event handlers) already have `"use client"` at the top of their files — the CLI handles this. But **when you compose them**, the boundary matters.

**Rule:** Any component that uses `useState`, `useEffect`, `onClick`, or any other client-side API must either be a shadcn component that already declares `"use client"`, or a wrapper you write with `"use client"` at the top.

##### Which shadcn components are Server-safe?

These render fine in Server Components (no interactivity):

```tsx
// ✅ These are fine in Server Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
```

##### Which need `"use client"`?

Anything with internal state or browser APIs:

```tsx
// ❌ These CANNOT be used directly in a Server Component
// They already have "use client" in their own files, but if you
// wrap them in your own component, YOUR wrapper also needs "use client"

import { Dialog } from "@/components/ui/dialog";      // uses state
import { DropdownMenu } from "@/components/ui/dropdown-menu"; // uses state
import { Tabs } from "@/components/ui/tabs";           // uses state
import { Toast } from "@/components/ui/toast";         // uses context
```

##### The right pattern — push interactivity to the leaves

```tsx
// app/page.tsx (Server Component — no "use client")
import { ProductCard } from "@/components/product-card"; // Server-safe card
import { AddToCartButton } from "@/components/add-to-cart-button"; // Client

async function ProductPage() {
  const product = await fetchProduct(); // async data fetching works here

  return (
    <ProductCard product={product}>
      <AddToCartButton productId={product.id} />
    </ProductCard>
  );
}
```

```tsx
// components/add-to-cart-button.tsx
"use client"; // ← required because it uses onClick + useState

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  return (
    <Button onClick={() => setAdded(true)}>
      {added ? "Added!" : "Add to Cart"}
    </Button>
  );
}
```

The Server Component handles data fetching. The Client Component handles the click. Keep it at the leaf level.

##### Importing Server Components into Client Components

You can't import a Server Component into a Client Component. But you can **pass** server-rendered JSX as `children`:

```tsx
// ✅ This works — children flows down from server to client
<ClientWrapper>
  <ServerRenderedContent /> {/* rendered on server, passed as prop */}
</ClientWrapper>

// ❌ This doesn't work — can't import Server Component into "use client" file
// (inside a "use client" file)
import { ServerComponent } from "./server-component"; // breaks
```

---

#### Dark Mode in Next.js — `next-themes`

The recommended approach for Next.js is `next-themes`, which handles persistence, system preference detection, and hydration correctly.

##### Install

```bash
npm install next-themes
```

##### Create a ThemeProvider wrapper

shadcn's `next-themes` integration requires a Client Component wrapper because `ThemeProvider` uses context:

```tsx
// components/theme-provider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

##### Add to root layout

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`attribute="class"` tells `next-themes` to toggle the `dark` class on `<html>`, which is what Tailwind's `darkMode: ["class"]` expects.

`disableTransitionOnChange` prevents a flash of transitions when switching themes.

##### Mode toggle button

```tsx
// components/mode-toggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

#### Toast / Sonner in Next.js

shadcn offers two toast options. `Sonner` is the modern one — use it for new projects.

##### Install Sonner

```bash
npx shadcn@latest add sonner
```

##### Add the Toaster to root layout

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

##### Using toast in a Client Component

```tsx
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return (
    <Button
      onClick={() =>
        toast.success("Saved!", {
          description: "Your changes have been saved.",
        })
      }
    >
      Save
    </Button>
  );
}
```

---

#### Using Fonts (Geist — Next.js Default)

Next.js ships with Geist as its default font. It's already in `layout.tsx` if you used `create-next-app`. To use it in Tailwind:

```tsx
// app/layout.tsx
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

In `tailwind.config.ts`, map the CSS variable to the sans font slot:

```ts
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", ...fontFamily.sans],
      },
    },
  },
};
```

Now `font-sans` (Tailwind's default body font utility) uses Geist everywhere.

---

#### Common Next.js + shadcn Gotchas

**"Event handlers cannot be passed to Client Component props"**

You're passing a function from a Server Component to a Client Component. Move the handler into the Client Component itself, or make the parent Client.

---

**Hydration mismatch on the `<html>` element**

Almost always caused by `next-themes` setting the `class` on `<html>` after hydration. Fix: add `suppressHydrationWarning` to the `<html>` tag in `layout.tsx`.

---

**Dialog/Sheet doesn't close on navigation**

In App Router, navigation doesn't unmount the layout. If a Dialog is in the layout and stays open across route changes, control its state based on the pathname:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavDialog() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false); // close on route change
  }, [pathname]);

  return <Dialog open={open} onOpenChange={setOpen}>...</Dialog>;
}
```

---

**`useRouter` from the wrong package**

Pages Router and App Router export `useRouter` from different places:

```tsx
// App Router
import { useRouter } from "next/navigation"; // ✅

// Pages Router
import { useRouter } from "next/router"; // ✅

// Wrong (common mistake)
import { useRouter } from "next/navigation"; // ❌ in a Pages Router project
```

---

**Components not found at `@/components/ui/...`**

The `@/` alias resolves to the project root, not `src/`. If your project has a `src/` directory, the CLI should auto-detect this. If it doesn't, update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And update `components.json` aliases to match.

---

#### Next.js Quick Checklist

```
[ ] Create project with create-next-app (includes Tailwind + path aliases)
[ ] Run: npx shadcn@latest init
[ ] Confirm components.json: rsc: true (App Router) / rsc: false (Pages Router)
[ ] Add suppressHydrationWarning to <html> in layout.tsx
[ ] Install next-themes: npm install next-themes
[ ] Create components/theme-provider.tsx (Client Component wrapper)
[ ] Wrap children with ThemeProvider in layout.tsx
[ ] Install Sonner: npx shadcn@latest add sonner
[ ] Add <Toaster /> inside layout.tsx body
[ ] Add ModeToggle to your navbar
[ ] Test: npx shadcn@latest add button card dialog
```

---

#### Server Actions + shadcn Forms

Server Actions are the modern Next.js way to handle form submissions — no API route needed. They run on the server and work well with shadcn's form components.

##### Install components

```bash
npx shadcn@latest add form input button label
npm install react-hook-form @hookform/resolvers zod
```

##### The pattern: Client form → Server Action

```tsx
// app/contact/actions.ts  ← Server Action lives here
"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(data: z.infer<typeof schema>) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  // Do server-side work: save to DB, send email, etc.
  // await db.insert(...)
  // await sendEmail(...)

  return { success: true };
}
```

```tsx
// app/contact/contact-form.tsx  ← Client Component
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitContactForm } from "./actions";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(data);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Message sent!");
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
```

```tsx
// app/contact/page.tsx  ← Server Component that renders the form
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <main className="max-w-lg mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <ContactForm />
    </main>
  );
}
```

> `useTransition` gives you the `isPending` state while the Server Action runs, without needing a separate loading state variable.

---

#### Loading UI — `loading.tsx` + shadcn Skeleton

Next.js automatically shows `loading.tsx` while a page or layout is fetching data. Combine it with shadcn's `Skeleton` component to build proper loading states.

##### Install

```bash
npx shadcn@latest add skeleton card
```

##### Create a loading file

```tsx
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px] mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[100px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

##### The actual page (async data fetching)

```tsx
// app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getStats() {
  // This fetch causes loading.tsx to show while it's running
  const res = await fetch("https://api.example.com/stats", {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });
  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.users}</p>
        </CardContent>
      </Card>
      {/* more cards... */}
    </div>
  );
}
```

##### Streaming with `<Suspense>` (more granular than `loading.tsx`)

For finer-grained control, wrap individual slow components in `<Suspense>` rather than using `loading.tsx`, which blocks the whole page:

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCards } from "@/components/stats-cards";
import { RecentActivity } from "@/components/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats load fast, no suspense needed */}
      <StatsCards />

      {/* Activity feed is slow — stream it in separately */}
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

---

#### Error Handling — `error.tsx` + shadcn Alert

`error.tsx` is Next.js's built-in error boundary for a route segment. It must be a Client Component.

##### Install

```bash
npx shadcn@latest add alert button
```

##### Create an error file

```tsx
// app/dashboard/error.tsx
"use client"; // Required — error.tsx must be a Client Component

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to your error tracking service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          {error.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
```

`reset` is provided by Next.js — calling it attempts to re-render the route segment that errored.

##### Global error boundary

For errors that happen inside the root `layout.tsx` itself, create a `global-error.tsx` at the app root. It must render its own `<html>` and `<body>` because it replaces the layout entirely:

```tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <button onClick={reset} className="underline">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
```

---

#### Metadata API

Next.js exports a `metadata` object or `generateMetadata` function from page and layout files. This is fully server-side and has no interaction with shadcn, but it's worth including here for completeness since it lives in the same files as your layouts.

##### Static metadata

```tsx
// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | My App",
  description: "Learn about our company and mission.",
  openGraph: {
    title: "About | My App",
    description: "Learn about our company and mission.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <main>...</main>;
}
```

##### Dynamic metadata (based on route params)

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetch(`https://api.example.com/products/${params.id}`)
    .then((r) => r.json());

  return {
    title: `${product.name} | My Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await fetch(`https://api.example.com/products/${params.id}`)
    .then((r) => r.json());

  return <main>...</main>;
}
```

> **Tip:** Use `unstable_cache` or route-level `fetch` caching to avoid fetching the same data twice (once in `generateMetadata`, once in the page component).

---

#### Dashboard Layout Pattern

A common real-world pattern: a sidebar nav + main content area, using shadcn components throughout.

##### Install

```bash
npx shadcn@latest add button separator avatar badge
```

##### Route structure

```
app/
├── (dashboard)/               ← Route group (no URL segment)
│   ├── layout.tsx             ← Sidebar layout
│   ├── dashboard/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── profile/
│       └── page.tsx
├── (auth)/                    ← Separate layout for auth pages
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
└── layout.tsx                 ← Root layout (ThemeProvider, fonts)
```

Route groups (folders wrapped in `()`) let you share a layout between pages without adding a URL segment. `/dashboard`, `/settings`, and `/profile` all share the sidebar layout, while `/login` and `/register` get a clean auth layout.

##### Sidebar layout

```tsx
// app/(dashboard)/layout.tsx
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Settings,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5">
          <span className="text-lg font-semibold">MyApp</span>
        </div>

        <Separator />

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Button
              key={href}
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={href}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </Button>
          ))}
        </nav>

        <Separator />

        {/* User footer */}
        <div className="px-4 py-4 flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

##### Active link highlighting

The sidebar above doesn't highlight the current route. Add that with `usePathname`:

```tsx
// components/nav-link.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function NavLink({ href, label, icon: Icon }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn("w-full justify-start gap-2", isActive && "font-medium")}
      asChild
    >
      <Link href={href}>
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
```

Replace the `Button` blocks in the sidebar with `<NavLink />`. Since it uses `usePathname`, it must be a Client Component — but the sidebar layout itself stays a Server Component.

---

#### Data Table Pattern (Next.js + shadcn)

The shadcn `data-table` is built on TanStack Table and works well with server-side data fetching.

##### Install

```bash
npx shadcn@latest add table button badge
npm install @tanstack/react-table
```

##### Fetch data on the server, render table on the client

```tsx
// app/users/page.tsx  ← Server Component: fetch data
import { UsersTable } from "@/components/users-table";

async function getUsers() {
  const res = await fetch("https://api.example.com/users", {
    cache: "no-store", // always fresh data
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersTable data={users} />
    </div>
  );
}
```

```tsx
// components/users-table.tsx  ← Client Component: TanStack Table
"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "active" ? "default" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
];

export function UsersTable({ data }: { data: User[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} user(s) found
      </p>
    </div>
  );
}
```

---

## Configuration by Tailwind Version

### How to identify your version:

**Tailwind CSS v4** uses:
```css
@import "tailwindcss";
```

**Tailwind CSS v3** uses:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Tailwind CSS v4

#### Package installation:

```bash
npm install tailwindcss @tailwindcss/vite
```

#### CSS file setup (`src/index.css`):

```css
@import "tailwindcss";

/* shadcn CSS variables */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### No `tailwind.config.js` needed for v4

Tailwind v4 auto-detects your source files and configures itself through the CSS file and Vite plugin. **There is no `tailwind.config.js` in a standard Tailwind v4 + shadcn setup.** If you see instructions that add one for v4, they're likely unnecessary.

The only time you'd add one is if you need highly custom configuration (e.g. custom screens, fonts, specific plugin options) that the CSS-based config can't cover.

---

### Tailwind CSS v3

#### Package installation:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### CSS file setup (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### `tailwind.config.js` (Required for v3):

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Install animation plugin for v3:**
```bash
npm install -D tailwindcss-animate
```

---

## Language Configuration

### JavaScript Setup

#### `jsconfig.json` (Required):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

#### `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

> **Tailwind v4 note:** If you're on v4, the `tailwind.config` field can be omitted or left as an empty string — there's no config file to point to.

#### `src/lib/utils.js`:

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

---

### TypeScript Setup

#### `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

#### `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### Install TypeScript types:

```bash
npm install -D @types/node
```

---

## Handling Existing Libraries

### With DaisyUI

DaisyUI and shadcn can coexist but may have style conflicts.

#### Option 1: Remove DaisyUI (Cleanest)

```bash
npm uninstall daisyui
```

Remove from CSS:
```css
/* Remove this line */
@plugin "daisyui";
```

#### Option 2: Use Both (Careful)

**Potential conflicts:**
- Both define `btn`, `card`, `input` classes
- Background and text colors may clash
- Border radius defaults differ

**Mitigation strategies:**

1. **Use shadcn prefix:**

   In `components.json`:
   ```json
   {
     "tailwind": {
       "prefix": "sh-"
     }
   }
   ```

   shadcn components will use `sh-bg-primary` instead of `bg-primary`

2. **Map DaisyUI colors to shadcn variables:**

   ```css
   :root {
     --background: var(--b1); /* DaisyUI base-100 */
     --foreground: var(--bc); /* DaisyUI base-content */
     --primary: var(--p);
     --primary-foreground: var(--pc);
   }
   ```

3. **Separate usage:**
   - Use DaisyUI for layout/navigation
   - Use shadcn for forms/modals/detailed UI

---

### With Bootstrap

Bootstrap's CSS is highly opinionated and will conflict.

#### Recommended: Remove Bootstrap

```bash
npm uninstall bootstrap react-bootstrap
```

Remove from imports:
```js
// Remove these
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
```

#### If keeping Bootstrap:

Use shadcn prefix and be prepared for manual fixes:
```json
{
  "tailwind": {
    "prefix": "tw-"
  }
}
```

---

### With Material UI

MUI uses Emotion/styled-components, different from Tailwind.

#### Can coexist with considerations:

1. **No prefix needed** — MUI doesn't use Tailwind classes
2. **Bundle size** — You'll have both CSS-in-JS and Tailwind
3. **Design consistency** — Components will look different

#### Gradual migration strategy:

1. Add shadcn alongside MUI
2. Replace MUI components one by one
3. Remove MUI when done:
   ```bash
   npm uninstall @mui/material @emotion/react @emotion/styled
   ```

---

### With Chakra UI

Similar to MUI — CSS-in-JS based.

#### Can coexist:

1. Different styling engines, minimal conflicts
2. Replace gradually if desired
3. Keep both if needed for different sections

---

## Core Installation Steps

### The Fast Path (Recommended)

For most projects, the shadcn CLI handles the heavy lifting:

```bash
# After setting up your framework and Tailwind:
npx shadcn@latest init
```

This single command will:
- Ask you about your preferences (style, base color, etc.)
- Create `components.json`
- Add CSS variables to your CSS file
- Create `src/lib/utils.js` (or `.ts`)
- Install required dependencies

Then skip straight to [Component Installation](#component-installation).

---

### Manual Steps (All Projects)

Use these if you prefer full control, or if `init` doesn't work for your setup.

#### Step 1: Install Dependencies

```bash
# Using npm
npm install class-variance-authority clsx tailwind-merge lucide-react

# Using yarn
yarn add class-variance-authority clsx tailwind-merge lucide-react

# Using pnpm
pnpm add class-variance-authority clsx tailwind-merge lucide-react

# Using bun
bun add class-variance-authority clsx tailwind-merge lucide-react
```

**What each package does:**

| Package | Purpose |
|---------|---------|
| `class-variance-authority` | Create component variants (size, color, etc.) |
| `clsx` | Conditionally join classNames |
| `tailwind-merge` | Merge Tailwind classes without conflicts |
| `lucide-react` | Icon library used by shadcn components |

> **Note:** Radix UI packages (e.g. `@radix-ui/react-dialog`) are installed automatically when you add individual components via the CLI. You don't need to install them upfront.

#### Step 2: Configure Path Aliases

See [Language Configuration](#language-configuration) for your setup.

#### Step 3: Create Utility Function

Create `src/lib/utils.js` or `src/lib/utils.ts`:

```bash
mkdir -p src/lib
```

See [Language Configuration](#language-configuration) for the code.

#### Step 4: Add CSS Variables

Add to your main CSS file. See [Configuration by Tailwind Version](#configuration-by-tailwind-version).

#### Step 5: Create `components.json`

Create in project root. See [Configuration Files Reference](#configuration-files-reference).

#### Step 6: Test Installation

```bash
npx shadcn@latest add button
```

If successful, you'll see:
```
✔ Created 1 file:
  - src/components/ui/button.jsx
```

---

## Configuration Files Reference

### `components.json` Complete Options

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

#### Options Explained

| Option | Values | Description |
|--------|--------|-------------|
| `style` | `"default"`, `"new-york"` | Visual style of components |
| `rsc` | `true`, `false` | React Server Components support |
| `tsx` | `true`, `false` | TypeScript or JavaScript |
| `tailwind.config` | path | Path to Tailwind config (omit for v4) |
| `tailwind.css` | path | Path to main CSS file |
| `tailwind.baseColor` | `"slate"`, `"gray"`, `"zinc"`, `"neutral"`, `"stone"` | Base color palette |
| `tailwind.cssVariables` | `true`, `false` | Use CSS variables for theming |
| `tailwind.prefix` | string | Prefix for Tailwind classes |
| `aliases.components` | path | Where components are stored |
| `aliases.utils` | path | Where utils.js is located |
| `aliases.ui` | path | Where UI components are stored |

#### Style Comparison

**Default Style:**
- Rounded corners
- Softer shadows
- More padding

**New York Style:**
- Sharper corners
- Smaller radius
- Denser padding

To use New York style:
```json
{
  "style": "new-york"
}
```

---

## CSS Variables & Theming

### Color Format

shadcn uses HSL values without the `hsl()` wrapper:

```css
/* Correct */
--primary: 222.2 47.4% 11.2%;

/* Wrong */
--primary: hsl(222.2, 47.4%, 11.2%);
```

The `hsl()` is added in Tailwind config (v3) or consumed directly via `hsl(var(--primary))` in components.

### Available Theme Colors

| Variable | Description | Usage |
|----------|-------------|-------|
| `--background` | Page background | Main bg color |
| `--foreground` | Default text | Body text |
| `--card` | Card background | Cards, panels |
| `--card-foreground` | Card text | Text on cards |
| `--popover` | Popover background | Dropdowns, tooltips |
| `--popover-foreground` | Popover text | Text in popovers |
| `--primary` | Primary brand color | CTAs, links |
| `--primary-foreground` | Text on primary | Button text |
| `--secondary` | Secondary color | Less emphasis |
| `--secondary-foreground` | Text on secondary | Secondary button text |
| `--muted` | Muted background | Disabled, subtle |
| `--muted-foreground` | Muted text | Placeholder text |
| `--accent` | Accent color | Highlights |
| `--accent-foreground` | Text on accent | Accent button text |
| `--destructive` | Error/danger color | Delete buttons |
| `--destructive-foreground` | Text on destructive | Delete button text |
| `--border` | Border color | All borders |
| `--input` | Input border | Form inputs |
| `--ring` | Focus ring | Focus states |
| `--radius` | Border radius | Rounded corners |

### Custom Theme Example

**Purple theme:**
```css
:root {
  --primary: 270 50% 40%;
  --primary-foreground: 270 50% 98%;
}
```

**Green theme:**
```css
:root {
  --primary: 142 76% 36%;
  --primary-foreground: 142 76% 98%;
}
```

> **Tip:** The [shadcn/ui Themes page](https://ui.shadcn.com/themes) has a visual theme builder. Pick your colors, copy the generated CSS variables, and paste them into your `index.css`.

---

## Component Installation

### CLI Commands

```bash
# Install single component
npx shadcn@latest add button

# Install multiple components
npx shadcn@latest add button card dialog input

# Install all components (warning: large)
npx shadcn@latest add --all

# Preview what would change without making changes
npx shadcn@latest add button --dry-run

# Check for updates to installed components
npx shadcn@latest diff
```

### Component Categories

#### Form Components
```bash
npx shadcn@latest add button input label textarea checkbox radio-group select switch slider form
```

#### Layout Components
```bash
npx shadcn@latest add card separator aspect-ratio scroll-area resizable
```

#### Feedback Components
```bash
npx shadcn@latest add alert alert-dialog toast sonner progress skeleton
```

#### Navigation Components
```bash
npx shadcn@latest add tabs navigation-menu menubar breadcrumb pagination
```

#### Overlay Components
```bash
npx shadcn@latest add dialog sheet drawer popover tooltip hover-card
```

#### Data Display
```bash
npx shadcn@latest add table avatar badge calendar carousel
```

### Component Dependencies

Some components require others. The CLI handles this automatically, but it's useful to know:

| Component | Dependencies |
|-----------|--------------|
| `form` | `label`, `button` |
| `combobox` | `command`, `popover` |
| `date-picker` | `calendar`, `popover` |
| `data-table` | `table`, `button`, `dropdown-menu` |

---

## Dark Mode Setup

### Method 1: CSS Class (Recommended)

Add `dark` class to root element:

**`App.jsx`:**
```jsx
function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <button onClick={() => setDark(!dark)}>
        Toggle Dark Mode
      </button>
      {/* Rest of app */}
    </div>
  );
}
```

### Method 2: System Preference

```jsx
import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return theme;
}
```

### Method 3: Theme Provider (Recommended for Persistence)

```bash
npx shadcn@latest add theme-provider
```

**`main.jsx`:**
```jsx
import { ThemeProvider } from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
```

This persists the user's preference in `localStorage` automatically.

---

## Usage Examples

### Basic Button

```jsx
import { Button } from "@/components/ui/button";

function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Card with Content

```jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PricingCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>$19/month</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>Unlimited projects</li>
          <li>Priority support</li>
          <li>Custom domain</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  );
}
```

### Form with Validation

```bash
# Install required components and dependencies
npx shadcn@latest add form input button label
npm install react-hook-form @hookform/resolvers zod
```

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
```

### Dialog Modal

```jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function ConfirmDelete() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Customization

### Modifying Components

Components are in `src/components/ui/`. Edit freely — you own the code:

```jsx
// src/components/ui/button.jsx
const buttonVariants = cva(
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        // Add your own variant
        success: "bg-green-500 text-white hover:bg-green-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        // Add your own size
        xl: "h-14 px-8 text-lg",
      },
    },
  }
);
```

### Creating Custom Components

Use the same patterns as shadcn components:

```jsx
// src/components/ui/status-badge.jsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      status: {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
);

export function StatusBadge({ className, status, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ status }), className)} {...props}>
      {children}
    </span>
  );
}
```

---

## Troubleshooting

### Error: "Cannot find module '@/...'"

**Causes:**
1. Path alias not configured
2. jsconfig.json/tsconfig.json missing
3. Vite config missing alias

**Solutions:**
1. Check `vite.config.js` has `resolve.alias`
2. Check `jsconfig.json` exists with correct paths
3. Restart dev server: `npm run dev`

---

### Error: "Unknown at rule @layer"

**Cause:** CSS file not processed by Tailwind

**Solutions:**
1. Ensure PostCSS is configured (Tailwind v3)
2. Ensure `@tailwindcss/vite` plugin is added (Tailwind v4)
3. Check CSS file is imported in `main.jsx`

---

### Error: "Unknown at rule @apply"

**Cause:** Tailwind not processing the file

**Solutions:**
1. Ensure file extension is `.css`
2. Check Tailwind content paths include your files
3. Rename to avoid conflicts with other processors

---

### Components unstyled / no colors

**Cause:** CSS variables not defined or wrong format

**Solutions:**
1. Check `:root` has all required variables
2. Ensure variables use HSL format **without** the `hsl()` wrapper (e.g. `222.2 84% 4.9%`, not `hsl(222.2, 84%, 4.9%)`)
3. Verify CSS file is imported in `main.jsx`

---

### TypeScript path errors

**Cause:** TypeScript can't resolve `@/` paths

**Solutions:**
1. Add to `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": { "@/*": ["./src/*"] }
     }
   }
   ```
2. Install types: `npm install -D @types/node`
3. Restart TypeScript server in your editor (in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server")

---

### Dark mode not working

**Causes:**
1. `.dark` class not applied to the right element
2. CSS variables for dark mode missing

**Solutions:**
1. The `.dark` class must be on a parent element that wraps everything (ideally `<html>` or the root `<div>`)
2. Verify the `.dark` block exists in your CSS file
3. Check `darkMode: ["class"]` is set in `tailwind.config.js` (v3 only — v4 handles this automatically)

---

### Build fails in production

**Causes:**
1. Missing dependencies
2. Import errors
3. TypeScript errors

**Solutions:**
1. Run `npm install` again
2. Check all imports are correct
3. Run `npx tsc --noEmit` to find TS errors
4. Nuclear option: `rm -rf node_modules && npm install`

---

## Migration Guide

### From DaisyUI to shadcn

1. **Install shadcn** following this guide
2. **Map components:**

   | DaisyUI | shadcn |
   |---------|--------|
   | `btn` | `Button` |
   | `card` | `Card` |
   | `modal` | `Dialog` |
   | `dropdown` | `DropdownMenu` |
   | `input` | `Input` |
   | `select` | `Select` |
   | `tabs` | `Tabs` |

3. **Replace incrementally:**
   ```jsx
   // Before (DaisyUI)
   <button className="btn btn-primary">Click</button>

   // After (shadcn)
   import { Button } from "@/components/ui/button";
   <Button>Click</Button>
   ```

4. **Remove DaisyUI** when done:
   ```bash
   npm uninstall daisyui
   ```

---

## Quick Reference

### Fast Setup (Recommended Path)

```bash
# 1. Create project + install Tailwind
npm create vite@latest my-app -- --template react
cd my-app && npm install
npm install tailwindcss @tailwindcss/vite

# 2. Configure vite.config.js (add tailwindcss plugin + path alias)

# 3. Let shadcn handle the rest
npx shadcn@latest init

# 4. Start adding components
npx shadcn@latest add button card dialog
```

### Manual Setup Checklist

```
[ ] Install Tailwind CSS
    npm install tailwindcss @tailwindcss/vite     (v4)
    npm install -D tailwindcss postcss autoprefixer  (v3)

[ ] Install core dependencies
    npm install class-variance-authority clsx tailwind-merge lucide-react

[ ] Configure path aliases
    - vite.config.js (resolve.alias)
    - jsconfig.json or tsconfig.json (paths)

[ ] Create utility function
    - src/lib/utils.js or utils.ts

[ ] Add CSS variables
    - src/index.css

[ ] Create components.json
    - In project root

[ ] Test with first component
    npx shadcn@latest add button
```

### Common Commands

```bash
# Initialize (interactive setup)
npx shadcn@latest init

# Install a component
npx shadcn@latest add [name]

# Install multiple
npx shadcn@latest add button card dialog

# Preview before installing
npx shadcn@latest add button --dry-run

# See available components
npx shadcn@latest add

# Check for updates to installed components
npx shadcn@latest diff
```

### File Structure

```
project/
├── components.json          # shadcn config
├── jsconfig.json            # Path aliases (JS)
├── tsconfig.json            # Path aliases (TS)
├── vite.config.js           # Vite config with aliases + Tailwind plugin
├── tailwind.config.js       # Required for v3, not needed for v4
└── src/
    ├── index.css            # Tailwind import + CSS variables
    ├── main.jsx             # Entry point (must import index.css)
    ├── lib/
    │   └── utils.js         # cn() utility
    └── components/
        └── ui/              # shadcn components (you own these)
            ├── button.jsx
            ├── card.jsx
            └── ...
```

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Examples](https://ui.shadcn.com/examples)
- [Visual Theme Builder](https://ui.shadcn.com/themes)
- [GitHub Repository](https://github.com/shadcn-ui/ui)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

Guide Version: 2.1 | Last Updated: May 2026
