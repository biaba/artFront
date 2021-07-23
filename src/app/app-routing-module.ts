import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtListComponent, ArtDetailsComponent } from '@app/rest';
import { HomeComponent } from '@app/home.component';
import { LoginComponent } from '@app/login';
import { PresentArtDetailsComponent, PresentArtListComponent, SearchComponent } from '@app/search';
import { RestComponent } from '@app/rest';
import { RegisterComponent } from './register';
import { ProfileComponent } from '@app/profile';
import { ProfileResolverService } from './_services/profile-resolver.service';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artDetails', component: ArtDetailsComponent },
  { path: 'artList', component: ArtListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'presentArtDetails', component: PresentArtDetailsComponent },
  { path: 'presentArtList', component: PresentArtListComponent },
  { path: 'artistProfile', component: ProfileComponent, resolve: { images: ProfileResolverService } },
  { path: 'profile', component: ProfileComponent, resolve: { images: ProfileResolverService } },
  { path: 'register', component: RegisterComponent },
  { path: 'rest', component: RestComponent },
  { path: 'search', component: SearchComponent },

  // otherwise redirect to search
  { path: '**', redirectTo: '' }

  // when using AuthGuard { path: '', component: SearchComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
