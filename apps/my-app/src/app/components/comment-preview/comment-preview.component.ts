import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Comment } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentPreviewComponent implements OnInit {

  @Input() comment!: Comment
  @Input() spacingLeft!: number
  @Input() loggedInUserId!: number

  selectedCommentId!: (number|null)

  ownerDisplayeyName!: string
  comments!: Comment[]
  isEdit: boolean = false

  @Output() deleteUser = new EventEmitter<number>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() addComment = new EventEmitter<Comment>();
  @Output() onSelectComment = new EventEmitter<number>();

  constructor(private commentService: CommentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.ownerDisplayeyName = this.usersService.getUserNameById(this.comment.ownerId)
    this.comments = this.commentService.getCommentsByParentId(this.comment.id!)
    const loggedInUser = this.usersService.getLoggedInUser
    // this.loggedInUserId = loggedInUser?.id
    
  }
  
  selectComment(commentId:number,isEdit:boolean){
    this.isEdit = isEdit
    this.selectedCommentId = commentId
    console.log(commentId,'commentId inside comment' )
    this.onSelectComment.emit(commentId)
  }
  identify(idx:any,item:any){
    return item.id 
  }
  // sendComment(comment:Comment){
  //   console.log('we are in preview',comment)
  //   this.addComment.emit(comment)
  // }
}
