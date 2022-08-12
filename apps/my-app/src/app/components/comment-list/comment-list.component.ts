import {   Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'
import { Comment, User } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit ,OnChanges{

  constructor( private usersService: UsersService,private commentService: CommentsService) { }

  @Input() comments!: Comment[]
  @Input() loggedInUser!: User
  selectedCommentId!: (number | null)
  firstLayerComments!: Comment[]

  selectedCommentSub!:Subscription

  @Output() deleteUser = new EventEmitter<number>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() addComment = new EventEmitter<Comment>();

  ngOnInit(): void {
    this.firstLayerComments = this.filterComments
    this.selectedCommentSub = this.commentService.selectedCommentId$.subscribe(selectedId=>this.selectedCommentId=selectedId)


  }
  ngOnChanges({comments}: SimpleChanges): void {
      
      this.firstLayerComments = this.filterComments

  }

  onSelectComment(commentId: number | null): void {
    console.log(commentId,'@@@@@@@@@@@@@',this.selectedCommentId)
    const id = (this.selectedCommentId === commentId) ? null : commentId
    // this.selectedCommentId  = id
    this.commentService.setSelectedCommentId(id!)
    // console.log(this.selectedCommentId, 'selectedCommentId', '\n ', commentId)

  }
  
  getUserNickName(userId: number) {
    return this.usersService.getUserNameById(userId)
  }
  identify(idx: any, item: any) {
    return idx
  }
  saveComment(comment: Comment) {
    // console.log('hey from list')
    this.addComment.emit(comment)
  }
  get filterComments(){
    return this.comments.filter((comment => !comment.parentCommentId)).sort((commentA,commentB) => new Date(commentB.createdAt).getTime()-new Date(commentA.createdAt).getTime())
    
  }
}
