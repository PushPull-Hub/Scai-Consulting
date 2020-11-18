import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'social-network-app';
  ngOnInit(): void {
    console.log(
      '  _    _                                   \n' +
        ' | |  | |                                   \n' +
        ' | |__| |   __ _   _ __ ___    ____   __ _  \n' +
        " |  __  |  / _` | | '_ ` _ \\  |_  /  / _`  |\n" +
        ' | |  | | | (_| | | | | | | |  / /  | (_| | \n' +
        ' |_|  |_|  \\__,_| |_| |_| |_| /___|  \\__,_ |'
    );
  }
}
