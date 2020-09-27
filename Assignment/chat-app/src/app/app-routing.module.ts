import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component'
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiHttpInterceptor } from './api-http.interceptor';

const routes: Routes = [

  {path: 'chat', component: ChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'admin', component: AdminPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
