import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { MessengerRoutingModule } from '../messenger/messenger-routing.module';

import { MessengerNavComponent } from './messenger-wrapper/messenger-nav/messenger-nav.component';
import { MessagesHandlerComponent } from './messenger-wrapper/messages-handler/messages-handler.component';

@NgModule({
  declarations: [MessengerNavComponent, MessagesHandlerComponent],
  imports: [CommonModule, SharedModule, MessengerRoutingModule],
})
export class MessengerModule {}
