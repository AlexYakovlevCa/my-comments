import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { UserSelectComponent } from '../../components/user-select/user-select.component'
import { CommentListComponent } from '../../components/comment-list/comment-list.component'
import { CommentPreviewComponent } from '../../components/comment-preview/comment-preview.component'
import { SpacingLeftDirective } from '../../directives/spacing-left.directive'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserSelectComponent,
    CommentListComponent,
    CommentPreviewComponent,
    SpacingLeftDirective
    
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
