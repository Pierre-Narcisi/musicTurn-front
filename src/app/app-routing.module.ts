import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountComponent } from './components/account/account.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthGuard } from './guards/auth.guard'
import { SecureInnerPageGuardGuard } from './guards/secure-inner-page-guard.guard'

const routes: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPageGuardGuard] },
    { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPageGuardGuard] },
    { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPageGuardGuard] },
    { path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPageGuardGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
