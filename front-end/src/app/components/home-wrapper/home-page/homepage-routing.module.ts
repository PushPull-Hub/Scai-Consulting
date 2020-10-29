import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home.component';
import { ProfileComponent } from '../../home-wrapper/profile/profile.component';

const routes: Routes = [
  { path: 'homepage/?username/?id', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
