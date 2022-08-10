import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Comment } from '../../models/interfaces'
import  baseComments from '../../../assets/user-data/comments.json'
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private COMMENTS_KEY = 'comments'
  constructor() { }

  private _comments$ = new BehaviorSubject<Comment[]>([])
  public comments$ = this._comments$.asObservable()



   loadComments(): Comment[] {
    const comments =  this.loadCommentsFromStorage() ||  this._getInitialComments()
    return comments
  }

  
   getCommentsByParentId(commentId: number): Comment[]{
    const comments =  this.loadComments()
    return comments.filter(comment => comment.parentCommentId === commentId)

  }

   getCommentById(commentId: number) {
    const comments =  this.loadComments()
    return comments.find(comment => comment.id === commentId)

  }

   deleteComment(commentId: number) {
    const comments =  this.loadComments()
    const idx = comments.findIndex(comment => comment.id === commentId)
    comments.splice(idx, 1)
    this.updateComments(comments)

  }

   updateComments(comments: Comment[]) {
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments))
    this._comments$.next(comments)
  }

  private  _getInitialComments() {
    // const comments = await import('../../../assets/user-data/comments.json')
    // return comments.default
    // this is for mimicing the behavior of the async request
    return baseComments
  }
  loadCommentsFromStorage() {
    const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '[]')
    return (comments.length > 0) ? comments : null
  }

}
