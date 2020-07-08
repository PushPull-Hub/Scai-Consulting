import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
// [
//   { path: '', component: AboutComponent },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./shared/modules/authentiction.module').then(
//         (m) => m.AuthentictionModule
//       ),
//   },
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./shared/modules/homepage.module').then((m) => m.HomepageModule),
//   },
//   {
//     path: 'profile',
//     loadChildren: () =>
//       import('./shared/modules/profile.module').then((m) => m.ProfileModule),
//     // canActivate: [AuthGuard],
//   },
//   {
//     path: 'auth-wrapper',
//     loadChildren: () =>
//       import('./components/auth-wrapper/authentication.module').then(
//         (m) => m.AuthWrapperModule
//       ),
//   },
//   {
//     path: 'home-wrapper',
//     loadChildren: () =>
//       import('./components/home-wrapper/home-wrapper.module').then(
//         (m) => m.HomeWrapperModule
//       ),
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
