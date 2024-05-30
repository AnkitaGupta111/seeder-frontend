import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cash-acc-main-card',
  standalone: true,
  imports: [SharedModule, MatButtonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cash-acc-main-card.component.html',
  styleUrl: './cash-acc-main-card.component.css'
})
export class CashAccMainCardComponent{

}
