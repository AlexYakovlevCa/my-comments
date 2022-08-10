import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Comment } from '../../models/interfaces'
import baseComments from '../../../assets/user-data/comments.json'
import { UsersService } from '../users/users.service'
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private COMMENTS_KEY = 'comments'
  constructor(private usersService: UsersService) { }

  private _comments$ = new BehaviorSubject<Comment[]>([])
  public comments$ = this._comments$.asObservable()



  loadComments(): Comment[] {
    const comments = this.loadCommentsFromStorage() || this._getInitialComments()
    this.updateComments(comments)
    return comments
  }


  getCommentsByParentId(commentId: number): Comment[] {
    const comments = this.loadComments()
    return comments.filter(comment => comment.parentCommentId === commentId)

  }

  getCommentById(commentId: number) {
    const comments = this.loadComments()
    return comments.find(comment => comment.id === commentId)

  }
  deleteComments(userId: number) {
    console.log('delete @@@@@@@@@@@@@@@', userId)

    const comments = this.loadComments()
    console.log(comments)
    const comentsToDelete = comments.filter(comment => comment.ownerId === userId)
    comentsToDelete.forEach(comment => this.deleteComment(comment.id))
    // this.updateComments(comentsToDelete)
    this.usersService.deleteUser(userId)

  }

  deleteComment(commentId: number) {
    // need to delete all comments that has this comment id as parentId

    const comments = this.loadComments()

    const idx = comments.findIndex(comment => comment.id === commentId)
    comments.splice(idx, 1)
    const parentsIds  = new Set<number>() 
    const filterdComments = comments.filter(comment => {
      if (comment.parentCommentId === commentId) {
        //  this.deleteComment(comment.id)
        parentsIds.add(comment.id)
      }
      return comment.parentCommentId !== commentId

    })
    if(parentsIds.size > 0) {
      parentsIds.forEach((commentId) =>this.deleteComment(commentId))
    }

    this.updateComments(filterdComments)

  }

  

  saveComment(comment: Comment) {
    const comments = this.loadComments()
    let commentsToUpdate
    if (comment.id) {
      const commentToEdit = this.getCommentById(comment.id)!
      commentToEdit.txt = comment.txt
      commentsToUpdate = comments
        .filter(currComment => (currComment.id === commentToEdit.id) ? commentToEdit : currComment)

    } else {
      comment.id = Math.floor(Math.random() * (+Date.now()))
      commentsToUpdate = [...comments, comment]
    }
    this.updateComments(commentsToUpdate)

  }

  updateComments(comments: Comment[]) {
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments))
    this._comments$.next(comments)
  }

  loadCommentsFromStorage() {
    const comments = JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '[]')
    return (comments.length > 0) ? comments : null
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
