import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { NgfComponent } from './ngf/ngf.component';
import { RecordsService } from './records.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { PlansComponent } from './plans/plans.component';
import { CustomEventTitleFormatterService } from './custom-event-title-formatter.service';
import { CustomDateFormatterService } from './custom-date-formatter.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NgfComponent,
    HomeComponent,
    DataComponent,
    LoginComponent,
    AdminComponent,
    LogoutComponent,
    NavbarComponent,
    RegisterComponent,
    PlansComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'plans',
        component: PlansComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [
    RecordsService,
    AuthService,
    AuthGuard,
    UserService,
    CustomEventTitleFormatterService,
    CustomDateFormatterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
