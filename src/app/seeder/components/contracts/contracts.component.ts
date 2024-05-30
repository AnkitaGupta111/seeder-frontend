import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent implements OnInit {

  constructor(private contractService: ContractService) {

  }

  dataSource = []
  isLoading = false
  cols = [{ def: "name", name: "Name" }, { def: "status", name: "Status" }, { def: "type", name: "Type" }, { def: "perPayment", name: "Per Payment" }, { def: "totalFinanced", name: "Total Financed" }, { def: "totalAmount", name: "Total Amount" }, { name: "Term Length", def: "termLength" }]

  ngOnInit(): void {
    this.isLoading = true;


    this.contractService.contracts.subscribe((contracts) => {
      if (contracts) {
        this.dataSource = contracts
        this.isLoading = false
      }
    })
  }

}
