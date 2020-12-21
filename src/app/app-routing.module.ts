import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AdEditorComponent } from './layout/ad-editor/ad-editor.component';
import { AuthGuard } from './auth/auth.guards';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ad-builder',
    component: AdEditorComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
