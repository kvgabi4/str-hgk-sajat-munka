import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './page/editor/editor.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  // },
  {
    path: 'editor/:id',
    component: EditorComponent,
  },
  // {
  //   path: 'forbidden',
  //   component: ForbiddenComponent,
  // },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
