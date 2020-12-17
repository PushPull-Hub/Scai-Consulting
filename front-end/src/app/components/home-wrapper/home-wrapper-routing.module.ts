import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home.component';
import { FriendsComponent } from './friends/friends.component';
import { MyFriendsComponent } from './friends/my-friends/my-friends.component';
import { PendingRequestsComponent } from './friends/pending-requests/pending-requests.component';
import { BlockedComponent } from './friends/blocked/blocked.component';
import { SuggestionsComponent } from './friends/suggestions/suggestions.component';
import { RequestsComponent } from './friends/requests/requests.component';
import { SettingsComponent } from './home-page/usernav/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', redirectTo: 'profile/:username/:id', pathMatch: 'full' },
  {
    path: 'profile/:username/:id',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'relations', redirectTo: '/relation-ships/friends' },
  {
    path: 'relation-ships',
    component: FriendsComponent,
    children: [
      { path: 'friends', component: MyFriendsComponent },
      { path: 'pending-requests', component: PendingRequestsComponent },
      { path: 'block-list', component: BlockedComponent },
      { path: 'search', component: SuggestionsComponent },
      { path: 'requests', component: RequestsComponent },
    ],
  },
  {
    path: 'messenger',
    loadChildren: () =>
      import('./messenger/messenger.module').then((m) => m.MessengerModule),
  },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWrapperRoutingModule {}
