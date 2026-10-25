import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Karaoke';
  logoDon = 'assets/images/don.png?v=' + Date.now();
}
