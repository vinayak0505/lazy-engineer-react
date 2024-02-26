const API = {
    SIGNIN: process.env.REACT_APP_BASE_URL + '/auth/signIn',
    SIGNUP: process.env.REACT_APP_BASE_URL + '/auth/signUp',
    SIGNOUT: process.env.REACT_APP_BASE_URL + '/auth/signOut',
    VERIFY_TOKEN: process.env.REACT_APP_BASE_URL + '/auth/verifyToken',
};

export default API;