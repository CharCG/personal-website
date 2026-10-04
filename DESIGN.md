# Design System

Use this document as the source of truth for all visual and layout decisions.

---

## 1. General Principles

- Use the existing color tokens and theme from `globals.css`.
- Preserve the existing light/dark theme system.
- Keep the design clean, minimal, consistent, and flat.
- Do not introduce arbitrary design values when this document already defines one.
- The UI reference determines composition and visual direction.
- This design system determines consistency.

---

## 2. Layout

### Container

- Maximum content width: `1200px`.
- Center the main content horizontally.
- Do not make primary page content full-width.
- All major sections should align to the same container.
- Full-width backgrounds are allowed, but their content should remain inside the container.

### Horizontal Padding

| Device  | Padding |
| ------- | ------- |
| Desktop | 32px    |
| Tablet  | 24px    |
| Mobile  | 24px    |

Keep page alignment consistent across all sections and pages.

---

## 3. Typography

Use four typefaces with distinct, consistent roles. Load them with `next/font/google`.

- **Instrument Sans** is the default for body text, navigation, buttons, eyebrows, labels, and captions.
- **Bricolage Grotesque** is for display text and semantic headings (`h1`–`h4`).
- **JetBrains Mono** is reserved for numeric stats, timelines, keyboard shortcuts, and code-like metadata. Do not use it for normal prose or eyebrows.
- **Architects Daughter** is a sparing accent for short expressive phrases, such as the footer tagline and selected words in section headings. Do not use it for paragraphs, UI controls, or metadata.
- Keep the typography scale below unchanged across font roles.

| Style   | Desktop | Tablet | Mobile |
| ------- | ------- | ------ | ------ |
| Display | 64px    | 48px   | 36px   |
| H1      | 48px    | 36px   | 28px   |
| H2      | 36px    | 28px   | 24px   |
| H3      | 28px    | 24px   | 20px   |
| H4      | 22px    | 20px   | 18px   |
| Body LG | 20px    | 18px   | 16px   |
| Body    | 16px    | 16px   | 16px   |
| Body SM | 14px    | 14px   | 14px   |
| Nav     | 14px    | 14px   | 14px   |
| Button  | 16px    | 16px   | 16px   |
| Caption | 12px    | 12px   | 12px   |
| Label   | 12px    | 12px   | 12px   |

### Rules

- `Display`: primary hero statement only.
- `H1–H4`: follow semantic heading hierarchy.
- `Body LG`: prominent supporting text.
- `Body`: normal paragraph content.
- `Body SM`: secondary information.
- `Caption` and `Label`: metadata, categories, dates, and small UI text.
- Use consistent font weights for the same semantic role.
- Do not use arbitrary font sizes outside this scale.
- Line-height and letter-spacing may be adjusted for readability.

---

## 4. Spacing

Use a strict `8px` spacing system.

### Scale

Use multiples of `8px`:

`8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128px`

Apply this system to:

- margin
- padding
- gap
- grid gap
- card padding
- section spacing
- container padding
- content-group spacing

Do not use arbitrary spacing such as `10px`, `18px`, `30px`, or `37px`.

### Spacing Hierarchy

- `8px` — icon + text or tightly related items
- `16px` — related elements
- `24px` — content groups and common gaps
- `32px` — card padding and larger internal groups
- `48–64px` — groups within a section
- `48–80px` — major section separation

Use the same spacing for the same visual relationship.

---

## 5. Section Rhythm

Major sections should use consistent vertical spacing.

| Device  | Section Gap |
| ------- | ----------- |
| Desktop | 80px        |
| Tablet  | 64px        |
| Mobile  | 48px        |

Example:

`Hero → Experience → Projects → Contact`

should normally follow the same section-gap rule.

If a reference requires different spacing, use the nearest appropriate `8px` multiple.

---

## 6. Visual Style

Use a flat visual design.

### Do

- Use borders.
- Use background contrast.
- Use spacing and typography to establish hierarchy.
- Use consistent border radius.
- Keep cards and containers visually simple.

### Do Not

- Do not use box shadows.
- Do not use drop shadows.
- Do not use glow effects.
- Do not use elevation effects.
- Do not use shadow-based card separation.
- Avoid unnecessary gradients.

Use borders, background colors, and spacing instead of shadows.

---

## 7. Colors

- Use semantic colors defined in `globals.css`.
- Prefer tokens such as:
  - `background`
  - `foreground`
  - `muted`
  - `muted-foreground`
  - `border`
  - `primary`
  - `secondary`
- Do not introduce arbitrary hardcoded colors when an appropriate theme token exists.
- Maintain sufficient contrast between text and background.

---

## 8. Responsive Design

- Preserve the same visual hierarchy across desktop, tablet, and mobile.
- Reduce typography and spacing according to the values defined above.
- Stack layouts when horizontal space is insufficient.
- Avoid horizontal overflow.
- Maintain consistent container alignment.
- Do not solve responsive issues using arbitrary one-off values.

---

## 9. Consistency Rules

- Same semantic role = same typography.
- Same visual relationship = same spacing.
- Same card type = same padding and structure.
- Same grid/list type = same gap.
- Same section pattern = same heading-to-content spacing.
- Same page structure = same container alignment.

Avoid one-off visual fixes whenever a reusable rule can solve the problem.

---

## 10. Tailwind Usage

- Prefer standard Tailwind utilities.
- Avoid arbitrary values such as `mt-[37px]`, `gap-[19px]`, or `text-[31px]`.
- Arbitrary values are allowed only when technically necessary and not covered by this design system.
- Spacing should remain aligned to the `8px` system.
- Typography should remain aligned to the typography scale above.

---

## Priority

When implementing a design:

1. Follow this design system.
2. Match the visual intent of the reference.
3. Normalize reference values to the closest value defined here.
4. Maintain consistency across the entire website.
