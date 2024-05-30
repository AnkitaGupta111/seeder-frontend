import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { getTotal } from '../../helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-quick-access-card',
  standalone: true,
  imports: [SharedModule, MatButtonModule, CommonModule],
  templateUrl: './home-quick-access-card.component.html',
  styleUrl: './home-quick-access-card.component.css'
})
export class HomeQuickAccessCardComponent implements OnInit {

  constructor(private router: Router, private contractService: ContractService) {

  }

  totalCashAdvance = 0

  ngOnInit(): void {
    this.contractService.contracts.subscribe((contracts) => {
      this.totalCashAdvance = getTotal(contracts, "totalAmount", { name: 'status', value: "AVAILABLE" })
    })
  }

  onLaunchNewCashkickClick = () => {
    this.router.navigate(["/cashkick/new"])
  }
}
