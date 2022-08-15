import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Comment } from '../../models/interfaces'
import baseComments from '../../../assets/user-data/comments.json'
import { UsersService } from '../users/users.service'
import { UserMsgService } from '../msg/user-msg.service'




@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private COMMENTS_KEY = 'comments'
  constructor(private userMsgService:UserMsgService) { }

  private _comments$ = new BehaviorSubject<Comment[]>([])
  public comments$ = this._comments$.asObservable()

  private _selectedCommentId$ = new Subject<number | null>()
  public selectedCommentId$ = this._selectedCommentId$.asObservable()

  loadComments(): Comment[] {
    const comments = this.loadCommentsFromStorage() || this._getInitialComments()
    this.updateComments(comments)
    return comments
  }

  setSelectedCommentId(commentId: number | null) {
    this._selectedCommentId$.next(commentId)
  }

  getCommentsByParentId(commentId: number): Comment[] {
    const comments = this.loadComments()
    return [...comments.filter(comment => comment.parentCommentId === commentId).sort((commentA, commentB) => new Date(commentB.createdAt).getTime() - new Date(commentA.createdAt).getTime())]

  }

  getCommentById(commentId: number) {
    const comments = this.loadComments()
    const comment = comments.find(comment => comment.id === commentId)
    if (comment) return { ...comment }
    else return {} as Comment

  }

  async deleteUserComments(userId: number) {

    const comments = this.loadComments()
    const comentsToDelete = comments.filter(comment => comment.ownerId === userId)
    comentsToDelete.forEach(comment => this.deleteComment(comment.id!))
    this.setSelectedCommentId(null)

  }

  deleteComment(commentId: number, isFirstRun: boolean = true, loadedComments: Comment[] = []): void {

    const comments = isFirstRun ? this.loadComments() : loadedComments
    const idx = comments.findIndex(comment => comment.id === commentId)
    comments.splice(idx, 1)

    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments))
    comments.forEach(comment => {
      if (comment.parentCommentId === commentId) {
        this.deleteComment(comment.id!, false, comments)
      }
    })
    this.userMsgService.setUserMsg({type: 'succsess', txt: 'userMsgService'})
  }

  saveComment(comment: Comment) {
    const comments = this.loadComments()
    let commentsToUpdate
    if (comment.id) {
      commentsToUpdate = comments
        .map(currComment => (currComment.id === comment.id) ? comment : currComment)
        this.userMsgService.setUserMsg({type: 'succsess', txt: 'Comment edited'})

    } else {
      comment.id = Math.floor(Math.random() * (+Date.now() / 10000))
      if(comment.parentCommentId){
        this.userMsgService.setUserMsg({type: 'succsess', txt: 'reply added'})
      }
      this.userMsgService.setUserMsg({type: 'succsess', txt: 'comment added'})
      commentsToUpdate = [...comments, comment]
    }
    this.setSelectedCommentId(null)
    this.updateComments(commentsToUpdate)
    // this.userMsgService.setUserMsg({type: 'succsess', txt: 'comment added'})

  }

  updateComments(comments: Comment[]) {
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments))
    this._comments$.next(structuredClone(comments))
  }

  loadCommentsFromStorage() {
    const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY)!)
    return comments

  }

  /* ***************************************************
 _getInitialComments() was created to load inital comments on the first site run
 before we have local data saved 
 ****************************************************/

  private _getInitialComments() {
    // const comments = await import('../../../assets/user-data/comments.json')
    // return comments.default
    // this is for mimicing the behavior of the async request
    return baseComments
  }

}
