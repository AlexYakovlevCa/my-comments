import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() selectedCommentId!: (number | null)
  @Input() loggedInUserId!: (number | null)
  constructor(private fb: FormBuilder) { }
  addCommentForm!: FormGroup
  ngOnInit(): void {
    this.addCommentForm = this.fb.group({
      txt: ['']
    })
    console.log('renders')

  }
}
