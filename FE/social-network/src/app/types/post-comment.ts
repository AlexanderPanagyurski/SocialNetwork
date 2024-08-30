export interface PostComment {
    id: string,
    parentId: string,
    content: string,
    createdOn: Date,
    modifiedOn: Date,
    userUserName: string,
    userId: string,
    userProfileImage: Uint8Array
    children: PostComment[],
}