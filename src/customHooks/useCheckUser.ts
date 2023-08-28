import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import UserI, { UserReduxI } from '../interfaces/userI';
import { RootState } from '../store/store';
import {useEffect} from 'react';

interface decodedToken {
    user: UserI;
    iat: string;
}

export default function useCheckUser(){
    const dispatch = useDispatch;
    const user: UserReduxI = useSelector((state: RootState) => state.user)
    const token: string | null = localStorage.getItem('token')

    useEffect(()=>{
        if(token){
            const decodedToken = jwt.decode(token) as decodedToken
        }
    },[])

}