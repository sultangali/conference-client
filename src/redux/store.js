import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from './../utils/axios.js';

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

// Асинхронный экшен для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронный экшен для логина пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("🔹 Отправка запроса на логин:", credentials);
      const response = await axios.post('/api/user/auth/login', credentials);
      console.log("✅ Ответ сервера:", response.data);
      return response.data;
    } catch (error) {
      console.log("❌ Ошибка логина:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);


// Асинхронный экшен для загрузки профиля пользователя
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/me'); // ✅ ПРАВИЛЬНЫЙ URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки профиля");
    }
  }
);


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/api/user/me');
  return data;
});

// Экшен для загрузки списка участников
export const fetchParticipants = createAsyncThunk(
  "user/fetchParticipants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/participants");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Пользователь: управление авторизацией и профилем
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false, // Статус авторизации
    role: null, // Роль пользователя: 'correspondent', 'coauthor', 'moderator'
    profile: {}, // Данные профиля пользователя
    data: null,
    participants: [],
    verified: false, // Флаг верификации
    loading: false,
    message: '',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false; // Выход пользователя
      state.role = null;
      state.profile = {};
    },
    verifyUser: (state) => {
      state.verified = true; // Устанавливаем верификацию
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
        state.profile = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
        state.profile = action.payload;
        state.message = action.payload; //это я добавил тут я хочу в случае чего возвращать ответы от сервера 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload;
        state.profile = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Асинхронный экшен для генерации логинов и паролей соавторов на сервере
export const generateCoauthorCredentials = createAsyncThunk(
  'conference/generateCoauthorCredentials',
  async (authors) => {
    const response = await axios.post('/api/generate-coauthors', { authors });
    return response.data; // Сервер вернет массив логинов и паролей
  }
);

// Асинхронный экшен для получения списка статей
export const fetchPapers = createAsyncThunk(
  'conference/fetchPapers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/papers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Асинхронный экшен для модераторов (принятие/отклонение статьи)
export const updatePaperStatus = createAsyncThunk(
  'conference/updatePaperStatus',
  async ({ paperId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/papers/${paperId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Конференция: управление этапами и статьями
const conferenceSlice = createSlice({
  name: 'conference',
  initialState: {
    steps: {
      problemSubmissionOpen: true, // Этап подачи задач открыт до 1 марта 2025
      problemSolvingOpen: false, // Этап решения проблем откроется после 1 марта 2025
      discussionOpen: false, // Дискуссии и презентации с 18-19 июня 2025
    },
    papers: [], // Список статей
    loading: false,
    error: null,
  },
  reducers: {
    setStep: (state, action) => {
      state.steps = { ...state.steps, ...action.payload }; // Обновляем этап конференции
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCoauthorCredentials.fulfilled, (state, action) => {
        const { paperId, coauthors } = action.payload;
        const paper = state.papers.find((p) => p.id === paperId);
        if (paper) {
          paper.coauthors = coauthors;
        }
      })
      .addCase(fetchPapers.fulfilled, (state, action) => {
        state.papers = action.payload;
      })
      .addCase(updatePaperStatus.fulfilled, (state, action) => {
        const { paperId, status } = action.payload;
        const paper = state.papers.find((p) => p.id === paperId);
        if (paper) {
          paper.status = status;
        }
      });
  },
});


export const fetchProblems = createAsyncThunk(
  "articles/fetchProblems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/articles/problems");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSolveArticle = createAsyncThunk(
  "article/createSolve",
  async (articleData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/articles/solve", articleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    problems: [],
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSolveArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSolveArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createSolveArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Конфигурация Redux Store
const store = configureStore({
  reducer: {
    localization: localizationSlice.reducer, // Локализация
    user: userSlice.reducer, // Пользовательские данные
    conference: conferenceSlice.reducer, // Данные конференции
    article: articleSlice.reducer
  },
});

// Экспорт действий для использования в компонентах
export const { setLanguage } = localizationSlice.actions;
export const { logout, verifyUser } = userSlice.actions;

export const selectIsAuth = (state) => {
  console.log("🔹 Проверка isAuthenticated:", state.user.isAuthenticated);
  return state.user.isAuthenticated
};

export const { setStep } = conferenceSlice.actions;
export default store;
