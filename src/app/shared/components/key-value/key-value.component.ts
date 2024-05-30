import { Component, Input } from '@angular/core';
import { GridContainerDirective } from '../../directives/gridContainer.directive';

@Component({
  selector: 'app-key-value',
  standalone: true,
  imports: [GridContainerDirective],
  templateUrl: './key-value.component.html',
  styleUrl: './key-value.component.css'
})
export class KeyValueComponent {

  @Input() key = ""
  @Input() value = ""
  @Input() matClassKey = "mat-body-1"
  @Input() matClassValue = "mat-body-1"

}
