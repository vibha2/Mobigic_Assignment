import axios_api from "../axios/index";

const AuthService = {
  //isUserAdmin: false,

  //   getClientURL: function () {
  //     return "http://192.168.29.240:8002";
  //   },

  signUp: async function (user) {
    return axios_api.post("/auth/sign-up/", user);
  },

  getUserById: async function (userId) {
    return axios_api.get("/auth/user/" + userId);
  },

  login: async function (email, password) {
    return axios_api.post("/auth/login", { email: email, password: password });
  },

};

export default AuthService;
