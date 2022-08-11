import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Comment } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentPreviewComponent implements OnInit {

  @Input() comment!: Comment
  @Input() spacingLeft!: number
  @Input() selectedCommentId!: (number|null)

  loggedInUserId!: number
  ownerDisplayeyName!: string
  comments!: Comment[]

  @Output() deleteUser = new EventEmitter<any>();
  @Output() deleteComment = new EventEmitter<any>();
  @Output() addComment = new EventEmitter<any>();
  @Output() onSelectComment = new EventEmitter<number>();

  constructor(private commentService: CommentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.ownerDisplayeyName = this.usersService.getUserNameById(this.comment.ownerId)
    this.comments = this.commentService.getCommentsByParentId(this.comment.id)
    const loggedInUser = this.usersService.getLoggedInUser
    this.loggedInUserId = loggedInUser?.id
  }

  
}
