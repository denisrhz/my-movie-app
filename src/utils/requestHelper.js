export const baseUrl = 'https://api.themoviedb.org/3';

export const posterPath = (moviePath) => {
  return 'https://image.tmdb.org/t/p/w500/' + moviePath
}

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGNiOTBlYmY3ZDE5NmRkNWQyMjRmMzg4MWM4M2JjZCIsIm5iZiI6MTcxOTExNzQ5Ny40MjYxMywic3ViIjoiNjRjZDk3MDk1NDlkZGEwMTFjMjczZmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O4s8B-89ba9zJjFyLy1lEI-I9cG8zsoPJABkZ4LpxcM'
    }
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
