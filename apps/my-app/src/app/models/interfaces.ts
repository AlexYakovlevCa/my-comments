
export interface User {
    id: number;
    displayName: string;
}
export interface Comment{
    id: number
    parentCommentId?: number
    ownerId: number
    txt: string
    createdAt: (number | Date)
    deletedAt: null
  }
