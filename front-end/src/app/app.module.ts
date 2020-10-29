import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentictionModule } from './components/auth-wrapper/authentication.module';
import { HomeWrapperModule } from './components/home-wrapper/home-wrapper.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthentictionModule,
    HomeWrapperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
