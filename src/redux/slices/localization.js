import { configureStore, createSlice } from '@reduxjs/toolkit';

// Локализация: управление языковыми настройками
const localizationSlice = createSlice({
  name: 'localization',
  initialState: { language: 'ru' }, // По умолчанию русский язык
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload; // Устанавливаем выбранный язык
    },
  },
});

export const { setLanguage } = localizationSlice.actions;