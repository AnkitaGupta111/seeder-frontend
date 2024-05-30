import { Component } from '@angular/core';
import { HomeTemplateComponent } from '../../templates/home-template/home-template.component';

@Component({
  selector: 'app-cash-accleration',
  standalone: true,
  imports: [HomeTemplateComponent],
  templateUrl: './cash-accleration.component.html',
  styleUrl: './cash-accleration.component.css'
})
export class CashAcclerationComponent {

  heading: string = "Cash acclerations"
  subheading: string = "Place to create new cash kicks to run your business"


}
