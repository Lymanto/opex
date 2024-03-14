import { Component, Input } from '@angular/core';
import { Flowbite } from 'src/app/lib/flowbite';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
@Flowbite()
export class LayoutComponent {
  @Input() currentUrl: string = '';
  @Input() currentUrlSubMenu: string = '';
}
