import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'
import { Comment } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentPreviewComponent implements OnInit , OnDestroy {

  @Input() comment!: Comment
  @Input() spacingLeft!: number
  @Input() loggedInUserId!: number

  @Output() deleteUser = new EventEmitter<number>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() addComment = new EventEmitter<Comment>();
  @Output() onSelectComment = new EventEmitter<number>();
  
  comments!: Comment[]
  selectedCommentId!: (number|null)
  ownerDisplayeyName!: string
  isEdit: boolean = false

  selectedCommentSub! : Subscription


  constructor(private commentService: CommentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.selectedCommentSub = this.commentService.selectedCommentId$.subscribe(selectedId=>this.selectedCommentId=selectedId)
    this.ownerDisplayeyName = this.usersService.getUserNameById(this.comment.ownerId)
    this.comments = this.selectedComments
  }


  ngOnDestroy(): void {
      this.selectedCommentSub.unsubscribe()
  }

  selectComment(commentId:number,isEdit:boolean){
    this.isEdit = isEdit
    this.selectedCommentId = commentId
    this.onSelectComment.emit(commentId)
  }

  identify(idx:any,item:any){
    return idx.id 
  }

  get selectedComments(){
    return this.commentService.getCommentsByParentId(this.comment.id)
  }
 
}
