import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Comment } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'
@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit ,OnDestroy{

  @Input()loggedInUserId!: (number | null)
  @Input() isEdit?: boolean
  @Output() addComment = new EventEmitter<Comment>()
  @Output() myEvent = new EventEmitter<any>()
  
  @Input() selectedCommentId?: (number | null)
  commentToEdit! : (Comment|undefined)

  selectedCommentSub!:Subscription
  constructor(private commentService: CommentsService) { }

  addCommentForm!: FormGroup

  ngOnInit(): void {
 
    if(this.selectedCommentId){
      this.commentToEdit =  this.commentService.getCommentById(this.selectedCommentId)
    }
    const initalText = ''
    this.addCommentForm = new FormGroup({
      txt: new FormControl(initalText)
    })
  }
  ngOnDestroy(){
  }

  submitComment() {
    const value = this.addCommentForm.get('txt')?.value
    if (!value) return

    const comment: Comment = {
      txt: value,
      ownerId: this.loggedInUserId!,
      parentCommentId:null,
      createdAt: new Date,
      deletedAt: null,
    }

    if (this.commentToEdit) {
      if (this.isEdit) {
        comment.parentCommentId = this.commentToEdit.parentCommentId
        comment.id = this.commentToEdit.id
      } else {
        comment.parentCommentId = this.commentToEdit.id
      }
    }
    this.addCommentForm.get('txt')?.setValue('')
    this.commentService.setSelectedCommentId(null!)
    this.addComment.emit(comment)
    
  }
  

}
