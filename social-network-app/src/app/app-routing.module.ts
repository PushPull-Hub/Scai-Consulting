import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./components/auth-wrapper/authentication.module').then(
        (m) => m.AuthentictionModule
      ),
  },
  {
    path: 'home',
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
