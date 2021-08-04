import { createReducer, on } from "@ngrx/store";
import { Movie } from "src/app/model/movie";
import { loadItems, loadSelectedItem, errorItem } from "./MovieActions";

export interface State {
  [x: string]: any;
  movies: { items: Movie[], selected?: Movie, error: any };
}

export const initialState: State = {
  movies: { items: [], selected: new Movie(), error: '' }
};

export const MovieReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(loadSelectedItem, (state, action) => ({
    ...state,
    selected: action.selected
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error
  })),
);

// Selectors.
export const selectItems = (state: State) => state.movie.items;
export const selectOneItem = (state: State) => Object.assign({}, state.movie.selected);
export const selectError = (state: State) => state.movie.error?.error;
