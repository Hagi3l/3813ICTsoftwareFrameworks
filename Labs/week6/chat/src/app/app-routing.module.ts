import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatInterfaceComponent } from './chat-interface/chat-interface.component'

const routes: Routes = [

  {path: '', component: ChatInterfaceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
