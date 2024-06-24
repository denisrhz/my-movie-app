export const baseUrl = 'https://api.themoviedb.org/3';

export const posterPath = (path) => {
  return 'https://image.tmdb.org/t/p/w500/' + path
}

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGNiOTBlYmY3ZDE5NmRkNWQyMjRmMzg4MWM4M2JjZCIsIm5iZiI6MTcxOTExNzQ5Ny40MjYxMywic3ViIjoiNjRjZDk3MDk1NDlkZGEwMTFjMjczZmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O4s8B-89ba9zJjFyLy1lEI-I9cG8zsoPJABkZ4LpxcM'
    }
  };

export const initFilterParams = (t) => {
  return {
    genres: {
      name: t('filters.genres'),
      type: "checkbox",
      checked: [],
      elements: []
    },
    countries: {
      name: t('filters.countries'),
      type: "checkbox",
      checked: [],
      elements: []
    },
    primary_release_dates: {
      name: t('filters.year'),
      type: "radio",
      checked: [],
      elements: Array.from({ length: 24 }, (_, i) => ({
        name: `${2000 + i}`,
        value: { gte: `${2000 + i}-01-01`, lte: `${2000 + i}-12-31`}
      }))
    },
    sort_by: {
      name: t('filters.sort.name'),
      type: "radio",
      checked: [{ name: t('filters.sort.name'), value: "primary_release.desc" }],
      elements: [
        { name: t('filters.sort.popularity'), value: "popularity.desc" },
        { name: t('filters.sort.revenue'), value: "revenue.desc" },
        { name: t('filters.sort.primary_release'), value: "primary_release.desc" },
        { name: t('filters.sort.vote_average'), value: "vote_average.desc" },
        { name: t('filters.sort.vote_count'), value: "vote_count.desc" },
      ]
    },
  };
}

export const prepareParams = (filterParams, page, language) => {
  return {
    include_adult: 'false',
    include_video: 'false',
    language: language || 'en',
    page: page,
    sort_by: filterParams.sort_by.checked[0].value,
    with_origin_country: filterParams?.countries?.checked.join("|"),
    with_genres: filterParams?.genres?.checked.join("|"),
    ...(filterParams.primary_release_dates) && { 'primary_release_date.gte': filterParams.primary_release_dates?.checked[0]?.value?.gte },
    ...(filterParams.primary_release_dates) && { 'primary_release_date.lte': filterParams.primary_release_dates?.checked[0]?.value?.lte },
  };
};

export const generateUrl = (baseUrl, params) => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
};
