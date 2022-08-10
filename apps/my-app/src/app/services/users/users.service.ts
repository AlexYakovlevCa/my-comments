import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '../../models/interfaces'
import baseUsers from '../../../assets/user-data/users.json'
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private USERS_KEY: string = 'users'
  private LOGGED_USER_KEY: string = 'loggedInUser'

  constructor() { }

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

  private _loggedInUser$ = new Subject<User>()
  public loggedInUser$ = this._loggedInUser$.asObservable()


  get getLoggedInUser (){
    return this.loadLoggedInUserFromStorage()
  }   

  public loadLoggedInUser() {
    const user = this.loadLoggedInUserFromStorage()
    if (user) this._loggedInUser$.next(user)
    else this._loggedInUser$.next({} as User)
  }

  public loadUsers() {

    const users = this.loadUsersFromStorage() || this._getInitialUsers()
    this.updateUsers(users)
    return users
  }

  public deleteUser(userId: number) {
    const users = this.loadUsers()
    const idx = users.findIndex((user) => user.id === userId)
    if (idx !== -1) {
      localStorage.removeItem(this.LOGGED_USER_KEY)
      users.splice(idx, 1)
      this.setSelectedUser(null)
      this.updateUsers([...users])
    }
  }

  public async setSelectedUser(userId: number|null) {
    if(userId === null) return this._loggedInUser$.next({}as User)
    const users = this.loadUsers()
    const user = users.find(currUser => currUser.id === userId)
    if (user) {
      localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(user))
      this._loggedInUser$.next(user!)
    }
    else {
      console.log('no logged in user')
    }
  }

  public updateUsers(users: User[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
    this._users$.next([...users])
  }

  private loadUsersFromStorage() {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]')
    return (users.length > 0) ? users : null

  }
  private loadLoggedInUserFromStorage(): User {
    const user = JSON.parse(localStorage.getItem(this.LOGGED_USER_KEY) || '{}')
    return (Object.keys(user).length > 0) ? user : null
  }
  public getUserNameById(userId:number){
    const user = this.loadUsers().find(user => user.id === userId)
    // console.log(user?.displayName)
    return user?.displayName || 'no such user'
    
  }

  /* ***************************************************
 _getInitialUsers() was created to load inital users on the first site run
 before we have local data saved 
 ****************************************************/

  private _getInitialUsers() {
    // const users = await import('../../../assets/user-data/users.json')
    // return users.default
    // this is for mimicing the behavior of the async request
    return baseUsers
  }
}
