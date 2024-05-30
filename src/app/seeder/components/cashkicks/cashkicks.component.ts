import { Component } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { CashkickService } from '../../services/cashkick.service';
import { SharedModule } from '../../../shared/shared.module';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cashkicks',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cashkicks.component.html',
  styleUrl: './cashkicks.component.css'
})
export class CashkicksComponent {

  isLoading = false;

  constructor(private contractService: ContractService, private cashkickService: CashkickService, private location: Location, private router: Router, private route: ActivatedRoute) {

  }

  dataSource = []
  cols = [{ def: "name", name: "Name" }, { def: "status", name: "Status" }, { def: "totalFinanced", name: "Total Financed" }, { def: "totalAmount", name: "Total Received" }]

  ngOnInit(): void {
    this.isLoading = true

    this.cashkickService.getCashKicks().subscribe({
      next: (cashkicks) => { this.isLoading = false; this.dataSource = cashkicks },
      error: (err) => {
        this.isLoading = false
        throw err
      }
    })

    const state: any = this.location.getState()
    if (state?.refetchContracts) {
      this.contractService.getContracts().subscribe(() => {})
      this.router.navigate([], {
        relativeTo: this.route,
        state: {}
      });
    }

  }

}
