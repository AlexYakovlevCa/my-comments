import {   Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { Comment, User } from '../../models/interfaces'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit ,OnChanges{

  constructor( private usersService: UsersService) { }

  @Input() comments!: Comment[]
  @Input() loggedInUser!: User
  selectedCommentId!: (number | null)
  firstLayerComments!: Comment[]


  @Output() deleteUser = new EventEmitter<number>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() addComment = new EventEmitter<Comment>();

  ngOnInit(): void {
    this.firstLayerComments = this.comments.filter(comment => !comment.parentCommentId)


  }
  ngOnChanges({comments}: SimpleChanges): void {
      console.log(this.comments)
      
      // if(currentValue&&previousValue.length!==currentValue.length){
      //   console.log(currentValue.length,previousValue.length)
      //   this.cd.markForCheck()
      // }
      // this.firstLayerComments = this.comments.filter(comment => !comment.parentCommentId)

      // this.comments = [...this.comments]
  }

  onSelectComment(commentId: number | null): void {

    this.selectedCommentId = (this.selectedCommentId === commentId) ? null : commentId
    console.log(this.selectedCommentId, 'selectedCommentId', '\n ', commentId)

  }
  
  getUserNickName(userId: number) {
    return this.usersService.getUserNameById(userId)
  }
  identify(idx: any, item: any) {
    return idx
  }
  saveComment(comment: Comment) {
    console.log('hey from list')
    this.addComment.emit(comment)
  }
}
