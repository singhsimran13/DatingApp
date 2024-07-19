import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountsService: AccountService) {
    this.accountsService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
  }

  ngOnInit(): void {
    if (this.user.roles.some(r => this.appHasRole.includes(r)))
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    else
      this.viewContainerRef.clear();

  }

}
