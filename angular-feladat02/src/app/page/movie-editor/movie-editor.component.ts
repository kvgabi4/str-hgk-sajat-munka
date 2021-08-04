import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { getOneItem } from 'src/app/store/movie/MovieActions';
import { selectOneItem } from 'src/app/store/movie/MovieReducers';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {

  movie$: Observable<Movie> = new Observable();
  movieID: number = 0;
  serverError = '';

  constructor(
    private movieService: MovieService,
    private ar: ActivatedRoute,
    private store: Store<any>,

  ) { }

  ngOnInit(): void {
    this.movieID = parseInt(this.ar.snapshot.params.id, 10);
    this.store.dispatch( getOneItem({id: this.movieID}) );
    this.movie$ = this.store.pipe( select(selectOneItem) );

  }

  goBackward(): void {
  //   const movie: Movie = ({ ...ngForm.value, id: this.movieID });
  //   this.store.dispatch(updateItem({ item: movie }));
    history.back();
  }

}
