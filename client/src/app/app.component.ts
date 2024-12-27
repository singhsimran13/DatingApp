import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { Constants } from './helpers/constants';
import { HelperService } from './_services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Heart Sync';
  users: any;

  constructor(
    private accountService: AccountService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = this.helperService.retrieve(Constants.AUTH_TOKEN);
    if (!userString) return;

    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user)
  }
}
