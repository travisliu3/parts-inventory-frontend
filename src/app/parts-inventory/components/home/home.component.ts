import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserName().subscribe((name: string) => {
      this.userName = name;
    });
  }
}
