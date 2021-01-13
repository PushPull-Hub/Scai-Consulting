import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  constructor() {}
  male_avatar_photo_url: string;
  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }
}
