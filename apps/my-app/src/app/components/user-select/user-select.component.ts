import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { User } from '../../models/interfaces'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.loggedInUserSub = this.usersService.loggedInUser$.subscribe(user => this.selectedUser = user)
    console.log('heyyy')

  }
  onSelectUser({ target }: Event) {
    this.usersService.setSelectedUser(+(<HTMLSelectElement>target).value)

  }
  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe()
    this.UsersSub.unsubscribe()
  }
  identify(item: any) {
    console.log(item.label)
    return item.label
  }
}
