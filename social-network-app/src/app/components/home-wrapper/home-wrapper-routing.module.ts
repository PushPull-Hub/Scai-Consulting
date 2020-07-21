import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', redirectTo: 'profile/:username/:id', pathMatch: 'full' },
  {
    path: 'profile/:username/:id',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'friends/:username/:id', component: FriendsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWrapperRoutingModule {}
