import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  isShownLogIn: boolean = true;
  isShownSigUp: boolean = false;
  isChangePwd: boolean = false;
  username: string;
  logInFrom: FormGroup;
  signUpFrom: FormGroup;
  constructor(
    private authService: AuthService
    // private userService: UserService
  ) { }

  ngOnInit() {
    this.logInFrom = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.signUpFrom = new FormGroup({
      emailS: new FormControl(null, [Validators.required, Validators.email]),
      passwordS: new FormControl(null, [Validators.required]),
    });
  }

  togglesignup() {
    this.isShownSigUp = true;
    this.isShownLogIn = false;
  }

  togglelogin() {
    this.isShownSigUp = false;
    this.isShownLogIn = true;
  }

  logIn() {
    this.submitted = true;
    console.log(this.logInFrom.valid)
    if (this.logInFrom.valid) {
      const email = this.logInFrom.value.email
      const password = this.logInFrom.value.password
      console.log(email, password)
      this.authService.login(email, password)
    }

  }

  signUp() {
    this.submitted = true;
    if (this.signUpFrom.valid) {
      const email = this.signUpFrom.value.emailS
      const password = this.signUpFrom.value.passwordS
      console.log(email, password)
      this.authService.createUser(email, password)
    }

    // this.authService.createUser(this.signUpFrom.value.email, this.signUpFrom.value.password)
  }
  get email() {
    return this.logInFrom.get("email");
  }
  get password() {
    return this.logInFrom.get("password");
  }
  get emailS() {
    return this.signUpFrom.get("emailS");
  }
  get passwordS() {
    return this.signUpFrom.get("passwordS");
  }

}
