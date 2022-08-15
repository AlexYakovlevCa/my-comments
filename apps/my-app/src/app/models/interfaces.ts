
export interface User {
    id: number;
    displayName: string;
}
export interface Comment{
    id?: number
    parentCommentId?: number | null
    ownerId: number
    txt: string
    createdAt: (number | Date)
    deletedAt: null
  }

  export interface Msg {
    type?: string
    txt?: string
  }
