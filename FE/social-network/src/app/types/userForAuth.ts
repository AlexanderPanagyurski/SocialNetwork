export interface UserForAuth {
    token: string,
    id: string,
    email: string,
    profileImageUrl: Uint8Array,
    userName: string,
    password: string;
}