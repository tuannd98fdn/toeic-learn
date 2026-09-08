# No UI Emoji Icons

## Rule
**Never add emoji icons to the user interface (UI) code.** 

## Context
The user has explicitly requested to keep the application's UI clean and professional by strictly avoiding the use of inline emojis (e.g., 💡, 🎧, 📝, 🖍️, ➔, 🧹, 👁️, 🎯, 💪) inside React components, buttons, banners, or any other user-facing text.

## Actionable Guidelines
- When adding new buttons, hints, or labels, use plain text or appropriate SVG/CSS icons (e.g., from `lucide-react` or the internal `AppIcons` library) if icons are necessary.
- Do NOT use emojis as quick visual placeholders. 
- Always review your code before saving to ensure no accidental emojis were added to the string literals rendered on the screen.
