// validationSchema.js
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    lastname: Yup.string().required('Тегіңізді жазыңыз'),
    firstname: Yup.string().required('Атыңызды жазыңыз'),
    patronymic: Yup.string(),
    phone: Yup.string().required('Телефон нөміріңізді жазыңыз'),
    workplace: Yup.string().required('Жұмыс орнын жазыңыз'),
    job_title: Yup.string().required('Қызметіңізді жазыңыз'),
    rank: Yup.string().required('Дәрежеңізді таңдаңыз'),
    scientific_title: Yup.string().required('Выберите ученое звание'),
    article: Yup.string().required('Мақала атауын жазыңыз'),
    section: Yup.string().required('Секцияны таңдаңыз'),
    participation_type: Yup.string().required('Қатысу түрін таңдаңыз'),
    email: Yup.string().email('Invalid email').required('Поштаңызды жазыңыз'),
    password: Yup.string().required('Құпиясөзді жазыңыз')
  });
