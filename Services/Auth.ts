import axios from 'axios';
import {User} from '../Models/User';
import jwt_decode from 'jwt-decode';

export const login = async (auth: User) => {
  return await axios
    .post('https://acf8-212-34-14-176.ngrok-free.app/api/Auth', auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.data);
};
