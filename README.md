# @actualwave/rn-playground-blocks

Building blocks for React Native: small themed **components** and **containers**. Every block has its own subpath entry, so only what you import is loaded. There is no root entry.

```tsx
import { BlocksThemeProvider } from '@actualwave/rn-playground-blocks/theme';
import { Column } from '@actualwave/rn-playground-blocks/column';
import { Button } from '@actualwave/rn-playground-blocks/button';
import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);
  return (
    <BlocksThemeProvider base="#2563EB">
      <Column style={{ padding: 16, gap: 8 }}>
        <Button label={`Pressed ${count}`} onPress={() => setCount((c) => c + 1)} />
      </Column>
    </BlocksThemeProvider>
  );
}
```

## Install

```sh
npm install @actualwave/rn-playground-blocks
```

Required peers: `react`, `react-native`. Optional peers, only needed for the block that uses them: `@react-native-community/slider` (`/slider`) and `@react-native-community/datetimepicker` (`/date-field`).

## Conventions

- **`style`** — every block takes it. It is merged onto the block's root element *after* the block's own defaults, so it wins. There are no separate layout props (padding, margin, gap, align…): write `style={{ padding: 16, gap: 8 }}`. Where a block has more than one styled part it says so (`contentStyle`, `triggerStyle`, panel style).
- **Controlled** — inputs and open/close containers hold no state of their own: pass the value and handle the change callback (`value` + `onChangeText`, `visible` + `onClose`, …). Exceptions are noted per block (`Tabs`, `Carousel`, `Select` dropdown keep their own page / open state).
- **Colours** come from the theme (below); blocks never use hard-coded colours except where noted.
- **Types** — every block exports its props interface from its own entry (`ButtonProps`, `SelectProps`, …), plus `SelectOption` (`/select`), `SegmentedOption` (`/segmented-button`) and `StaticAlign` (`/static`). `/theme` exports `BlocksColors`, `ColorRole`, `ColorMode` and `BlocksThemeProps`.
- **Option values are strings** — `Select` and `SegmentedButton` options are `{ label: string; value: string }`.

### Controlled state example

```tsx
import { useState } from 'react';
import { Input } from '@actualwave/rn-playground-blocks/input';
import { Modal } from '@actualwave/rn-playground-blocks/modal';
import { Menu } from '@actualwave/rn-playground-blocks/menu';
import { Button } from '@actualwave/rn-playground-blocks/button';

function Example() {
  const [name, setName] = useState('');
  const [dialog, setDialog] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Input label="Name" value={name} onChangeText={setName} />
      <Button label="Open dialog" onPress={() => setDialog(true)} />
      <Modal visible={dialog} onClose={() => setDialog(false)} title="Hello">
        <Button label="Done" onPress={() => setDialog(false)} />
      </Modal>
      <Menu open={menu} onOpenChange={setMenu} title="Actions">
        <Button label="Reset" variant="ghost" onPress={() => { setName(''); setMenu(false); }} />
      </Menu>
    </>
  );
}
```

## Theme — `/theme`

```tsx
import { BlocksThemeProvider, useBlocksColors, generatePalette, lightColors, darkColors } from '@actualwave/rn-playground-blocks/theme';
```

| Export | Description |
| --- | --- |
| `BlocksThemeProvider` | Provides the colour roles to all blocks below it. Optional: without it blocks use `lightColors`. |
| `useBlocksColors()` | Returns the current `BlocksColors`, e.g. `style={{ backgroundColor: useBlocksColors().surface }}`. |
| `generatePalette(base, mode)` | Derives the ten roles from one base colour; `mode` is `'light'` or `'dark'`. |
| `useBlocksScale()` | Current size multiplier from the provider (`1` by default). |
| `lightColors`, `darkColors` | Default role sets (used when no `base` is given). |
| `parseHex`, `readableOn`, `contrast`, `luminance` | Colour helpers (`readableOn` picks black/white text by WCAG contrast). |

`BlocksThemeProvider` props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `base` | `string` | — | Base hex colour (`'#2563EB'`); the roles are generated from it at runtime. |
| `mode` | `'light' \| 'dark' \| 'auto'` | `'auto'` | `auto` follows the device colour scheme. |
| `colors` | `Partial<BlocksColors>` | — | Overrides single roles after generation (wins over `base`). Memoize it or define it outside the component, or the palette is recomputed on every render. |
| `scale` | `number` | `1` | Multiplies the `IconButton` size and the focus ring (e.g. `1.5` on a TV). |

