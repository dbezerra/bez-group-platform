import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { BezLeadsComponent } from './components/bez-leads/bez-leads.component';
import { BezCoinsComponent } from './components/bez-coins/bez-coins.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'member-profile', component: MemberProfileComponent },
  { path: 'bez-leads', component: BezLeadsComponent },
  { path: 'bez-coins', component: BezCoinsComponent },
  { path: '**', redirectTo: '/login' }
];
