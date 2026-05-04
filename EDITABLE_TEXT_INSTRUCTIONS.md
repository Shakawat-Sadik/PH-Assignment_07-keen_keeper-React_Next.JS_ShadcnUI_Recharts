**Editable Text (Next.js + shadcn) — Integration Guide**

This document explains how the inline-editable text component works in a Next.js (app router) project using shadcn-style conventions, how to integrate it into your existing `Friend` details page, and options to persist edits.

**Overview**
- **What this is:** an "inline edit" or "editable text" UI pattern (sometimes called `inline-edit`, `editable-label`, or `contentEditable` pattern). It displays text and switches to an input or textarea when the user wants to edit.
- **Where to find examples:** shadcn uses Radix + Tailwind. Look for "editable" or "inline edit" recipes in shadcn/ui examples and Radix primitives; MDN docs for `contentEditable` are also useful for alternate approaches.

**Files added by me**
- **Component (client, shadcn-style):** [src/components/ui/editable-text.jsx](src/components/ui/editable-text.jsx#L1-L200)
- **(Optional) legacy helper:** [src/components/EditableText.jsx](src/components/EditableText.jsx#L1-L200) — you can remove this if you prefer the `ui` version.

**Why this is Next.js-specific**
- The component is a client component ("use client") because it uses React state and DOM interactions. In the app router, server components cannot hold state or run effects, so client components are required for interactivity.

**How the component works (high level)**
- Displays a text node (a span or p) when not editing.
- When activated (click or programmatic control), it renders an `<input>` or `<textarea>`.
- Save occurs on `Enter` (for single-line) or on `blur`. Pressing `Escape` cancels and reverts changes.
- Parent components can control editing via `editing` and `onEditingChange` props (useful for hooking an `Edit` button).

**How to use it in your code**

1. Import the component in your details page (example uses the file I added):

   - **Example import:**

     - `import EditableText from "./ui/editable-text"`

2. Render inline where you want editable text. Minimal example:

   - Single-line (for `30 Days` text controlled by an Edit button):

     ```jsx
     const [connectDays, setConnectDays] = useState('30 Days')
     const [editingGoal, setEditingGoal] = useState(false)

     <Button onClick={() => setEditingGoal(true)}>Edit</Button>

     <p className="opacity-80">
       Connect every <EditableText
         value={connectDays}
         onSave={setConnectDays}
         editing={editingGoal}
         onEditingChange={setEditingGoal}
         inputClassName="font-bold"
         className="font-bold inline"
       />
     </p>
     ```

   - Multiline (bio):

     ```jsx
     <EditableText
       value={bioState}
       onSave={setBioState}
       multiline
       inputClassName="w-full p-2 rounded"
     />
     ```

**Styling & shadcn conventions**
- The component uses `cn` from `src/lib/utils.js` to merge Tailwind classes and `class-variance-authority` style conventions.
- The built component is small and Tailwind-friendly so you can pass your own `inputClassName` and `className` props.

**Persistence options**

- Local only (in-memory): keep edits in component state as done in examples above.

- LocalStorage (quick client-only persist):

  ```js
  // Save
  useEffect(() => {
    localStorage.setItem(`friend-${id}-bio`, bioState)
  }, [bioState])

  // Load initial
  useEffect(() => {
    const saved = localStorage.getItem(`friend-${id}-bio`)
    if (saved) setBioState(saved)
  }, [])
  ```

- Server/API (recommended for real apps): create a Next.js API route to accept saves and call it from the client after `onSave`.

  - Example Next.js app-router API route (file: `app/api/friends/update/route.js`):

    ```js
    // POST handler that updates server-side storage (DB or file)
    export async function POST(req) {
      const body = await req.json()
      // validate and persist body.id / body.field / body.value
      return new Response(JSON.stringify({ ok: true }))
    }
    ```

  - Client-side call after `onSave`:

    ```js
    async function handleSave(newValue) {
      setBioState(newValue)
      await fetch('/api/friends/update', { method: 'POST', body: JSON.stringify({ id, field: 'bio', value: newValue }) })
    }
    ```

**Notes and gotchas**
- Do not use direct DOM selection like `document.getElementById(...)` inside React component render — that is not compatible with SSR and React lifecycle. Use component state and props instead (the guide's component does this).
- Ensure files that use React state have `"use client"` at the top when in the app router.
- If you use TypeScript, convert the component props to an interface and add types for refs and callbacks.

**What these components are called and where to find them**
- Common names: `EditableText`, `InlineEdit`, `InlineEditor`, `EditableLabel`, `ContentEditable`.
- Recipes and examples:
  - shadcn/ui (component library examples): search for "editable" or "inline edit" in their repo and docs.
  - Radix UI primitives: useful if you need low-level control (Radix provides primitives that shadcn builds on).
  - MDN `contentEditable`: shows native browser feature for editable elements (good for rich text scenarios).

**How to run and test locally**

1. Start dev server:

   ```bash
   npm run dev
   ```

2. Open the Friend details page and:
  - Click `Edit` (opens the inline input),
  - Change value, press `Enter` or click outside to save,
  - Press `Escape` to cancel.

**Optional follow-ups I can do for you**
- Wire persistence to `localStorage` or an API route and add feedback (saving spinner / success toast).
- Remove the older `src/components/EditableText.jsx` and switch all imports to the `ui` version.
- Convert component to TypeScript.

If you'd like, I will make the chosen follow-up change now — which one should I implement next?

End of guide
