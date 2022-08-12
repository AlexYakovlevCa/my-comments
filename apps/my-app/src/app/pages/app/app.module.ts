import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { UserSelectComponent } from '../../components/user-select/user-select.component'
import { CommentListComponent } from '../../components/comment-list/comment-list.component'
import { CommentPreviewComponent } from '../../components/comment-preview/comment-preview.component'
import { SpacingLeftDirective } from '../../directives/spacing-left.directive'
import { AddCommentComponent } from '../../components/add-comment/add-comment.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomTimeFormat } from '../../pipes/pipes.pipe'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserSelectComponent,
    CommentListComponent,
    CommentPreviewComponent,
    SpacingLeftDirective,
    AddCommentComponent,
    CustomTimeFormat
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
