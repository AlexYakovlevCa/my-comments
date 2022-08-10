import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from '../../components/header/header.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { UserSelectComponent } from '../../components/user-select/user-select.component'
import { ChatRoomComponent } from '../../components/chat-room/chat-room.component'
import { CommentListComponent } from '../../components/comment-list/comment-list.component'
import { CommentPreviewComponent } from '../../components/comment-preview/comment-preview.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserSelectComponent,
    ChatRoomComponent,
    CommentListComponent,
    CommentPreviewComponent
    
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
