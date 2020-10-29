import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerWrapperComponent } from './messenger-wrapper/messenger-wrapper.component';

const routes: Routes = [{ path: '', component: MessengerWrapperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessengerRoutingModule {}
