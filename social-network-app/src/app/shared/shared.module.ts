import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbdTypeaheadHttp } from './location-finder/location-finder.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavbarComponent, NgbdTypeaheadHttp],
  imports: [CommonModule, HttpClientModule],
  exports: [NavbarComponent, NgbdTypeaheadHttp],
})
export class SharedModule {}
