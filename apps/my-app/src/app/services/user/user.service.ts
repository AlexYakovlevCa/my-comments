import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { User } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LOGGED_USER_KEY: string = 'loggedInUser'

  constructor() { }
  
}
