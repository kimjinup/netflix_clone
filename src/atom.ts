import { atom } from "jotai";

interface IClickedMovieState {
  clickedCategory: string | null;
  clickedMovie: IMovie | null;
}
interface IClickedTvShowState {
  clickedCategory: string | null;
  clickedTvShow: ITvShow | null;
}
export const clickedMovieState = atom<IClickedMovieState>({
  clickedCategory: null,
  clickedMovie: null,
});
export const clickedTvShowState = atom<IClickedTvShowState>({
  clickedCategory: null,
  clickedTvShow: null,
});
