import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Comment, User } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  constructor(private commentService: CommentsService, private usersService: UsersService) { }

  comments!: Comment[]
  loggedInUser!: User
  selectedCommentId!: (number | null)
  commnetsSub!: Subscription
  loggedInUserSub!: Subscription

  ngOnInit(): void {
    this.commentService.loadComments()
    this.usersService.loadLoggedInUser()
    this.loggedInUserSub = this.usersService.loggedInUser$.subscribe(user => this.loggedInUser = user)
    this.commnetsSub = this.commentService.comments$.subscribe(comments => this.comments = comments.filter(comment => !comment.parentCommentId))
  }
  ngOnDestroy(): void {
    this.commnetsSub.unsubscribe()
    this.loggedInUserSub.unsubscribe()
  }
  getUserNickName(userId: number) {
    return this.usersService.getUserNameById(userId)
  }
  onDeleteComment(commentId: number) {
    this.commentService.deleteComment(commentId)
  }
  onSaveComment(comment: Comment) {
    comment.createdAt = new Date
    this.commentService.saveComment(comment)
  }
  onDeleteUser(userId: number) {
    console.log('delete user')
    this.commentService.deleteComments(userId)

  }
  onSelectComment(commentId: number | null) {
    console.log(this.selectedCommentId ,'selectedCommentId','\n ' , commentId)
    this.selectedCommentId = (this.selectedCommentId === commentId) ? null : commentId
  }
}
