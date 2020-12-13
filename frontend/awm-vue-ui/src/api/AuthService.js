import ApiService from "./ApiService";

const loginService = new ApiService({ resource: "login/" });
const registerService = new ApiService({ resource: "register/" });
const logoutService = new ApiService({
    resource: "logout/",
    headers: { Authorization: `Token ${localStorage.token}` }
});
const verifyTokenService = new ApiService({ resource: 'auth-token/' })

export { loginService, registerService, logoutService, verifyTokenService };
