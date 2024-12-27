import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.accountService.isLoggedIn())
      this.router.navigateByUrl('/');

    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }


  login() {
    if (!this.loginForm.valid) return;

    const model = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    // console.log(model);
    this.accountService.login(model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members')
        this.model = {};
      }, // () or _ for
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
