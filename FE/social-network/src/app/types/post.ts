import { PostImage } from "./postImage";

export interface Post {
    postId: string,
    userId: string,
    userUserName: string,
    createdOn: Date,
    modifiedOn: Date,
    title: string,
    content: string,
    votesCount: number,
    favoritesCount: number,
    images: PostImage[]
}