import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home.component';
// import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: 'homepage/?username/?id', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
