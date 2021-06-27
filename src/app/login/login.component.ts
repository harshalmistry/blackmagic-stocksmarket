import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  isError: boolean = false;
  msg: string = '';
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.reset();
  }

  onCancel(event: any) {
    event.preventDefault();
    this.reset();
  }

  private reset() {
    this.resetErrorMsg();
    this.user.email = '';
    this.user.password = '';
  }

  private resetErrorMsg() {
    this.msg = '';
    this.isError = false;
  }

  onSubmit() {
    this.resetErrorMsg();
    if (this.validate()) {
      this.userService.authenticate(this.user).subscribe(
        (data) => {
          if (data !== -1) {
            this.isError = false;
            this.userService.setLoggedInUserId(data);
            this.router.navigate(['/stocks']);
          } else {
            this.isError = true;
            this.msg = 'Invalid Email or Password';
          }
        },
        (error) => {
          this.isError = true;
          let response = error.error;
          if (
            error.message.search('Unknown Error') > -1 ||
            ((response.status == 404 || response.status == 500) &&
              response.errors === undefined)
          ) {
            this.msg = 'Temporary service unavailable';
          } else if (
            response.errors[0] == 'Password must be 8 characters long' &&
            response.status == 400
          ) {
            this.msg = 'Invalid Email or Password';
          } else {
            this.msg = response.errors[0];
          }
        }
      );
    } else {
      this.isError = true;
    }
  }

  validate() {
    let isValid = true;
    if (this.user.email === '') {
      this.msg = 'Email ';
      isValid = false;
    }
    if (this.user.password === '') {
      this.msg += 'Password ';
      isValid = false;
    }
    if (!isValid) this.msg += ' requried';
    return isValid;
  }
}
