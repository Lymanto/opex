import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { environment } from 'src/environments/environment';
import { Flowbite } from './lib/flowbite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Flowbite()
export class AppComponent implements OnInit {
  title = 'opex-gmf';
  ngOnInit(): void {
    initFlowbite();
    if (environment.production) {
      console.log('We are running in production mode');
      console.log(`API Key: ${environment.apiKey}`);
    } else {
      console.log('We are running in development mode');
      console.log(`API Key: ${environment.apiKey}`);
    }
  }
}