Colour roles (`BlocksColors` / `ColorRole`): `primary`, `onPrimary`, `background`, `surface`, `text`, `mutedText`, `border`, `accent`, `danger`, `success`.

## Remote / keyboard focus

Every pressable block (`Button`, `IconButton`, `Tabs`, `Panel`, `Toggle` checkbox, `Select`, `SegmentedButton`, `DateField`, the close button of `Modal`/`Drawer`/`BottomSheet`/`Menu`) draws a 3 dp outline (colour `text`, times `scale`) while it holds D-pad or hardware-keyboard focus. The close button of a sheet asks for preferred focus, so a remote lands inside an opened dialog. `Carousel` shows focusable ‹ › controls beside its dots, so pages can be changed without swiping. Needs no setup; on a build without TV support the focus handlers simply never fire.

## Components

### Text — `/text`
Themed text. Props: `variant` `'heading' | 'body' | 'caption'` (default `body`; `heading` is 24 bold, `caption` is muted), `color` (a `ColorRole`, default `text`, `mutedText` for caption), `style` (`TextStyle`), `children`.

### Button — `/button`
Pressable button. Props: `label`, `variant` `'primary' | 'outline' | 'ghost' | 'danger'` (default `primary`), `onPress`, `disabled` (dimmed), `style`, `children` (replaces the label when given).

### IconButton — `/icon-button`
Round button with a glyph instead of a label. Props: `icon` (**required**; a glyph string such as `'＋'` or an element, e.g. an `@expo/vector-icons` icon), `label` (accessibility label), `variant` (as Button, default `ghost`), `onPress`, `disabled`, `style`.

### Image — `/image`
Props: `uri` (**required**), `style` (`ImageStyle`). Defaults to full width, 160 high, `cover`.

### Input — `/input`
Text field with optional label and error line. Props: `label`, `value` (`string | number`), `onChangeText`, `kind` `'text' | 'number' | 'password' | 'multiline'` (default `text`; `number` only shows a numeric keyboard — `onChangeText` still gives a string), `placeholder`, `error` (shown under the field), `style` (outer wrapper).

### Toggle — `/toggle`
Boolean control. Props: `label`, `value` (default `false`), `onValueChange(value)`, `variant` `'switch' | 'checkbox'` (default `switch`), `style`.

