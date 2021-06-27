import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css'],
})
export class SignupformComponent implements OnInit {
  singupUser: User = new User();
  msg: string = '';
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.reset();
  }

  onCancel(event: any): void {
    event.preventDefault();
    this.reset();
  }

  private reset() {
    this.msg = '';
    this.singupUser.email = '';
    this.singupUser.password = '';
    this.singupUser.dob = '';
  }

  private resetErrorMsg() {
    this.msg = '';
  }

  onSubmit() {
    this.resetErrorMsg();
    if (this.validate()) {
      this.userService.register(this.singupUser).subscribe(
        (data) => {
          this.msg = 'Registration successful!';
        },
        (error) => {
          let response = error.error;
          if (
            error.message.search('Unknown Error') > -1 ||
            (response != undefined &&
              (response.status == 404 || response.status == 500) &&
              response.errors === undefined)
          ) {
            this.msg = 'Temporary service unavailable';
          } else if (response === null && error.status == 400) {
            this.msg = 'Error while registration, invalid data';
          } else {
            this.msg = response.errors[0];
          }
        }
      );
    }
  }

  validate() {
    let isValid = true;
    if (this.singupUser.email === '') {
      this.msg = 'Email ';
      isValid = false;
    }
    this.singupUser.password = this.singupUser.password?.trim();
    if (this.singupUser.password === '') {
      this.msg += 'Password ';
      isValid = false;
    }
    if (this.singupUser.dob === '') {
      this.msg += 'DateOfBirth ';
      isValid = false;
    }

    if (!isValid) this.msg += ' requried';
    if (
      this.singupUser.password !== '' &&
      this.singupUser.password!.length < 8
    ) {
      this.msg += ' Password must be 8 characters long';
      isValid = false;
    }
    return isValid;
  }
}
