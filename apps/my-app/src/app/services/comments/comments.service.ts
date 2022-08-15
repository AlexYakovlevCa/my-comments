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
  constructor(private userMsgService: UserMsgService) { }

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

  getCommentsByParentId(commentId: (number | undefined)): Comment[] {
    const comments = this.loadComments()
    return [...comments.filter(comment => comment.parentCommentId === commentId).sort((commentA, commentB) => new Date(commentB.createdAt).getTime() - new Date(commentA.createdAt).getTime())]

  }

  getCommentById(commentId: number) {
    const comments = this.loadComments()
    const comment = comments.find(comment => comment.id === commentId)
    if (comment) return { ...comment }
    else return {} as Comment

  }

  deleteUserComments(userId: number) {

    const comments = this.loadComments()
    const comentsToDelete = comments.filter(comment => comment.ownerId === userId)
    comentsToDelete.forEach(comment => this.deleteComment(comment.id!))
    this.setSelectedCommentId(null)

  }

  deleteComment(commentId: number): void {

    let comments = this.loadComments()
    const Idx = comments.findIndex(comment => comment.id === commentId)
    comments.splice(Idx, 1)

    const parentComments = new Set<number>([commentId])
    let isFoundInRound = true
    
    while (isFoundInRound && comments.length) {
      isFoundInRound = false
      comments = comments.filter(comment => {
        if (parentComments.has(comment.parentCommentId!)) {
          parentComments.add(comment.id!)
          isFoundInRound = true
          return false
        } else return true

      })
    }
    this.updateComments(comments)
    this.userMsgService.setUserMsg({ type: 'succsess', txt: 'Commnet deleted' })
  }

  saveComment(comment: Comment) {
    const comments = this.loadComments()
    let commentsToUpdate
    if (comment.id) {
      commentsToUpdate = comments
        .map(currComment => (currComment.id === comment.id) ? comment : currComment)
      this.userMsgService.setUserMsg({ type: 'succsess', txt: 'Comment edited' })

    } else {
      comment.id = Math.floor(Math.random() * (+Date.now() / 10000))
      if (comment.parentCommentId) {
        this.userMsgService.setUserMsg({ type: 'succsess', txt: 'reply added' })
      }
      this.userMsgService.setUserMsg({ type: 'succsess', txt: 'comment added' })
      commentsToUpdate = [...comments, comment]
    }
    this.setSelectedCommentId(null)
    this.updateComments(commentsToUpdate)

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
