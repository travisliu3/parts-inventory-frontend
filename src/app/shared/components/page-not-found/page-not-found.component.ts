import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  loading: boolean;
  displayedName: string;
  buttonText: string;

  constructor(private router: Router) {
    this.loading = true;
    this.displayedName = '';
    this.buttonText = '';
  }

  ngOnInit() {
    this.loading = true;
    this.displayedName = '';
    this.buttonText = '';

    this.getUserType();
  }

  getUserType(): void {
    const userInfo = {};
    this.buttonText = 'Return to application';
    this.loading = false;
  }

  redirect(): void {
    this.router.navigateByUrl('/');
  }
}
