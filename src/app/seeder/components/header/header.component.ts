import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../shared/services/http/auth.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [SharedModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  initials: string = "";
  @Input() heading: string = ""
  @Input() subheading: string = ""
  userServiceSubscription?: Subscription

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.loggedInUser.subscribe((user: any) => {

      // Get the first letter of the name and convert it to uppercase
      this.initials = user?.name?.charAt(0).toUpperCase();
    })
  }

  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe()
  }

  onLogout() {
    this.auth.logout()
  }
}
