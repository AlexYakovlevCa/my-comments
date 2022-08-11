import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { User } from '../../models/interfaces'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectComponent implements OnInit, OnDestroy {
  constructor(private usersService: UsersService) { }
  userList!: User[]
  selectedUser!: User
  loggedInUserSub!: Subscription
  UsersSub!: Subscription
  
  async ngOnInit(): Promise<void> {
    this.usersService.loadUsers()
    this.UsersSub = this.usersService.users$.subscribe(users => this.userList = users)
    this.loggedInUserSub =  this.usersService.loggedInUser$.subscribe(user => {
      this.selectedUser = user
      console.log(this.selectedUser)
    })
    // this.selectedUser = this.usersService.getLoggedInUser
    console.log('renders')
  }
  onSelectUser({ target }: Event) {
    console.log(target)
    const value =+(<HTMLSelectElement>target).value
    console.log(value)
    this.usersService.setSelectedUser(value)
    
  }
  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe()
    // this.UsersSub.unsubscribe()
  }
  identify(idx:any ,item: any) {
    return idx.label
  }
  getValue(){
    return this.selectedUser.id
  }
}
