import axios from "axios";

export const tokenMiddleware = (api: any) => (next: any) => (action: any) => {
    switch (action.type) {
        case "auth/loginUser/fulfilled":
        case "auth/signUpUser/fulfilled":
        case "auth/verifyToken/fulfilled":
            saveToken(action.payload.data.token);
            break;

        case "auth/verifyToken/rejected":
        case "auth/logoutUser/fulfilled":
            removeToken();
            break;
    }
    next(action);
};

const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["token"] = token;
}

const removeToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["token"];
}