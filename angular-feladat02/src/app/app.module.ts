import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { EditorComponent } from './page/editor/editor.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { AdminComponent } from './page/admin/admin.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffect } from './store/movie/MovieEffects';
import { MovieReducer } from './store/movie/MovieReducers';
import { MovieEditorComponent } from './page/movie-editor/movie-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    EditorComponent,
    ForbiddenComponent,
    AdminComponent,
    MovieEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ movie: MovieReducer }),
    EffectsModule.forRoot([ MovieEffect ]),

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
