import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

import { ArtListComponent } from './rest/art-list/art-list.component';
import { ArtDetailsComponent } from './rest/art-details/art-details.component';
import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home.component';
import { PresentArtListComponent } from './search/present-art-list/present-art-list.component';
import { PresentArtDetailsComponent } from './search/present-art-details/present-art-details.component';
import { RestComponent } from './rest/rest.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './_services';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtDetailsComponent,
    ArtListComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    RestComponent,
    PresentArtListComponent,
    PresentArtDetailsComponent,
    ProfileComponent,
    PaymentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
