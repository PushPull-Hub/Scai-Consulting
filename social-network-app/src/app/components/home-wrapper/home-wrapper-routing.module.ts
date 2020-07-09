import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWrapperComponent } from './home-wrapper.component';
import { HomePageComponent } from './home-page/home.component';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWrapperRoutingModule {}
