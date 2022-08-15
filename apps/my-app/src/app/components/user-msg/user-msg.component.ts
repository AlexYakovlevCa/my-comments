import { Component, OnInit } from '@angular/core'
import { Msg } from '../../models/interfaces'
import { UserMsgService } from '../../services/msg/user-msg.service'

@Component({
  selector: 'user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss'],
})
export class UserMsgComponent implements OnInit {
  constructor(private userMsgService: UserMsgService) { }
  userMsg!: Msg
  ngOnInit(): void {
    this.userMsgService.userMsg$.subscribe((msg) => {
      this.userMsg = msg
    })
  }
}
