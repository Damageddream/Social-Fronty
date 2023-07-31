interface UserI { 
    name: string;
}


export default UserI;

export interface UserApiObject {
    _id: string;
    name: string;
    facebook_id: string;
}

export interface UserReduxI {
    name: string;
    loggedIn: boolean;
}

export interface UserApiLoginObject {
    sucess: string;
    message: string;
    user: UserApiObject;

}