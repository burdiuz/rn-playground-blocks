---
name: rn-playground-blocks
description: Use @actualwave/rn-playground-blocks — themed React Native components and containers, one subpath import per block (e.g. '@actualwave/rn-playground-blocks/button').
---

# @actualwave/rn-playground-blocks

Install: `npm install @actualwave/rn-playground-blocks` (peers: `react`, `react-native`). Import each block from its own subpath, e.g. `import { Button } from '@actualwave/rn-playground-blocks/button'`; there is no root entry. README.md has the full per-component reference.

## Rules

- Wrap the tree in `<BlocksThemeProvider base="#hex" mode="light|dark|auto">` from `/theme` (optional; light defaults without it; `auto` follows the device scheme). `colors={{…}}` overrides single roles and wins over `base`.
- `/theme` also exports `useBlocksColors()` (returns the roles: `primary onPrimary background surface text mutedText border accent danger success`), `generatePalette(base, 'light'|'dark')`, `lightColors`, `darkColors`, `parseHex`, `readableOn`, `contrast`, `luminance`, and types `BlocksColors`, `ColorRole`, `ColorMode`. Use `useBlocksColors()` for any custom styling instead of hard-coded colours.
- Every block takes `style` (merged onto its root, wins over defaults). There are no padding/margin/gap/align props — write `style={{ padding: 16, gap: 8 }}`.
- Inputs and open/close containers are controlled: pass the value and handle the change callback. Exceptions that keep their own state: `Tabs` (selection), `Carousel` (page), `Select` dropdown (open state).
- Option values (`Select`, `SegmentedButton`) are strings. `Input` value may be `string | number` but `onChangeText` always gives a string (`kind="number"` only changes the keyboard).
- Each block exports its props interface (`ButtonProps`, …); also `SelectOption`, `SegmentedOption`, `StaticAlign`.
- Optional peers: `@react-native-community/slider` (`/slider`), `@react-native-community/datetimepicker` (`/date-field`).

## Example

```tsx
import { useState } from 'react';
import { BlocksThemeProvider } from '@actualwave/rn-playground-blocks/theme';
import { Column } from '@actualwave/rn-playground-blocks/column';
import { Input } from '@actualwave/rn-playground-blocks/input';
import { Button } from '@actualwave/rn-playground-blocks/button';
import { Modal } from '@actualwave/rn-playground-blocks/modal';
import { Text } from '@actualwave/rn-playground-blocks/text';

export function App() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <BlocksThemeProvider base="#2563EB">
      <Column style={{ padding: 16, gap: 8 }}>
        <Input label="Name" value={name} onChangeText={setName} />
        <Button label="Greet" onPress={() => setOpen(true)} />
        <Modal visible={open} onClose={() => setOpen(false)} title="Hello">
          <Text>{name}</Text>
        </Modal>
      </Column>
    </BlocksThemeProvider>
  );
}
```

## Components (props; `*` = required)

- `/text` `Text`: `variant` heading|body|caption, `color` (role), `style`, children.
- `/button` `Button`: `label`, `variant` primary|outline|ghost|danger, `onPress`, `disabled`, children replace label.
- `/icon-button` `IconButton`: `icon`* (glyph string or element), `label` (a11y), `variant` (default ghost), `onPress`, `disabled`.
- `/image` `Image`: `uri`* (100% wide, 160 high by default).
- `/input` `Input`: `label`, `value`, `onChangeText`, `kind` text|number|password|multiline, `placeholder`, `error`.
- `/toggle` `Toggle`: `label`, `value`, `onValueChange`, `variant` switch|checkbox.
- `/select` `Select`: `options`* `[{label,value}]`, `value`, `onChange`, `variant` dropdown|radio|chips, `label`, `placeholder`, `error`.
- `/segmented-button` `SegmentedButton`: `options`*, `value`, `onChange`, `label`, `error`.
- `/slider` `Slider`: `label`, `value`, `min`=0, `max`=100, `step`=1, `onValueChange`.
- `/date-field` `DateField`: `value` 'YYYY-MM-DD', `onChange`, `label`, `placeholder`, `error`.
- `/badge` `Badge`: `label`, `tone` primary|success|danger|neutral.
- `/progress` `Progress`: `value`=0, `max`=100.
- `/spinner` `Spinner`: `size` small|large.
- `/divider` `Divider`, `/spacer` `Spacer` (16×16, resize via style): `style` only.

## Containers

- `/row` `Row` (no wrap), `/column` `Column`, `/flow` `Flow` (row that wraps): `style`, children.
- `/card` `Card`: `title`. `/scroll` `Scroll`: `direction` vertical|horizontal, `style`, `contentStyle`.
- `/list` `List`: `items`, children = `(item, index) => node` — `<List items={xs}>{(x, i) => …}</List>`.
- `/panel` `Panel`: `title`, `open`, `onToggle`; children render only while open.
- `/modal` `Modal`, `/bottom-sheet` `BottomSheet` (full width, max 85% screen height), `/drawer` `Drawer` (`side` left|right, 288px wide): `visible`, `onClose`, `title`; `style` is the panel. Nothing renders while `visible` is false.
- `/menu` `Menu`: trigger `label` or `icon`, `title`, `side`, `open`, `onOpenChange`, `triggerStyle`; children are the items — to close after a choice, call `onOpenChange(false)` in the item's handler.
- `/tabs` `Tabs` (`initial`) with `Tab` children (`title`*); only `Tab`s are used.
- `/carousel` `Carousel`: `height`=160, `dots`=true; each child is a page.
- `/static` `Static`: `horizontal`/`vertical` start|center|end|fill (default fill = whole axis), `marginX`/`marginY` px from the edges. Bottom-right 20px: `<Static horizontal="end" vertical="end" marginX={20} marginY={20}>`. `center` keeps the content's own size; margins also inset `fill`. Takes the parent's remaining space.
- `/stack` `Stack`: layers children, each over the previous, all full size; the first child sizes the container.
