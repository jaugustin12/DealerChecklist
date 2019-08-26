import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/userService/user.service';

export function getUsers(userService: UserService) {
  return () => userService.getUsers();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    UserService,
    { provide: APP_INITIALIZER, useFactory: getUsers, deps: [UserService], multi: true },
  ]
})
export class AppLoadModule { }
