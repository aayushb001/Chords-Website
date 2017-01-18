import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { SecurityComponent } from './security/security.component';
import { DmcaComponent } from './dmca/dmca.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuestComponent,
    SecurityComponent,
    DmcaComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'guest',
        component: GuestComponent
      },
      {
        path: '',
        component: LoginComponent
      }
      ,
      {
        path: 'security',
        component: SecurityComponent
      },
      {
        path: 'dmca',
        component: DmcaComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
