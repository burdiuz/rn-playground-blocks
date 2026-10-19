# rn-playground-blocks

Runtime UI blocks (plain React Native components) for the React Native Playground; one subpath entry per block, README.md + SKILL.md ship with the package.

## Priority: focusability and D-pad navigation

Focus and D-pad / hardware-keyboard navigation are the **top priority** right now (Android TV, tablets with keyboards). Every new or changed component must account for them before anything else:

- Every interactive element is reachable and operable by focus alone. Use `FocusPressable` (`src/internal/focus-pressable.tsx`) or `useFocusRing()` instead of a bare `Pressable`; never ship a pressable with no visible focus state.
- Non-interactive wrappers that sit over content (backdrops, swallow-tap layers) are `focusable={false}`.
- Anything that needs swipe, drag or long-press must also have a focusable alternative (see the Carousel ‹ › controls).
- Overlays (Modal, Drawer, BottomSheet, Menu) put preferred focus on a control inside, and close on Back (`onRequestClose`).
- Sizes that matter for a remote (touch targets, focus ring) read `useBlocksScale()`; no hard-coded-only sizes.
- Put pure logic in `src/internal/focus-style.ts` and spec it (`*.spec.ts`, `@jest/globals`).
- Update README.md (Remote / keyboard focus section) and SKILL.md when behaviour changes. Say plainly what was not verified on a real D-pad.
