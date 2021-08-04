import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { MovieService } from 'src/app/service/movie.service';
import { getItems, getOneItem, LOAD_ITEMS, ERROR_ITEM, LOAD_SELECTED_ITEM } from './MovieActions';
import { switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable()
export class MovieEffect {

  loadItems$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getItems),
      switchMap( () => this.movieService.get() ),
      switchMap( movies => of({ type: LOAD_ITEMS, items: movies })),
      catchError( error => of({ type: ERROR_ITEM, error })),
    );
  });

  getOneItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(getOneItem),
      switchMap( action => this.movieService.get(action.id) ),
      switchMap( movie => of({ type: LOAD_SELECTED_ITEM, selected: movie })),
      catchError( error => of({ type: ERROR_ITEM, message: error })),
    );
  });

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
  ) { }

}
