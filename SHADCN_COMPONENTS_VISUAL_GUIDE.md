# shadcn/ui Components — Visual Guide

Complete visual representation of all component categories with structural diagrams and usage patterns.

---

## Table of Contents

1. [Form Components](#form-components)
2. [Layout Components](#layout-components)
3. [Feedback Components](#feedback-components)
4. [Navigation Components](#navigation-components)
5. [Overlay Components](#overlay-components)
6. [Data Display Components](#data-display-components)

---

## Form Components

### Overview

Form components handle user input and submission. They combine interactive elements with validation and state management.

**Install command:**
```bash
npx shadcn@latest add button input label textarea checkbox radio-group select switch slider form
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                     FORM COMPONENTS                          │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BUTTON (Interactive Control)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Default  │  │Secondary │  │Destructive│  │ Outline │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Ghost   │  │  Link    │  │ sm | lg │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                             │
│  Variants: default, secondary, destructive, outline,        │
│           ghost, link                                       │
│  Sizes: sm, default, lg, icon                              │
│  States: hover, active, disabled, loading                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ INPUT (Text Entry)                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Placeholder text                            │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Focus state (border + ring)                 │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Disabled state (opacity)                    │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  Types: text, email, password, number, tel, url            │
│  States: default, focus, disabled, error                   │
│  Props: placeholder, type, disabled, readonly              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ LABEL (Form Labeling)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Label Text                                                 │
│  ┌──────────────────────────────┐                          │
│  │ Associated input/control     │                          │
│  └──────────────────────────────┘                          │
│                                                             │
│  Label with required indicator:                             │
│  Email Address *                                            │
│  ┌──────────────────────────────┐                          │
│  │ email@example.com            │                          │
│  └──────────────────────────────┘                          │
│                                                             │
│  Accessibility: <label htmlFor="id">                        │
│  States: default, disabled, required, focus-within         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TEXTAREA (Multi-line Text Entry)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ Enter your message here...               │              │
│  │                                          │              │
│  │ Multiple lines of text are allowed       │              │
│  │                                          │              │
│  └──────────────────────────────────────────┘ (or resizable│
│                                                             │
│  Props: rows, cols, placeholder, disabled                  │
│  Features: resizable, character counter, validation        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CHECKBOX (Boolean Selection)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Unchecked:         Checked:          Indeterminate:       │
│  ☐ Option          ☑ Option          ◻ Option            │
│                                                             │
│  Multiple selection:                                        │
│  ☐ Apple           ☑ Banana           ☑ Cherry            │
│  ☐ Date                                                     │
│                                                             │
│  With Label:                                                │
│  ☑ I agree to the terms and conditions                     │
│                                                             │
│  Disabled:                                                  │
│  ☐ Option (disabled)    ☑ Option (disabled, checked)      │
│                                                             │
│  States: unchecked, checked, indeterminate, disabled       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RADIO GROUP (Single Selection)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Select one option:                                         │
│                                                             │
│  ● Option 1                                                │
│  ○ Option 2                                                │
│  ○ Option 3                                                │
│  ○ Option 4 (disabled)                                     │
│                                                             │
│  Horizontal layout:                                         │
│  ● Small  ○ Medium  ○ Large                                │
│                                                             │
│  With descriptions:                                         │
│  ● Free Plan                                               │
│    Limited to 5 projects                                    │
│  ○ Pro Plan                                                │
│    Unlimited projects                                       │
│                                                             │
│  States: selected, unselected, disabled, focus             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SELECT (Dropdown Option Selection)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Closed state:                     Open state:             │
│  ┌─────────────────────────┐       ┌──────────────────────┐
│  │ Choose an option...    ▼│       │ Choose an option... ▼│
│  └─────────────────────────┘       ├──────────────────────┤
│                                    │ Option 1             │
│  Grouped options:                  │ Option 2             │
│  ┌──────────────────────────────┐ │ Option 3             │
│  │ Fruits               ▼        │ │ ───────────────────  │
│  └──────────────────────────────┘ │ Disabled Option      │
│  ┌──────────────────────────────┐ └──────────────────────┘
│  │ Vegetables       ▼            │
│  └──────────────────────────────┘ 
│                                                             │
│  With search filtering:                                     │
│  ┌──────────────────────────────────────────────┐          │
│  │ search type...                             ▼│          │
│  │                                            │          │
│  │ ✓ Filtered Option 1                        │          │
│  │ ✓ Filtered Option 2                        │          │
│  │ ✓ Filtered Option 3                        │          │
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  Features: grouping, search, keyboard nav, disabled        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SWITCH (Toggle Boolean State)                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Off state:              On state:                          │
│  ◯────               ────◯                                 │
│                                                             │
│  With label:                                                │
│  Dark Mode       ────◯                                     │
│                                                             │
│  Notifications   ◯────                                     │
│                                                             │
│  Different sizes:                                           │
│  sm: ◯──  md: ◯────  lg: ◯──────                           │
│                                                             │
│  States: on, off, disabled, loading                        │
│  Features: smooth transition, keyboard controllable        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SLIDER (Continuous Value Selection)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Single value:                                              │
│  ◯────────────────── 45                                    │
│  0           25      45           75          100           │
│                                                             │
│  Range selection:                                           │
│  ◯──────────────◯ 25 - 75                                  │
│  0           25      45           75          100           │
│                                                             │
│  With steps:                                                │
│  ◯────────────────── 60                                    │
│  0      20     40     60     80     100                     │
│  │      │      │      │      │      │                      │
│                                                             │
│  Disabled:                                                  │
│  ◯────────────────── (disabled)                            │
│                                                             │
│  Features: range selection, steps, marks, tooltips         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FORM (React Hook Form Integration)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ Form Wrapper                                │           │
│  │                                             │           │
│  │ ┌───────────────────────────────────────┐  │           │
│  │ │ FormField (Email)                     │  │           │
│  │ │ Email Address *                       │  │           │
│  │ │ ┌─────────────────────────────────┐   │  │           │
│  │ │ │ email@example.com               │   │  │           │
│  │ │ └─────────────────────────────────┘   │  │           │
│  │ │ Please enter a valid email ✗          │  │           │
│  │ └───────────────────────────────────────┘  │           │
│  │                                             │           │
│  │ ┌───────────────────────────────────────┐  │           │
│  │ │ FormField (Password)                  │  │           │
│  │ │ Password *                            │  │           │
│  │ │ ┌─────────────────────────────────┐   │  │           │
│  │ │ │ ••••••••                        │   │  │           │
│  │ │ └─────────────────────────────────┘   │  │           │
│  │ │ Must be at least 8 characters ✗       │  │           │
│  │ └───────────────────────────────────────┘  │           │
│  │                                             │           │
│  │ ┌──────────────────┐  ┌──────────────────┐│           │
│  │ │ Sign In          │  │ Sign Up          ││           │
│  │ └──────────────────┘  └──────────────────┘│           │
│  │                                             │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  Features: validation, error messages, submission,         │
│           react-hook-form integration, zod schemas         │
└─────────────────────────────────────────────────────────────┘
```

---

## Layout Components

### Overview

Layout components structure and organize content on the page. They provide containers and spacing solutions.

**Install command:**
```bash
npx shadcn@latest add card separator aspect-ratio scroll-area resizable
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                    LAYOUT COMPONENTS                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CARD (Content Container)                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─ Card ─────────────────────────────────────┐            │
│  │ ┌─ CardHeader ──────────────────────────┐  │            │
│  │ │ CardTitle:    Product Title           │  │            │
│  │ │ CardDescription: Short description    │  │            │
│  │ └──────────────────────────────────────┘  │            │
│  │                                            │            │
│  │ ┌─ CardContent ─────────────────────────┐ │            │
│  │ │ Main content goes here                 │ │            │
│  │ │ Can include text, images, forms        │ │            │
│  │ │ Anything really                        │ │            │
│  │ └───────────────────────────────────────┘ │            │
│  │                                            │            │
│  │ ┌─ CardFooter ──────────────────────────┐ │            │
│  │ │ [Button] [Button]                     │ │            │
│  │ └───────────────────────────────────────┘ │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Common usage: Product cards, settings panels, pricing      │
│  States: default, hover (shadow), active                    │
│  Customization: padding, shadow, border, background        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SEPARATOR (Visual Divider)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Content Above                                              │
│  ─────────────────────────────────────────────────────────  │
│  Content Below                                              │
│                                                             │
│  Vertical separator:                                        │
│  ┌──────────┬ ┌──────────┐                                  │
│  │ Content  │ │ Content  │                                  │
│  │ Left     │ │ Right    │                                  │
│  └──────────┘ └──────────┘                                  │
│              ↑ (vertical line between)                      │
│                                                             │
│  With text:                                                 │
│  ────────── Or continue with ──────────                    │
│                                                             │
│  With color variation:                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (darker)           │
│  ────────────────────────────────────── (lighter)          │
│                                                             │
│  Orientations: horizontal, vertical                         │
│  Styles: solid, dashed, dotted                             │
│  Colors: primary, muted, border                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ASPECT RATIO (Maintain Image/Content Proportions)           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Aspect Ratio 16:9                                          │
│  ┌──────────────────────────────────────┐                  │
│  │                                      │                  │
│  │    Image fills container              │                  │
│  │    while maintaining ratio            │                  │
│  │                                      │                  │
│  └──────────────────────────────────────┘                  │
│                                                             │
│  Aspect Ratio 1:1 (Square)               Aspect Ratio 4:3 │
│  ┌──────────────┐                        ┌──────────────────┐
│  │              │                        │                  │
│  │              │                        │                  │
│  │   Image      │                        │    Image         │
│  │              │                        │                  │
│  └──────────────┘                        └──────────────────┘
│                                                             │
│  Common ratios: 1:1, 3:2, 4:3, 16:9, 21:9                 │
│  Use case: Video embeds, image galleries, responsive      │
│  Props: ratio (e.g., 16/9)                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SCROLL AREA (Custom Scrollbar Styling)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────┐ ▲                 │
│  │ Item 1                              │ │                 │
│  │ Item 2                              │ │                 │
│  │ Item 3                              │ ┃ Styled thumb   │
│  │ Item 4                              │ │ (custom color)  │
│  │ Item 5                              │ │                 │
│  │ Item 6                              │ │                 │
│  │ Item 7                              │ │                 │
│  │ Item 8                              │ ▼                 │
│  └─────────────────────────────────────┘                  │
│                                                             │
│  Horizontal scroll:                                         │
│  ┌──────────────────────────────────────────────┐◀─────────┤
│  │ [Item] [Item] [Item] [Item] [Item] [Item]   │           │
│  └──────────────────────────────────────────────┘           │
│  ◀─────────────────────────────────────────────────►        │
│                                                             │
│  Features: custom styling, hiding scrollbar on hover,      │
│           smooth scrolling, momentum scrolling             │
│  Browser: Consistent cross-browser appearance              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RESIZABLE (Draggable Panels)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┬────────────────┐                 │
│  │                      ┃                │                 │
│  │    Left Panel        ┃   Right Panel  │                 │
│  │                      ◀───▶ (drag)     │                 │
│  │                      ┃                │                 │
│  └──────────────────────┴────────────────┘                 │
│                                                             │
│  Three-panel layout:                                        │
│  ┌────────┬──────────────┬─────────┐                       │
│  │ Sidebar┃              ┃ Details │                       │
│  │        ┃  Main Panel  ┃         │                       │
│  │        ◀───▶          ◀────▶    │                       │
│  └────────┴──────────────┴─────────┘                       │
│                                                             │
│  Vertical layout:                                           │
│  ┌─────────────────────────┐                               │
│  │     Top Panel           │                               │
│  │◀─────────▶ (drag)       │                               │
│  ├─────────────────────────┤                               │
│  │                         │                               │
│  │    Bottom Panel         │                               │
│  │                         │                               │
│  └─────────────────────────┘                               │
│                                                             │
│  Features: horizontal/vertical resize, min/max size,       │
│           collapse/expand, persist size to localStorage   │
│  Use case: IDE layouts, no-code editors, dashboards       │
└─────────────────────────────────────────────────────────────┘
```

---

## Feedback Components

### Overview

Feedback components inform users of status, result, or required attention regarding an action they've performed.

**Install command:**
```bash
npx shadcn@latest add alert alert-dialog toast sonner progress skeleton
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                   FEEDBACK COMPONENTS                        │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ALERT (Inline Feedback Message)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Default Alert:                                             │
│  ┌─ [ℹ] ─────────────────────────────────────┐            │
│  │ Alert Title                                 │            │
│  │ This is an informational message            │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Success Alert:                                             │
│  ┌─ [✓] ─────────────────────────────────────┐            │
│  │ Success!                                    │            │
│  │ Your changes have been saved                │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Warning Alert:                                             │
│  ┌─ [⚠] ─────────────────────────────────────┐            │
│  │ Warning                                     │            │
│  │ Please review your input before proceeding  │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Error/Destructive Alert:                                  │
│  ┌─ [✕] ─────────────────────────────────────┐            │
│  │ Error                                       │            │
│  │ Something went wrong. Please try again      │            │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Variants: default, outlined, subtle                        │
│  Icons: ℹ, ✓, ⚠, ✕ (customizable)                         │
│  Persistence: persists on page, can be dismissed           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ALERT DIALOG (Modal Confirmation)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │ ╳                    Confirm Action            │        │
│  ├────────────────────────────────────────────────┤        │
│  │                                                │        │
│  │ Are you sure you want to delete this item?   │        │
│  │ This action cannot be undone.                │        │
│  │                                                │        │
│  ├────────────────────────────────────────────────┤        │
│  │ [Cancel]                        [Delete]     │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  Variants: default, warning, destructive                    │
│  Components:                                                │
│  • AlertDialogTrigger (open button)                         │
│  • AlertDialogContent (modal box)                           │
│  • AlertDialogCancel (dismiss)                              │
│  • AlertDialogAction (confirm)                              │
│                                                             │
│  Use case: Delete confirmation, critical actions,          │
│           unsaved changes warning                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TOAST (Temporary Notification)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  (Appears in corner for 3-5 seconds)                        │
│                                                             │
│  Success Toast:                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │ ✓ Profile updated successfully              ✕ │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  Error Toast:                                               │
│  ┌────────────────────────────────────────────────┐        │
│  │ ✕ Failed to save. Please try again          ✕ │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  Info Toast:                                                │
│  ┌────────────────────────────────────────────────┐        │
│  │ ℹ Copied to clipboard                        ✕ │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  Position: top-right, top-center, bottom-right, etc.       │
│  Auto-dismiss: 3000ms (configurable)                        │
│  Actions: title, description, action button, close         │
│  Multiple toasts: queue up vertically                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SONNER (Enhanced Toast Library)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Promise Toast (async operation):                           │
│  ┌────────────────────────────────────────┐               │
│  │ Loading   Saving your data...        ✕│               │
│  └────────────────────────────────────────┘               │
│           ↓ (resolves to success)                          │
│  ┌────────────────────────────────────────┐               │
│  │ ✓ Data saved successfully            ✕│               │
│  └────────────────────────────────────────┘               │
│                                                             │
│  Custom Rich Notifications:                                 │
│  ┌──────────────────────────────────────────┐             │
│  │ [Username] followed you                  │             │
│  │ 🔔 New notification                      │             │
│  │ [View Profile]                           │             │
│  └──────────────────────────────────────────┘             │
│                                                             │
│  Loading Toast:                                             │
│  ┌────────────────────────────────────────┐               │
│  │ ⏳ Processing your request...          │               │
│  └────────────────────────────────────────┘               │
│                                                             │
│  More polished than standard Toast                          │
│  Swipe to dismiss (on mobile)                               │
│  Promise-based API for async operations                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PROGRESS (Loading/Completion Indicator)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Default Progress:                                          │
│  ┌────────────────────────────────────────────┐            │
│  │████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ 45%         │
│  └────────────────────────────────────────────┘            │
│                                                             │
│  Different sizes:                                           │
│  ┌──────────────────────────────────────────────┐          │
│  │██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ sm        │
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ lg│
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  With label:                                                │
│  ┌──────────────────────────────────────────────┐          │
│  │ Uploading File (60%)                         │          │
│  │███████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░  │          │
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  Indeterminate (unknown duration):                          │
│  ┌──────────────────────────────────────────────┐          │
│  │░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░  │(animated)│
│  └──────────────────────────────────────────────┘          │
│                                                             │
│  Props: value (0-100), className, variant                  │
│  Animated bars, smooth transitions                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SKELETON (Loading Placeholder)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Before Real Content Loads:                                 │
│  ┌─────────────────────────────────┐                       │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ (avatar)             │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║ (title)             │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║ (subtitle)          │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║ (description p1)    │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░    ║ (description p2)    │
│  └─────────────────────────────────┘(animated pulse)       │
│                                                             │
│  After Content Loads:                                       │
│  ┌─────────────────────────────────┐                       │
│  │ [Avatar Image]                  │                       │
│  │ John Doe                        │                       │
│  │ john@example.com                │                       │
│  │ This is the user's bio. Lorem   │                       │
│  │ ipsum dolor sit amet.           │                       │
│  └─────────────────────────────────┘                       │
│                                                             │
│  Common skeleton compositions:                              │
│  • Card skeleton (header + content + footer)               │
│  • List skeleton (multiple rows)                            │
│  • Grid skeleton (multiple columns)                         │
│  • Table skeleton (rows × columns)                          │
│                                                             │
│  Features: pulse animation, rounded corners, custom shapes │
│  Use: Replace with real content when ready                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Navigation Components

### Overview

Navigation components help users move through the application and understand where they are.

**Install command:**
```bash
npx shadcn@latest add tabs navigation-menu menubar breadcrumb pagination
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                  NAVIGATION COMPONENTS                       │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TABS (Section Selection)                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Horizontal Tabs:                                           │
│  ┌─ Account ──────┬─ Profile ──────┬─ Settings ──┐         │
│  │                                               │         │
│  │ Account Settings Content                     │         │
│  │ Email: user@example.com                     │         │
│  │ [Edit] [Save]                               │         │
│  │                                               │         │
│  └───────────────────────────────────────────────┘         │
│                                                             │
│  Vertical Tabs:                                             │
│  ┌──────────────┬──────────────────────────────┐           │
│  │ ➤ Account    │ Account Settings Content     │           │
│  │   Profile    │ Email: user@example.com     │           │
│  │   Settings   │ [Edit] [Save]               │           │
│  │   Security   │                              │           │
│  │   Privacy    │                              │           │
│  └──────────────┴──────────────────────────────┘           │
│                                                             │
│  Styled variants:                                           │
│  [Account] [Profile] [Settings]  (default)                │
│  ┏Account┓ ┗Profile┛ ┗Settings┛  (pills/buttons)          │
│  Account | Profile | Settings    (underline)              │
│                                                             │
│  Features: keyboard navigation (arrow keys),              │
│           lazy loading content, animations                 │
│  Props: defaultValue, value, onValueChange                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION MENU (Complex Multi-level Nav)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Desktop Dropdown Menu:                                     │
│  ┌──────────┬─────────────┬──────────┐                     │
│  │ Products │ Docs        │ Pricing  │  About  │           │
│  └────┬─────┴─────────────┴──────────┘         │           │
│       │                                         │           │
│       ▼                                         │           │
│  ┌────────────────────────────────┐           │           │
│  │ Featured                       │           │           │
│  │ ┌──────────┐  ┌──────────┐    │           │           │
│  │ │ Product  │  │ Product  │    │           │           │
│  │ │ 1        │  │ 2        │    │           │           │
│  │ └──────────┘  └──────────┘    │           │           │
│  │                               │           │           │
│  │ Resources                      │           │           │
│  │ • Getting Started              │           │           │
│  │ • API Docs                     │           │           │
│  │ • Examples                     │           │           │
│  └────────────────────────────────┘           │           │
│                                               ▼           │
│                                  ┌──────────────────────┐ │
│                                  │ About our company    │ │
│                                  │ Team                 │ │
│                                  │ Blog                 │ │
│                                  │ Contact              │ │
│                                  └──────────────────────┘ │
│                                                             │
│  Mobile (Accordion style):                                  │
│  ┌─ Menu (☰) ─────────────────┐                           │
│  │ ▼ Products                  │                           │
│  │   • Product 1               │                           │
│  │   • Product 2               │                           │
│  │ ► Docs                      │                           │
│  │ ► Pricing                   │                           │
│  │ ► About                     │                           │
│  └─────────────────────────────┘                           │
│                                                             │
│  Features: mega menus, icons, descriptions, keyboard nav   │
│  Responsive: adapts from desktop dropdown to mobile drawer │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MENUBAR (Top Application Menu)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────┬ Edit ─────┬ View ──┬ Tools ┐                     │
│  │ File │ ▼         │ ▼      │ ▼     │                     │
│  └──────┴───────────┴────────┴───────┘                     │
│  ┌─────────────────────┐                                   │
│  │ ┌ New              │ (Ctrl+N)                           │
│  │ ├ Open             │ (Ctrl+O)                           │
│  │ ├ Open Recent      │ ►                                  │
│  │ ├─────────────────│                                     │
│  │ ├ Save             │ (Ctrl+S)                           │
│  │ ├ Save As...       │ (Ctrl+Shift+S)                     │
│  │ ├─────────────────│                                     │
│  │ ├ Export           │ ►                                  │
│  │ ├─────────────────│                                     │
│  │ └ Exit             │ (Ctrl+Q)                           │
│  └─────────────────────┘                                   │
│                                                             │
│  Icons beside menu items, keyboard shortcuts, submenus     │
│  Native-like application menus                             │
│  Accessibility: ARIA roles for menu structure              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BREADCRUMB (Hierarchical Navigation Path)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Simple breadcrumb:                                         │
│  Home > Products > Electronics > Laptops                   │
│                                                             │
│  With clickable links:                                      │
│  [Home] > [Products] > [Electronics] > Laptops             │
│                                                             │
│  Custom separator:                                          │
│  Home / Products / Electronics / Laptops                   │
│  Home → Products → Electronics → Laptops                   │
│  Home • Products • Electronics • Laptops                    │
│                                                             │
│  With divider lines:                                        │
│  Home │ Products │ Electronics │ Laptops                   │
│                                                             │
│  Mobile version (truncated):                                │
│  ... > Electronics > Laptops          (first collapsed)    │
│                                                             │
│  Features: last item non-clickable (current page),         │
│           mobile truncation, custom separators             │
│  Use: Show structure and allow quick navigation up        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PAGINATION (Results Navigation)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Simple Pagination:                                         │
│  ◀ Previous  [1] [2] [3] [4] [5]  Next ▶                  │
│             └─ Current Page                                │
│                                                             │
│  With Ellipsis:                                             │
│  ◀ Prev  [1] ... [5] [6] [7] ... [20]  Next ▶             │
│                   └─ Current                               │
│                                                             │
│  Disabled States:                                           │
│  ◀ Previous (disabled)  [1] [2] [3]  Next ▶               │
│                                                             │
│  Long List:                                                 │
│  ◀ Prev [1] [2] [3] [4] [5] [6] ... [100] Next ▶          │
│                                                             │
│  With Page Size Selector:                                   │
│  ┌─ Show 10 per page ──────────┐  ◀ [1] [2] [3] ▶         │
│  │ 10                           │                          │
│  │ 25                           │                          │
│  │ 50                           │                          │
│  │ 100                          │                          │
│  └──────────────────────────────┘                          │
│                                                             │
│  Keyboard shortcuts: Undo, Redo, Page Down/Up              │
│  Features: customizable page display, total count          │
│  Variants: button, link, dropdown                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Overlay Components

### Overview

Overlay components appear above the main content and are used for modals, dropdowns, tooltips, and popovers.

**Install command:**
```bash
npx shadcn@latest add dialog sheet drawer popover tooltip hover-card
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                   OVERLAY COMPONENTS                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DIALOG (Modal Window)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────[ Modal Dialog ]──────────────┐            │
│  │ ╳                                           │            │
│  │                                             │            │
│  │ Dialog Title                                │            │
│  │                                             │            │
│  │ This is an important message. The user     │            │
│  │ must interact with this dialog to proceed. │            │
│  │                                             │            │
│  │ ┌──────────────┐         ┌──────────────┐  │            │
│  │ │ Cancel       │         │ Confirm      │  │            │
│  │ └──────────────┘         └──────────────┘  │            │
│  │                                             │            │
│  └─────────────────────────────────────────────┘            │
│  (Backdrop is dimmed, non-interactive)                      │
│                                                             │
│  Features: focus trapping, backdrop click to close,        │
│           escape key to close, nested dialogs supported    │
│  Components: DialogTrigger (button), DialogContent,        │
│             DialogHeader, DialogTitle, DialogDescription   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SHEET (Side Drawer Panel)                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Drawer from Right:        Drawer from Left:              │
│  ┌──────────────────────┐   ┌──────────────────────┐       │
│  │ Main Content        │   │  Side  │ Main Content │       │
│  │                     │   │  Menu  │             │       │
│  │                     │┌──┤        │             │       │
│  │                    ││╳│ Menu    │             │       │
│  │                    ││  Item 1   │             │       │
│  │                    ││  Item 2   │             │       │
│  │                    ││  Item 3   │             │       │
│  │                    ││  Item 4   │             │       │
│  └────────────────────┘└──┘        │             │       │
│                               └─────┴─────────────┘       │
│                                                             │
│  Position: top, right, bottom, left                         │
│  Mobile: typically full-width                              │
│  Desktop: typically 1/3 width                              │
│                                                             │
│  Features: smooth slide animation, backdrop dimming,       │
│           swipe to close (mobile), click overlay to close   │
│  Use: Navigation menus, filters, settings, forms           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DRAWER (Animated Slide-out Panel)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Similar to Sheet, but often full-page/full-height:        │
│                                                             │
│  ┌███████████████████────────────────────┐                 │
│  │ [☰] Drawer Header          Main Page  │                 │
│  │ ┌──────────────────────────────────┐   │                 │
│  │ │ • Item 1                         │   │                 │
│  │ │ • Item 2                         │   │                 │
│  │ │ • Item 3                         │   │                 │
│  │ │ • Item 4                         │   │                 │
│  │ │ • Item 5                         │   │                 │
│  │ └──────────────────────────────────┘   │                 │
│  │                                         │                 │
│  │ [Footer]              [Main Footer]      │                 │
│  └█████████████████████─────────────────────┘                 │
│                                                             │
│  Advantages: drawer-like interaction, smooth animation,    │
│             handles nested content well                    │
│  Use: Mobile navigation, complex layouts, master-detail   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ POPOVER (Context-Aware Popup)                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Popover Above Trigger:                                     │
│         ┌────────────────┐                                  │
│         │ Popover Title  │                                  │
│         │ This is some   │                                  │
│         │ content...     │                                  │
│         │ [Action]       │                                  │
│         └────────────────┘                                  │
│              ▲                                               │
│              │ (arrow pointing to trigger)                  │
│         ┌─────────────┐                                     │
│         │ [Trigger] ◀ │                                     │
│         └─────────────┘                                     │
│                                                             │
│  Popover to the Right:                                      │
│  ┌─────────────┐ ┌────────────────┐                        │
│  │ [Trigger] ▶ │ │ Popover Title  │                        │
│  └─────────────┘ │ This is some   │                        │
│                  │ content...     │                        │
│                  │ [Action]       │                        │
│                  └────────────────┘                        │
│                                                             │
│  Features: smart positioning (flip if off-screen),         │
│           click outside to close, customizable arrow       │
│  Typical uses: create/edit inline, linked accounts, info   │
│  vs Dialog: lighter weight, stays on page, not modal        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TOOLTIP (Hover Information)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tooltip Above:                                             │
│  ┌──────────────────┐                                       │
│  │ Help Information │                                       │
│  └──────────────────┘                                       │
│        ▼ (arrow)                                            │
│    [? Button]                                               │
│  (hover to show)                                            │
│                                                             │
│  Tooltip to Right:                                          │
│  [? Button] ▶ ┌─────────────────┐                          │
│               │ Longer help text │                          │
│               │ on multiple      │                          │
│               │ lines            │                          │
│               └─────────────────┘                          │
│                                                             │
│  Features: short delay before showing (avoid clutter),     │
│           auto-positioning, keyboard accessible            │
│  Positions: top, right, bottom, left                        │
│  Content: plain text or rich (avoid too much content)      │
│  Use: Icon explanations, keyboard shortcuts, help text     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ HOVER CARD (Rich Hover Preview)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Hover on User Link:                                        │
│  @john_doe                                                  │
│  (hover)                                                    │
│       ▼                                                      │
│  ┌──────────────────────────────┐                          │
│  │ ┌─ Profile Preview ────────┐ │                          │
│  │ │ [Avatar] John Doe        │ │                          │
│  │ │ @john_doe                │ │                          │
│  │ │ John is a designer and   │ │                          │
│  │ │ developer focused on UI. │ │                          │
│  │ │                          │ │                          │
│  │ │ Followers: 1,234         │ │                          │
│  │ │ Following: 567           │ │                          │
│  │ │                          │ │                          │
│  │ │ [Follow] [Message]       │ │                          │
│  │ └──────────────────────────┘ │                          │
│  └──────────────────────────────┘                          │
│                                                             │
│  Differences from Tooltip:                                  │
│  • Shows after longer delay (500-700ms)                     │
│  • Can contain rich content (images, buttons)              │
│  • Larger and more detailed                                 │
│  • May have interactions within the card                    │
│                                                             │
│  Use: User profiles, link previews, rich metadata           │
│  Common in: Twitter, GitHub, social networks              │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Display Components

### Overview

Data display components present information to users in organized, consumable formats.

**Install command:**
```bash
npx shadcn@latest add table avatar badge calendar carousel
```

---

### Visual Structure

```
┌──────────────────────────────────────────────────────────────┐
│                  DATA DISPLAY COMPONENTS                     │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TABLE (Structured Data Grid)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Name     │ Email              │ Status   │ Actions   │  │
│  ├──────────┼────────────────────┼──────────┼───────────┤  │
│  │ John Doe │ john@example.com   │ Active   │[Edit][✓]  │  │
│  ├──────────┼────────────────────┼──────────┼───────────┤  │
│  │ Jane Doe │ jane@example.com   │ Inactive │[Edit][✓]  │  │
│  ├──────────┼────────────────────┼──────────┼───────────┤  │
│  │ Bob Smith│ bob@example.com    │ Active   │[Edit][✓]  │  │
│  ├──────────┼────────────────────┼──────────┼───────────┤  │
│  │ Alice G. │ alice@example.com  │ Active   │[Edit][✓]  │  │
│  └──────────┴────────────────────┴──────────┴───────────┘  │
│                                                             │
│  With sorting/filtering:                                    │
│  Name ▲  │ Email            │ Status [ Active ▼ ] │ Actions
│  ┌─────────────────────────────────────────────────────────┐
│  │ Advanced header controls (search, sort, columns)        │
│  └─────────────────────────────────────────────────────────┘
│                                                             │
│  With row selection:                                        │
│  ☑ │ Name     │ Email           │ Status   │ Actions      │
│  ☐ │ John Doe │ john@example... │ Active   │ [Edit][✓]    │
│  ☑ │ Jane Doe │ jane@example... │ Active   │ [Edit][✓]    │
│  ☐ │ Bob Smith│ bob@example...  │ Inactive │ [Edit][✓]    │
│  [Delete Selected]                                          │
│                                                             │
│  Features: sortable columns, selectable rows,              │
│           paginated display, responsive (mobile scroll)    │
│  Built on: TanStack Table (headless)                        │
│  Use: Data listings, user management, logs, analytics      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ AVATAR (User/Item Visual Representation)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Image Avatar:                                              │
│  ┌─────┐                                                   │
│  │[JD] │  ← Shows initials when image fails                │
│  └─────┘                                                   │
│                                                             │
│  With Image Loading:                                        │
│  ┌─────┐                                                   │
│  │ [🖼] │  ← Profile photo                                 │
│  └─────┘                                                   │
│                                                             │
│  Different Sizes:                                           │
│  ┌──┐  ┌─────┐  ┌──────────┐                               │
│  │JD│  │ JD  │  │   JD     │  (sm, md, lg)                │
│  └──┘  └─────┘  └──────────┘                               │
│                                                             │
│  Avatar Group (Stack):                                      │
│  ┌──────────────────────────┐                              │
│  │ [JD] [JK] [AB]+2 More    │  (user list)                │
│  └──────────────────────────┘                              │
│                                                             │
│  With Status Indicator:                                     │
│  ┌─────┐                                                   │
│  │[JD] │                                                   │
│  │  ● │ ← (online green dot)                              │
│  └─────┘                                                   │
│                                                             │
│  Fallback Avatar:                                           │
│  When no image: ┌─────┐                                    │
│                 │ JD  │  (initials)                        │
│                 └─────┘                                    │
│  When no initials: ┌──────┐                                │
│                    │ [👤] │  (default icon)               │
│                    └──────┘                                │
│                                                             │
│  Props: src, alt, fallback, initials, size, shape         │
│  Features: lazy loading, accessibility alt text           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BADGE (Label/Tag Display)                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Default Badges:                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Default  │  │ Primary  │  │Success   │  │ Warning  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐                                │
│  │Destructive  │ Secondary│                                │
│  └──────────┘  └──────────┘                                │
│                                                             │
│  Variants:                                                  │
│  ✓ Success  ⚠ Warning  ✕ Error  ℹ Info                   │
│                                                             │
│  With dismissal:                                            │
│  ┌──────────┬──┐                                            │
│  │ Badge    │✕ │ (click to remove)                         │
│  └──────────┴──┘                                           │
│                                                             │
│  Multiple badges (tag group):                               │
│  ┌─────┐  ┌────────┐  ┌──────┐                             │
│  │React │  │Next.js │  │TypeS │ +2 more                   │
│  └─────┘  └────────┘  └──────┘                             │
│                                                             │
│  Status badges:                                             │
│  ● Online    ● Away    ● Offline    ○ Do Not Disturb      │
│                                                             │
│  Use: Tags, labels, status indicators, categories          │
│  Features: click-to-deselect, colors, icons               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CALENDAR (Date Selection Component)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Single Date Selection:                                     │
│                                                             │
│        ◄ May 2026 ►                                         │
│   Su Mo Tu We Th Fr Sa                                      │
│            1  2  3  4                                       │
│    5  6  7  8  9 10 11                                     │
│   12 13 14 [15]16 17 18    ← Today (highlighted)          │
│   19 20 21 22 23 24 25                                     │
│   26 27 28 29 30 31                                        │
│                                                             │
│  Date Range Selection:                                      │
│                                                             │
│        ◄ May 2026 ►     ◄ June 2026 ►                       │
│   Su Mo Tu We Th Fr Sa   Su Mo Tu We Th Fr Sa             │
│            1  2  3  4                   1                  │
│    5  6 [7  8  9 10]11   2  3  4  5  6  7  8              │
│   12 13 14 15 16 17 18   9 10 11 12 13 14 15             │
│   19 20 21 22 23 24 25  16 17 18 19 20 21 22              │
│   26 27 28 29 30 31      23 24 25 26 27 28 29              │
│                          30                                │
│            ▲────────────────────▲                          │
│           Start                 End                        │
│                                                             │
│  Disabled dates (grayed out):                               │
│        ◄ May 2026 ►                                         │
│   Su Mo Tu We Th Fr Sa                                      │
│    ░  ░  ░  ░  ░  ░  ░                                    │
│    5  6  7  8  9 10 11                                     │
│   12 13 14 [15]16 17 18                                    │
│   19 20 21 22 23 24 25                                     │
│   26 27 ░  ░  30 31  ░                                    │
│                                                             │
│  Features: multi-month view, preset ranges (Today,         │
│           This Week, Last 30 Days), disabled dates         │
│  Use: Date pickers, booking systems, report date ranges   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CAROUSEL (Scrollable Item Container)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Horizontal Carousel:                                       │
│                                                             │
│  ◄ [Card 1] [Card 2] [Card 3] [Next...] ►                   │
│     └─ Current visible set                                  │
│                                                             │
│  ┌──────────────────────────────────────────────┐           │
│  │ ◀                                        ▶ │           │
│  │    ┌──────────┐  ┌──────────┐                │           │
│  │    │ Item 1   │  │ Item 2   │                │           │
│  │    │          │  │          │                │           │
│  │    │ [Image]  │  │ [Image]  │                │           │
│  │    │  Title   │  │  Title   │                │           │
│  │    └──────────┘  └──────────┘                │           │
│  │                                              │           │
│  │  ● ○ ○ ○ ○  (activity indicators)            │           │
│  └──────────────────────────────────────────────┘           │
│                                                             │
│  Auto-play with pause on hover:                             │
│  [Auto-playing carousel pauses when hovered]                │
│                                                             │
│  Vertical Carousel (news ticker):                           │
│  ┌─────────────────────────────┐                            │
│  │ [Story 1]    ▲              │                            │
│  ├─────────────────────────────┤  (scroll up)               │
│  │ [Story 2]                   │                            │
│  ├─────────────────────────────┤                            │
│  │ [Story 3]    ▼              │                            │
│  └─────────────────────────────┘  (scroll down)             │
│                                                             │
│  Infinite carousel (loops):                                 │
│  Seamlessly loops, infinite scroll                          │
│                                                             │
│  Features: keyboard navigation (arrow keys),                │
│           touch swipe (mobile), auto-play, dots/controls    │
│  Use: Product showcases, testimonials, image galleries,     │
│       news feeds, featured content                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Installation Reference

| Category | Components | Install Command |
|----------|-----------|-----------------|
| **Form** | button, input, label, textarea, checkbox, radio-group, select, switch, slider, form | `npx shadcn@latest add button input label textarea checkbox radio-group select switch slider form` |
| **Layout** | card, separator, aspect-ratio, scroll-area, resizable | `npx shadcn@latest add card separator aspect-ratio scroll-area resizable` |
| **Feedback** | alert, alert-dialog, toast, sonner, progress, skeleton | `npx shadcn@latest add alert alert-dialog toast sonner progress skeleton` |
| **Navigation** | tabs, navigation-menu, menubar, breadcrumb, pagination | `npx shadcn@latest add tabs navigation-menu menubar breadcrumb pagination` |
| **Overlay** | dialog, sheet, drawer, popover, tooltip, hover-card | `npx shadcn@latest add dialog sheet drawer popover tooltip hover-card` |
| **Data Display** | table, avatar, badge, calendar, carousel | `npx shadcn@latest add table avatar badge calendar carousel` |

---

**Last Updated:** May 2, 2026
