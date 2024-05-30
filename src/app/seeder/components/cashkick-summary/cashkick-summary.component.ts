import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cashkick-summary',
  standalone: true,
  imports: [SharedModule, MatDividerModule, MatButtonModule, MatSliderModule, CommonModule],
  templateUrl: './cashkick-summary.component.html',
  styleUrl: './cashkick-summary.component.css'
})
export class CashkickSummaryComponent {

  @Input() contractsSelected: any[] = []
  @Input() totalAvailableAmount = 0;
  @Input() isReview = false
  @Input() onButtonClick = (payload: any) => { }

  get termLength() {
    const length = this.contractsSelected.reduce((maxTermLength: number, contract: any) => {
      return maxTermLength < contract.termLength ? contract.termLength : maxTermLength
    }, 0)

    return `${length} months`
  }

  get selectedAmount() {
    return this.contractsSelected.reduce((total: number, contract: any) => {
      return total + contract.totalAmount
    }, 0)
  }

  get finacedAmount() {
    return this.contractsSelected.reduce((total: number, contract: any) => {
      return total + contract.totalFinanced
    }, 0)
  }

  get rateOfInterestAmount() {
    return this.finacedAmount - this.selectedAmount
  }

  get rate() {
    return (this.finacedAmount / this.selectedAmount) * 100
  }

  onClick = () => {
    this.onButtonClick({totalFinanced: this.finacedAmount, totalAmount: this.selectedAmount, contractIds: this.contractsSelected?.map((c) => c.id)})
  }

}