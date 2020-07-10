import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWrapperComponent } from './home-wrapper.component';
import { HomePageComponent } from './home-page/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: ' ', redirectTo: 'home/:username/:id', pathMatch: 'full' },
  { path: 'home/:username/:id', component: HomePageComponent },
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
