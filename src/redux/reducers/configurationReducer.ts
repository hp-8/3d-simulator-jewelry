import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Configuration } from '../../types';

interface ConfigurationState {
  currentConfig: Configuration;
  savedConfigurations: Configuration[];
}

const DEFAULT_CONFIG: Configuration = {
  ringColor: '#FFD700',
  diamondColor: '#B1A296',
};

const SAVED_KEY = 'jewelry:savedConfigurations';

const isHexColor = (value: string | null): value is string =>
  !!value && /^#?[0-9a-fA-F]{6}$/.test(value);

const normalizeHex = (value: string) => (value.startsWith('#') ? value : `#${value}`);

// Hydrate the active config from a shared URL (?metal=FFD700&stone=B1A296).
const configFromUrl = (): Configuration | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const metal = params.get('metal');
  const stone = params.get('stone');
  if (isHexColor(metal) && isHexColor(stone)) {
    return { ringColor: normalizeHex(metal), diamondColor: normalizeHex(stone) };
  }
  return null;
};

const loadSaved = (): Configuration[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as Configuration[]) : [];
  } catch {
    return [];
  }
};

const persistSaved = (configs: Configuration[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(configs));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
};

const initialState: ConfigurationState = {
  currentConfig: configFromUrl() ?? DEFAULT_CONFIG,
  savedConfigurations: loadSaved(),
};

const configurationSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    setRingColor(state, action: PayloadAction<string>) {
      state.currentConfig.ringColor = action.payload;
    },
    setDiamondColor(state, action: PayloadAction<string>) {
      state.currentConfig.diamondColor = action.payload;
    },
    applyConfiguration(state, action: PayloadAction<Configuration>) {
      state.currentConfig = { ...action.payload };
    },
    saveConfiguration(state) {
      const exists = state.savedConfigurations.some(
        (c) =>
          c.ringColor === state.currentConfig.ringColor &&
          c.diamondColor === state.currentConfig.diamondColor
      );
      if (!exists) {
        state.savedConfigurations.push({ ...state.currentConfig });
        persistSaved(state.savedConfigurations);
      }
    },
    removeConfiguration(state, action: PayloadAction<number>) {
      state.savedConfigurations.splice(action.payload, 1);
      persistSaved(state.savedConfigurations);
    },
  },
});

export const {
  setRingColor,
  setDiamondColor,
  applyConfiguration,
  saveConfiguration,
  removeConfiguration,
} = configurationSlice.actions;

export default configurationSlice.reducer;
