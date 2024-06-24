import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Watch movies online',
      popular: 'Popular',
      search: 'Search',
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
        filterButton: "Filter",
      },
      movie_Details: {
        originalName: "Original name",
        duration: "Duration",
        genres: "Genres",
        date: "Release Date",
        countries: "Countries",
        companies: "Companies"
      }
    },
  },
  ru: {
    translation: {
      title: 'Смотреть фильмы онлайн',
      popular: 'Популярные',
      search: 'Поиск',
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
      },
      movie_Details: {
        originalName: "Оригинальное название",
        duration: "Продолжительность",
        genres: "Жанры",
        date: "Дата выхода",
        countries: "Страны",
        companies: "Компании"
      }
    },
  },
  et: {
    translation: {
      title: 'Vaadata filme online',
      popular: 'Populaarne',
      search: 'Otsi',
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
        filterButton: "Filter",
      },
      movie_Details: {
        originalName: "Esialgne nimi",
        duration: "Kestus",
        genres: "Žanrid",
        date: "Väljaandmise kuupäev",
        countries: "Riigid",
        companies: "Firmad"
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
