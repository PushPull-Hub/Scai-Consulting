import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgbdTypeaheadHttp } from './search-location/search-location.component';
import { FriendsFinder } from './search-friends/search-friends.component';

@NgModule({
  declarations: [NavbarComponent, NgbdTypeaheadHttp, FriendsFinder],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    NavbarComponent,
    FormsModule,
    NgbModule,
    RouterModule,
    NgbModule,
    NgbdTypeaheadHttp,
    FriendsFinder,
  ],
})
export class SharedModule {}
