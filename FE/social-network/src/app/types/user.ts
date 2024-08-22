import { Post } from "./post";

export interface User {
    userId: string,
    userUserName: string,
    userEmail: string,
    userFollowingsCount: number,
    userFollowersCount: number,
    userPostsCount: number,
    createdOn: string,
    profileImageUrl: Uint8Array,
    userPosts: Post[]
}