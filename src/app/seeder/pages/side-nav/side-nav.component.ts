import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatCardModule,
    RouterOutlet,
    SharedModule,
    RouterLink,
    RouterLinkActive,
    NgFor
  ]
})
export class SideNavComponent implements OnInit {

  constructor(private contractService: ContractService) {

  }
  ngOnInit(): void {
    this.contractService.getContracts().subscribe(() => { })
  }
  private breakpointObserver = inject(BreakpointObserver);

  navOptions = [{ icon: "assets/icons/home.png", link: "", title: "Home" }, { icon: "assets/icons/coin.png", link: "/cash-accleration", title: "Cash Accleration" }]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
