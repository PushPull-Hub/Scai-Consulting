import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import '@angular/compiler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentictionModule } from './components/auth-wrapper/authentication.module';
import { HomeWrapperModule } from './components/home-wrapper/home-wrapper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AuthentictionModule,
    HomeWrapperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
