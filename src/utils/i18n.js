import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Watch movies online',
      popular: 'Popular',
      filters: {
        year: "Year",
        genres: "Genres",
        countries: "Countries",
        sort: {
          name: "Sort By",
          popularity: "Most Popular",
          revenue: "Budget",
          primary_release: "Newest",
          vote_average: "Average rating",
          vote_count: "Number of ratings"
        },
        filterButton: "Filter"
      }
    },
  },
  ru: {
    translation: {
      title: 'Смотреть фильмы онлайн',
      popular: 'Популярные',
      filters: {
        year: "Год",
        genres: "Жанры",
        countries: "Страны",
        sort: {
          name: "Сортировать по",
          popularity: "Самые популярные", 
          revenue: "Бюджет", 
          primary_release: "Самые новые", 
          vote_average: "Средняя оценка", 
          vote_count: "Кол-во оценок"
        },
        filterButton: "Фильтр"
      }
    },
  },
  et: {
    translation: {
      title: 'Vaadata filme online',
      popular: 'Populaarne',
      filters: {
        year: "Aasta",
        genres: "Žanrid",
        countries: "Riigid",
        sort: {
          name: "Sort",
          popularity: "Kõige populaarsem",
          revenue: "Eelarve",
          primary_release: "Uusim",
          vote_average: "Keskmine hinnang",
          vote_count: "Hinnangute arv"
        },
        filterButton: "Filter"
      }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;