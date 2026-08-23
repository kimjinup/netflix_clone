export const makeImagePath = (id: string, format?: string) => {
  const photoPath = `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  return photoPath;
};
