import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';
import { Constants } from '../helpers/constants';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private presenceService: PresenceService,
    private helperService: HelperService) { }

  isLoggedIn = (): boolean => {
    return !!this.helperService.retrieve(Constants.AUTH_TOKEN);
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    this.helperService.store(Constants.AUTH_TOKEN, user);
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  logout() {
    this.helperService.remove(Constants.AUTH_TOKEN);
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
