import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UnAuthGuard } from './auth/un-auth.guard';
import { CanLoadHomePageGuard } from './guards/can-load-home-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    canActivate: [UnAuthGuard],
    loadChildren: () =>
      import('./components/auth-wrapper/authentication.module').then(
        (m) => m.AuthentictionModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    // canLoad: [CanLoadHomePageGuard],
    loadChildren: () =>
      import('./components/home-wrapper/home-wrapper.module').then(
        (m) => m.HomeWrapperModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
