import { Component } from '@angular/core';
import { HomeTemplateComponent } from '../../templates/home-template/home-template.component';
import { getGreeting } from '../../helper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentDate: Date = new Date();
  heading: string = ""
  subheading: string = ""


  ngOnInit(): void {

    const text = getGreeting(this.currentDate)
    this.heading = `${text} !`
    this.subheading = this.getFormattedDate()

  }

  getFormattedDate(): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(this.currentDate);
  }

}
