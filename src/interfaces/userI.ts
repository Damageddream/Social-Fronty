interface UserI { 
    name: string;
}

export default UserI;

export interface UserReduxI {
    name: string;
    loggedIn: boolean;
}