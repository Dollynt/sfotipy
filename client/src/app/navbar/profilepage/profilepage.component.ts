import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login.service';
import { UserService } from 'src/app/user.service';
import { User } from '../../../../../common/user';

@Component({

	selector: 'app-profilepage',
	templateUrl: './profilepage.component.html',
	styleUrls: ['./profilepage.component.scss']
})
export class ProfilepageComponent {
	userId: number = 0;
	user: User = new User;
	isLogged: boolean = false;
	currentUser: any;

	@Output() logOutEvent = new EventEmitter<boolean>();

	constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

	logOut() {
		localStorage.removeItem('currentUser');
		this.loginService.updateLoginStatus(false);
		this.logOutEvent.emit(false);
		this.router.navigate(['/login']);
	}

	ngOnInit(): void {
		this.loginService.getLoginStatus().subscribe(newStatus => {
			this.isLogged = newStatus;
		});

		const currentUserString = localStorage.getItem('currentUser');
		if (currentUserString !== null) {
			this.currentUser = JSON.parse(currentUserString);
			// fazer algo com o currentUser
		}

		if (this.currentUser && this.currentUser.token) {
			// Busca o userId a partir do currentUser do localStorage
			this.userService.setUserId(this.currentUser.id);
			this.userId = this.currentUser.id;
		} else {
			// Busca o userId pelo UserService
			this.userService.getUserId().subscribe(id => {
				this.userId = id;
			});
		}

		this.userService.getUserById(this.userId).subscribe(
			as => { this.user = as; },
			msg => { alert(msg.message); }
		)
	}
}
