// configurationReducer.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Configuration {
  ringColor: string;
  diamondColor: string;
}

interface ConfigurationState {
  currentConfig: Configuration;
  savedConfigurations: Configuration[];
}

const initialState: ConfigurationState = {
  currentConfig: {
    ringColor: '#FFD700',
    diamondColor: '#B1A296',
  },
  savedConfigurations: [],
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
    saveConfiguration(state) {
      state.savedConfigurations.push({ ...state.currentConfig });
    },
  },
});

export const { setRingColor, setDiamondColor, saveConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;
