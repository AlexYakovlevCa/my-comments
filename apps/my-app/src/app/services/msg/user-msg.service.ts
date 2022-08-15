import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Msg } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserMsgService {

  constructor() { }

  private _userMsg$ = new BehaviorSubject<Msg>({} as Msg)
  public userMsg$ = this._userMsg$.asObservable()


  setUserMsg(userMsg: Msg) {
    if (!this._userMsg$.value.txt) {
      const { type, txt } = userMsg
      this._userMsg$.next({ txt, type })
      setTimeout(() => {
        this._userMsg$.next({})
      }, 3000)
    }
  }
}
