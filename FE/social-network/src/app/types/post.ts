import { PostImage } from "./postImage";

export interface Post {
    postId: string,
    userId: string,
    userProfileImageUrl: Uint8Array,
    userUserName: string,
    createdOn: Date,
    modifiedOn: Date,
    title: string,
    content: string,
    isVoted: boolean,
    isUpVote: boolean,
    isFavourite: boolean,
    votesCount: number,
    favoritesCount: number,
    commentsCount: number,
    images: PostImage[]
}