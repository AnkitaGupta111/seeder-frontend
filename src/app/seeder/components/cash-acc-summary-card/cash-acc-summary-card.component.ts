import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ContractService } from '../../services/contract.service';
import { getMax, getTotal } from '../../helper';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cash-acc-summary-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cash-acc-summary-card.component.html',
  styleUrl: './cash-acc-summary-card.component.css'
})
export class CashAccSummaryCardComponent {

  constructor(private contractService: ContractService, private currencyPipe: CurrencyPipe) { }

  termLength: string = ""
  availableCredit: string = ""
  interestRate: string = ""

  get termLengthString() {
    return this.termLength + " months"
  }

  get interestRateString() {
    return this.interestRate + "%"
  }

  get availableCreditString() {
    return this.currencyPipe.transform(this.availableCredit) ?? ""
  }

  ngOnInit(): void {

    this.contractService.contracts.subscribe((contracts) => {
      if (contracts) {
        this.availableCredit = getTotal(contracts, "totalAmount", { name: 'status', value: "AVAILABLE" })
        this.interestRate = getMax(contracts, "termRate", { name: 'status', value: "AVAILABLE" })
        this.termLength = getMax(contracts, "termLength", { name: 'status', value: "AVAILABLE" })
      }
    })
  }

}
