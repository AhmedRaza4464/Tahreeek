import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { DataComponent } from './Components/data/data.component';
import { CandidateComponent } from './Components/candidate/candidate.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  {path: 'aboutus', component:AboutusComponent},
  { path: 'data', component: DataComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'candidate', component:CandidateComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect root path to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
