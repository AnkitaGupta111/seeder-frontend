import { Component, Input } from '@angular/core';
import { GridContainerDirective } from '../../directives/gridContainer.directive';

@Component({
  selector: 'app-summary-tile',
  standalone: true,
  imports: [GridContainerDirective],
  templateUrl: './summary-tile.component.html',
  styleUrl: './summary-tile.component.css'
})
export class SummaryTileComponent {

  @Input() imgSrc = ""
  @Input() title = ""
  @Input() value = ""
}
