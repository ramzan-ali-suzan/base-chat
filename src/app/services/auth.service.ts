import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { 
    this.user = afAuth.authState;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(resolve => {
      const status = 'online';
      this.setUserStatus(email, status);
      this.router.navigate(['chat']);
    })
  }

  signUp(email: string, password: string, displayName: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.authState = result.user;
      const status = 'online';
      this.setUserData(email, displayName, status);
    }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email, 
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  setUserStatus(status: string): void{
    const path = `user/${this.currentUserId}`;
    const data = {
      status: status
    };
    
  }
}
