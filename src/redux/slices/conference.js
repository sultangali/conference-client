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
    },
    reducers: {
      submitPaper: (state, action) => {
        state.papers.push(action.payload); // Добавляем новую статью в список
      },
      setStep: (state, action) => {
        state.steps = { ...state.steps, ...action.payload }; // Обновляем этап конференции
      },
    },
  });