### Select — `/select`
Pick one of several options. Props: `options` (**required**, `{ label, value }[]`), `value` (the selected option's `value`), `onChange(value)`, `variant` `'dropdown' | 'radio' | 'chips'` (default `dropdown`; the dropdown keeps its own open state), `label`, `placeholder` (default `Select…`), `error`, `style`.

### SegmentedButton — `/segmented-button`
Connected row of options, exactly one selected. Props: `options` (**required**, `{ label, value }[]`), `value`, `onChange(value)`, `label`, `error`, `style`.

### Slider — `/slider`
Numeric slider showing its value (needs `@react-native-community/slider`). Props: `label`, `value`, `min` (0), `max` (100), `step` (1), `onValueChange(value)`, `style`.

### DateField — `/date-field`
Date picker (needs `@react-native-community/datetimepicker`; compact picker on iOS, dialog on Android). Props: `value` (`'YYYY-MM-DD'`), `onChange('YYYY-MM-DD')`, `label`, `placeholder` (`YYYY-MM-DD`), `error`, `style`.

### Badge — `/badge`
Small pill. Props: `label`, `tone` `'primary' | 'success' | 'danger' | 'neutral'` (default `primary`), `style`.

### Progress — `/progress`
Determinate bar. Props: `value` (0), `max` (100), `style` (the track; set `height` etc. here).

### Spinner — `/spinner`
Indeterminate indicator in the primary colour. Props: `size` `'small' | 'large'` (default `large`), `style`.

### Divider — `/divider`
1 px line in the border colour. Props: `style`.

### Spacer — `/spacer`
Empty 16×16 square; resize through `style` (`style={{ height: 32 }}`).

## Containers

### Row — `/row`, Column — `/column`, Flow — `/flow`
Plain `View`s: `Row` lays children out horizontally (`flexDirection: 'row'`, **no wrapping**), `Column` vertically, `Flow` horizontally and **wraps** to the next line. Props: `style`, `children`. Spacing and alignment come from `style` (`gap`, `padding`, `justifyContent`, `alignItems`…).

### Card — `/card`
Surface-coloured box with a border and rounded corners. Props: `title` (heading line at the top), `style`, `children`.

### Scroll — `/scroll`
`ScrollView` that takes the remaining space (`flex: 1`). Props: `direction` `'vertical' | 'horizontal'` (default `vertical`), `style` (the ScrollView), `contentStyle` (the scrolled content: padding, gap…), `children`.

### List — `/list`
Repeats a render function for each element. Props: `items` (`T[]`; anything else renders nothing), `style`, `children` — a function `(item, index) => node`.

```tsx
<List items={users} style={{ gap: 8 }}>{(user, i) => <Text>{i + 1}. {user.name}</Text>}</List>
```

### Panel — `/panel`
Collapsible section. Controlled. Props: `title`, `open`, `onToggle()` (the header was pressed), `style`, `children` (shown while open).

### Modal — `/modal`
Centered dialog above everything. Controlled. Props: `visible` (default `false`; nothing is rendered while hidden), `onClose()` (backdrop, back button or the ✕ in the header), `title`, `style` (**the dialog panel**), `children`.

### Drawer — `/drawer`
Side panel. Props as Modal (`style` is the drawer panel) plus `side` `'left' | 'right'` (default `left`); 288 px wide, full height.

### BottomSheet — `/bottom-sheet`
Panel sliding up from the bottom edge. Props as Modal (`style` is the sheet panel); the panel is full width, rounded at the top, at most 85 % of the screen high.

### Menu — `/menu`
A trigger button that opens a drawer of items. Controlled. Props: `label` (trigger text, default `Menu`; accessibility label when `icon` is set), `icon` (glyph string or element — trigger becomes an IconButton), `title` (drawer title), `side` (`left`), `open`, `onOpenChange(open)`, `style` (the drawer panel), `triggerStyle`, `children` (the items; give buttons a handler that calls `onOpenChange(false)` to close).

### Tabs — `/tabs` (`Tabs` + `Tab`)
Tab strip above the page of the selected tab. Keeps its own selection. `Tabs` props: `initial` (index shown first, 0), `style`, `children` (**only `Tab` children are used**). `Tab` props: `title` (**required**), `children`.

```tsx
<Tabs><Tab title="One"><Text>a</Text></Tab><Tab title="Two"><Text>b</Text></Tab></Tabs>
```

### Carousel — `/carousel`
Horizontally paged children, one per page, with position dots. Props: `height` (page height, 160), `dots` (true), `style`, `children` (each child is a page, full container width).

### Static — `/static`
Pins its content to a spot of the container with alignment and margins; takes the remaining space of its parent (`flexGrow: 1`). Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontal` | `'start' \| 'center' \| 'end' \| 'fill'` | `fill` | Placement along the horizontal axis. |
| `vertical` | `'start' \| 'center' \| 'end' \| 'fill'` | `fill` | Placement along the vertical axis. |
| `marginX` | `number` | `0` | px from the left/right edges. |
| `marginY` | `number` | `0` | px from the top/bottom edges. |
| `style` | `ViewStyle` | — | Container style (merged after the defaults). |

`start` / `end` put the content against that edge (at its own size), `center` centers it at its own size, `fill` stretches it across the axis. Margins always apply, so `fill` with a margin leaves an inset.

```tsx
// bottom-right corner, 20 px from both edges
<Static horizontal="end" vertical="end" marginX={20} marginY={20}><Button label="+" /></Static>
// whole container (the defaults)
<Static><Card title="Fills everything" /></Static>
```

### Stack — `/stack`
Layers its children, each next one over the previous, every one taking the whole container. The **first child sets the container's size** (unless `style` gives one); later children are laid over it and let touches through empty areas. Props: `style`, `children`.

```tsx
<Stack style={{ height: 200 }}>
  <Image uri="https://picsum.photos/400/200" />
  <Static horizontal="end" vertical="start" marginX={8} marginY={8}><Badge label="NEW" /></Static>
</Stack>
```
