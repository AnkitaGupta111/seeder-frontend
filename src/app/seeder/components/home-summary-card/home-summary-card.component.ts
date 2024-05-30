import { Component } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { getTotal } from '../../helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-summary-card.component.html',
  styleUrl: './home-summary-card.component.css'
})
export class HomeSummaryCardComponent {

  constructor(private contractService: ContractService) {

  }

  totalCashAdvance = 0

  ngOnInit(): void {
    this.contractService.contracts.subscribe((contracts) => {
      this.totalCashAdvance = getTotal(contracts, "totalAmount", { name: 'status', value: "AVAILABLE" })
    })
  }
}
