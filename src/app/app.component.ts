import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/http/auth.service';
import { UserService } from './seeder/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.autoLogin()
    this.userService.getUser()
  }
}
