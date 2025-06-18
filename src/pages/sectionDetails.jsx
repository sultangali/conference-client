import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Table, Form, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Download } from "react-bootstrap-icons";
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const SectionDetails = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const sections = {
    1: {
      id: 1,
      title: `${t('main.view4.card.2')}, ${t('main.view4.card.1')}`,
      secretary: "Жантасова Ботагоз Бекетовна",
      phone: "+7 702 245 90 99",
      description: "Данная секция посвящена обсуждению современных проблем в области математики и их применению в естественных науках. Рассматриваются вопросы математического моделирования в физике, химии и биологии.",
      topics: [
        "Дифференциальные уравнения и их применение",
        "Численные методы в математическом моделировании",
        "Статистические методы в естественных науках",
        "Теория вероятностей и случайные процессы",
        "Математические модели в биофизике"
      ],
      authors: [
        {
          name: "Фазылова Лейла Сабитовна",
          src: "1-1.pdf"
        },
        {
          name: "Байшагиров Х.Ж.",
          src: "1-2.pdf"
        },
        {
          name: "Ермаганбетова С.К.", 
          src: "1-3.pdf"
        },
        {
          name: "Рахмонов Фарход Дустмуродович",
          src: "1-4.pdf"
        },
        {
          name: "Утебаев Даулетбай",
          src: "1-5.pdf"
        },{
          name: "Ярлашов Ринат",
          src: "1-6.pdf"
        },{
          name: "Шпади Ю.Р.",
          src: "1-7.pdf"
        },{
          name: "Абек А.Н.",
          src: "1-8.pdf"
        },{
          name: "Gogatishvili A.",
          src: "1-9.pdf"
        },{
          name: "Бокаев Нуржан Адилханович",
          src: "1-10.pdf"
        },{
          name: "Unver T.",
          src: "1-11.pdf"
        },{
          name: "Андрющенко Юлия Александровна",
          src: "1-12.pdf"
        },{
          name: "Бекайдаров Муминбек",
          src: "1-13.pdf"
        },{
          name: "Калимбетов Бурхан",
          src: "1-14.pdf"
        },{
          name: "Жайдакбаева Динара",
          src: "1-15.pdf"
        },{
          name: "Кузеубаева Н.",
          src: "1-16.pdf"
        },{
          name: "Канкужин Б.Е.",
          src: "1-17.pdf"
        },{
          name: "Артыкбаева Ж.Н.",
          src: "1-18.pdf"
        },{
          name: "Каршигина Г.",
          src: "1-19.pdf"
        },{
          name: "Матин Д.Т.",
          src: "1-20.pdf"
        },{
          name: "Ахажанов Т.Б.",
          src: "1-21.pdf"
        },{
          name: "Сейлбеков Болат Нагашбекович",
          src: "1-22.pdf"
        },{
          name: "Иманбетова Аселхан Бостандыковна",
          src: "1-23.pdf"
        },{
          name: "Тасмамбетов Ж.Н.",
          src: "1-24.pdf"
        },{
          name: "Убаева Ж.К.",
          src: "1-25.pdf"
        },{
          name: "Төлеген Бектас Қуанышұлы",
          src: "1-26.pdf"
        },{
          name: "Токмагамбетов Нариман Сарсенович",
          src: "1-27.pdf"
        },{
          name: "Ешкеев Айбат Рафхатович",
          src: "1-28.pdf"
        },{
          name: "Яруллина Алина Рашидовна",
          src: "1-29.pdf"
        },{
          name: "Касыметова Майра Техниковна",
          src: "1-30.pdf"
        },{
          name: "Тунгушбаева Индира Оразбековна",
          src: "1-31.pdf"
        },{
          name: "Жангабергенова Назерке Салменқызы",
          src: "1-32.pdf"
        },{
          name: "Манарбек Мақпал",
          src: "1-33.pdf"
        },{
          name: "Жантасова Ботагоз Бекетовна",
          src: "1-34.pdf"
        },{
          name: "Токмагамбетова Теңгеш Дүйсенбайқызы",
          src: "1-35.pdf"
        },{
          name: "Айсагалиев С.А.",
          src: "1-36.pdf"
        },{
          name: "Асан Н.А.",
          src: "1-37.pdf"
        },{
          name: "Сегизбай А.М.",
          src: "1-38.pdf"
        },{
          name: "Нұрсәуле Ахтай",
          src: "1-39.pdf"
        },{
          name: "Байкен Жұлдыз Саматқызы",
          src: "1-40.pdf"
        },{
          name: "Бейсебаева А.Ж.",
          src: "1-41.pdf"
        },{
          name: "Бестай А.Ε.",
          src: "1-42.pdf"
        },{
          name: "Алдибекова Мая Смагуловна",
          src: "1-43.pdf"
        },{
          name: "Бибулова Дана",
          src: "1-44.pdf"
        },{
          name: "Калимбетов Бурхан",
          src: "1-45.pdf"
        },{
          name: "Туреханов Касымхан",
          src: "1-46.pdf"
        },{
          name: "Бименов М.А.",
          src: "1-47.pdf"
        },{
          name: "Садыбеков М.А.",
          src: "1-48.pdf"
        },{
          name: "Дженалиев М.Т.",
          src: "1-49.pdf"
        },{
          name: "Ергалиев М.Г.",
          src: "1-50.pdf"
        },{
          name: "Иманбердиева К.Б.",
          src: "1-51.pdf"
        },{
          name: "Серик А.М.",
          src: "1-52.pdf"
        },{
          name: "Ергалиев М.Г.",
          src: "1-53.pdf"
        },{
          name: "Аманбеков Султан Мырзабекович",
          src: "1-54.pdf"
        },{
          name: "Мусина Н.М.",
          src: "1-55.pdf"
        },{
          name: "Жумабекова Г.Е.",
          src: "1-56.pdf"
        },{
          name: "Кошекова А.К.",
          src: "1-57.pdf"
        },{
          name: "Иманбетова А.Б.",
          src: "1-58.pdf"
        },{
          name: "Ижанова Камила",
          src: "1-59.pdf"
        },{
          name: "Космакова Минзиля Тимербаевна",
          src: "1-60.pdf"
        },{
          name: "Канкенова А.М.",
          src: "1-61.pdf"
        },{
          name: "Нурсултанов Е.Д.",
          src: "1-62.pdf"
        },{
          name: "Кангужин Б.Е.",
          src: "1-63.pdf"
        },{
          name: "Кайырбек Ж.",
          src: "1-64.pdf"
        },{
          name: "Кошанов Б.Д.",
          src: "1-65.pdf"
        },{
          name: "Сматова Г.Д.",
          src: "1-66.pdf"
        },{
          name: "Шыныбаева Н.М.",
          src: "1-67.pdf"
        },{
          name: "Күзенбай Айгерім Жарылқасынқызы",
          src: "1-68.pdf"
        },{
          name: "Мерзетхан А.",
          src: "1-69.pdf"
        },{
          name: "Оспанов М.Н.",
          src: "1-70.pdf"
        },{
          name: "Молдағали Е.Ө.",
          src: "1-71.pdf"
        },{
          name: "Оспанов Қ.Н.",
          src: "1-72.pdf"
        },{
          name: "Нарбекова Н.М.",
          src: "1-73.pdf"
        },{
          name: "Ойнаров Рысқұл",
          src: "1-74.pdf"
        },{
          name: "Омаров М.Т.",
          src: "1-75.pdf"
        },{
          name: "Рамазанов Мурат Ибраевич",
          src: "1-76.pdf"
        },{
          name: "Танин Алибек Орланович",
          src: "1-77.pdf"
        },{
          name: "Копбалина Салтанат Сериковна",
          src: "1-78.pdf"
        },{
          name: "Орумбаева Нургул Тумарбековна",
          src: "1-79.pdf"
        },{
          name: "Отелбаев М.О.",
          src: "1-80.pdf"
        },{
          name: "Кошанов Бакытбек",
          src: "1-81.pdf"
        },{
          name: "Манат Алуа Манатқызы",
          src: "1-82.pdf"
        },{
          name: "Псху А.В.",
          src: "1-83.pdf"
        },{
          name: "Сарсенби Абдижахан",
          src: "1-84.pdf"
        },{
          name: "Сарсенби Абдисалам",
          src: "1-85.pdf"
        },{
          name: "Туленбаев Канат Сауранбаевич",
          src: "1-86.pdf"
        },{
          name: "Жадыранова Асем Амирбековна",
          src: "1-87.pdf"
        }
      ]
    },
    2: {
      id: 2,
      title: `${t('main.view4.card.3')}, ${t('main.view4.card.4')}`,
      secretary: "Копбалина Салтанат Сериковна",
      phone: "+7 702 479 41 81",
      description: "Секция охватывает современные достижения в области искусственного интеллекта, машинного обучения и их применение в робототехнике и прикладной механике.",
      topics: [
        "Глубокое обучение и нейронные сети",
        "Компьютерное зрение и обработка изображений",
        "Автономные роботизированные системы",
        "Интеллектуальные алгоритмы управления",
        "Биомеханика и робототехника"
      ],  
      authors: [
        {
          name: "Хабидолда Омирхан",
          src: "2-1.pdf"
        },{
          name: "Ахмедиев С.К.",
          src: "2-2.pdf"
        },{
          name: "Рысбек С.С.",
          src: "2-3.pdf"
        },{
          name: "Әбілғазы Ж.Ғ.",
          src: "2-4.pdf"
        },{
          name: "Қайыров Р.А.",
          src: "2-5.pdf"
        },{
          name: "Кайыров Рустем Айбекович",
          src: "2-6.pdf"
        },{
          name: "Исагулов Дастан Картаевич",
          src: "2-7.pdf"
        },{
          name: "Исламшайх Ернұр Ержанұлы",
          src: "2-8.pdf"
        },{
          name: "Советов Серик Кайратович",
          src: "2-9.pdf"
        },{
          name: "Ахажанов Сунгат Беркинович",
          src: "2-10.pdf"
        },{
          name: "Қуатова Ақерке Қанатқызы",
          src: "2-11.pdf"
        },{
          name: "Турсынбай Әбілмансур Муратұлы",
          src: "2-12.pdf"
        },{
          name: "Шамгулова Сая Бериковна",
          src: "2-13.pdf"
        },{
          name: "Туребаева Айнур Ержановна",
          src: "2-14.pdf"
        },{
          name: "Ахметова А.Ж.",
          src: "2-15.pdf"
        },{
          name: "Каменова Шынар Кайкеновна",
          src: "2-16.pdf"
        },{
          name: "Алиева Динара Галымжановна",
          src: "2-17.pdf"
        },{
          name: "Фомин Виталий Николаевич",
          src: "2-18.pdf"
        },{
          name: "Тайболдина Қаламқас Радылхановна",
          src: "2-19.pdf"
        },{
          name: "Оспанова Динара Манаповна",
          src: "2-20.pdf"
        },{
          name: "Асқар Шырайлым Ұланқызы",
          src: "2-21.pdf"
        },{
          name: "Смирнова Марина Александровна",
          src: "2-22.pdf"
        },{
          name: "Муталова Луиза Улугбековна",
          src: "2-23.pdf"
        },{
          name: "Васильева Гера Викторовна",
          src: "2-24.pdf"
        },{
          name: "Колебер Камила Леонидовна",
          src: "2-25.pdf"
        },{
          name: "Серғалиева А.А.",
          src: "2-26.pdf"
        },{
          name: "Жумаханова Д.А.",
          src: "2-27.pdf"
        },{
          name: "Сланбекова Асылзат Ермановна",
          src: "2-28.pdf"
        },{
          name: "Сайлаубаев Султан Шакмаранович",
          src: "2-29.pdf"
        },{
          name: "Жумагалиев Сұлтанғали Қайсарұлы",
          src: "2-30.pdf"
        },{
          name: "Жанабергенова Назерке Салменкызы",
          src: "2-31.pdf"
        },{
          name: "Манарбек Макпал",
          src: "2-32.pdf"
        },{
          name: "Кәмен Е.Ғ.",
          src: "2-33.pdf"
        },{
          name: "Мейрамбеков А.К.",
          src: "2-34.pdf"
        },{
          name: "Каримкулова Н.А.",
          src: "2-35.pdf"
        },{
          name: "Жұмашева А.С.",
          src: "2-36.pdf"
        },{
          name: "Қамит А.Қ.",
          src: "2-37.pdf"
        },{
          name: "Игизбаева Асемгуль Кашарбековна",
          src: "2-38.pdf"
        },{
          name: "Аменова Александра Владимировна",
          src: "2-39.pdf"
        },{
          name: "Горбунова Надежда Александровна",
          src: "2-40.pdf"
        },{
          name: "Фрицлер Никита Юрьевич",
          src: "2-41.pdf"
        },{
          name: "Пардабеков Азим Маратович",
          src: "2-42.pdf"
        },{
          name: "Әлдібаева Тұрағалды Әбіләкімқызы",
          src: "2-43.pdf"
        },{
          name: "Кенжебаева Майра Өтенқызы",
          src: "2-44.pdf"
        },{
          name: "Амангелді Ернұр",
          src: "2-45.pdf"
        },{
          name: "Алдибекова М.С.",
          src: "2-46.pdf"
        },{
          name: "Искакова Г.Ш.",
          src: "2-47.pdf"
        },{
          name: "Шаукенова К.С.",
          src: "2-48.pdf"
        },{
          name: "Турсынгалиева Г.Н.",
          src: "2-49.pdf"
        },{
          name: "Адикенова Айгуль Науканбаевна",
          src: "2-51.pdf"
        },{
          name: "Исаева Айгуль Койшыбаевна",
          src: "2-52.pdf"
        },{
          name: "Попова Надежда Викторовна",
          src: "2-53.pdf"
        },{
          name: "Панкин У.",
          src: "2-54.pdf"
        },{
          name: "Кауымбек Индира Сейтбеккызы",
          src: "2-55.pdf"
        },{
          name: "Төлегенқызы Д.",
          src: "2-56.pdf"
        },{
          name: "Казимова Динара Ашубасаровна",
          src: "2-57.pdf"
        },{
          name: "Спирина Елена Александровна",
          src: "2-58.pdf"
        },{
          name: "Турмуратова Динара Армиевна",
          src: "2-59.pdf"
        },{
          name: "Кулпыбаева А.",
          src: "2-60.pdf"
        },{
          name: "Рахимов К.О.",
          src: "2-61.pdf"
        },{
          name: "Муханбеткалиева А.",
          src: "2-62.pdf"
        },{
          name: "Кутжан С.Д.",
          src: "2-63.pdf"
        },{
          name: "Кельдибекова Алия Болатовна",
          src: "2-64.pdf"
        },{
          name: "Нурмашова Мейрамкуль Оразалыкызы",
            src: "2-65.pdf"
        },{
          name: "Самойлова Ирина Алексеевна",
          src: "2-66.pdf"
        },{
          name: "Шульгина-Таракщук Алевтина Сергеевна",
          src: "2-67.pdf"
        },{
          name: "Смаилова Айжан Сагиндыковна",
          src: "2-68.pdf"
        }
      ]
    },
    3: {
      id: 3,
      title: `${t('main.view4.card.5')}, ${t('main.view4.card.6')}`,
      secretary: "Яруллина Алина Рашидовна",
      phone: "+7 775 782 52 19",
      description: "Секция рассматривает современные подходы к преподаванию естественнонаучных дисциплин и вопросы адекватного перевода научной терминологии.",
      topics: [
        "Инновационные методы преподавания естественных наук",
        "Цифровые технологии в образовании",
        "Терминологические проблемы в научном переводе",
        "Межкультурная коммуникация в науке",
        "Адаптация научных текстов для различных аудиторий"
      ],
      authors: [
        {
          name: "Дәкәрім Гүлдерай Қанатқызы",
          src: "3-1.pdf"
        },{
          name: "Датқабаева Мөлдір Асқарқызы",
          src: "3-2.pdf"
        },{
          name: "Елеусіз Маржан Ержанқызы",
          src: "3-3.pdf"
        },{
          name: "Хасанова Айдана Болатқызы",
          src: "3-4.pdf"
        },{
          name: "Абдуманапова Айдана",
          src: "3-5.pdf"
        },{
          name: "Ахманова Данна Маратовна",
          src: "3-6.pdf"
        },{
          name: "Орымбетов Самғат Аманкулович",
          src: "3-7.pdf"
        },{
          name: "Бейсенова Данагүл Рымбаевна",
          src: "3-8.pdf"
        },{
          name: "Сыздыкова Назым Косарбековна",
          src: "3-9.pdf"
        },{
          name: "Бердібек Мадинабану",
          src: "3-10.pdf"
        },{
          name: "Каденов Аділет Бағланұлы",
          src: "3-11.pdf"
        },{
          name: "Шаматаева Назгул Куанышовна",
          src: "3-12.pdf"
        },{
          name: "Қосыбаева Умитжан Амангелдіқызы",
          src: "3-13.pdf"
        },{
          name: "Исаева Айгуль Койшибаевна",
          src: "3-14.pdf"
        },{
          name: "Мурзабек Б.",
          src: "3-15.pdf"
        },{
          name: "Токмаханбет С.",
          src: "3-16.pdf"
        },{
          name: "Оразгалиева Меруерт Аршыновна",
          src: "3-17.pdf"
        },{
          name: "Нығметжанова Толкынай Кабжановна",
          src: "3-18.pdf"
        },{
          name: "Сейтимбетова Айгерим Байдуллаевна",
          src: "3-19.pdf"
        },{
          name: "Қауымбек Индира Сейтбекқызы",
          src: "3-20.pdf"
        },{
          name: "Сейдахмет Санжар",
          src: "3-21.pdf"
        },{
          name: "Есенбаева Гулсим Ахмадиевна",
          src: "3-22.pdf"
        },{
          name: "Есбаева Д.Н.",
          src: "3-23.pdf"
        },{
          name: "Алиева Динара Галымжановна",
          src: "3-24.pdf"
        },{
          name: "Ниханбаева Назима Тилешовна",
          src: "3-25.pdf"
        },{
          name: "Никамбаева Нургул Нуроллаевна",
          src: "3-26.pdf"
        },{
          name: "Хасенова Айгерим Асхатовна",
          src: "3-27.pdf"
        },{
          name: "Валиева Айман Галымжановна",
          src: "3-28.pdf"
        },{
          name: "Амангелді А.Ө.",
          src: "3-29.pdf"
        },{
          name: "Әбдіразақ Ф.Т.",
          src: "3-30.pdf"
        },{
          name: "Тағай А.Б.",
          src: "3-31.pdf"
        },{
          name: "Медеу А.А.",
          src: "3-32.pdf"
        },{
          name: "Ахметбекова Н.С.",
          src: "3-33.pdf"
        },{
          name: "Женисова Г.Н.",
          src: "3-34.pdf"
        },{
          name: "Анаркулова А.Т.",
          src: "3-35.pdf"
        },{
          name: "Батырова А.А.",
          src: "3-36.pdf"
        },{
          name: "Алпамыс Л.А.",
          src: "3-37.pdf"
        },{
          name: "Арыстанбек С.У.",
          src: "3-38.pdf"
        },{
          name: "Егинбай А.",
          src: "3-39.pdf"
        },{
          name: "Шаяхметова Б.К.",
          src: "3-40.pdf"
        },{
          name: "Алдибекова М.С.",
          src: "3-41.pdf"
        },{
          name: "Шаукенова К.С.",
          src: "3-42.pdf"
        },{
          name: "Жангалиева А.Т.",
          src: "3-43.pdf"
        },{
          name: "Сагитова Ш.Г.",
          src: "3-44.pdf"
        },{
          name: "Кудайбергенова Б.С.",
          src: "3-45.pdf"
        },{
          name: "Жумагулова Сауле Комеккызы",
          src: "3-46.pdf"
        },{
          name: "Шайкенова Айгерим Алихановна",
          src: "3-47.pdf"
        },{
          name: "Сарбозов Алмас Жомартұлы",
          src: "3-48.pdf"
        },{
          name: "Ракишева Нургуль Курсаковна",
          src: "3-49.pdf"
        },{
          name: "Секен Е.",
          src: "3-50.pdf"
        },{
          name: "Бейсен М.",
          src: "3-51.pdf"
        },{
          name: "Искакова Г.Ш.",
          src: "3-52.pdf"
        },{
          name: "Ахметбекова Н.С.",
          src: "3-53.pdf"
        },{
          name: "Казтаева Т.Е.",
          src: "3-54.pdf"
        },{
          name: "Жаскайратова А.А.",
          src: "3-55.pdf"
        },{
          name: "Бекзат А.П.",
          src: "3-56.pdf"
        },{
          name: "Оразбек А.Н.",
          src: "3-57.pdf"
        },{
          name: "Кутимов Қияс Сабирович",
          src: "3-58.pdf"
        },{
          name: "Тұрсын Шарапат Серікұлы",
          src: "3-59.pdf"
        },{
          name: "Сматай Бекболат Серікұлы",
          src: "3-60.pdf"
        },{
          name: "Қолдасбай А.А.",
          src: "3-61.pdf"
        },{
          name: "Нурпеисова Г.",
          src: "3-62.pdf"
        },{
          name: "Омаров М.Т.",
          src: "3-63.pdf"
        },{
          name: "Искакова Г.Ш.",
          src: "3-64.pdf"
        },{
          name: "Егинбай А.К.",
          src: "3-65.pdf"
        },{
          name: "Сейдалиев Бахт Жанболатович",
          src: "3-66.pdf"
        },{
          name: "Искаков Сагындык Абдрахманович",
          src: "3-67.pdf"
        },{
          name: "Толеуханова Раушан Жұмағазықызы",
          src: "3-68.pdf"
        },{
          name: "Малышева Инесса Сергеевна",
          src: "3-69.pdf"
        },{
          name: "Овсянникова Милана Муратовна",
          src: "3-70.pdf"
        },{
          name: "Шаукенова К.С.",
          src: "3-71.pdf"
        },{
          name: "Шаукенова К.С.",
          src: "3-72.pdf"
        },{
          name: "Алдибекова М.С.",
          src: "3-73.pdf"
        },{
          name: "Тулеутаева Ж.М.",
          src: "3-74.pdf"
        },{
          name: "Назарова М.Г.",
          src: "3-75.pdf"
        },{
          name: "Сеитова Фатима Закировна",
          src: "3-76.pdf"
        },{
          name: "Турсунбекова Д.Р.",
          src: "3-77.pdf"
        },{
          name: "Жуматаева А.С.",
          src: "3-78.pdf"
        }
      ]
    }
  };

  const section = sections[sectionId];

  if (!section) {
    return (
      <Container className="mt-5">
        <Row>
          <Col md={12} className="text-center">
            <h3>Секция не найдена</h3>
            <Button variant="primary" onClick={() => navigate('/certificates')}>
              Вернуться к секциям
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  // Фильтрация авторов по поисковому запросу
  const filteredAuthors = section.authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Функция для скачивания сертификата
  const handleDownloadCertificate = (authorSrc, authorName) => {
    // Open PDF in new tab
    window.open(`/${authorSrc}`, '_blank');
  };

  return (
    <Container
      fluid
      style={{
        paddingTop: '0px',
        paddingBottom: '8rem',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        background: `url(${largeTriangles2})`
      }}
    >
      <Container>
        <Row>
          <Col md={12}>
            <Card className="shadow-lg" style={{ marginTop: '120px', borderRadius: '1px'}}>
              <Card.Header 
                style={{ 
                  backgroundColor: '#2196F3', 
                  borderRadius: '1px',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <h4 className="mb-0">Секция {section.id}</h4>
              </Card.Header>
              
              <Card.Body>
                <h2 
                  className="mb-4"
                  style={{ 
                    color: '#1976d2',
                    lineHeight: '1.4',
                    textAlign: 'center'
                  }}
                >
                  {section.title}
                </h2>

                <Row>
                  <Col md={12}>
                    <div className=" d-flex justify-content-start">
                      <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/certificates')}
                        className="mb-3 crf-back-btn"
                        style={{ borderRadius: '1px' }}
                      >
                       {t('certificates.back')}
                      </Button>
                    </div>

                    {/* Поиск по авторам */}
                    <div className="mb-4">
                      <h5 style={{ color: '#2196F3', marginBottom: '20px' }}>
                        {t('certificates.section')} ({section.authors.length})
                      </h5>
                      
                      <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                        <InputGroup.Text style={{ borderRadius: '1px', backgroundColor: '#f8f9fa' }}>
                          <Search size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={t('certificates.search')}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ borderRadius: '1px' }}
                        />
                        {searchTerm && (
                          <Button
                            variant="outline-secondary"
                            onClick={() => setSearchTerm("")}
                            style={{ borderRadius: '1px' }}
                          >
                            ×
                          </Button>
                        )}
                      </InputGroup>
                      
                      {searchTerm && (
                        <small className="text-muted">
                          Найдено: {filteredAuthors.length} из {section.authors.length}
                        </small>
                      )}
                    </div>

                    {/* Таблица авторов */}
                    <div className="table-responsive">
                      <Table striped bordered hover style={{ borderRadius: '1px' }}>
                        <thead style={{ backgroundColor: '#2196F3', color: 'white' }}>
                          <tr>
                            <th style={{ width: '80px', textAlign: 'center' }}>№</th>
                            <th>{t('certificates.fio')}</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>{t('certificates.download')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAuthors.length > 0 ? (
                            filteredAuthors.map((author, index) => (
                              <tr key={index}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                  {section.authors.indexOf(author) + 1}
                                </td>
                                <td style={{ verticalAlign: 'middle' }}>
                                  <strong>{author.name}</strong>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleDownloadCertificate(author.src, author.name)}
                                    style={{ 
                                      borderRadius: '1px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '5px',
                                      margin: '0 auto'
                                    }}
                                  >
                                    <Download size={14} />
                                    {t('certificates.download')}
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                                {searchTerm 
                                  ? `Участники с именем "${searchTerm}" не найдены` 
                                  : "Участники не найдены"
                                }
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>

                    {/* Контактная информация секретаря */}
                    <div className="mt-4">
                      <Card 
                        style={{ 
                          border: '2px solid #e3f2fd',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '1px'
                        }}
                      >
                        <Card.Header 
                          style={{ 
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            textAlign: 'center',
                            borderRadius: '1px'
                          }}
                        >
                          <h6 className="mb-0">{t('certificates.contact')}</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="text-center">
                            <h6 style={{ color: '#2196F3' }}>{t('certificates.secretary1')}</h6>
                            <p className="mb-2">
                              <strong>{section.secretary}</strong>
                            </p>
                            {/* <p style={{ color: '#2196F3' }}>
                              <strong>{section.phone}</strong>
                            </p> */}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}; 