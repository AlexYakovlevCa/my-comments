import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Comment, User } from '../../models/interfaces'
import { CommentsService } from '../../services/comments/comments.service'

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCommentComponent implements OnInit {

  @Input() selectedCommentId?: (number | undefined)
  @Input() loggedInUserId!: (number | null)
  @Input() isEdit?: boolean
  commentToEdit! : (Comment|undefined)
  @Output() addComment = new EventEmitter<Comment>()
  @Output() myEvent = new EventEmitter<any>()

  constructor(private commentService: CommentsService) { }

  addCommentForm!: FormGroup

  ngOnInit(): void {
    if(this.selectedCommentId){
      this.commentToEdit =  this.commentService.getCommentById(this.selectedCommentId)
    }
    // const initalText = (this.selectedComment) ?this.selectedComment.txt : ''
    const initalText = ''
    this.addCommentForm = new FormGroup({
      txt: new FormControl(initalText)
    })
    console.log(this.selectedCommentId, 'this is the selectedComment')
  }

  submitComment(ev: FormDataEvent) {
    const value = this.addCommentForm.get('txt')?.value
    console.log(this.addCommentForm.get('txt')?.value, 'value')
    
    if (!value) return

    const comment: Comment = {
      txt: value,
      ownerId: this.loggedInUserId!,
      parentCommentId:null,
      createdAt: new Date,
      deletedAt: null,
    }

    if (this.commentToEdit) {
      //  get selectedcoment by id
      console.log('inside iffffffffffffff')
      if (this.isEdit) {
        comment.parentCommentId = this.commentToEdit.parentCommentId
        comment.id = this.commentToEdit.id
      } else {
        comment.parentCommentId = this.commentToEdit.id
      }
    }
    console.log({...comment}, 'my comment')
    
    this.addComment.emit(comment)
    
  }
  

}
