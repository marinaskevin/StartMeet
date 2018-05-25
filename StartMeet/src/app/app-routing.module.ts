import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './location/location.component';
import { NewLocationComponent } from './new-location/new-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

import { PartnershipsComponent } from './partnerships/partnerships.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { NewPartnershipComponent } from './new-partnership/new-partnership.component';
import { EditPartnershipComponent } from './edit-partnership/edit-partnership.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'map', component: MapComponent },
  { path: 'map/:id', component: MapComponent },
  { path: 'login', component: LoginComponent },

  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: NewUserComponent },
  { path: 'users/:id', component: UserComponent, pathMatch: 'full' },
  { path: 'users/:id/edit', component: EditUserComponent },

  { path: 'events', component: EventsComponent },
  { path: 'events/new', component: NewEventComponent },
  { path: 'events/:id', component: EventComponent, pathMatch: 'full' },
  { path: 'events/:id/edit', component: EditEventComponent },

  { path: 'locations', component: LocationsComponent },
  { path: 'locations/new', component: NewLocationComponent },
  { path: 'locations/:id', component: LocationComponent, pathMatch: 'full' },
  { path: 'locations/:id/edit', component: EditLocationComponent },

  { path: 'partnerships', component: PartnershipsComponent },
  { path: 'partnerships/new', component: NewPartnershipComponent },
  { path: 'partnerships/:id', component: PartnershipComponent, pathMatch: 'full' },
  { path: 'partnerships/:id/edit', component: EditPartnershipComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
