import { Component, Input, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { COMPONENT_MAP } from '../../components.map';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [MatCard, NgComponentOutlet, MatButtonModule, SharedModule],
  templateUrl: './home-template.component.html',
  styleUrl: './home-template.component.css'
})
export class HomeTemplateComponent implements OnInit {
  headerNode: any;
  headerContent = { heading: '', subheading: "" }

  @Input() summaryCardContentNode: any;
  @Input() quickAccessCardContentNode: any;
  @Input() mainCardContentNode: any;

  @Input() heading: string = ""
  @Input() subheading: string = ""


  ngOnInit(): void {
    this.headerNode = HeaderComponent
    this.headerContent = { heading: this.heading, subheading: this.subheading }

    this.summaryCardContentNode = COMPONENT_MAP[this.summaryCardContentNode]
    this.quickAccessCardContentNode = COMPONENT_MAP[this.quickAccessCardContentNode]
    this.mainCardContentNode = COMPONENT_MAP[this.mainCardContentNode]
  }
}
