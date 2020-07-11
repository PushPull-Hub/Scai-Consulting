import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  // { path: ' ', redirectTo: 'home/:username/:id', pathMatch: 'full' },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', redirectTo: 'profile/:username/:id', pathMatch: 'full' },
  {
    path: 'profile/:username/:id',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWrapperRoutingModule {}
