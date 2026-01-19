---
name: "frontend-reviewer"
description: "Reviews frontend code for UI/UX quality, responsiveness, and best practices. Invoke when user asks to check UI effects, review frontend code, or verify visual implementation."
---

# Frontend Code Effect Reviewer

This skill helps you review frontend code implementations, focusing on visual effects, user experience, and code quality.

## Review Checklist

### 1. Visual & UI/UX
- **Consistency**: Check if fonts, colors, and spacing match the design system or existing style (e.g., Tailwind config).
- **Feedback**: Ensure interactive elements (buttons, inputs) have hover, focus, and active states.
- **Layout**: Verify alignment, whitespace, and grid/flex usage.
- **Images/Media**: Check for proper aspect ratios, `object-fit`, and fallback images.

### 2. Responsiveness
- **Mobile-First**: Verify styles work on small screens.
- **Breakpoints**: Check usage of responsive modifiers (e.g., `md:`, `lg:` in Tailwind).
- **Overflow**: Ensure no horizontal scroll on mobile unless intended.

### 3. Code Implementation
- **Semantic HTML**: Use proper tags (`<header>`, `<main>`, `<article>`, `<button>`).
- **Component Structure**: Ensure components are focused and reusable.
- **State Management**: Check efficient use of `ref`, `computed`, or props.
- **Performance**: Look for lazy loading (`loading="lazy"`), efficient list rendering (`v-for` with key).

### 4. Accessibility (a11y)
- **Contrast**: Ensure text color has sufficient contrast against background.
- **Alt Text**: Images must have meaningful `alt` attributes.
- **Keyboard Nav**: Interactive elements must be focusable.

## How to use
1. Read the provided code snippet or file.
2. Analyze it against the checklist above.
3. Provide specific, actionable feedback.
4. Suggest code improvements directly.
