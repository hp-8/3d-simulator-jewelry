// Ring style registry — plain data, no three.js deps so the redux store can import it.
export const RING_STYLES = [
  { id: 'classic', name: 'Classic' },
  { id: 'solitaire', name: 'Solitaire' },
  { id: 'pave', name: 'Pavé' },
  { id: 'twisted', name: 'Twisted' },
  { id: 'halo', name: 'Halo' },
  { id: 'eternity', name: 'Eternity' },
] as const;

export type RingStyleId = (typeof RING_STYLES)[number]['id'];

export const RING_STYLE_IDS = RING_STYLES.map((s) => s.id) as RingStyleId[];

export const DEFAULT_RING_STYLE: RingStyleId = 'classic';

export const isRingStyle = (value: string | null): value is RingStyleId =>
  !!value && (RING_STYLE_IDS as string[]).includes(value);

export const styleName = (id: string): string =>
  RING_STYLES.find((s) => s.id === id)?.name ?? 'Classic';
