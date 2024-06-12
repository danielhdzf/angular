import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactionTimeComponent } from './games/reaction-time/reaction-time.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuard } from './guard/auth.guard.spec';
import { SimonComponent } from './games/simon/simon.component';
import { NumberSequenceComponent } from './games/number-sequence/number-sequence.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'reaction-time', component: ReactionTimeComponent, canActivate: [AuthGuard]},
    { path: 'simon', component: SimonComponent, canActivate: [AuthGuard]},
    { path: 'number-sequence', component: NumberSequenceComponent, canActivate: [AuthGuard]},
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: ''}
];
