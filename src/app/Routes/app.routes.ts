import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from '../Components/login/login.component';
import { SigninComponent } from '../Components/signin/signin.component';
import { HomeComponent } from '../Components/home/home.component';

const routes: Routes = [
	{ path: '', component: SigninComponent },
	{ path: 'sign-in', component: SigninComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: '**', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
