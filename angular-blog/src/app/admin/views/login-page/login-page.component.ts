import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { LoginRequest } from 'src/app/core/login-request';
import { AuthService } from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UserToken } from 'src/app/core/user-token';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public errorMsg: string;
  public isWaiting: boolean;
  public message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.errorMsg = '';
    this.authService.error$.subscribe(
      error => this.errorMsg = error
    );
    this.isWaiting = false;
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Enter login credentials';
      } else if (params.authFailed){
        this.message = 'Session is expired. Enter credentials again';
      }

    });
  }

  public submit(){
    if (this.form.invalid) {
      return;
    }
    const request: LoginRequest = {
       email: this.form.value.email,
       password: this.form.value.password
    };
    this.isWaiting = true;
    this.authService.login(request).subscribe(
      (user: UserToken) => {
        console.log('Login component got user', user);
        this.isWaiting = false;
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
      },
      (error: any) => {
        // console.log('Login component got error', error);
        this.isWaiting = false;
      }
    );
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
