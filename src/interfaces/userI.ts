interface UserI { 
    name: string;
    photo: string;
    _id: string;
    friends: UserI[];
    invites: string[];
    invitesSent: string[];

}


export default UserI;

export interface UserApiObject {
    _id: string;
    name: string;
    facebook_id: string;
    photo: string;
    friends: UserI[];
    invites: string[];
    invitesSent: string[];

}

export interface UserJWT {
    _id: string;
    name: string;
    facebook_id?: string;
    photo: string;
    friends: string[];
    invites: string[];
    invitesSent: string[];
    __v: number;
}

export interface UserReduxI {
    name: string;
    loggedIn: boolean;
    photo: string;
    friends: UserI[];
    invites: string[];
    invitesSent: string[];

}

export interface UserApiLoginObject {
    sucess: string;
    message: string;
    user: UserApiObject;
    token: string;

}

export interface UserInitialState {
    loggedIn: boolean;
    name: string;
    photo: string;
    id: string | null;
    friends: UserI[];
    invites: string[];
    invitesSent: string[];

}

export interface UserWithInvites {
    loggedIn: boolean;
    name: string;
    photo: string;
    id: string | null;
    friends: UserI[];
    invites: UserI[];
    invitesSent: string[];

}

export interface NoFriendsI {
    success: boolean,
    noFriends: UserI[],
}

export interface UserNoObjectID {
    _id: string;
    name: string;
    facebook_id: string;
    photo: string;
    friends: UserI[];
    invites: string[];
    invitesSent: string[];

}