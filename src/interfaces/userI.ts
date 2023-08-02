interface UserI { 
    name: string;
    photo: string;
    _id: string;
}


export default UserI;

export interface UserApiObject {
    _id: string;
    name: string;
    facebook_id: string;
    photo: string;
}

export interface UserReduxI {
    name: string;
    loggedIn: boolean;
    photo: string;
}

export interface UserApiLoginObject {
    sucess: string;
    message: string;
    user: UserApiObject;

}

export interface UserInitialState {
    loggedIn: boolean;
    name: string;
    photo: string;
    id: string | null;
}