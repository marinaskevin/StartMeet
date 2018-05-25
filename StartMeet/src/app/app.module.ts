import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, ApplicationRef } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

@NgModule({
	declarations: [

		AppComponent,

		HomeComponent,
		ChatComponent,
		MapComponent,
		LoginComponent,

		UsersComponent,
		UserComponent,
		NewUserComponent,
		EditUserComponent,

		EventsComponent,
		EventComponent,
		NewEventComponent,
		EditEventComponent,

		LocationsComponent,
		LocationComponent,
		NewLocationComponent,
		EditLocationComponent,

		PartnershipsComponent,
		PartnershipComponent,
		NewPartnershipComponent,
		EditPartnershipComponent,

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAto1Cj0vMbVJcSFQmtIMS9uSpnTzQCqW8',
			libraries: ["places"]
		}),
		ReactiveFormsModule
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})
export class AppModule { }
