import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWrapperComponent } from './home-wrapper.component';

const routes: Routes = [{ path: '', component: HomeWrapperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWrapperRoutingModule {}
