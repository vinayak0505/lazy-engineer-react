import axios from 'axios';
import API from '../constants/api';

class AuthService {
    static async loginUser(email: string, password: string) {
        const response = await axios.post(API.SIGNIN, {
            email,
            password
        });
        return response.data;
    }

    static async signUpUser(email: string, password: string, name: string) {
        const response = await axios.post(API.SIGNUP, {
            email,
            password,
            name
        });
        return response.data;
    }

    static async logoutUser(token: string) {
        const response = await axios.put(API.SIGNOUT, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async verifyToken(token: string) {
        const response = await axios.post(API.VERIFY_TOKEN, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
}

export default AuthService;