import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.scss'],
})
export class UsernavComponent implements OnInit {
  @Input() navIconClicked: boolean;
  loading: boolean;
  constructor() {}

  ngOnInit(): void {
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.navIconClicked.currentValue) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 900);
    }
  }
}
