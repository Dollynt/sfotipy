import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  show: boolean = false;
  isLogged: boolean = false;

  constructor(private loginService: LoginService) { }

  showProfile(event?: boolean): void {
    this.show = !this.show;
    if ((typeof event !== 'undefined')) this.show = event;
  }

  ngOnInit(): void {
    this.loginService.getLoginStatus().subscribe(newStatus => {
      this.isLogged = newStatus;
    });
  }
}
