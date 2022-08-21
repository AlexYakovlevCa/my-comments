import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { Comment, User } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit , OnDestroy {

  constructor(private usersService: UsersService, private commentService: CommentsService) { }

  @Input() comments!: Comment[]
  @Input() loggedInUser!: User

  selectedCommentId!: (number | null)
  selectedCommentSub!: Subscription

  @Output() deleteUser = new EventEmitter<number>()
  @Output() deleteComment = new EventEmitter<number>()
  @Output() addComment = new EventEmitter<Comment>()

  ngOnInit(): void {
    console.log(this.comments)
    this.selectedCommentSub = this.commentService.selectedCommentId$.subscribe(selectedId => this.selectedCommentId = selectedId)
  }

  ngOnDestroy(): void {
    this.selectedCommentSub.unsubscribe()
  }

  onSelectComment(commentId: number | null): void {
    const id = (this.selectedCommentId === commentId) ? null : commentId
    this.commentService.setSelectedCommentId(id!)
  }

  getUserNickName(userId: number) {
    return this.usersService.getUserNameById(userId)
  }

  identify(idx: any, item: any) {
    return idx
  }

  saveComment(comment: Comment) {
    this.addComment.emit(comment)
  }

  get filterComments() {
    return this.comments.filter((comment => !comment.parentCommentId)).sort((commentA, commentB) => new Date(commentB.createdAt).getTime() - new Date(commentA.createdAt).getTime())
  }
}
