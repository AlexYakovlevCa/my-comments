import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Comment, User } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private commentService: CommentsService,
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) { }

  comments!: Comment[]
  loggedInUser!: User

  commnetsSub!: Subscription
  loggedInUserSub!: Subscription

  ngOnInit(): void {
    this.commentService.loadComments()
    this.usersService.loadLoggedInUser()
    this.loggedInUserSub = this.usersService.loggedInUser$.subscribe(user => this.loggedInUser = user)
    this.commnetsSub = this.commentService.comments$.subscribe(comments => {
      this.comments = comments
    })
  }
  
  ngOnDestroy(): void {
    this.commnetsSub.unsubscribe()
    this.loggedInUserSub.unsubscribe()
  }

  onDeleteComment(commentId: number) {
    this.commentService.deleteComment(commentId)
  }

  onSaveComment(comment:any) {
    this.commentService.saveComment(comment)
  }

  onDeleteUser(userId: number) {
    this.commentService.deleteUserComments(userId)
  }
}
