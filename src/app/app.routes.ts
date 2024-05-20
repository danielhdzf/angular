import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactionTimeComponent } from './games/reaction-time/reaction-time.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'reaction-time', component: ReactionTimeComponent},
    { path: '**', redirectTo: ''}
];
