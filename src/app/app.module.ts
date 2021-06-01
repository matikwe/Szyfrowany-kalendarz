import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecordsService } from './records.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { EventsService } from './events.service';
import { EventsdeleteService } from './eventsdelete.service';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ReactiveFormsModule } from '@angular/forms';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    CalendarComponent,
    LoginComponent,
    AdminComponent,
    LogoutComponent,
    NavbarComponent,
    RegisterComponent,
  ],
  imports: [
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    RouterModule.forRoot([
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
      //dodac
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
    EventsService,
    EventsdeleteService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
