import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../interfaces/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any;
    constructor(
        public afAuth: AngularFireAuth,
        public router: Router,
        public db: AngularFireDatabase
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    SignUp(email, password) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                this.SendVerificationEmail();
                this.setUserData(result.user);
            }
            ).catch(error => {
                window.alert(error.message);
            })
    }

    SendVerificationEmail() {
        return this.afAuth.currentUser.then(u => {
            u.sendEmailVerification()
        })
            .then(() => {
                this.router.navigate(['verify-email-address']);
            })
    }

    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(result => {
                this.router.navigate(['home']);
            }).catch(error => {
                window.alert(error.message);
            })
    }

    setUserData(user) {
        let UserRef = this.db.database.ref('users/' + user.uid);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified
        };
        UserRef.set(userData);
    }

    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider);
    }

    ForgotPassword(email) {
        return this.afAuth.sendPasswordResetEmail(email)
            .then(result => {
                window.alert('Reset password email sent.')
            }).catch(error => {
                window.alert(error.message);
            });
    }

    get isLoggedIn() {
        let user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified) ? true : false;
    }

    AuthLogin(provider) {
        this.afAuth.signInWithPopup(provider)
            .then(result => {
                this.setUserData(result.user);
                this.router.navigate(['home']);
            }).catch(error => {
                window.alert(error.message);
            });
    }

    SignOut() {
        return this.afAuth.signOut()
            .then(result => {
                localStorage.removeItem('user');
                this.router.navigate(['sign-in'])
            })
    }
}
