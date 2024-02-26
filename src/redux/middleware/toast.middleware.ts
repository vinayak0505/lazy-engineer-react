/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

export const toastMiddleware = (api: any) => (next: any) => (action: any) => {
  console.log("priting types");
  console.log(typeof api, api);
  console.log(typeof next, next);
  console.log(typeof action, action);
  switch (action?.type) {
    case "auth/loginUser/fulfilled":
      toast.info("Logged in successfully");
      break;
    case "auth/signUpUser/fulfilled":
      toast.info("SignUp successfully");
      break;
    case "auth/logoutUser/fulfilled":
      toast.info("Logged out successfully");
      break;
    case "helper/customToast":
      if (typeof action?.payload === "string") {
        toast.info(action.payload);
      }
      break;
    default:
      console.log("loggin", action);
      if (action.error?.message) {
        toast.error(action.error.message);
      }
  }
  next(action);
};