import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(){
    if (this.form.invalid) {
      return;
    }

    const user: User = {
       email: this.form.value.email,
       password: this.form.value.password
    };

    console.log(user);
    alert(user.email + ' ' + user.password);
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get emailIsInvalid(){
    return this.email.invalid && (this.email.touched || this.email.dirty);
  }

  get emailIsEmpty(){
    return this.email.errors.required;
  }

  get emailIsNotFormatted(){
    return this.email.errors.email;
  }

  get passwordIsInvalid(){
    return this.password.invalid && (this.password.touched || this.password.dirty);
  }

  get passwordIsEmpty(){
    return this.password.errors.required;
  }

  get passwordIsTooShort(){
    return this.password.errors.minlength;
  }

  get minPassLength(){
    return this.password.errors.minlength.requiredLength;
  }
}
